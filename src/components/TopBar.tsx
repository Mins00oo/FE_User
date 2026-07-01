// TopBar — the app header row used by every screen.
// Variants:
//   - Home: big brand title on the left, CartBadge on the right.
//   - Sub pages: back chevron + title on the left, optional CartBadge on the right.
// Compose freely; sensible defaults provided.
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import CartBadge from './CartBadge'

interface TopBarProps {
  /** Screen title. On the home variant this is the big brand wordmark. */
  title?: string
  /** Render a back chevron on the left (defaults to navigate(-1) or `back`). */
  showBack?: boolean
  /** Custom back handler; defaults to navigate(back ?? -1). */
  onBack?: () => void
  /** Fallback route for back when no history is desired (e.g. '/'). */
  back?: string
  /** Show the cart badge on the right. */
  showCart?: boolean
  /** Use the large brand style for the title (home screen). */
  brand?: boolean
  /** Extra content rendered on the right (before/instead of cart). */
  right?: ReactNode
}

export default function TopBar({
  title,
  showBack = false,
  onBack,
  back,
  showCart = false,
  brand = false,
  right,
}: TopBarProps) {
  const navigate = useNavigate()
  const goBack = onBack ?? (() => (back ? navigate(back) : navigate(-1)))

  return (
    <div
      className={
        'flex-none flex items-center ' +
        (showCart || right ? 'justify-between ' : '') +
        (brand ? 'pt-1 px-4 pb-3' : 'pt-0.5 px-2 pb-1.5')
      }
    >
      <div className="flex items-center min-w-0">
        {showBack && (
          <div
            onClick={goBack}
            className="w-11 h-11 flex items-center justify-center cursor-pointer flex-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </div>
        )}
        {title && (
          <div
            className={
              brand
                ? 'text-[21px] font-extrabold tracking-tight'
                : 'text-[18px] font-extrabold tracking-tight'
            }
          >
            {title}
          </div>
        )}
      </div>
      {(showCart || right) && (
        <div className="flex items-center flex-none">
          {right}
          {showCart && <CartBadge />}
        </div>
      )}
    </div>
  )
}
