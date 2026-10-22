const faNumberFormatter = new Intl.NumberFormat('fa-IR')

export function formatPriceToman(amount: number): string {
  return `${faNumberFormatter.format(amount)} تومان`
}

export function formatWeightGrams(weight: number): string {
  const formatted = new Intl.NumberFormat('fa-IR', {
    minimumFractionDigits: weight % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(weight)
  return `${formatted} گرم`
}

export function formatPersianDigits(value: string | number): string {
  return faNumberFormatter.format(Number(value))
}
