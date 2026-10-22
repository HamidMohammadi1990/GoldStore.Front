import { productImageUrls } from '@/config/images'
import { mockProducts } from '@/mocks/products'
import type { ProductDetail, ProductSummary } from '@/types/product'

const collectionSlugMap: Record<string, string> = {
  مارینا: 'marina',
  آیریس: 'iris',
  جسیکا: 'jessica',
}

export function enrichProductSummary(p: ProductSummary): ProductSummary {
  return {
    ...p,
    collectionSlug: p.collectionSlug ?? (p.collectionName ? collectionSlugMap[p.collectionName] : undefined),
    createdAt: p.createdAt ?? '2026-02-15',
  }
}

export const mockProductsEnriched = mockProducts.map(enrichProductSummary)

export function toProductDetail(product: ProductSummary): ProductDetail {
  const isRing = product.categorySlug === 'ring'
  return {
    ...enrichProductSummary(product),
    description:
      `${product.title} با طلای ۱۸ عیار و ضمانت اصالت گلداستور تولید شده است. ` +
      'قیمت نهایی بر اساس وزن کار، نرخ روز طلا و اجرت ساخت محاسبه می‌شود. ' +
      'هر قطعه در بسته‌بندی ضدضربه و همراه با کارت ضمانت ارسال می‌گردد.',
    images: productImageUrls(product.id, product.imageUrl),
    karat: 18,
    makingFeePercent: 12,
    updatedAt: new Date().toISOString(),
    ringSizes: isRing ? [48, 49, 50, 51, 52, 53, 54] : undefined,
    specifications: [
      { label: 'عیار', value: '۱۸ عیار (۷۵۰)' },
      { label: 'کد محصول', value: product.code },
      { label: 'وزن تقریبی', value: `${product.weightGrams} گرم` },
      { label: 'وضعیت', value: product.isInStock ? 'موجود' : 'ناموجود' },
      {
        label: 'ارسال',
        value: product.badges?.includes('fast-shipping') ? 'فوری (امروز)' : '۳ تا ۷ روز کاری',
      },
    ],
  }
}

export function getProductDetailBySlug(slug: string): ProductDetail | undefined {
  const found = mockProductsEnriched.find((p) => p.slug === slug)
  return found ? toProductDetail(found) : undefined
}

export function getRelatedProducts(product: ProductSummary, limit = 4): ProductSummary[] {
  return mockProductsEnriched
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categorySlug === product.categorySlug ||
          p.collectionSlug === product.collectionSlug),
    )
    .slice(0, limit)
}
