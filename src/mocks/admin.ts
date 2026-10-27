import { mockBlogPosts } from '@/mocks/blog'
import { mockCategories } from '@/mocks/categories'
import { mockCollections } from '@/mocks/collections'
import { mockProducts } from '@/mocks/products'
import { guidePages, legalPages, mockBranches, mockFaq } from '@/mocks/siteContent'
import { localImages } from '@/config/images'
import type {
  AdminBlogPost,
  AdminCart,
  AdminCategory,
  AdminCollection,
  AdminMessage,
  AdminOrder,
  AdminOrderItem,
  AdminProduct,
  AdminUser,
  AdminWishlist,
  ManagedContent,
} from '@/types/admin'

function line(productId: string, quantity: number): AdminOrderItem {
  const product = mockProducts.find((item) => item.id === productId)
  if (!product) throw new Error(`Unknown product ${productId}`)
  return {
    productId,
    title: product.title,
    code: product.code,
    quantity,
    priceToman: product.priceToman,
  }
}

const products: AdminProduct[] = mockProducts.map((product) => ({
  ...product,
  published: product.id !== 'p9',
  isInStock: product.id !== 'p8',
}))

const categories: AdminCategory[] = mockCategories.map((category) => ({
  ...category,
  published: category.id !== '8',
}))

const collections: AdminCollection[] = mockCollections.map((collection) => ({
  ...collection,
  published: true,
}))

const posts: AdminBlogPost[] = [
  ...mockBlogPosts.map((post) => ({ ...post, status: 'published' as const })),
  {
    id: 'b5',
    slug: 'gold-care-draft',
    title: 'نگهداری طلا در خانه',
    excerpt: 'پیش‌نویس راهنمای تمیز کردن زیورآلات بدون آسیب به آبکاری.',
    imageUrl: localImages.blog.b2,
    publishedAt: '2026-10-20',
    author: 'تحریریه گلداستور',
    readingMinutes: 4,
    tags: ['نگهداری'],
    status: 'draft',
    content: [
      'طلا را با آب ولرم و مایع ظرفشویی خیلی رقیق بشویید و با پارچه نرم خشک کنید.',
      'از تماس طولانی با عطر، سفیدکننده و آب استخر خودداری کنید.',
    ],
  },
]

const users: AdminUser[] = [
  {
    id: 'u1',
    fullName: 'سارا محمدی',
    mobile: '09121234567',
    email: 'sara@example.com',
    city: 'تهران',
    role: 'customer',
    status: 'active',
    joinedAt: '2025-11-02',
  },
  {
    id: 'u2',
    fullName: 'رضا کریمی',
    mobile: '09134567890',
    email: 'reza@example.com',
    city: 'اصفهان',
    role: 'customer',
    status: 'active',
    joinedAt: '2026-01-18',
  },
  {
    id: 'u3',
    fullName: 'نسترن احمدی',
    mobile: '09351112233',
    email: 'nastaran@example.com',
    city: 'کرج',
    role: 'customer',
    status: 'active',
    joinedAt: '2026-02-09',
  },
  {
    id: 'u4',
    fullName: 'امیر حسینی',
    mobile: '09171110022',
    email: 'amir@example.com',
    city: 'شیراز',
    role: 'customer',
    status: 'active',
    joinedAt: '2026-03-14',
  },
  {
    id: 'u5',
    fullName: 'مریم نوری',
    mobile: '09152223344',
    email: 'maryam@example.com',
    city: 'مشهد',
    role: 'customer',
    status: 'active',
    joinedAt: '2026-04-21',
  },
  {
    id: 'u6',
    fullName: 'کیان رضایی',
    mobile: '09120001122',
    email: 'kian@goldstore.ir',
    city: 'تهران',
    role: 'admin',
    status: 'active',
    joinedAt: '2025-08-01',
  },
  {
    id: 'u7',
    fullName: 'هدی اکبری',
    mobile: '09360004455',
    email: 'hoda@example.com',
    city: 'تبریز',
    role: 'customer',
    status: 'blocked',
    joinedAt: '2026-06-03',
  },
]

const orders: AdminOrder[] = [
  {
    id: 'o1',
    number: 'GS-1048',
    customerName: 'سارا محمدی',
    mobile: '09121234567',
    city: 'تهران',
    address: 'سعادت‌آباد، سرو غربی، پلاک ۱۸',
    status: 'paid',
    createdAt: '2026-10-26T11:20:00',
    shippingToman: 0,
    items: [line('p1', 1), line('p4', 1)],
  },
  {
    id: 'o2',
    number: 'GS-1047',
    customerName: 'رضا کریمی',
    mobile: '09134567890',
    city: 'اصفهان',
    address: 'چهارباغ عباسی، کوچه گلستان، پلاک ۷',
    status: 'processing',
    createdAt: '2026-10-25T16:05:00',
    shippingToman: 450_000,
    note: 'تحویل بعدازظهر',
    items: [line('p6', 1)],
  },
  {
    id: 'o3',
    number: 'GS-1046',
    customerName: 'نسترن احمدی',
    mobile: '09351112233',
    city: 'کرج',
    address: 'گوهردشت، خیابان اصلی، برج سپیدار',
    status: 'shipped',
    createdAt: '2026-10-24T09:40:00',
    shippingToman: 0,
    items: [line('p5', 1), line('p7', 2)],
  },
  {
    id: 'o4',
    number: 'GS-1045',
    customerName: 'امیر حسینی',
    mobile: '09171110022',
    city: 'شیراز',
    address: 'ستارخان، کوچه ۱۲، پلاک ۴',
    status: 'delivered',
    createdAt: '2026-10-18T13:15:00',
    shippingToman: 450_000,
    items: [line('p10', 1)],
  },
  {
    id: 'o5',
    number: 'GS-1044',
    customerName: 'مریم نوری',
    mobile: '09152223344',
    city: 'مشهد',
    address: 'احمدآباد، بلوار سجاد، پلاک ۹۰',
    status: 'pending',
    createdAt: '2026-10-27T08:10:00',
    shippingToman: 450_000,
    items: [line('p2', 1)],
  },
  {
    id: 'o6',
    number: 'GS-1043',
    customerName: 'کیان رضایی',
    mobile: '09120001122',
    city: 'تهران',
    address: 'جردن، خیابان ساسانی، پلاک ۲',
    status: 'cancelled',
    createdAt: '2026-10-12T19:00:00',
    shippingToman: 0,
    note: 'انصراف مشتری پیش از ارسال',
    items: [line('p3', 1)],
  },
  {
    id: 'o7',
    number: 'GS-1042',
    customerName: 'سارا محمدی',
    mobile: '09121234567',
    city: 'تهران',
    address: 'سعادت‌آباد، سرو غربی، پلاک ۱۸',
    status: 'delivered',
    createdAt: '2026-09-30T10:00:00',
    shippingToman: 0,
    items: [line('p9', 1)],
  },
]

const carts: AdminCart[] = [
  {
    id: 'cart1',
    customerName: 'یاسمین جعفری',
    mobile: '09126667788',
    updatedAt: '2026-10-27T12:40:00',
    items: [
      { title: mockProducts[2].title, code: mockProducts[2].code, quantity: 1, priceToman: mockProducts[2].priceToman },
      { title: mockProducts[3].title, code: mockProducts[3].code, quantity: 1, priceToman: mockProducts[3].priceToman },
    ],
  },
  {
    id: 'cart2',
    customerName: 'پوریا مرادی',
    mobile: '09382221100',
    updatedAt: '2026-10-26T21:05:00',
    items: [
      { title: mockProducts[7].title, code: mockProducts[7].code, quantity: 1, priceToman: mockProducts[7].priceToman },
    ],
  },
  {
    id: 'cart3',
    customerName: 'هدی اکبری',
    mobile: '09360004455',
    updatedAt: '2026-10-20T15:30:00',
    items: [
      { title: mockProducts[4].title, code: mockProducts[4].code, quantity: 1, priceToman: mockProducts[4].priceToman },
      { title: mockProducts[5].title, code: mockProducts[5].code, quantity: 1, priceToman: mockProducts[5].priceToman },
    ],
  },
]

const wishlists: AdminWishlist[] = [
  {
    id: 'w1',
    customerName: 'سارا محمدی',
    mobile: '09121234567',
    updatedAt: '2026-10-26T18:12:00',
    productIds: ['p1', 'p5'],
  },
  {
    id: 'w2',
    customerName: 'نسترن احمدی',
    mobile: '09351112233',
    updatedAt: '2026-10-23T11:00:00',
    productIds: ['p6', 'p9', 'p4'],
  },
  {
    id: 'w3',
    customerName: 'امیر حسینی',
    mobile: '09171110022',
    updatedAt: '2026-10-15T09:20:00',
    productIds: ['p10'],
  },
]

const messages: AdminMessage[] = [
  {
    id: 'm1',
    name: 'لیلا بهرامی',
    email: 'leila@example.com',
    subject: 'تعیین سایز انگشتر',
    body: 'بین سایز ۵۲ و ۵۴ مردد هستم. انگشتر اسب دریایی مارینا برای استفاده روزمره کدام را پیشنهاد می‌کنید؟',
    createdAt: '2026-10-27T09:15:00',
    read: false,
  },
  {
    id: 'm2',
    name: 'حمید قاسمی',
    email: 'hamid@example.com',
    subject: 'هماهنگی بازدید از شعبه',
    body: 'می‌خواهم شنبه برای دیدن گردنبند جسیکا به شعبه مرکزی بیایم. آیا لازم است از قبل وقت بگیرم؟',
    createdAt: '2026-10-26T17:40:00',
    read: false,
  },
  {
    id: 'm3',
    name: 'نگار سلیمانی',
    email: 'negar@example.com',
    subject: 'درخواست تعویض',
    body: 'دستبند میوکی را دیروز تحویل گرفتم و قفل آن کمی سفت است. امکان تعویض با مدل مشابه هست؟',
    createdAt: '2026-10-25T13:05:00',
    read: true,
  },
  {
    id: 'm4',
    name: 'آتلیه روشنا',
    email: 'studio@example.com',
    subject: 'همکاری محتوا',
    body: 'برای عکاسی کالکشن بعدی پیشنهاد همکاری داریم. لطفاً اگر مناسب است ایمیل را پاسخ دهید.',
    createdAt: '2026-10-22T10:30:00',
    read: true,
  },
]

function pageBody(paragraphs: string[]): string {
  return paragraphs.join('\n\n')
}

const contents: ManagedContent[] = [
  ...Object.values(guidePages).map((page) => ({
    id: `guide-${page.slug}`,
    kind: 'guide' as const,
    title: page.title,
    body: pageBody(page.sections.flatMap((section) => section.paragraphs)),
    meta: page.subtitle ?? 'راهنمای فروشگاه',
    published: true,
    updatedAt: '2026-09-12',
  })),
  ...Object.values(legalPages).map((page) => ({
    id: `legal-${page.slug}`,
    kind: 'legal' as const,
    title: page.title,
    body: pageBody(page.sections.flatMap((section) => section.paragraphs)),
    meta: 'صفحه حقوقی',
    published: true,
    updatedAt: '2026-08-02',
  })),
  ...mockFaq.map((item) => ({
    id: item.id,
    kind: 'faq' as const,
    title: item.question,
    body: item.answer,
    meta: item.category,
    published: true,
    updatedAt: '2026-09-28',
  })),
  ...mockBranches.map((branch) => ({
    id: branch.id,
    kind: 'branch' as const,
    title: branch.name,
    body: `${branch.address}\nتلفن: ${branch.phone}\nساعت کاری: ${branch.hours}`,
    meta: branch.city,
    published: branch.id !== 'br3',
    updatedAt: '2026-07-19',
  })),
]

export const adminSeed = {
  products,
  categories,
  collections,
  posts,
  users,
  orders,
  carts,
  wishlists,
  messages,
  contents,
}
