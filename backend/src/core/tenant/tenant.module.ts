import { Module, Global } from '@nestjs/common';
import { TenantMiddleware } from './tenant.middleware';
import { PrismaPublicService } from '../prisma/prisma-public.service';
import { PrismaTenantService } from '../prisma/prisma-tenant.service';

/**
 * Tenant Module
 * Global olarak tanımlanır, tüm modüllerde kullanılabilir
 */
@Global()
@Module({
  providers: [
    PrismaPublicService,
    PrismaTenantService,
    TenantMiddleware,
  ],
  exports: [
    PrismaPublicService,
    PrismaTenantService,
  ],
})
export class TenantModule {}
