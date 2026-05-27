'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/hooks/use-auth'
import { useTranslation } from '@/lib/hooks/use-translation'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LanguageToggle } from '@/components/common/LanguageToggle'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Book,
  Search,
  Mic,
  FileText,
  Bot,
  Shuffle,
  Settings,
  Wrench,
  LogOut,
  MoreHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

export function MobileBottomNav() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const { logout } = useAuth()
  const [moreOpen, setMoreOpen] = useState(false)

  // Primary thumb-reachable destinations
  const primary: NavItem[] = [
    { name: t('navigation.notebooks'), href: '/notebooks', icon: Book },
    { name: t('navigation.sources'), href: '/sources', icon: FileText },
    { name: t('navigation.askAndSearch'), href: '/search', icon: Search },
    { name: t('navigation.podcasts'), href: '/podcasts', icon: Mic },
  ]

  // Secondary destinations live behind "More"
  const more: NavItem[] = [
    { name: t('navigation.models'), href: '/settings/api-keys', icon: Bot },
    { name: t('navigation.transformations'), href: '/transformations', icon: Shuffle },
    { name: t('navigation.settings'), href: '/settings', icon: Settings },
    { name: t('navigation.advanced'), href: '/advanced', icon: Wrench },
  ]

  const isActive = (href: string) => pathname?.startsWith(href) ?? false
  const moreActive = more.some((item) => isActive(item.href))

  const tabClass = (active: boolean) =>
    cn(
      'flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[10px] font-medium transition-colors',
      'min-h-[44px]',
      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    )

  return (
    <nav
      className="lg:hidden flex-shrink-0 border-t border-sidebar-border bg-sidebar"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label={t('common.appName')}
    >
      <div className="flex items-stretch">
        {primary.map((item) => {
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} className={tabClass(active)}>
              <item.icon className={cn('h-5 w-5', active && 'stroke-[2.25]')} />
              <span className="truncate max-w-full px-0.5">{item.name}</span>
            </Link>
          )
        })}

        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className={tabClass(moreActive)}
          aria-label={t('navigation.manage')}
        >
          <MoreHorizontal className={cn('h-5 w-5', moreActive && 'stroke-[2.25]')} />
          <span>{t('navigation.manage')}</span>
        </button>
      </div>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <SheetHeader className="px-4 pb-0">
            <SheetTitle>{t('navigation.manage')}</SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-2 px-4">
            {more.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 text-sm font-medium transition-colors',
                    active
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'bg-card hover:bg-accent text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </div>

          <Separator className="my-1" />

          <div className="flex flex-col gap-2 px-4">
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              onClick={() => {
                setMoreOpen(false)
                logout()
              }}
              className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('common.signOut')}</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
