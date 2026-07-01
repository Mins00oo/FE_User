// MobileFrame — centers a phone-sized column on a cream backdrop so the app
// looks like a phone on desktop. Children fill the scrollable body area;
// ToastHost is rendered here so toasts float within the frame.
import type { ReactNode } from 'react'
import { ToastHost } from './Toast'

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EFE9DE] p-0 sm:p-6">
      <div
        className="relative flex flex-col w-full max-w-[420px] bg-bg text-ink font-sans overflow-hidden sm:rounded-[38px] sm:shadow-[0_30px_80px_-20px_rgba(60,40,25,.5)]"
        style={{ height: '100dvh', maxHeight: 812 }}
      >
        {/* Screen body: pages render an absolutely-positioned layer inside here */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          {children}
          <ToastHost />
        </div>
      </div>
    </div>
  )
}
