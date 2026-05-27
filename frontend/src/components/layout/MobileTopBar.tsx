'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/use-auth'
import { useTranslation } from '@/lib/hooks/use-translation'
import { useCreateDialogs } from '@/lib/hooks/use-create-dialogs'
import { getNavigation } from './AppSidebar'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LanguageToggle } from '@/components/common/LanguageToggle'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Book, FileText, Mic, Plus, Menu, LogOut } from 'lucide-react'

type CreateTarget = 'source' | 'notebook' | 'podcast'

export function MobileTopBar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const { logout } = useAuth()
  const { openSourceDialog, openNotebookDialog, openPodcastDialog } = useCreateDialogs()
  const [createMenuOpen, setCreateMenuOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const navigation = getNavigation(t)

  const handleCreate = (target: CreateTarget) => {
    setCreateMenuOpen(false)
    if (target === 'source') openSourceDialog()
    else if (target === 'notebook') openNotebookDialog()
    else if (target === 'podcast') openPodcastDialog()
  }

  const isActive = (href: string) => pathname?.startsWith(href) ?? false

  return (
    <header
      className="lg:hidden flex-shrink-0 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-2"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center gap-1 min-w-0">
        {/* Hamburger — toggles the full side nav drawer */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setNavOpen(true)}
          aria-label={t('common.menu') || 'Menu'}
          className="text-sidebar-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/notebooks" className="flex items-center gap-2 min-w-0">
          <Image src="/logo.svg" alt={t('common.appName')} width={26} height={26} />
          <span className="truncate text-base font-semibold text-sidebar-foreground">
            {t('common.appName')}
          </span>
        </Link>
      </div>

      <DropdownMenu open={createMenuOpen} onOpenChange={setCreateMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="gap-1.5 mr-1" aria-label={t('common.create')}>
            <Plus className="h-4 w-4" />
            {t('common.create')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleCreate('source') }} className="gap-2">
            <FileText className="h-4 w-4" />
            {t('common.source')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleCreate('notebook') }} className="gap-2">
            <Book className="h-4 w-4" />
            {t('common.notebook')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleCreate('podcast') }} className="gap-2">
            <Mic className="h-4 w-4" />
            {t('common.podcast')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Side nav drawer */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 max-w-[85vw] p-0 gap-0">
          <SheetHeader className="flex-row items-center gap-2 border-b border-sidebar-border px-4 py-3 space-y-0">
            <Image src="/logo.svg" alt={t('common.appName')} width={28} height={28} />
            <SheetTitle className="text-base">{t('common.appName')}</SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {navigation.map((section, index) => (
              <div key={section.title}>
                {index > 0 && <Separator className="mb-3" />}
                <h3 className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setNavOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                          active
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-sidebar-border p-3 space-y-2">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => { setNavOpen(false); logout() }}
            >
              <LogOut className="h-4 w-4" />
              {t('common.signOut')}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
