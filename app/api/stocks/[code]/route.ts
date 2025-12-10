/**
 * 종목 상세 정보 API 라우트
 * GET /api/stocks/[code]
 */
import { NextRequest, NextResponse } from 'next/server'
import { StockDetail } from '@/lib/types'

// 임시 샘플 데이터
const sampleStockDetail: StockDetail = {
  code: '005930',
  name: '삼성전자',
  market: 'KOSPI',
  sector: '전자',
  marketCap: 400000000000000,
  latestPrice: {
    code: '005930',
    date: new Date().toISOString().split('T')[0],
    openPrice: 70000,
    highPrice: 72000,
    lowPrice: 69000,
    closePrice: 71000,
    volume: 10000000,
    changeRate: 1.5,
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params

    // 실제로는 데이터베이스에서 조회
    // 현재는 샘플 데이터 반환
    if (code === '005930') {
      return NextResponse.json(sampleStockDetail)
    }

    return NextResponse.json(
      { error: '종목을 찾을 수 없습니다.' },
      { status: 404 }
    )
  } catch (error) {
    console.error('종목 상세 정보 조회 에러:', error)
    return NextResponse.json(
      { error: '종목 상세 정보 조회 실패' },
      { status: 500 }
    )
  }
}


