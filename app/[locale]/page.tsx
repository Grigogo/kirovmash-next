import type { Metadata } from 'next'
import { LOCALES, type Locale } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, { path: `/${locale}` })
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params
  return (
    <main>
      <p>{locale}</p>
    </main>
  )
}
