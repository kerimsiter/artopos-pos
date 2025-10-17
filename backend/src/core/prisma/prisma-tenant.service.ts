import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Tenant-aware Prisma Service
 * Her tenant için ayrı schema'da çalışır
 * 
 * Kullanım:
 * const prisma = this.prismaTenant.getClient(tenant.schemaName);
 * const orders = await prisma.order.findMany();
 */
@Injectable()
export class PrismaTenantService implements OnModuleInit, OnModuleDestroy {
  // Tenant schema'ları için client cache
  private clients: Map<string, PrismaClient> = new Map();
  
  // Connection pool limiti
  private readonly MAX_CLIENTS = 50;

  async onModuleInit() {
    // Uygulama başlarken yapılacak işlemler
    console.log('PrismaTenantService initialized');
  }

  async onModuleDestroy() {
    // Tüm client'ları kapat
    await this.disconnectAll();
  }

  /**
   * Belirli bir tenant schema'sı için Prisma client döndür
   * Client cache'de yoksa yeni oluştur
   */
  getClient(schemaName: string): PrismaClient {
    // Cache'de var mı kontrol et
    if (this.clients.has(schemaName)) {
      return this.clients.get(schemaName)!;
    }

    // Cache limiti aşıldı mı kontrol et
    if (this.clients.size >= this.MAX_CLIENTS) {
      // LRU mantığıyla en eski client'ı kaldır
      const firstKey = this.clients.keys().next().value;
      const oldClient = this.clients.get(firstKey);
      oldClient?.$disconnect();
      this.clients.delete(firstKey);
    }

    // Yeni client oluştur
    const client = this.createClient(schemaName);
    this.clients.set(schemaName, client);

    return client;
  }

  /**
   * Yeni Prisma client oluştur ve schema'yı ayarla
   */
  private createClient(schemaName: string): PrismaClient {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Prisma client'ı oluştur
    const client = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });

    // Schema'yı ayarla (PostgreSQL için)
    // Bu, tüm query'lerde otomatik olarak "SET search_path TO schema_name" çalıştırır
    client.$executeRawUnsafe(`SET search_path TO "${schemaName}"`);

    return client;
  }

  /**
   * Belirli bir tenant client'ını disconnect et
   */
  async disconnect(schemaName: string): Promise<void> {
    const client = this.clients.get(schemaName);
    if (client) {
      await client.$disconnect();
      this.clients.delete(schemaName);
    }
  }

  /**
   * Tüm client'ları disconnect et
   */
  async disconnectAll(): Promise<void> {
    const disconnectPromises = Array.from(this.clients.values()).map(
      (client) => client.$disconnect(),
    );
    await Promise.all(disconnectPromises);
    this.clients.clear();
  }

  /**
   * Cache'deki client sayısını döndür
   */
  getCacheSize(): number {
    return this.clients.size;
  }

  /**
   * Cache'i temizle (test için)
   */
  clearCache(): void {
    this.clients.clear();
  }
}
