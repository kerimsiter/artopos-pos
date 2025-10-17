# 🏢 Multi-Tenancy Uygulama Rehberi

## 📋 İçindekiler
1. [Mimari Özet](#mimari-özet)
2. [Kurulum Adımları](#kurulum-adımları)
3. [Kullanım Örnekleri](#kullanım-örnekleri)
4. [Tenant Onboarding](#tenant-onboarding)
5. [Migration Yönetimi](#migration-yönetimi)
6. [Güvenlik](#güvenlik)
7. [Performans](#performans)

---

## 🏗️ Mimari Özet

### Database Yapısı
```
artopos_pos (PostgreSQL Database)
├── public schema
│   ├── tenants (işletme bilgileri)
│   ├── tenant_subscriptions (abonelikler)
│   ├── tenant_invitations (davetler)
│   └── system_settings
│
└── tenant_<slug> schemas
    ├── tenant_taflan_restoran
    │   ├── users, products, orders, branches...
    ├── tenant_istanbul_et
    │   ├── users, products, orders, branches...
    └── tenant_alinin_yeri
        ├── users, products, orders, branches...
```

### Veri Akışı
```
1. Request gelir (taflan.artopos.app)
2. TenantMiddleware devreye girer
3. Subdomain'den tenant belirlenir
4. Tenant bilgisi request'e eklenir
5. Controller tenant context'i alır
6. PrismaTenantService doğru schema'ya bağlanır
7. İşlem yapılır
8. Response döner
```

---

## 🚀 Kurulum Adımları

### 1. Environment Variables

`.env` dosyasına ekle:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/artopos_pos?schema=public"

# Tenant Settings
BASE_DOMAIN="artopos.app"
ENABLE_CUSTOM_DOMAINS=true
```

### 2. Public Schema Migration

```bash
# Public schema için migration oluştur
cd backend
npx prisma migrate dev --schema=./prisma/schema-public.prisma --name init_public

# Client generate et
npx prisma generate --schema=./prisma/schema-public.prisma
```

### 3. Tenant Schema Migration

```bash
# Ana schema için migration oluştur
npx prisma migrate dev --name init_tenant
```

### 4. App Module'e Ekle

`backend/src/app.module.ts`:
```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TenantModule } from './core/tenant/tenant.module';
import { TenantMiddleware } from './core/tenant/tenant.middleware';

@Module({
  imports: [
    TenantModule, // Global olarak ekle
    // ... diğer modüller
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Tüm route'lara tenant middleware ekle
    // Auth route'ları hariç tutabilirsin
    consumer
      .apply(TenantMiddleware)
      .exclude(
        '/auth/login',
        '/auth/register',
        '/health',
      )
      .forRoutes('*');
  }
}
```

---

## 💻 Kullanım Örnekleri

### Controller'da Tenant Kullanımı

```typescript
import { Controller, Get } from '@nestjs/common';
import { Tenant, TenantContext } from '@/core/tenant/tenant.decorator';
import { PrismaTenantService } from '@/core/prisma/prisma-tenant.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly prismaTenant: PrismaTenantService) {}

  @Get()
  async getOrders(@Tenant() tenant: TenantContext) {
    // Tenant'a özel Prisma client al
    const prisma = this.prismaTenant.getClient(tenant.schemaName);
    
    // Sadece bu tenant'ın siparişlerini getir
    const orders = await prisma.order.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        items: true,
        customer: true,
      },
    });
    
    return orders;
  }

  @Get(':id')
  async getOrder(
    @Param('id') id: string,
    @Tenant() tenant: TenantContext,
  ) {
    const prisma = this.prismaTenant.getClient(tenant.schemaName);
    
    const order = await prisma.order.findUnique({
      where: { id },
    });
    
    if (!order) {
      throw new NotFoundException('Sipariş bulunamadı');
    }
    
    return order;
  }
}
```

### Service'de Tenant Kullanımı

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaTenantService } from '@/core/prisma/prisma-tenant.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaTenant: PrismaTenantService) {}

  async createOrder(schemaName: string, data: CreateOrderDto) {
    const prisma = this.prismaTenant.getClient(schemaName);
    
    return prisma.order.create({
      data: {
        ...data,
        orderNumber: await this.generateOrderNumber(schemaName),
      },
    });
  }

  private async generateOrderNumber(schemaName: string): Promise<string> {
    const prisma = this.prismaTenant.getClient(schemaName);
    
    const lastOrder = await prisma.order.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    
    // Sipariş numarası oluştur
    const year = new Date().getFullYear();
    const lastNumber = lastOrder ? parseInt(lastOrder.orderNumber.split('-')[1]) : 0;
    
    return `${year}-${String(lastNumber + 1).padStart(4, '0')}`;
  }
}
```

---

## 🎯 Tenant Onboarding

### Yeni Tenant Oluşturma

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaPublicService } from '@/core/prisma/prisma-public.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TenantOnboardingService {
  constructor(private readonly prismaPublic: PrismaPublicService) {}

  async createTenant(data: CreateTenantDto) {
    // 1. Slug oluştur (URL-safe)
    const slug = this.generateSlug(data.name);
    const schemaName = `tenant_${slug}`;

    // 2. Public schema'da tenant kaydı oluştur
    const tenant = await this.prismaPublic.tenant.create({
      data: {
        name: data.name,
        slug,
        subdomain: slug,
        schemaName,
        email: data.email,
        phone: data.phone,
        status: 'TRIAL',
        plan: 'TRIAL',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 gün
      },
    });

    // 3. Tenant için schema oluştur
    await this.createTenantSchema(schemaName);

    // 4. Migration'ları çalıştır
    await this.runMigrations(schemaName);

    // 5. Seed data ekle (varsayılan ayarlar, roller, vs.)
    await this.seedTenantData(schemaName, data);

    return tenant;
  }

  private async createTenantSchema(schemaName: string) {
    const prisma = new PrismaClient();
    
    try {
      // PostgreSQL schema oluştur
      await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
      console.log(`Schema created: ${schemaName}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  private async runMigrations(schemaName: string) {
    // Prisma migrate'i programatik olarak çalıştır
    const { execSync } = require('child_process');
    
    try {
      execSync(
        `npx prisma migrate deploy --schema=./prisma/schema.prisma`,
        {
          env: {
            ...process.env,
            DATABASE_URL: `${process.env.DATABASE_URL}?schema=${schemaName}`,
          },
        },
      );
      console.log(`Migrations applied to: ${schemaName}`);
    } catch (error) {
      console.error(`Migration failed for ${schemaName}:`, error);
      throw error;
    }
  }

  private async seedTenantData(schemaName: string, data: CreateTenantDto) {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.DATABASE_URL}?schema=${schemaName}`,
        },
      },
    });

    try {
      // Varsayılan roller oluştur
      await prisma.role.createMany({
        data: [
          { name: 'Admin', permissions: { all: true } },
          { name: 'Manager', permissions: { orders: true, products: true } },
          { name: 'Waiter', permissions: { orders: true } },
          { name: 'Cashier', permissions: { payments: true } },
        ],
      });

      // İlk kullanıcıyı oluştur (admin)
      await prisma.user.create({
        data: {
          username: data.email,
          email: data.email,
          password: await this.hashPassword(data.password),
          firstName: data.firstName,
          lastName: data.lastName,
          active: true,
          // roleId eklenecek
        },
      });

      console.log(`Seed data created for: ${schemaName}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = require('bcrypt');
    return bcrypt.hash(password, 10);
  }
}
```

---

## 🔄 Migration Yönetimi

### Tüm Tenant'lara Migration Uygulama

`backend/scripts/migrate-all-tenants.ts`:
```typescript
import { PrismaClient as PrismaPublicClient } from '@prisma/client-public';
import { execSync } from 'child_process';

async function migrateAllTenants() {
  const prismaPublic = new PrismaPublicClient();

  try {
    // Tüm aktif tenant'ları al
    const tenants = await prismaPublic.tenant.findMany({
      where: {
        status: { in: ['TRIAL', 'ACTIVE'] },
        deletedAt: null,
      },
    });

    console.log(`Found ${tenants.length} tenants to migrate`);

    for (const tenant of tenants) {
      console.log(`\nMigrating: ${tenant.name} (${tenant.schemaName})`);
      
      try {
        execSync(
          `npx prisma migrate deploy`,
          {
            env: {
              ...process.env,
              DATABASE_URL: `${process.env.DATABASE_URL}?schema=${tenant.schemaName}`,
            },
            stdio: 'inherit',
          },
        );
        
        console.log(`✅ Success: ${tenant.name}`);
      } catch (error) {
        console.error(`❌ Failed: ${tenant.name}`, error);
      }
    }

    console.log('\n✨ Migration completed for all tenants');
  } finally {
    await prismaPublic.$disconnect();
  }
}

migrateAllTenants();
```

Çalıştırma:
```bash
ts-node backend/scripts/migrate-all-tenants.ts
```

---

## 🔒 Güvenlik

### 1. SQL Injection Koruması
- ✅ Prisma ORM kullanıldığı için otomatik korunma var
- ✅ `$executeRawUnsafe` kullanırken parameterize query kullan

### 2. Tenant İzolasyonu
- ✅ Her tenant ayrı schema'da
- ✅ Middleware seviyesinde tenant validation
- ✅ JWT token'da tenant_id kontrolü

### 3. Rate Limiting
```typescript
// Tenant bazlı rate limiting
@Injectable()
export class TenantRateLimitGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenant = request.tenant;
    
    // Redis'te tenant bazlı rate limit kontrolü
    const key = `rate_limit:${tenant.id}:${request.ip}`;
    // ... rate limit logic
    
    return true;
  }
}
```

---

## ⚡ Performans

### 1. Connection Pooling
- PrismaTenantService max 50 client cache tutar
- LRU mantığıyla eski client'lar temizlenir

### 2. Redis Cache
```typescript
// Tenant metadata'sını cache'le
@Injectable()
export class TenantCacheService {
  constructor(private readonly redis: Redis) {}

  async getTenant(slug: string) {
    const cached = await this.redis.get(`tenant:${slug}`);
    if (cached) return JSON.parse(cached);
    
    // DB'den al ve cache'le
    const tenant = await this.prismaPublic.tenant.findUnique({ where: { slug } });
    await this.redis.set(`tenant:${slug}`, JSON.stringify(tenant), 'EX', 3600);
    
    return tenant;
  }
}
```

### 3. Query Optimization
- Her tenant için ayrı schema olduğu için index'ler daha efektif
- Cross-tenant query yok, performans artışı

---

## 🎉 Özet

Bu mimari ile:
- ✅ **Taflan Restoran**'ın verileri `tenant_taflan_restoran` schema'sında
- ✅ **İstanbul Et**'in verileri `tenant_istanbul_et` schema'sında
- ✅ **Alinin Yeri**'nin verileri `tenant_alinin_yeri` schema'sında
- ✅ Veriler **asla** birbirine karışmaz
- ✅ Her işletme kendi şubelerini yönetir
- ✅ Performans ve güvenlik maksimum seviyede

**Subdomain Örnekleri:**
- `taflan.artopos.app`
- `istanbul-et.artopos.app`
- `alinin-yeri.artopos.app`

**Custom Domain Örnekleri:**
- `pos.taflanrestoran.com`
- `siparis.istanbulrestoran.com`
