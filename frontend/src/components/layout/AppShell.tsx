'use client'

import { AppSidebar } from './AppSidebar'
import { SetupBanner } from './SetupBanner'
import { MobileTopBar } from './MobileTopBar'
import { MobileBottomNav } from './MobileBottomNav'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar (hidden on mobile via its own classes) */}
      <AppSidebar />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile-only top bar */}
        <MobileTopBar />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <SetupBanner />
          {children}
        </main>

        {/* Mobile-only bottom tab bar */}
        <MobileBottomNav />
      </div>
    </div>
  )
}
