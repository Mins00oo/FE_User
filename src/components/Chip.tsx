// Chip — selectable pill used for color/size options on the detail screen.
// Variants:
//   - ColorChip: swatch dot + label, selected => ink border + faint fill.
//   - SizeChip: boxed label, selected => filled ink bg + white text.
import type { ReactNode } from 'react'

interface BaseChipProps {
  selected?: boolean
  onClick?: () => void
  children?: ReactNode
}

/** Color option chip with a swatch. */
export function ColorChip({
  hex,
  name,
  selected = false,
  onClick,
}: {
  hex: string
  name: string
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-[7px] pl-[9px] pr-[14px] py-[9px] rounded-full cursor-pointer border-[1.5px]"
      style={{
        borderColor: selected ? 'var(--ink)' : 'var(--line)',
        background: selected ? 'rgba(0,0,0,.04)' : 'var(--card)',
      }}
    >
      <span
        className="w-[18px] h-[18px] rounded-full"
        style={{ background: hex, border: '1px solid rgba(0,0,0,.12)' }}
      />
      <span className="text-[12.5px] font-semibold">{name}</span>
    </div>
  )
}

/** Size option chip (boxed). */
export function SizeChip({ name, selected = false, onClick }: { name: string; selected?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="min-w-[50px] text-center px-[14px] py-3 rounded-[13px] text-[13px] font-bold cursor-pointer border-[1.5px]"
      style={{
        borderColor: selected ? 'var(--ink)' : 'var(--line)',
        background: selected ? 'var(--ink)' : 'var(--card)',
        color: selected ? '#fff' : 'var(--ink)',
      }}
    >
      {name}
    </div>
  )
}

/** Generic pill (e.g. "방송 특가", tags). */
export function Chip({ selected = false, onClick, children }: BaseChipProps) {
  return (
    <span
      onClick={onClick}
      className={
        'inline-flex items-center px-[10px] py-1 rounded-full text-[12px] font-bold ' +
        (onClick ? 'cursor-pointer ' : '') +
        (selected ? 'bg-ink text-white' : 'bg-accentSoft text-accent')
      }
    >
      {children}
    </span>
  )
}
