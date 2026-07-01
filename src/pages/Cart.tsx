// Cart ('/cart') — faithfully mirrors the isCart block in shopper.dc.html.
// Items (thumb / name / option / qty stepper / line price / remove ✕),
// empty state, 합배송 banner, 금액 요약, [주문하기] -> /checkout.
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import TopBar from '../components/TopBar'
import QtyStepper from '../components/QtyStepper'
import { useToast } from '../components/Toast'
import {
  useCart,
  keyOf,
  itemProduct,
  cartSubtotal,
  cartShippingFee,
  cartTotal,
  amountToFreeShipping,
} from '../store/cart'
import { won, salePrice } from '../lib/format'
import type { CartItem } from '../types/domain'

/** Option label: color first, then size (matches original), '기본' when none. */
function optionLabel(item: CartItem): string {
  const opt = [item.color, item.size].filter(Boolean).join(' / ')
  return opt || '기본'
}

/** Free-shipping banner suffix (matches freeMsg in shopper.dc.html). */
function freeMsg(items: CartItem[]): string {
  if (items.length === 0) return ''
  const remaining = amountToFreeShipping(items)
  return remaining <= 0 ? '무료배송 적용 완료' : `${won(remaining)} 더 담으면 무료배송`
}

// -- one cart line ----------------------------------------------------------
function CartLine({ item }: { item: CartItem }) {
  const inc = useCart((s) => s.inc)
  const dec = useCart((s) => s.dec)
  const remove = useCart((s) => s.remove)
  const key = keyOf(item)
  const product = itemProduct(item)
  if (!product) return null

  const thumb = product.images[0]
  const lineTotal = salePrice(product) * item.qty

  return (
    <div className="flex gap-3 bg-card border border-line rounded-[18px] p-[13px] mb-3">
      <div
        className="flex-none w-[74px] h-[88px] rounded-[14px]"
        style={{ background: `linear-gradient(150deg,${thumb.a},${thumb.b})` }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <div className="text-[14px] font-bold leading-[1.3]">{product.name}</div>
          <div
            onClick={() => remove(key)}
            className="flex-none text-muted text-[15px] cursor-pointer px-0.5 select-none"
            role="button"
            aria-label="삭제"
          >
            ✕
          </div>
        </div>
        <div className="text-[12px] text-muted mt-[3px]">{optionLabel(item)}</div>
        <div className="flex items-center justify-between mt-3">
          <QtyStepper
            size="sm"
            value={item.qty}
            onInc={() => inc(key)}
            onDec={() => dec(key)}
          />
          <div className="text-[15px] font-extrabold">{won(lineTotal)}</div>
        </div>
      </div>
    </div>
  )
}

// -- page -------------------------------------------------------------------
export default function Cart() {
  const navigate = useNavigate()
  const toast = useToast()
  const items = useCart((s) => s.items)

  const empty = items.length === 0
  const subtotal = cartSubtotal(items)
  const fee = cartShippingFee(items)
  const total = cartTotal(items)

  const goCheckout = () => {
    if (items.length === 0) {
      toast('장바구니가 비어 있어요')
      return
    }
    navigate('/checkout')
  }

  return (
    <Screen>
      <TopBar title="장바구니" showBack back="/" />

      {empty ? (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 text-muted">
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M6 8h13l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8z" strokeLinejoin="round" />
            <path d="M9 8a3 3 0 0 1 6 0" />
          </svg>
          <div className="text-[14px]">장바구니가 비어 있어요</div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-ink text-white px-6 py-3 rounded-full font-bold text-[13px] cursor-pointer"
          >
            쇼핑하러 가기
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-y-auto hs-scroll px-4 pt-1 pb-5">
            {items.map((item) => (
              <CartLine key={keyOf(item)} item={item} />
            ))}

            <div className="flex gap-[10px] items-center bg-soft rounded-[16px] px-[15px] py-[13px] mt-1.5 text-[12.5px] leading-[1.5] text-[#7a6f5e]">
              <span className="text-[18px]">🚚</span>
              <span>여러 상품을 함께 담으면 배송비는 한 번만! {freeMsg(items)}</span>
            </div>

            <div className="mt-[18px] bg-card border border-line rounded-[18px] p-4 text-[13.5px]">
              <div className="flex justify-between py-1.5">
                <span className="text-muted">상품 금액</span>
                <span className="font-bold">{won(subtotal)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted">배송비</span>
                <span className="font-bold">{fee > 0 ? won(fee) : '무료'}</span>
              </div>
              <div className="h-px bg-line my-2.5" />
              <div className="flex justify-between items-center">
                <span className="font-extrabold">총 결제금액</span>
                <span className="text-[20px] font-extrabold text-accent">{won(total)}</span>
              </div>
            </div>
          </div>

          <div className="flex-none border-t border-line bg-card px-[14px] py-[11px]">
            <button
              type="button"
              onClick={goCheckout}
              className="w-full h-14 rounded-[16px] bg-accent text-white flex items-center justify-center font-extrabold text-[16px] cursor-pointer"
            >
              주문하기
            </button>
          </div>
        </>
      )}
    </Screen>
  )
}
