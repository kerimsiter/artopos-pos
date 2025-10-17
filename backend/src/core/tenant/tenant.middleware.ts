import { Injectable, NestMiddleware, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaPublicService } from '../prisma/prisma-public.service';

// Request objesine tenant bilgisini eklemek için
declare global {
  namespace Express {
    interface Request {
      tenant?: {
        id: string;
        slug: string;
        schemaName: string;
        status: string;
        plan: string;
      };
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prismaPublic: PrismaPublicService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. Tenant'ı belirle (subdomain veya custom domain'den)
      const tenant = await this.resolveTenant(req);

      if (!tenant) {
        throw new NotFoundException('Tenant bulunamadı');
      }

      // 2. Tenant durumunu kontrol et
      if (tenant.status === 'SUSPENDED') {
        throw new ForbiddenException('Hesabınız askıya alınmış. Lütfen ödeme bilgilerinizi güncelleyin.');
      }

      if (tenant.status === 'CANCELLED' || tenant.status === 'ARCHIVED') {
        throw new ForbiddenException('Hesabınız aktif değil.');
      }

      // 3. Trial süresi dolmuş mu kontrol et
      if (tenant.status === 'TRIAL' && tenant.trialEndsAt && new Date() > tenant.trialEndsAt) {
        throw new ForbiddenException('Deneme süreniz dolmuştur. Lütfen bir plan seçin.');
      }

      // 4. Request'e tenant bilgisini ekle
      req.tenant = {
        id: tenant.id,
        slug: tenant.slug,
        schemaName: tenant.schemaName,
        status: tenant.status,
        plan: tenant.plan,
      };

      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Request'ten tenant'ı belirle
   * Öncelik sırası:
   * 1. Custom domain (pos.taflanrestoran.com)
   * 2. Subdomain (taflan.artopos.app)
   * 3. Header (X-Tenant-Slug)
   */
  private async resolveTenant(req: Request) {
    const host = req.get('host') || '';
    const tenantHeader = req.get('X-Tenant-Slug');

    // 1. Custom domain kontrolü
    const tenant = await this.prismaPublic.tenant.findFirst({
      where: {
        OR: [
          { customDomain: host },
          { subdomain: this.extractSubdomain(host) },
          ...(tenantHeader ? [{ slug: tenantHeader }] : []),
        ],
        deletedAt: null,
      },
      select: {
        id: true,
        slug: true,
        schemaName: true,
        status: true,
        plan: true,
        trialEndsAt: true,
      },
    });

    return tenant;
  }

  /**
   * Host'tan subdomain'i çıkar
   * taflan.artopos.app -> taflan
   * localhost:3000 -> null
   */
  private extractSubdomain(host: string): string | null {
    // Localhost veya IP adresi ise subdomain yok
    if (host.includes('localhost') || /^\d+\.\d+\.\d+\.\d+/.test(host)) {
      return null;
    }

    // Port varsa temizle
    const cleanHost = host.split(':')[0];
    
    // Subdomain'i çıkar
    const parts = cleanHost.split('.');
    
    // En az 3 parça olmalı (subdomain.domain.tld)
    if (parts.length >= 3) {
      return parts[0];
    }

    return null;
  }
}
