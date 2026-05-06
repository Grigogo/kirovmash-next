'use server'

import { db } from '@/lib/db'
import { createLeadSchema } from '@/lib/validators/lead'

export async function createLead(data: unknown): Promise<{ success: boolean; error?: string }> {
  console.debug('[createLead] input:', data)

  const parsed = createLeadSchema.safeParse(data)
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Invalid input'
    console.debug('[createLead] validation failed:', parsed.error.issues)
    return { success: false, error }
  }

  const { name, phone, email, message } = parsed.data

  try {
    const lead = await db.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        message: message || null,
      },
    })
    console.debug('[createLead] lead created:', lead.id)
    return { success: true }
  } catch (err) {
    console.error('[createLead] error:', err)
    return { success: false, error: 'Failed to create lead' }
  }
}
