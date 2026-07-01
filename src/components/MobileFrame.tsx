// MobileFrame — centers a phone-sized column on a cream backdrop so the app
// looks like a phone on desktop. Includes the iOS-style status bar (9:41).
// Children fill the scrollable body area; ToastHost is rendered here so toasts
// float within the frame.
import type { ReactNode } from 'react'
import { ToastHost } from './Toast'

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EFE9DE] p-0 sm:p-6">
      <div
        className="relative flex flex-col w-full max-w-[420px] bg-bg text-ink font-sans overflow-hidden sm:rounded-[38px] sm:shadow-[0_30px_80px_-20px_rgba(60,40,25,.5)]"
        style={{ height: '100dvh', maxHeight: 812 }}
      >
        <StatusBar />
        {/* Screen body: pages render an absolutely-positioned layer inside here */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          {children}
          <ToastHost />
        </div>
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="flex-none h-[46px] flex items-center justify-between pl-6 pr-5">
      <span className="text-[15px] font-bold tracking-wide">9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 24 18" fill="currentColor">
          <path d="M12 3C7 3 3 6 1 9l2 2c2-2.5 5-4 9-4s7 1.5 9 4l2-2c-2-3-6-6-11-6z" />
          <circle cx="12" cy="16" r="2" />
        </svg>
        <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
          <rect x="1" y="1" width="20" height="11" rx="3" stroke="currentColor" strokeWidth="1" />
          <rect x="3" y="3" width="14" height="7" rx="1.5" fill="currentColor" />
          <rect x="22.4" y="4.5" width="1.6" height="4" rx=".8" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
