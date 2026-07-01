// Cart store (zustand). This is the single source of truth for cart + last order.
// Page agents MUST use this API and must NOT modify this file.
import { create } from 'zustand'
import type { CartItem, OrderInfo, Product } from '../types/domain'
import { getProduct, shipping } from '../data/shop'
import { salePrice, cartKey } from '../lib/format'

interface CartState {
  items: CartItem[]
  lastOrder: OrderInfo | null

  // --- actions ---
  /** Add a line. Same (id|size|color) => qty is summed. */
  add: (item: CartItem) => void
  /** +1 qty for the given key. */
  inc: (key: string) => void
  /** -1 qty for the given key (floored at 1). */
  dec: (key: string) => void
  /** Remove the line with the given key. */
  remove: (key: string) => void
  /** Empty the cart. */
  clear: () => void
  /** Record the mock order result (shown on /done). */
  setLastOrder: (o: OrderInfo | null) => void
}

/** key(item) — derive the identity key from a CartItem. */
export const keyOf = (item: CartItem): string => cartKey(item.id, item.size, item.color)

export const useCart = create<CartState>((set) => ({
  items: [],
  lastOrder: null,

  add: (item) =>
    set((state) => {
      const k = keyOf(item)
      const existing = state.items.find((c) => keyOf(c) === k)
      if (existing) {
        return {
          items: state.items.map((c) =>
            keyOf(c) === k ? { ...c, qty: c.qty + item.qty } : c,
          ),
        }
      }
      return { items: [...state.items, { ...item }] }
    }),

  inc: (key) =>
    set((state) => ({
      items: state.items.map((c) =>
        keyOf(c) === key ? { ...c, qty: c.qty + 1 } : c,
      ),
    })),

  dec: (key) =>
    set((state) => ({
      items: state.items.map((c) =>
        keyOf(c) === key ? { ...c, qty: Math.max(1, c.qty - 1) } : c,
      ),
    })),

  remove: (key) =>
    set((state) => ({ items: state.items.filter((c) => keyOf(c) !== key) })),

  clear: () => set({ items: [] }),

  setLastOrder: (o) => set({ lastOrder: o }),
}))

// --------------------------------------------------------------------------
// Selectors / helpers (pure functions over an items array).
// Use inside components e.g.:
//   const items = useCart((s) => s.items)
//   const total = cartTotal(items)
// or the convenience hooks below.
// --------------------------------------------------------------------------

/** Product for a cart item (may be undefined if data changed). */
export function itemProduct(item: CartItem): Product | undefined {
  return getProduct(item.id)
}

/** Sum of salePrice * qty across all lines (상품 금액). */
export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, c) => sum + salePrice(getProduct(c.id)) * c.qty, 0)
}

/** Shipping fee: 0 when empty, 0 when subtotal >= freeOver, else flat fee. */
export function cartShippingFee(items: CartItem[]): number {
  const sub = cartSubtotal(items)
  if (sub <= 0) return 0
  return sub >= shipping.freeOver ? 0 : shipping.fee
}

/** subtotal + shipping (총 결제금액). */
export function cartTotal(items: CartItem[]): number {
  return cartSubtotal(items) + cartShippingFee(items)
}

/** Total item quantity (cart badge count). */
export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, c) => sum + c.qty, 0)
}

/** Remaining amount to hit free shipping (0 if already free / empty). */
export function amountToFreeShipping(items: CartItem[]): number {
  const sub = cartSubtotal(items)
  if (sub <= 0 || sub >= shipping.freeOver) return 0
  return shipping.freeOver - sub
}

// --- convenience hooks (subscribe to items, return derived value) ---

/** Reactive cart item count for badges. */
export const useCartCount = (): number => useCart((s) => cartCount(s.items))
/** Reactive subtotal. */
export const useSubtotal = (): number => useCart((s) => cartSubtotal(s.items))
/** Reactive shipping fee. */
export const useShippingFee = (): number => useCart((s) => cartShippingFee(s.items))
/** Reactive total. */
export const useTotal = (): number => useCart((s) => cartTotal(s.items))
