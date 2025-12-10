/**
 * 종목 리스트 API 라우트
 * GET /api/stocks
 */
import { NextRequest, NextResponse } from 'next/server'
import { Stock } from '@/lib/types'

// 임시 샘플 데이터 (실제로는 데이터베이스에서 조회)
const sampleStocks: Stock[] = [
  {
    code: '005930',
    name: '삼성전자',
    market: 'KOSPI',
    sector: '전자',
    marketCap: 400000000000000,
  },
  {
    code: '000660',
    name: 'SK하이닉스',
    market: 'KOSPI',
    sector: '반도체',
    marketCap: 100000000000000,
  },
  {
    code: '035420',
    name: 'NAVER',
    market: 'KOSPI',
    sector: '인터넷',
    marketCap: 50000000000000,
  },
  {
    code: '051910',
    name: 'LG화학',
    market: 'KOSPI',
    sector: '화학',
    marketCap: 30000000000000,
  },
  {
    code: '006400',
    name: '삼성SDI',
    market: 'KOSPI',
    sector: '전기전자',
    marketCap: 20000000000000,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const market = searchParams.get('market')

    let stocks = sampleStocks

    // 시장 구분 필터링
    if (market && (market === 'KOSPI' || market === 'KOSDAQ')) {
      stocks = stocks.filter((stock) => stock.market === market)
    }

    return NextResponse.json(stocks)
  } catch (error) {
    console.error('종목 리스트 조회 에러:', error)
    return NextResponse.json(
      { error: '종목 리스트 조회 실패' },
      { status: 500 }
    )
  }
}


