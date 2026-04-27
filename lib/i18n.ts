export const LOCALES = ['ru', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export function pickTranslation<T extends { locale: string }>(
  translations: T[],
  locale: Locale,
  fallbackLocale: Locale = 'ru',
): T | undefined {
  return (
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === fallbackLocale)
  )
}
