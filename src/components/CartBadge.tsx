// CartBadge — the cart icon button with a live count badge (accent pill).
// Navigates to /cart by default; pass onClick to override.
import { useNavigate } from 'react-router-dom'
import { useCartCount } from '../store/cart'

export default function CartBadge({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate()
  const count = useCartCount()
  const handle = onClick ?? (() => navigate('/cart'))

  return (
    <div
      onClick={handle}
      className="relative w-11 h-11 flex items-center justify-center cursor-pointer"
    >
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 8h13l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8z" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
      {count > 0 && (
        <span className="absolute top-0.5 right-0 min-w-[19px] h-[19px] px-[5px] rounded-[10px] bg-accent text-white text-[11px] font-extrabold flex items-center justify-center animate-hsBadge">
          {count}
        </span>
      )}
    </div>
  )
}
