'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/hooks/use-translation'
import { useCreateDialogs } from '@/lib/hooks/use-create-dialogs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Book, FileText, Mic, Plus } from 'lucide-react'

type CreateTarget = 'source' | 'notebook' | 'podcast'

export function MobileTopBar() {
  const { t } = useTranslation()
  const { openSourceDialog, openNotebookDialog, openPodcastDialog } = useCreateDialogs()
  const [createMenuOpen, setCreateMenuOpen] = useState(false)

  const handleCreate = (target: CreateTarget) => {
    setCreateMenuOpen(false)
    if (target === 'source') openSourceDialog()
    else if (target === 'notebook') openNotebookDialog()
    else if (target === 'podcast') openPodcastDialog()
  }

  return (
    <header
      className="lg:hidden flex-shrink-0 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <Link href="/notebooks" className="flex items-center gap-2">
        <Image src="/logo.svg" alt={t('common.appName')} width={28} height={28} />
        <span className="text-base font-semibold text-sidebar-foreground">
          {t('common.appName')}
        </span>
      </Link>

      <DropdownMenu open={createMenuOpen} onOpenChange={setCreateMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="gap-1.5" aria-label={t('common.create')}>
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
    </header>
  )
}
