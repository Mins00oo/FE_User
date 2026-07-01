// Home ('/') — 라이브 커머스 홈.
// 라이브 스케줄 가로 스크롤 + "라이브 중인 상품" 2열 그리드(ProductCard) +
// 담긴 게 있으면 하단 플로팅 장바구니 바.
// (라이브 영상 임베드는 틱톡 라이브가 페이지 내 재생 불가라 제외 — 추후 유튜브 임베드/틱톡 링크아웃으로 재도입 가능)
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import TopBar from '../components/TopBar'
import ProductCard from '../components/ProductCard'
import { useCart, cartCount, cartTotal } from '../store/cart'
import { products, schedule } from '../data/shop'
import { won } from '../lib/format'
import type { ScheduleItem } from '../types/domain'

/** 라이브 스케줄 카드 한 장. */
function ScheduleCard({ item }: { item: ScheduleItem }) {
  const live = item.status === 'live'
  return (
    <div
      className="flex-none w-[178px] rounded-[18px] p-[15px]"
      style={{
        border: `1px solid ${live ? 'var(--accent)' : 'var(--line)'}`,
        background: live ? 'var(--accentSoft)' : 'var(--card)',
      }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[13px] font-extrabold">
          {item.date} ({item.dow})
        </span>
        {live && (
          <span className="text-[10px] font-extrabold text-white bg-accent px-2 py-[3px] rounded-full">
            LIVE
          </span>
        )}
      </div>
      <div className="text-[12px] text-muted mt-1">
        {item.start}–{item.end}
      </div>
      <div className="text-[13px] font-semibold mt-2.5 leading-[1.35]">{item.title}</div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const items = useCart((s) => s.items)
  const count = cartCount(items)
  const total = cartTotal(items)
  const goCart = () => navigate('/cart')

  return (
    <Screen>
      <TopBar title="해피수주" brand showCart />

      <div className="flex-1 min-h-0 overflow-y-auto hs-scroll px-4 pt-2 pb-[26px]">
        {/* 라이브 스케줄 */}
        <div className="mt-1">
          <div className="text-[17px] font-extrabold tracking-tight mb-3">라이브 스케줄</div>
          <div className="flex gap-2.5 overflow-x-auto hs-scroll -mx-4 px-4 pb-1">
            {schedule.map((sc, i) => (
              <ScheduleCard key={`s${i}`} item={sc} />
            ))}
          </div>
        </div>

        {/* 라이브 중인 상품 */}
        <div className="flex items-center justify-between mt-[26px] mb-3.5">
          <span className="text-[17px] font-extrabold tracking-tight">라이브 중인 상품</span>
          <span className="text-[12px] text-accent font-bold bg-accentSoft px-2.5 py-1 rounded-full">
            방송 특가
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* 하단 플로팅 장바구니 바 — 담긴 게 있을 때만 */}
      {count > 0 && (
        <div
          onClick={goCart}
          className="flex-none mx-4 mb-3.5 bg-ink text-white rounded-[18px] px-[18px] py-[15px] flex items-center justify-between cursor-pointer animate-hsFade shadow-[0_12px_26px_-12px_rgba(40,35,29,.6)]"
        >
          <span className="flex items-center gap-2.5 font-bold text-[14px]">
            <span className="bg-accent text-white min-w-[22px] h-[22px] px-1.5 rounded-[11px] text-[12px] font-extrabold inline-flex items-center justify-center">
              {count}
            </span>
            장바구니 보기
          </span>
          <span className="text-[15px] font-extrabold">{won(total)} ›</span>
        </div>
      )}
    </Screen>
  )
}
