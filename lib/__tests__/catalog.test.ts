import { describe, it, expect } from 'vitest'
import { pickTranslation } from '../i18n'

type CategoryTranslation = {
  locale: string
  name: string
  description?: string | null
}

type ProductTranslation = {
  locale: string
  name: string
  description?: string | null
}

describe('pickTranslation with CategoryTranslation', () => {
  const translations: CategoryTranslation[] = [
    { locale: 'ru', name: 'Ленточные конвейеры', description: 'Описание' },
    { locale: 'en', name: 'Belt conveyors', description: 'Description' },
  ]

  it('returns the translation matching the requested locale', () => {
    const result = pickTranslation(translations, 'en')
    expect(result).toEqual({ locale: 'en', name: 'Belt conveyors', description: 'Description' })
  })

  it('falls back to ru when requested locale is not found', () => {
    const ruOnly: CategoryTranslation[] = [
      { locale: 'ru', name: 'Ленточные конвейеры', description: null },
    ]
    const result = pickTranslation(ruOnly, 'en')
    expect(result?.locale).toBe('ru')
    expect(result?.name).toBe('Ленточные конвейеры')
  })

  it('returns undefined for an empty translations array', () => {
    const result = pickTranslation([], 'ru')
    expect(result).toBeUndefined()
  })

  it('returns the ru translation when ru is requested', () => {
    const result = pickTranslation(translations, 'ru')
    expect(result?.name).toBe('Ленточные конвейеры')
  })
})

describe('pickTranslation with ProductTranslation', () => {
  const translations: ProductTranslation[] = [
    { locale: 'ru', name: 'Конвейер КЛ-500', description: 'Ленточный конвейер' },
    { locale: 'en', name: 'Belt conveyor KL-500', description: 'Belt conveyor' },
  ]

  it('returns the translation matching the requested locale', () => {
    const result = pickTranslation(translations, 'en')
    expect(result?.name).toBe('Belt conveyor KL-500')
  })

  it('falls back to ru when en translation is missing', () => {
    const ruOnly: ProductTranslation[] = [
      { locale: 'ru', name: 'Конвейер КЛ-500', description: null },
    ]
    const result = pickTranslation(ruOnly, 'en')
    expect(result?.locale).toBe('ru')
  })

  it('returns undefined when translations array is empty', () => {
    const result = pickTranslation([], 'en')
    expect(result).toBeUndefined()
  })

  it('respects a custom fallbackLocale', () => {
    const enOnly: ProductTranslation[] = [
      { locale: 'en', name: 'Belt conveyor KL-500', description: null },
    ]
    const result = pickTranslation(enOnly, 'ru', 'en')
    expect(result?.locale).toBe('en')
  })
})
