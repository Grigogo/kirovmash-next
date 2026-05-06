'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLead } from '@/actions/leads'
import { createLeadSchema, type CreateLeadInput } from '@/lib/validators/lead'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ContactFormLabels = {
  namePlaceholder: string
  nameLabel: string
  nameRequired: string
  phoneLabel: string
  phonePlaceholder: string
  phoneRequired: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitLabel: string
  submittingLabel: string
  successMessage: string
  errorMessage: string
}

type Props = {
  labels: ContactFormLabels
}

export function ContactForm({ labels }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
  })

  const onSubmit = (data: CreateLeadInput) => {
    console.debug('[ContactForm] submit', data)
    setServerError(null)

    startTransition(async () => {
      const result = await createLead(data)
      console.debug('[ContactForm] result:', result)

      if (result.success) {
        setSubmitted(true)
      } else {
        setServerError(result.error ?? labels.errorMessage)
      }
    })
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
        {labels.successMessage}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">{labels.nameLabel}</Label>
        <Input
          id="name"
          placeholder={labels.namePlaceholder}
          disabled={isPending}
          {...register('name')}
          className={cn(errors.name && 'border-destructive')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{labels.nameRequired}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">{labels.phoneLabel}</Label>
        <Input
          id="phone"
          placeholder={labels.phonePlaceholder}
          disabled={isPending}
          {...register('phone')}
          className={cn(errors.phone && 'border-destructive')}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{labels.phoneRequired}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">{labels.emailLabel}</Label>
        <Input
          id="email"
          type="email"
          placeholder={labels.emailPlaceholder}
          disabled={isPending}
          {...register('email')}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{labels.messageLabel}</Label>
        <Textarea
          id="message"
          placeholder={labels.messagePlaceholder}
          rows={4}
          disabled={isPending}
          {...register('message')}
        />
      </div>

      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? labels.submittingLabel : labels.submitLabel}
      </Button>
    </form>
  )
}
