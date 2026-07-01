// ProductCard — the 2-col home grid card.
// Shows: gradient thumb placeholder, tag (BEST/NEW), discount%, 품절임박/품절
// overlays, name, code, sale price + struck-through original, stock line.
// Navigates to /product/:id on click.
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types/domain'
import { won, salePrice, isLowStock, isSoldOut } from '../lib/format'

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  const sp = salePrice(product)
  const low = isLowStock(product)
  const out = isSoldOut(product)
  const hasDiscount = product.discountRate > 0
  const img = product.images[0]

  const stockStr = out
    ? '품절'
    : low
    ? `품절임박 · ${product.stock}개`
    : `재고 ${product.stock}개`
  const stockColor = out ? '#B4AC9E' : low ? 'var(--accent)' : 'var(--muted)'

  const open = () => navigate(`/product/${product.id}`)

  return (
    <div className="bg-card border border-line rounded-[20px] overflow-hidden shadow-[0_6px_16px_-10px_rgba(50,35,20,.18)]">
      <div
        onClick={open}
        className="relative cursor-pointer"
        style={{
          aspectRatio: '1 / 1.08',
          background: `linear-gradient(150deg,${img.a},${img.b})`,
        }}
      >
        {product.tag && (
          <span className="absolute top-[9px] left-[9px] bg-white text-ink text-[10px] font-extrabold px-2 py-[3px] rounded-full">
            {product.tag}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-[9px] right-[9px] bg-accent text-white text-[12px] font-extrabold px-2 py-[3px] rounded-full">
            {product.discountRate}%
          </span>
        )}
        {low && (
          <span
            className="absolute left-[9px] bottom-[9px] text-white text-[10px] font-bold px-[9px] py-1 rounded-full"
            style={{ background: 'rgba(20,17,14,.66)', backdropFilter: 'blur(4px)' }}
          >
            품절임박
          </span>
        )}
        {out && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(251,250,247,.74)' }}
          >
            <span className="text-[13px] font-extrabold border-[1.5px] border-ink px-4 py-1.5 rounded-full">
              품절
            </span>
          </div>
        )}
      </div>
      <div onClick={open} className="px-3 pt-[11px] pb-[13px] cursor-pointer">
        <div className="text-[14px] font-bold leading-[1.35]">{product.name}</div>
        <div className="text-[11px] text-muted mt-[3px] tracking-wide">{product.code}</div>
        <div className="flex items-baseline gap-1.5 mt-[7px] flex-wrap">
          <span className="text-[16px] font-extrabold">{won(sp)}</span>
          {hasDiscount && (
            <span className="text-[12px] text-muted line-through">{won(product.price)}</span>
          )}
        </div>
        <div className="text-[11px] mt-[5px] font-semibold" style={{ color: stockColor }}>
          {stockStr}
        </div>
      </div>
    </div>
  )
}
