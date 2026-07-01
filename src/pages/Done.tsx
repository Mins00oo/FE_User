// Done ('/done') — order complete screen.
// Mirrors shopper.dc.html isDone block: accent check-circle (hsPop), title,
// subtext, summary card (주문번호/결제금액/상품 수), [쇼핑 계속하기] -> '/'.
// Redirects home when there is no lastOrder (e.g. direct nav / refresh).
import { Navigate, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import { useCart } from '../store/cart'

/** Green-check style tick rendered inside the accent circle. */
function CheckIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

/** One row of the order summary card. */
function SummaryRow({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-[6px] text-[13px]">
      <span className="text-muted">{label}</span>
      <span
        className={
          accent ? 'font-extrabold text-accent' : 'font-bold text-ink'
        }
      >
        {value}
      </span>
    </div>
  )
}

export default function Done() {
  const navigate = useNavigate()
  const lastOrder = useCart((s) => s.lastOrder)

  // No order recorded -> nothing to show; send the guest back home.
  if (!lastOrder) return <Navigate to="/" replace />

  return (
    <Screen>
      <div className="flex-1 flex flex-col items-center justify-center px-7">
        {/* Accent check circle with pop animation */}
        <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-accent text-white animate-hsPop">
          <CheckIcon />
        </div>

        {/* Title + subtext */}
        <div className="mt-[22px] text-[23px] font-extrabold tracking-[-0.01em] text-ink">
          주문이 완료되었어요
        </div>
        <div className="mt-2 text-[13px] text-muted">
          라이브 종료 후 순차적으로 배송됩니다
        </div>

        {/* Order summary card */}
        <div className="mt-[26px] w-full rounded-[18px] border border-line bg-card p-[18px]">
          <SummaryRow label="주문번호" value={lastOrder.no} />
          <SummaryRow label="결제금액" value={lastOrder.totalStr} accent />
          <SummaryRow label="상품 수" value={`${lastOrder.count}개`} />
        </div>

        {/* Continue shopping */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 flex h-[54px] w-full items-center justify-center rounded-[16px] bg-ink text-[15px] font-extrabold text-white active:opacity-90"
        >
          쇼핑 계속하기
        </button>
      </div>
    </Screen>
  )
}
