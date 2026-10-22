import { localImages } from '@/config/images'
import type { Collection } from '@/types/collection'

export const mockCollections: Collection[] = [
  {
    id: 'c1',
    slug: 'marina',
    title: 'مارینا',
    description: 'الهام از دریای آرام؛ خطوط موج‌دار و نمادهای دریایی در طلای ۱۸ عیار.',
    coverImageUrl: localImages.collections.marina,
    productCount: 4,
  },
  {
    id: 'c2',
    slug: 'iris',
    title: 'آیریس',
    description: 'طرح‌های رمانتیک با جزئیات ظریف و میناکاری‌های لطیف.',
    coverImageUrl: localImages.collections.iris,
    productCount: 2,
  },
  {
    id: 'c3',
    slug: 'jessica',
    title: 'جسیکا',
    description: 'کلاسیک مدرن با حجم بیشتر طلا و بردارهای هندسی.',
    coverImageUrl: localImages.collections.jessica,
    productCount: 1,
  },
  {
    id: 'c4',
    slug: 'superlight',
    title: 'سوپرلایت',
    description: 'وزن سبک برای استفاده روزمره بدون فداکردن درخشش.',
    coverImageUrl: localImages.collections.superlight,
    productCount: 3,
  },
]
