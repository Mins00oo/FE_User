// Global toast — a tiny zustand store + <ToastHost/> renderer + useToast() hook.
// Usage in any page:
//   const toast = useToast()
//   toast('사이즈를 선택해 주세요')
// <ToastHost/> is mounted once in App, inside MobileFrame.
import { useEffect } from 'react'
import { create } from 'zustand'

interface ToastState {
  message: string
  seq: number
  show: (msg: string) => void
  hide: () => void
}

const useToastStore = create<ToastState>((set) => ({
  message: '',
  seq: 0,
  show: (msg) => set((s) => ({ message: msg, seq: s.seq + 1 })),
  hide: () => set({ message: '' }),
}))

/** Returns a stable `toast(message)` function. */
export function useToast(): (msg: string) => void {
  return useToastStore((s) => s.show)
}

/** Renders the floating toast pill. Auto-hides ~1.6s after each show. */
export function ToastHost() {
  const message = useToastStore((s) => s.message)
  const seq = useToastStore((s) => s.seq)
  const hide = useToastStore((s) => s.hide)

  // Reset timer whenever a new toast fires (seq changes).
  useAutoHide(seq, message, hide)

  if (!message) return null
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-24 z-50 whitespace-nowrap rounded-full px-5 py-3 text-[13px] font-semibold text-white animate-hsFadeFast"
      style={{
        background: 'rgba(40,35,29,.95)',
        boxShadow: '0 10px 26px -10px rgba(0,0,0,.5)',
      }}
    >
      {message}
    </div>
  )
}

// Local effect helper kept out of the hook export surface.
function useAutoHide(seq: number, message: string, hide: () => void) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(hide, 1600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seq])
}
