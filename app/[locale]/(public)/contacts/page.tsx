import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { MapPin, Phone, Mail } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { LOCALES } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/public/contact-form'

type SupportedLocale = (typeof routing.locales)[number]

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: SupportedLocale = routing.locales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : routing.defaultLocale

  const t = await getTranslations({ locale: safeLocale, namespace: 'contacts' })
  return generatePageMetadata(safeLocale, {
    title: t('title'),
    description: t('description'),
    path: `/${safeLocale}/contacts`,
  })
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  console.debug('[contacts/page] locale:', safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'contacts' })

  const formLabels = {
    namePlaceholder: t('form.namePlaceholder'),
    nameLabel: t('form.name'),
    nameRequired: t('form.nameRequired'),
    phoneLabel: t('form.phone'),
    phonePlaceholder: t('form.phonePlaceholder'),
    phoneRequired: t('form.phoneRequired'),
    emailLabel: t('form.email'),
    emailPlaceholder: t('form.emailPlaceholder'),
    messageLabel: t('form.message'),
    messagePlaceholder: t('form.messagePlaceholder'),
    submitLabel: t('form.submit'),
    submittingLabel: t('form.submitting'),
    successMessage: t('form.success'),
    errorMessage: t('form.error'),
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mb-10 text-muted-foreground">{t('description')}</p>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-muted-foreground">{t('address')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('phone')}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <a
              href={`mailto:${t('email')}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('email')}
            </a>
          </div>
        </div>

        <div>
          <ContactForm labels={formLabels} />
        </div>
      </div>
    </div>
  )
}
