import { describe, it, expect } from 'vitest'
import { getNavItems, NAV_ITEMS } from '../navigation'

describe('getNavItems', () => {
  it('returns 5 nav items', () => {
    expect(getNavItems()).toHaveLength(5)
  })

  it('each item has key and href', () => {
    for (const item of getNavItems()) {
      expect(item).toHaveProperty('key')
      expect(item).toHaveProperty('href')
      expect(typeof item.key).toBe('string')
      expect(typeof item.href).toBe('string')
    }
  })

  it('all hrefs start with /', () => {
    for (const item of getNavItems()) {
      expect(item.href.startsWith('/')).toBe(true)
    }
  })

  it('contains expected routes', () => {
    const hrefs = getNavItems().map((item) => item.href)
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/catalog')
    expect(hrefs).toContain('/services')
    expect(hrefs).toContain('/contacts')
  })
})

describe('NAV_ITEMS', () => {
  it('is the same reference returned by getNavItems', () => {
    expect(getNavItems()).toBe(NAV_ITEMS)
  })
})
