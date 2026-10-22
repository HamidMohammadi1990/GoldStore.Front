export const categoryIcons: Record<string, string> = {
  'half-set': '✦',
  necklace: '◇',
  earring: '◈',
  ring: '○',
  bracelet: '◎',
  anklet: '◉',
  pendant: '◆',
  kids: '★',
}

export function getCategoryIcon(slug: string) {
  return categoryIcons[slug] ?? '•'
}
