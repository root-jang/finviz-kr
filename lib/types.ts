/**
 * 타입 정의
 * 주식 관련 데이터 타입 정의
 */

// 시장 구분
export type Market = 'KOSPI' | 'KOSDAQ'

// 종목 정보
export interface Stock {
  code: string // 종목 코드
  name: string // 종목명
  market: Market // 시장 구분
  sector?: string // 섹터
  marketCap?: number // 시가총액
  createdAt?: string
  updatedAt?: string
}

// 시세 데이터
export interface Price {
  id?: number
  code: string // 종목 코드
  date: string // 날짜 (YYYY-MM-DD)
  openPrice: number // 시가
  highPrice: number // 고가
  lowPrice: number // 저가
  closePrice: number // 종가
  volume: number // 거래량
  changeRate?: number // 등락률
  createdAt?: string
}

// 재무정보
export interface Financial {
  id?: number
  code: string // 종목 코드
  year: number // 연도
  quarter?: number // 분기
  revenue?: number // 매출액
  operatingProfit?: number // 영업이익
  netProfit?: number // 순이익
  totalAssets?: number // 총자산
  totalEquity?: number // 자본총계
  per?: number // PER
  pbr?: number // PBR
  roe?: number // ROE
  createdAt?: string
}

// 종목 상세 정보 (종목 + 최신 시세)
export interface StockDetail extends Stock {
  latestPrice?: Price
  financials?: Financial[]
}


