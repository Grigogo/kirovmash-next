import { z } from 'zod'

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Phone must be at least 7 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().optional(),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
