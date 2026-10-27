import type { AdminOrder, ContentKind, OrderStatus, UserRole, UserStatus } from '@/types/admin'

const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'

export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .toLowerCase()
}

export function matchesQuery(query: string, ...parts: Array<string | undefined>): boolean {
  const needle = normalizeDigits(query.trim())
  if (!needle) return true
  return parts.some((part) => (part ? normalizeDigits(part).includes(needle) : false))
}

export function orderItemsTotal(order: AdminOrder): number {
  return order.items.reduce((sum, item) => sum + item.priceToman * item.quantity, 0)
}

export function orderGrandTotal(order: AdminOrder): number {
  return orderItemsTotal(order) + order.shippingToman
}

export function countsAsRevenue(status: OrderStatus): boolean {
  return status === 'paid' || status === 'processing' || status === 'shipped' || status === 'delivered'
}

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: 'در انتظار پرداخت',
  paid: 'پرداخت‌شده',
  processing: 'در حال آماده‌سازی',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل‌شده',
  cancelled: 'لغو شده',
}

export const orderStatuses = Object.keys(orderStatusLabel) as OrderStatus[]

export const userRoleLabel: Record<UserRole, string> = {
  customer: 'مشتری',
  admin: 'مدیر',
}

export const userStatusLabel: Record<UserStatus, string> = {
  active: 'فعال',
  blocked: 'مسدود',
}

export const contentKindLabel: Record<ContentKind, string> = {
  guide: 'راهنما',
  legal: 'قوانین',
  faq: 'سوالات',
  branch: 'شعبه',
}
