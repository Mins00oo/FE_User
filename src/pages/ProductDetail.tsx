// ProductDetail ('/product/:id') — mirrors the detail screen in shopper.dc.html.
// Image carousel (dot indicators), category·code·name·price (discount/sale/struck
// original), low-stock gauge bar OR stock text, description, color/size chips,
// quantity stepper (min 1), product-info bullets, fixed bottom [장바구니]/[바로 구매].
// Validation toasts: soldOut -> size missing -> color missing (per original order).
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Screen from '../components/Screen'
import TopBar from '../components/TopBar'
import QtyStepper from '../components/QtyStepper'
import { ColorChip, SizeChip } from '../components/Chip'
import { useToast } from '../components/Toast'
import { useCart } from '../store/cart'
import { getProduct } from '../data/shop'
import { salePrice, isLowStock, isSoldOut, stockPct, won } from '../lib/format'
import type { CartItem } from '../types/domain'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const navigate = useNavigate()
  const toast = useToast()
  const add = useCart((s) => s.add)

  // Carousel index + option/qty selection state.
  const [imgIdx, setImgIdx] = useState(0)
  const [qty, setQty] = useState(1)
  // Default selected color = first color name (matches original openDetail()).
  const [selColor, setSelColor] = useState<string | null>(
    product && product.colors.length ? product.colors[0].name : null,
  )
  const [selSize, setSelSize] = useState<string | null>(null)

  // Unknown product guard (bad :id in the URL).
  if (!product) {
    return (
      <Screen>
        <TopBar showBack back="/" showCart />
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 text-muted">
          <div className="text-sm">상품을 찾을 수 없어요</div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-ink text-white px-6 py-3 rounded-full text-[13px] font-bold"
          >
            홈으로 가기
          </button>
        </div>
      </Screen>
    )
  }

  const sale = salePrice(product)
  const low = isLowStock(product)
  const out = isSoldOut(product)
  const hasDiscount = product.discountRate > 0
  const hasColors = product.colors.length > 0
  const hasSizes = product.sizes.length > 0

  // Stock line copy differs on the detail screen ("품절임박! N개 남음").
  const stockStr = out
    ? '품절'
    : low
      ? `품절임박! ${product.stock}개 남음`
      : `재고 ${product.stock}개`
  const stockColor = out ? '#B4AC9E' : low ? 'var(--accent)' : 'var(--muted)'

  // Active carousel image (guard against index drift).
  const activeImg = useMemo(
    () => product.images[imgIdx % product.images.length],
    [product.images, imgIdx],
  )

  const doAdd = (goCheckout: boolean) => {
    // Validation order matches the original: soldOut -> size -> color.
    if (out) {
      toast('품절된 상품이에요')
      return
    }
    if (hasSizes && !selSize) {
      toast('사이즈를 선택해 주세요')
      return
    }
    if (hasColors && !selColor) {
      toast('색상을 선택해 주세요')
      return
    }
    const line: CartItem = {
      id: product.id,
      size: selSize ?? '',
      color: selColor ?? '',
      qty,
    }
    add(line)
    if (goCheckout) {
      navigate('/checkout')
    } else {
      toast('장바구니에 담았어요')
    }
  }

  return (
    <Screen>
      <TopBar showBack back="/" showCart />

      <div className="flex-1 min-h-0 overflow-y-auto hs-scroll">
        {/* Image carousel */}
        <div
          className="relative mx-4 rounded-[22px] overflow-hidden"
          style={{
            aspectRatio: '1 / 1.1',
            background: `linear-gradient(150deg, ${activeImg.a}, ${activeImg.b})`,
          }}
        >
          {hasDiscount && (
            <span className="absolute top-[14px] left-[14px] bg-accent text-white text-[13px] font-extrabold px-[11px] py-[5px] rounded-full">
              {product.discountRate}% 할인
            </span>
          )}
          <div className="absolute bottom-[13px] left-0 right-0 flex gap-[6px] justify-center">
            {product.images.map((_, i) => {
              const dotActive = i === imgIdx
              return (
                <div
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className="h-[6px] rounded-[3px] cursor-pointer transition-all duration-200"
                  style={{
                    width: dotActive ? '20px' : '6px',
                    background: dotActive ? '#fff' : 'rgba(255,255,255,.55)',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Category · code · name · price */}
        <div className="px-4 pt-[18px] pb-[6px]">
          <div className="text-[12px] text-muted">
            {product.category} · {product.code}
          </div>
          <div className="text-[22px] font-extrabold mt-[6px] leading-[1.3] tracking-[-0.02em]">
            {product.name}
          </div>
          <div className="flex items-baseline gap-2 mt-3 flex-wrap">
            {hasDiscount && (
              <span className="text-[20px] font-extrabold text-accent">
                {product.discountRate}%
              </span>
            )}
            <span className="text-[23px] font-extrabold">{won(sale)}</span>
            {hasDiscount && (
              <span className="text-[14px] text-muted line-through">
                {won(product.price)}
              </span>
            )}
          </div>

          {/* Low-stock gauge OR plain stock text */}
          {low ? (
            <div className="mt-[14px] bg-card border border-line rounded-[14px] px-[14px] py-3">
              <div className="flex items-center justify-between">
                <span
                  className="text-[12px] font-bold"
                  style={{ color: stockColor }}
                >
                  {stockStr}
                </span>
                <span className="text-[11px] text-muted">서두르세요</span>
              </div>
              <div className="mt-2 h-[6px] rounded-[4px] bg-soft overflow-hidden">
                <div
                  className="h-full rounded-[4px]"
                  style={{
                    width: `${stockPct(product)}%`,
                    background: stockColor,
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              className="text-[12px] mt-3 font-semibold"
              style={{ color: stockColor }}
            >
              {stockStr}
            </div>
          )}

          {/* Description */}
          <div className="text-[13px] mt-[14px] leading-[1.65] text-body">
            {product.desc}
          </div>
        </div>

        <div className="h-px bg-line m-4" />

        {/* Colors */}
        {hasColors && (
          <div className="px-4">
            <div className="text-[13px] font-extrabold mb-[11px]">색상</div>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <ColorChip
                  key={c.name}
                  hex={c.hex}
                  name={c.name}
                  selected={selColor === c.name}
                  onClick={() => setSelColor(c.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {hasSizes && (
          <div className="px-4 pt-4">
            <div className="text-[13px] font-extrabold mb-[11px]">사이즈</div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((sz) => (
                <SizeChip
                  key={sz}
                  name={sz}
                  selected={selSize === sz}
                  onClick={() => setSelSize(sz)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="px-4 pt-[18px] flex items-center justify-between">
          <span className="text-[13px] font-extrabold">수량</span>
          <QtyStepper
            value={qty}
            size="lg"
            onInc={() => setQty((q) => q + 1)}
            onDec={() => setQty((q) => Math.max(1, q - 1))}
          />
        </div>

        {/* Product info bullets */}
        <div className="px-4 pt-6">
          <div className="text-[13px] font-extrabold mb-[9px]">상품 정보</div>
          {product.details.map((d, i) => (
            <div
              key={i}
              className="flex gap-2 text-[13px] text-body leading-[1.8]"
            >
              <span className="text-accent">·</span>
              <span>{d}</span>
            </div>
          ))}
        </div>

        <div className="h-9" />
      </div>

      {/* Fixed bottom actions */}
      <div className="flex-none border-t border-line bg-card px-[14px] py-[11px] flex gap-[10px]">
        <button
          type="button"
          onClick={() => doAdd(false)}
          className="flex-none px-[22px] h-[54px] rounded-[16px] border-[1.5px] border-ink flex items-center justify-center font-bold text-[15px]"
        >
          장바구니
        </button>
        <button
          type="button"
          onClick={() => doAdd(true)}
          className="flex-1 h-[54px] rounded-[16px] bg-accent text-white flex items-center justify-center font-extrabold text-[15px]"
        >
          바로 구매
        </button>
      </div>
    </Screen>
  )
}
