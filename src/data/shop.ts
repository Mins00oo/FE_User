// Dummy data ported verbatim from docs/.../shop-data.js into typed TS.
import type {
  Product,
  ScheduleItem,
  Seller,
  LiveMeta,
  Payment,
  Shipping,
} from '../types/domain'

export const products: Product[] = [
  {
    id: 'p1',
    code: 'HS-1001',
    name: '오버핏 코튼 셔츠',
    price: 39000,
    discountRate: 20,
    stock: 6,
    lowStockThreshold: 10,
    tag: 'BEST',
    category: '상의',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: '아이보리', hex: '#ECE7DC' },
      { name: '블랙', hex: '#26262B' },
      { name: '세이지', hex: '#A7B39B' },
    ],
    desc: '하루종일 편한 코튼 100% 오버핏 셔츠',
    details: ['코튼 100%, 여름용 경량 원단', '루즈핏 · 남녀공용', '모델 착용 M · 키 168'],
    images: [
      { a: '#EDE8DF', b: '#CFC6B8' },
      { a: '#E4DED2', b: '#C2B7A4' },
      { a: '#F1ECE3', b: '#D6CDBD' },
    ],
  },
  {
    id: 'p2',
    code: 'HS-1002',
    name: '워싱 데님 와이드팬츠',
    price: 52000,
    discountRate: 15,
    stock: 24,
    lowStockThreshold: 8,
    tag: '',
    category: '하의',
    sizes: ['25', '26', '27', '28', '29', '30'],
    colors: [
      { name: '라이트블루', hex: '#AEBCD6' },
      { name: '딥블루', hex: '#3E4B66' },
    ],
    desc: '빈티지 워싱 감성 하이웨스트 와이드',
    details: ['코튼 98% 폴리 2%', '하이웨스트 · 와이드핏', '밑단 컷 가능'],
    images: [
      { a: '#AEBCD6', b: '#6E82A8' },
      { a: '#9AAAC8', b: '#5A6E94' },
      { a: '#B7C3D9', b: '#7688AC' },
    ],
  },
  {
    id: 'p3',
    code: 'HS-1003',
    name: '크롭 니트 가디건',
    price: 34000,
    discountRate: 0,
    stock: 3,
    lowStockThreshold: 10,
    tag: 'NEW',
    category: '상의',
    sizes: ['FREE'],
    colors: [
      { name: '버터', hex: '#F0DFA8' },
      { name: '모카', hex: '#B79B77' },
      { name: '차콜', hex: '#4A4A50' },
    ],
    desc: '데일리로 입기 좋은 봄가을 크롭 가디건',
    details: ['아크릴 70% 울 30%', '크롭 기장 · 슬림핏', '정전기 방지 처리'],
    images: [
      { a: '#F0DFA8', b: '#D8BE7A' },
      { a: '#EAD79A', b: '#CBB06A' },
      { a: '#F3E4B2', b: '#DDC585' },
    ],
  },
  {
    id: 'p4',
    code: 'HS-1004',
    name: '플리츠 미니 스커트',
    price: 29000,
    discountRate: 30,
    stock: 40,
    lowStockThreshold: 8,
    tag: '',
    category: '하의',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: '블랙', hex: '#2A2A30' },
      { name: '베이지', hex: '#D8C7AC' },
    ],
    desc: '찰랑이는 플리츠 미니 스커트',
    details: ['폴리 100%', '속바지 일체형', '허리 밴딩'],
    images: [
      { a: '#3A3A40', b: '#1C1C20' },
      { a: '#46464D', b: '#232329' },
      { a: '#333339', b: '#18181C' },
    ],
  },
  {
    id: 'p5',
    code: 'HS-1005',
    name: '링클프리 셔츠 원피스',
    price: 47000,
    discountRate: 10,
    stock: 0,
    lowStockThreshold: 8,
    tag: '',
    category: '원피스',
    sizes: ['FREE'],
    colors: [
      { name: '화이트', hex: '#EDEFF3' },
      { name: '네이비', hex: '#2E3852' },
    ],
    desc: '구김 없는 데일리 셔츠 원피스',
    details: ['폴리 95% 스판 5%', '링클프리 · 미들 기장', '히든 버튼'],
    images: [
      { a: '#E7E9EE', b: '#B9C0CE' },
      { a: '#DDE0E7', b: '#AEB6C6' },
      { a: '#EAECF1', b: '#C3C9D6' },
    ],
  },
  {
    id: 'p6',
    code: 'HS-1006',
    name: '볼드 골드 체인 목걸이',
    price: 22000,
    discountRate: 0,
    stock: 15,
    lowStockThreshold: 6,
    tag: '',
    category: '액세서리',
    sizes: [],
    colors: [
      { name: '골드', hex: '#E4C878' },
      { name: '실버', hex: '#CFD2D8' },
    ],
    desc: '포인트 주기 좋은 볼드 체인 목걸이',
    details: ['써지컬 스틸 · 변색 방지', '길이 42cm + 연장 5cm', '알러지 프리'],
    images: [
      { a: '#E9CF86', b: '#C7A24E' },
      { a: '#EAD293', b: '#CBA85A' },
      { a: '#E5C778', b: '#C29B45' },
    ],
  },
  {
    id: 'p7',
    code: 'HS-1007',
    name: '스트럭처 숄더백',
    price: 68000,
    discountRate: 25,
    stock: 8,
    lowStockThreshold: 10,
    tag: 'BEST',
    category: '가방',
    sizes: [],
    colors: [
      { name: '크림', hex: '#DCC9AC' },
      { name: '브라운', hex: '#8A6C4C' },
      { name: '블랙', hex: '#2B2B30' },
    ],
    desc: '각 잡힌 실루엣의 데일리 숄더백',
    details: ['PU 레더 · 골드 하드웨어', '26 x 18 x 9 cm', '내부 포켓 2개'],
    images: [
      { a: '#CDB79A', b: '#9A7E5F' },
      { a: '#C6AF90', b: '#907457' },
      { a: '#D3BFA4', b: '#A48768' },
    ],
  },
  {
    id: 'p8',
    code: 'HS-1008',
    name: '청키 데일리 스니커즈',
    price: 59000,
    discountRate: 20,
    stock: 30,
    lowStockThreshold: 8,
    tag: 'NEW',
    category: '신발',
    sizes: ['230', '240', '250', '260'],
    colors: [
      { name: '화이트', hex: '#E9E9EC' },
      { name: '블랙', hex: '#28282D' },
    ],
    desc: '키높이 3cm 청키 스니커즈',
    details: ['합성피혁 · 논슬립 아웃솔', '3cm 키높이', '정사이즈'],
    images: [
      { a: '#E9E9EC', b: '#C4C4CC' },
      { a: '#E2E2E6', b: '#BCBCC4' },
      { a: '#EDEDEF', b: '#CBCBD2' },
    ],
  },
]

export const schedule: ScheduleItem[] = [
  { date: '7월 1일', dow: '화', start: '21:00', end: '23:00', title: '여름 신상 대방출', status: 'live', label: '지금 방송 중' },
  { date: '7월 2일', dow: '목', start: '21:00', end: '23:00', title: '데일리 코디 특집', status: 'upcoming', label: '내일' },
  { date: '7월 5일', dow: '일', start: '20:00', end: '22:00', title: '가디건 & 니트 위크', status: 'upcoming', label: '' },
  { date: '7월 7일', dow: '화', start: '21:00', end: '23:00', title: '가방 & 슈즈 클리어런스', status: 'upcoming', label: '' },
]

export const seller: Seller = {
  name: '해피수주',
  handle: 'happysuju',
  desc: '매주 화·목·일 저녁 라이브 🛍️',
  phone: '010-1234-5678',
}

export const liveMeta: LiveMeta = {
  title: '여름 신상 대방출 LIVE',
  viewers: 1284,
  likes: 8600,
  host: '해피수주',
  pinnedId: 'p1',
}

export const payments: Payment[] = [
  { id: 'kakao', name: '카카오페이', desc: '카카오톡으로 간편결제', hint: '3초 결제' },
  { id: 'toss', name: '토스페이', desc: '토스 앱으로 간편결제', hint: '간편' },
  { id: 'bank', name: '무통장입금', desc: '계좌이체 · 입금 확인 후 배송', hint: '' },
]

export const shipping: Shipping = { fee: 3000, freeOver: 70000 }

/** Preset delivery request memos, managed by admin. */
export const deliveryMemos: string[] = [
  '부재 시 문 앞에 놓아 주세요',
  '배송 전 미리 연락 주세요',
  '경비실에 맡겨 주세요',
  '파손 위험 상품이니 주의해 주세요',
]

export const buyers: string[] = ['김지*', '이서*', '박하*', '최윤*', '정민*', '한소*', '오예*', '유나*']

/** Look up a product by id. */
export function getProduct(id: string | undefined | null): Product | undefined {
  if (!id) return undefined
  return products.find((p) => p.id === id)
}
