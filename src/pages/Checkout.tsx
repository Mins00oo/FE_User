// Checkout ('/checkout') — faithfully mirrors the isCheckout block in shopper.dc.html.
// Delivery info form (name / phone(tel) / addr / addrDetail / memo dropdown + custom),
// order-item summary, payment radios (kakao / toss / bank + account box),
// amount summary, agree checkbox, [N원 결제하기].
// Validation via useToast; on success: mock order no (HS+Date.now slice) ->
// setLastOrder + clear + navigate('/done').
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import { useToast } from '../components/Toast'
import {
  useCart,
  keyOf,
  itemProduct,
  cartSubtotal,
  cartShippingFee,
  cartTotal,
  cartCount,
} from '../store/cart'
import { won, salePrice } from '../lib/format'
import { payments, deliveryMemos } from '../data/shop'
import type { CartItem, OrderForm, Payment } from '../types/domain'

/** Option label: color first, then size (matches original), '기본' when none. */
function optionLabel(item: CartItem): string {
  const opt = [item.color, item.size].filter(Boolean).join(' / ')
  return opt || '기본'
}

// -- shared input styling (matches the 50px rounded inputs in the original) ---
const INPUT_CLASS =
  'w-full h-[50px] border-[1.5px] border-line rounded-[14px] px-[15px] text-[14px] ' +
  'bg-card text-ink outline-none mb-[10px] font-sans placeholder:text-muted ' +
  'focus:border-ink transition-colors'

// -- one order-summary line -------------------------------------------------
function OrderItemRow({ item, last }: { item: CartItem; last: boolean }) {
  const product = itemProduct(item)
  if (!product) return null
  const thumb = product.images[0]
  const lineTotal = salePrice(product) * item.qty

  return (
    <div
      className="flex gap-[11px] items-center py-[11px]"
      style={{ borderBottom: `1px solid ${last ? 'transparent' : 'var(--line)'}` }}
    >
      <div
        className="flex-none w-[46px] h-[54px] rounded-[10px]"
        style={{ background: `linear-gradient(150deg,${thumb.a},${thumb.b})` }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold truncate">{product.name}</div>
        <div className="text-[11px] text-muted mt-[2px]">
          {optionLabel(item)} · {item.qty}개
        </div>
      </div>
      <div className="text-[13px] font-extrabold">{won(lineTotal)}</div>
    </div>
  )
}

// -- one payment method row -------------------------------------------------
function PaymentRow({
  pm,
  selected,
  onSelect,
}: {
  pm: Payment
  selected: boolean
  onSelect: () => void
}) {
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-3 p-[15px] rounded-[16px] mb-[10px] cursor-pointer"
      style={{
        border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
        background: selected ? 'var(--accentSoft)' : 'var(--card)',
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center flex-none"
        style={{ border: `2px solid ${selected ? 'var(--accent)' : '#CFC9BE'}` }}
      >
        {selected && <span className="w-[10px] h-[10px] rounded-full bg-accent" />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold">{pm.name}</div>
        <div className="text-[12px] text-muted mt-[2px]">{pm.desc}</div>
      </div>
      {pm.hint && (
        <span className="text-[11px] font-bold text-accent bg-accentSoft px-[9px] py-1 rounded-full flex-none">
          {pm.hint}
        </span>
      )}
    </div>
  )
}

// -- page -------------------------------------------------------------------
export default function Checkout() {
  const navigate = useNavigate()
  const toast = useToast()

  const items = useCart((s) => s.items)
  const setLastOrder = useCart((s) => s.setLastOrder)
  const clear = useCart((s) => s.clear)

  const [form, setForm] = useState<OrderForm>({
    name: '',
    phone: '',
    addr: '',
    addrDetail: '',
    memo: '',
    memoText: '',
  })
  const [payment, setPayment] = useState<Payment['id']>('kakao')
  const [agree, setAgree] = useState(false)

  const subtotal = cartSubtotal(items)
  const fee = cartShippingFee(items)
  const total = cartTotal(items)

  const setField =
    (field: keyof OrderForm) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const onMemoSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setForm((f) => ({ ...f, memo: val, memoText: val === '__custom' ? f.memoText : '' }))
  }

  const showMemoInput = form.memo === '__custom'

  const placeOrder = () => {
    if (items.length === 0) {
      toast('장바구니가 비어 있어요')
      return
    }
    if (!form.name.trim()) {
      toast('받는 분 성함을 입력해 주세요')
      return
    }
    if (!form.phone.trim()) {
      toast('연락처를 입력해 주세요')
      return
    }
    if (!form.addr.trim()) {
      toast('배송지를 입력해 주세요')
      return
    }
    if (!agree) {
      toast('결제 동의에 체크해 주세요')
      return
    }
    const no = 'HS' + String(Date.now()).slice(-8)
    setLastOrder({ no, totalStr: won(total), count: cartCount(items) })
    clear()
    navigate('/done')
  }

  return (
    <Screen>
      {/* Header — back chevron -> /cart + title */}
      <div className="flex-none flex items-center px-2 pt-0.5 pb-1.5">
        <div
          onClick={() => navigate('/cart')}
          className="w-11 h-11 flex items-center justify-center cursor-pointer flex-none"
          role="button"
          aria-label="뒤로"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </div>
        <div className="text-[18px] font-extrabold tracking-tight">주문 · 결제</div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto hs-scroll px-4 pt-1.5 pb-6">
        {/* 배송 정보 */}
        <div className="text-[15px] font-extrabold mb-3">배송 정보</div>
        <input
          value={form.name}
          onChange={setField('name')}
          placeholder="받는 분 성함"
          className={INPUT_CLASS}
        />
        <input
          value={form.phone}
          onChange={setField('phone')}
          type="tel"
          inputMode="numeric"
          placeholder="연락처 (- 없이 숫자만)"
          className={INPUT_CLASS}
        />
        <input
          value={form.addr}
          onChange={setField('addr')}
          placeholder="배송지 주소"
          className={INPUT_CLASS}
        />
        <input
          value={form.addrDetail}
          onChange={setField('addrDetail')}
          placeholder="상세주소 (동/호수)"
          className={INPUT_CLASS}
        />

        <div className="relative">
          <select
            value={form.memo}
            onChange={onMemoSelect}
            className="w-full h-[50px] border-[1.5px] border-line rounded-[14px] pl-[15px] pr-[42px] text-[14px] bg-card outline-none appearance-none cursor-pointer font-sans"
            style={{ color: form.memo ? 'var(--ink)' : 'var(--muted)' }}
          >
            <option value="">배송 요청사항 (선택)</option>
            {deliveryMemos.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
            <option value="__custom">직접 입력하기</option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted text-[12px]">
            ▼
          </span>
        </div>
        {showMemoInput && (
          <input
            value={form.memoText}
            onChange={setField('memoText')}
            placeholder="배송 요청사항을 입력해 주세요"
            className="w-full h-[50px] border-[1.5px] border-line rounded-[14px] px-[15px] text-[14px] bg-card text-ink outline-none mt-[10px] font-sans placeholder:text-muted focus:border-ink transition-colors"
          />
        )}

        {/* 주문 상품 */}
        <div className="text-[15px] font-extrabold mt-[26px] mb-3">주문 상품</div>
        <div className="bg-card border border-line rounded-[18px] px-[14px] py-1.5">
          {items.map((item, i) => (
            <OrderItemRow key={keyOf(item)} item={item} last={i === items.length - 1} />
          ))}
        </div>

        {/* 결제 수단 */}
        <div className="text-[15px] font-extrabold mt-[26px] mb-3">결제 수단</div>
        {payments.map((pm) => (
          <PaymentRow
            key={pm.id}
            pm={pm}
            selected={payment === pm.id}
            onSelect={() => setPayment(pm.id)}
          />
        ))}
        {payment === 'bank' && (
          <div className="bg-soft rounded-[14px] p-[14px] text-[12.5px] leading-[1.7] text-[#6b6355]">
            입금 계좌 · 국민 123456-01-234567 (해피수주)
            <br />
            주문 후 24시간 내 입금해 주세요.
          </div>
        )}

        {/* 금액 요약 */}
        <div className="mt-6 bg-card border border-line rounded-[18px] p-4 text-[13.5px]">
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

        {/* 결제 동의 */}
        <div
          onClick={() => setAgree((v) => !v)}
          className="flex items-center gap-[10px] mt-[18px] cursor-pointer select-none"
          role="checkbox"
          aria-checked={agree}
        >
          <span
            className="w-[22px] h-[22px] rounded-[8px] text-white flex items-center justify-center flex-none"
            style={{
              border: `1.5px solid ${agree ? 'var(--accent)' : 'var(--line)'}`,
              background: agree ? 'var(--accent)' : 'transparent',
            }}
          >
            {agree && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M4 12l5 5L20 6" />
              </svg>
            )}
          </span>
          <span className="text-[12.5px] text-[#6b6355]">
            주문 내용을 확인했으며 결제에 동의합니다
          </span>
        </div>
      </div>

      {/* 하단 결제 CTA */}
      <div className="flex-none border-t border-line bg-card px-[14px] py-[11px]">
        <button
          type="button"
          onClick={placeOrder}
          className="w-full h-14 rounded-[16px] bg-accent text-white flex items-center justify-center font-extrabold text-[16px] cursor-pointer"
        >
          {won(total)} 결제하기
        </button>
      </div>
    </Screen>
  )
}
