// Formatting + price helpers (mirrors won()/sale()/stockPct() from shopper.dc.html).
import type { Product } from '../types/domain'

/** Format a number as Korean currency: 39000 => "39,000원". */
export function won(n: number): string {
  return Number(n || 0).toLocaleString('ko-KR') + '원'
}

/** Format a number with thousands separators (no 원 suffix). */
export function comma(n: number): string {
  return Number(n || 0).toLocaleString('ko-KR')
}

/**
 * Sale (selling) price: apply discountRate (rounded) when > 0, else base price.
 * salePrice(product) — accepts undefined for convenience (returns 0).
 */
export function salePrice(p: Product | undefined | null): number {
  if (!p) return 0
  return p.discountRate > 0 ? Math.round(p.price * (1 - p.discountRate / 100)) : p.price
}

/** True when stock is at/below threshold but not zero ("품절임박"). */
export function isLowStock(p: Product): boolean {
  return p.stock > 0 && p.stock <= p.lowStockThreshold
}

/** True when out of stock. */
export function isSoldOut(p: Product): boolean {
  return p.stock <= 0
}

/**
 * Stock gauge percentage for the detail-screen low-stock bar.
 * Matches the original: min 6, max 100.
 */
export function stockPct(p: Product): number {
  if (p.stock <= 0) return 0
  const denom = Math.max(p.lowStockThreshold * 3, 1)
  return Math.max(6, Math.min(100, Math.round((p.stock / denom) * 100)))
}

/** Cart line identity key: `${id}|${size}|${color}`. */
export function cartKey(id: string, size: string, color: string): string {
  return `${id}|${size}|${color}`
}
