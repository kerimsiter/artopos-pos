import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as PrismaPublicClient } from '@prisma/client-public';

/**
 * Public Schema Prisma Service
 * Sadece tenant yönetimi için kullanılır
 * 
 * Kullanım:
 * const tenant = await this.prismaPublic.tenant.findUnique({ where: { slug: 'taflan' } });
 */
@Injectable()
export class PrismaPublicService
  extends PrismaPublicClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    console.log('PrismaPublicService connected to public schema');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaPublicService disconnected');
  }
}
