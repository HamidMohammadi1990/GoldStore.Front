export const siteConfig = {
  name: 'گلداستور',
  nameEn: 'GoldStore',
  tagline: 'خرید آنلاین طلا و زیورآلات',
  description:
    'فروشگاه اینترنتی گلداستور؛ طراحی و عرضه زیورآلات طلا با ضمانت اصالت، ارسال امن و پشتیبانی تخصصی.',
  support: {
    phone: '۰۲۱-۹۱۰۰۰۰۰۰',
    phoneHref: 'tel:+982191000000',
    email: 'info@goldstore.ir',
    hours: 'پاسخگویی از ۹ تا ۲۱',
  },
  social: {
    instagram: 'https://instagram.com',
    telegram: 'https://t.me',
    whatsapp: 'https://wa.me',
  },
} as const

export const footerNav = {
  shop: [
    { label: 'راهنمای خرید', href: '/guides/purchase' },
    { label: 'زمان تحویل و ارسال', href: '/guides/shipping' },
    { label: 'راهنمای تعیین سایز', href: '/guides/size' },
    { label: 'شرایط تعویض', href: '/guides/exchange' },
    { label: 'شعب حضوری', href: '/branches' },
    { label: 'قوانین و مقررات', href: '/legal/terms' },
    { label: 'سوالات متداول', href: '/faq' },
  ],
  company: [
    { label: 'درباره ما', href: '/about' },
    { label: 'تماس با ما', href: '/contact' },
    { label: 'مجله گلداستور', href: '/blog' },
    { label: 'گنجینه طلا', href: '/treasury' },
  ],
} as const
