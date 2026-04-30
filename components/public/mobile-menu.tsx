'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SiteNav } from './site-nav'
import { LocaleSwitcher } from './locale-switcher'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')

  console.debug('[MobileMenu] rendered, open:', open)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" />}>
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">{t('mobileMenuOpen')}</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="flex flex-col gap-6 pt-8">
          <SiteNav className="flex-col items-start" onNavigate={() => setOpen(false)} />
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  )
}
