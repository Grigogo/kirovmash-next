import { describe, it, expect } from 'vitest'
import { createLeadSchema } from '../validators/lead'

describe('createLeadSchema', () => {
  it('accepts valid full input', () => {
    const result = createLeadSchema.safeParse({
      name: 'Иван Иванов',
      phone: '+7 (495) 000-00-00',
      email: 'ivan@example.com',
      message: 'Интересует монтаж конвейера',
    })
    expect(result.success).toBe(true)
  })

  it('accepts minimal input (name and phone only)', () => {
    const result = createLeadSchema.safeParse({
      name: 'Иван',
      phone: '8005553535',
    })
    expect(result.success).toBe(true)
  })

  it('rejects input without name', () => {
    const result = createLeadSchema.safeParse({
      phone: '+7 (495) 000-00-00',
    })
    expect(result.success).toBe(false)
  })

  it('rejects input without phone', () => {
    const result = createLeadSchema.safeParse({
      name: 'Иван Иванов',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email format', () => {
    const result = createLeadSchema.safeParse({
      name: 'Иван Иванов',
      phone: '+7 (495) 000-00-00',
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })
})
