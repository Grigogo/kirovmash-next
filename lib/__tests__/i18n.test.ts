import { describe, it, expect } from 'vitest'
import { pickTranslation, LOCALES } from '../i18n'

type Translation = { locale: string; name: string }

describe('pickTranslation', () => {
  const translations: Translation[] = [
    { locale: 'ru', name: 'Русский' },
    { locale: 'en', name: 'English' },
  ]

  it('returns the translation matching the requested locale', () => {
    const result = pickTranslation(translations, 'en')
    expect(result).toEqual({ locale: 'en', name: 'English' })
  })

  it('falls back to ru when requested locale is not found', () => {
    const ruOnly: Translation[] = [{ locale: 'ru', name: 'Только русский' }]
    const result = pickTranslation(ruOnly, 'en')
    expect(result).toEqual({ locale: 'ru', name: 'Только русский' })
  })

  it('returns undefined for an empty array', () => {
    const result = pickTranslation([], 'ru')
    expect(result).toBeUndefined()
  })

  it('respects a custom fallbackLocale', () => {
    const enOnly: Translation[] = [{ locale: 'en', name: 'English only' }]
    const result = pickTranslation(enOnly, 'ru', 'en')
    expect(result).toEqual({ locale: 'en', name: 'English only' })
  })
})

describe('LOCALES', () => {
  it('contains ru and en', () => {
    expect(LOCALES).toContain('ru')
    expect(LOCALES).toContain('en')
  })

  it('has exactly 2 locales', () => {
    expect(LOCALES).toHaveLength(2)
  })
})
