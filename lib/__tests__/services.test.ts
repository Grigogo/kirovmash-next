import { describe, it, expect } from 'vitest'
import { pickTranslation } from '../i18n'

type ServiceTranslation = {
  locale: string
  name: string
  description?: string | null
}

describe('pickTranslation with ServiceTranslation', () => {
  const translations: ServiceTranslation[] = [
    { locale: 'ru', name: 'Монтаж конвейеров', description: 'Профессиональный монтаж' },
    { locale: 'en', name: 'Conveyor installation', description: 'Professional installation' },
  ]

  it('returns the translation matching the requested locale', () => {
    const result = pickTranslation(translations, 'en')
    expect(result?.name).toBe('Conveyor installation')
    expect(result?.locale).toBe('en')
  })

  it('falls back to ru when requested locale is not found', () => {
    const ruOnly: ServiceTranslation[] = [
      { locale: 'ru', name: 'Монтаж конвейеров', description: null },
    ]
    const result = pickTranslation(ruOnly, 'en')
    expect(result?.locale).toBe('ru')
    expect(result?.name).toBe('Монтаж конвейеров')
  })

  it('returns undefined for an empty translations array', () => {
    const result = pickTranslation([], 'ru')
    expect(result).toBeUndefined()
  })

  it('respects a custom fallbackLocale', () => {
    const enOnly: ServiceTranslation[] = [
      { locale: 'en', name: 'Conveyor installation', description: null },
    ]
    const result = pickTranslation(enOnly, 'ru', 'en')
    expect(result?.locale).toBe('en')
    expect(result?.name).toBe('Conveyor installation')
  })
})
