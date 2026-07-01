// QtyStepper — reusable −/qty/+ control. Two size variants:
//   - "lg" (detail screen): 44px cells, rounded-[13px]
//   - "sm" (cart line): 36x34 cells, rounded-[11px]
// Min qty is 1 (dec floored at 1). Controlled via value + callbacks.

interface QtyStepperProps {
  value: number
  onInc: () => void
  onDec: () => void
  size?: 'lg' | 'sm'
}

export default function QtyStepper({ value, onInc, onDec, size = 'lg' }: QtyStepperProps) {
  if (size === 'sm') {
    return (
      <div className="flex items-center bg-bg border-[1.5px] border-line rounded-[11px]">
        <button
          type="button"
          onClick={onDec}
          className="w-9 h-[34px] flex items-center justify-center text-[18px] leading-none"
        >
          −
        </button>
        <div className="w-8 text-center text-[14px] font-extrabold">{value}</div>
        <button
          type="button"
          onClick={onInc}
          className="w-9 h-[34px] flex items-center justify-center text-[18px] leading-none"
        >
          +
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center bg-card border-[1.5px] border-line rounded-[13px] overflow-hidden">
      <button
        type="button"
        onClick={onDec}
        className="w-11 h-11 flex items-center justify-center text-[20px] leading-none"
      >
        −
      </button>
      <div className="w-[46px] text-center text-[15px] font-extrabold">{value}</div>
      <button
        type="button"
        onClick={onInc}
        className="w-11 h-11 flex items-center justify-center text-[20px] leading-none"
      >
        +
      </button>
    </div>
  )
}
