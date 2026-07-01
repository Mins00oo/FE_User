// Segmented — a simple pill-group toggle (radio-like). Not used by the base
// screens but provided as a shared control for filters/tabs if needed.
interface SegmentedProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}

export default function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-soft">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={
              'px-4 py-1.5 rounded-full text-[13px] font-bold transition ' +
              (active ? 'bg-card text-ink shadow-sm' : 'text-muted')
            }
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
