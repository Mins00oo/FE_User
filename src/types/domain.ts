// Domain types — modeled directly on shop-data.js dummy data.

/** A gradient placeholder image (no real assets). */
export interface ProductImage {
  a: string
  b: string
}

/** A selectable color option with a swatch hex. */
export interface ProductColor {
  name: string
  hex: string
}

/** Product tag shown as a small pill (BEST / NEW or empty string for none). */
export type ProductTag = 'BEST' | 'NEW' | ''

export interface Product {
  id: string
  code: string
  name: string
  price: number
  /** Percentage discount, 0 = no discount. */
  discountRate: number
  stock: number
  /** stock <= this (and > 0) => "품절임박" low-stock state. */
  lowStockThreshold: number
  tag: ProductTag
  category: string
  /** Size labels; empty array => product has no size option (e.g. accessories). */
  sizes: string[]
  colors: ProductColor[]
  desc: string
  details: string[]
  images: ProductImage[]
}

export type LiveStatus = 'live' | 'upcoming'

export interface ScheduleItem {
  date: string
  dow: string
  start: string
  end: string
  title: string
  status: LiveStatus
  label: string
}

export interface Seller {
  name: string
  handle: string
  desc: string
  phone: string
}

export interface LiveMeta {
  title: string
  viewers: number
  likes: number
  host: string
  pinnedId: string
}

export interface Payment {
  id: 'kakao' | 'toss' | 'bank'
  name: string
  desc: string
  hint: string
}

export interface Shipping {
  fee: number
  freeOver: number
}

/** One line in the cart. Identity = id|size|color (see cartKey). */
export interface CartItem {
  id: string
  /** '' when the product has no sizes. */
  size: string
  /** '' when the product has no colors. */
  color: string
  qty: number
}

/** Delivery form captured on the checkout screen. */
export interface OrderForm {
  name: string
  phone: string
  addr: string
  addrDetail: string
  /** Selected memo value, '' = none, '__custom' = use memoText. */
  memo: string
  memoText: string
}

/** Mock order result shown on the Done screen. */
export interface OrderInfo {
  no: string
  totalStr: string
  count: number
}
