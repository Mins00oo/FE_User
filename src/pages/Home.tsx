// Home ('/') — 라이브 커머스 홈.
// 라이브 영상 카드(LIVE 배지·시청자수·재생토글 목업) + 라이브 스케줄 가로 스크롤 +
// "라이브 중인 상품" 2열 그리드(ProductCard) + 담긴 게 있으면 하단 플로팅 장바구니 바.
// 공용 파일은 수정하지 않고 규약대로 import.
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import TopBar from '../components/TopBar'
import ProductCard from '../components/ProductCard'
import { useCart, cartCount, cartTotal } from '../store/cart'
import { products, schedule, seller, liveMeta } from '../data/shop'
import { comma, won } from '../lib/format'
import type { ScheduleItem } from '../types/domain'

/** 라이브 영상 카드(목업). 재생/일시정지 토글 + LIVE 배지 + 라이브 시청자수. */
function LiveCard() {
  const [playing, setPlaying] = useState(true)
  const [viewers, setViewers] = useState(liveMeta.viewers)

  // 시청자수를 미세하게 변동시켜 "실시간" 느낌(원본과 동일: 4초마다 -2~+4).
  useEffect(() => {
    const t = setInterval(() => {
      setViewers((v) => Math.max(0, v + (Math.floor(Math.random() * 7) - 2)))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      onClick={() => setPlaying((p) => !p)}
      className="relative overflow-hidden rounded-[22px] text-white cursor-pointer shadow-[0_14px_32px_-12px_rgba(60,40,25,.4)]"
      style={{ aspectRatio: '16 / 10' }}
    >
      {/* 배경 그라디언트(영상 플레이스홀더) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 74% 16%, rgba(228,87,46,.55), transparent 58%),linear-gradient(160deg,#3C332C,#14110E)',
        }}
      />

      {/* 상단: LIVE 배지 / 시청자수 */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
        <span className="inline-flex items-center gap-1.5 bg-accent px-[11px] py-1.5 rounded-full text-[12px] font-extrabold">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-hsPulse" />
          LIVE
        </span>
        <span
          className="inline-flex items-center gap-[5px] px-[11px] py-1.5 rounded-full text-[12px] font-bold"
          style={{ background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(6px)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {comma(viewers)}
        </span>
      </div>

      {/* 중앙: 재생 토글(목업) — 일시정지=재생버튼, 재생=이퀄라이저 바 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {playing ? (
          <div className="flex gap-[5px] items-end h-8">
            <span className="w-[5px] h-full bg-white rounded-[3px] origin-bottom animate-hsEq" style={{ animationDelay: '0s' }} />
            <span className="w-[5px] h-full bg-white rounded-[3px] origin-bottom animate-hsEq" style={{ animationDelay: '-.2s' }} />
            <span className="w-[5px] h-full bg-white rounded-[3px] origin-bottom animate-hsEq" style={{ animationDelay: '-.4s' }} />
            <span className="w-[5px] h-full bg-white rounded-[3px] origin-bottom animate-hsEq" style={{ animationDelay: '-.6s' }} />
          </div>
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,.94)', color: '#28231D' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* 하단: 라이브 제목 + 판매자 */}
      <div className="absolute left-[15px] right-[15px] bottom-[13px]">
        <div className="text-[16px] font-extrabold tracking-tight">{liveMeta.title}</div>
        <div className="text-[12px] opacity-85 mt-0.5">{seller.name} · 지금 방송 중이에요</div>
      </div>
    </div>
  )
}

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

      <div className="flex-1 min-h-0 overflow-y-auto hs-scroll px-4 pb-[26px]">
        {/* 라이브 영상 카드 */}
        <LiveCard />

        {/* 라이브 스케줄 */}
        <div className="mt-6">
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
