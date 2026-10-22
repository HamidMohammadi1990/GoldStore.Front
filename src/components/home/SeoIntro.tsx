import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/config/site'

export function SeoIntro() {
  return (
    <section className="py-14 lg:py-16" aria-labelledby="seo-heading">
      <Container size="narrow">
        <h2 id="seo-heading" className="text-center text-2xl font-semibold text-ink">
          خرید آنلاین طلا از {siteConfig.name}
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-8 text-ink-muted">
          <p>
            {siteConfig.name} با تمرکز بر طراحی اصیل و کیفیت ساخت، مجموعه‌ای از زیورآلات
            طلای ۱۸ عیار را برای سلیقه‌های مختلف ارائه می‌کند. از نیم‌ست و گردنبند تا
            انگشتر و دستبند، هر محصول با شفافیت در وزن و قیمت‌گذاری بر اساس نرخ روز طلا
            عرضه می‌شود.
          </p>
          <p>
            فرآیند خرید آنلاین ساده است: انتخاب محصول، افزودن به سبد، تسویه امن و دریافت
            درب منزل یا تحویل از شعب. تیم مشاوره ما در انتخاب سایز، ست کردن زیورآلات و
            پیگیری سفارش همراه شماست.
          </p>
        </div>
      </Container>
    </section>
  )
}
