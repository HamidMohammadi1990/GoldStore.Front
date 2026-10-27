import { Container } from '@/components/ui/Container'

export function TopBar() {
  return (
    <div className="border-b border-border bg-ink text-white">
      <Container className="flex h-10 items-center text-xs sm:text-sm">
        <p className="truncate text-white/85">
          ارسال امن به سراسر کشور · ضمانت اصالت کالا · مشاوره رایگان خرید
        </p>
      </Container>
    </div>
  )
}
