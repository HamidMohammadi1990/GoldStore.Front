import type { Category } from '@/types/category'

export const mockCategories: Category[] = [
  {
    id: '1',
    slug: 'half-set',
    title: 'نیم ست',
    children: [
      { slug: 'with-chain', title: 'با زنجیر' },
      { slug: 'no-chain', title: 'بدون زنجیر' },
      { slug: 'minakari', title: 'میناکاری' },
    ],
  },
  {
    id: '2',
    slug: 'necklace',
    title: 'گردنبند',
    children: [
      { slug: 'chain', title: 'زنجیر طلا' },
      { slug: 'pendant-necklace', title: 'آویزدار' },
      { slug: 'choker', title: 'چوکر' },
      { slug: 'layered', title: 'لایه‌ای' },
    ],
  },
  {
    id: '3',
    slug: 'earring',
    title: 'گوشواره',
    children: [
      { slug: 'stud', title: 'میخی' },
      { slug: 'drop', title: 'آویزدار' },
      { slug: 'hoop', title: 'حلقه‌ای' },
      { slug: 'clip', title: 'میخی و آویز' },
    ],
  },
  {
    id: '4',
    slug: 'ring',
    title: 'انگشتر',
    children: [
      { slug: 'women', title: 'زنانه' },
      { slug: 'men', title: 'مردانه' },
      { slug: 'set', title: 'ست نامزدی' },
      { slug: 'minimal', title: 'مینیمال' },
    ],
  },
  {
    id: '5',
    slug: 'bracelet',
    title: 'دستبند',
    children: [
      { slug: 'gold', title: 'دستبند طلا' },
      { slug: 'miyuki', title: 'میوکی' },
      { slug: 'bangle', title: 'بنگل' },
      { slug: 'charm-bracelet', title: 'چارمی' },
    ],
  },
  {
    id: '6',
    slug: 'anklet',
    title: 'پابند',
    children: [
      { slug: 'classic', title: 'کلاسیک' },
      { slug: 'marine', title: 'طرح دریایی' },
    ],
  },
  {
    id: '7',
    slug: 'pendant',
    title: 'آویز ساعت',
    children: [
      { slug: 'charm', title: 'چارم' },
      { slug: 'plaque', title: 'پلاک' },
      { slug: 'watch-charm', title: 'آویز ساعت' },
    ],
  },
  {
    id: '8',
    slug: 'kids',
    title: 'طلای کودک',
    children: [
      { slug: 'bracelet-kids', title: 'دستبند کودک' },
      { slug: 'pendant-kids', title: 'آویز کودک' },
      { slug: 'gift-set', title: 'ست هدیه' },
    ],
  },
]
