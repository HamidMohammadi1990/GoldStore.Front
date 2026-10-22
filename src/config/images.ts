/** مسیرهای تصاویر محلی — فایل‌ها در `public/images` قرار دارند */

const product = (id: string) => `/images/products/${id}.jpg`
const productGallery = (id: string, index: number) =>
  `/images/products/${id}-gallery-${index}.jpg`

export const localImages = {
  hero: {
    marina: '/images/hero/marina.jpg',
    fastShipping: '/images/hero/fast-shipping.jpg',
    treasury: '/images/hero/treasury.jpg',
  },
  collections: {
    marina: '/images/collections/marina.jpg',
    iris: '/images/collections/iris.jpg',
    jessica: '/images/collections/jessica.jpg',
    superlight: '/images/collections/superlight.jpg',
  },
  blog: {
    b1: '/images/blog/b1.jpg',
    b2: '/images/blog/b2.jpg',
    b3: '/images/blog/b3.jpg',
    b4: '/images/blog/b4.jpg',
  },
  products: {
    p1: product('p1'),
    p2: product('p2'),
    p3: product('p3'),
    p4: product('p4'),
    p5: product('p5'),
    p6: product('p6'),
    p7: product('p7'),
    p8: product('p8'),
    p9: product('p9'),
    p10: product('p10'),
  },
  productGallery,
} as const

export function productImageUrls(productId: string, primaryPath: string): string[] {
  return [
    primaryPath,
    localImages.productGallery(productId, 2),
    localImages.productGallery(productId, 3),
  ]
}
