import { localImages } from '@/config/images'
import { mockCategories } from '@/mocks/categories'
import { mockProducts } from '@/mocks/products'
import type { HomeContent } from '@/types/home'

export const mockHomeContent: HomeContent = {
  goldPricePerGram: 8_450_000,
  heroSlides: [
    {
      id: 'h1',
      title: 'کالکشن مارینا',
      subtitle: 'الهام‌گرفته از اعماق دریا؛ ظرافت طلا در هر جزئیات',
      ctaLabel: 'مشاهده مجموعه',
      ctaHref: '/collections/marina',
      imageUrl: localImages.hero.marina,
    },
    {
      id: 'h2',
      title: 'ارسال فوری زیورآلات',
      subtitle: 'انتخاب‌های آماده ارسال؛ تحویل سریع در تهران',
      ctaLabel: 'خرید فوری',
      ctaHref: '/fast-shipping',
      imageUrl: localImages.hero.fastShipping,
      accent: 'fast',
    },
    {
      id: 'h3',
      title: 'گنجینه طلا گلداستور',
      subtitle: 'پس‌انداز هوشمند با خرید تدریجی زیورآلات طلا',
      ctaLabel: 'شروع پس‌انداز',
      ctaHref: '/treasury',
      imageUrl: localImages.hero.treasury,
    },
  ],
  categories: mockCategories,
  fastShipping: {
    id: 'fast',
    title: 'ارسال فوری',
    subtitle: 'محصولات آماده ارسال امروز',
    viewAllHref: '/fast-shipping',
    products: mockProducts.filter((p) => p.badges?.includes('fast-shipping')),
  },
  newArrivals: {
    id: 'new',
    title: 'جدیدترین‌ها',
    subtitle: 'تازه‌ترین طراحی‌های فصل',
    viewAllHref: '/products?sort=newest',
    products: mockProducts.filter((p) => p.badges?.includes('new')).length
      ? mockProducts.filter((p) => p.badges?.includes('new'))
      : mockProducts.slice(0, 4),
  },
  collections: {
    id: 'featured',
    title: 'پیشنهاد ویژه',
    subtitle: 'منتخب طراحان گلداستور',
    viewAllHref: '/products',
    products: mockProducts.slice(2, 10),
  },
  blogPosts: [
    {
      id: 'b1',
      slug: 'charm-vs-plaque',
      title: 'چارم طلا چیست؟ تفاوت با پلاک معمولی',
      excerpt: 'راهنمای انتخاب چارم مناسب برای دستبند و گردنبند.',
      imageUrl: localImages.blog.b1,
      publishedAt: '2026-03-01',
    },
    {
      id: 'b2',
      slug: 'ring-size-guide',
      title: 'بهترین طرح‌های انگشتر برای انگشت اشاره',
      excerpt: 'اشتباهات رایج هنگام خرید انگشتر و نکات ست کردن.',
      imageUrl: localImages.blog.b2,
      publishedAt: '2026-02-20',
    },
    {
      id: 'b3',
      slug: 'gold-treasury',
      title: 'پس‌انداز طلا با گنجینه گلداستور',
      excerpt: 'خرید آسان و مرحله‌ای زیورآلات با برنامه پس‌انداز.',
      imageUrl: localImages.blog.b3,
      publishedAt: '2026-02-10',
    },
    {
      id: 'b4',
      slug: 'earring-necklace-set',
      title: 'راهنمای ست کردن گوشواره با گردنبند',
      excerpt: '۷ نکته طلایی برای هماهنگی زیورآلات در استایل روزانه.',
      imageUrl: localImages.blog.b4,
      publishedAt: '2026-01-28',
    },
  ],
}
