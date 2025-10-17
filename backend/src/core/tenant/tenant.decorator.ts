import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Controller'larda tenant bilgisine erişmek için decorator
 * 
 * Kullanım:
 * @Get()
 * async getOrders(@Tenant() tenant: TenantContext) {
 *   console.log(tenant.id, tenant.schemaName);
 * }
 */
export const Tenant = createParamDecorator(
  (data: keyof TenantContext | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tenant = request.tenant;

    // Belirli bir alan isteniyorsa sadece onu döndür
    return data ? tenant?.[data] : tenant;
  },
);

/**
 * Tenant context type
 */
export interface TenantContext {
  id: string;
  slug: string;
  schemaName: string;
  status: string;
  plan: string;
}
