// Screen — the absolutely-positioned, fade-in layer that each page fills.
// Matches the original: position:absolute; inset:0; flex column; hsFade anim.
// Page agents should wrap their page content in <Screen>...</Screen>.
import type { ReactNode } from 'react'

export default function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col animate-hsFade bg-bg">
      {children}
    </div>
  )
}
