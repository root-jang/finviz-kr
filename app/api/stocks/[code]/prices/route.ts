/**
 * 종목 시세 데이터 API 라우트
 * GET /api/stocks/[code]/prices
 */
import { NextRequest, NextResponse } from 'next/server'
import { Price } from '@/lib/types'

// 임시 샘플 데이터 생성 함수
function generateSamplePrices(code: string, days: number): Price[] {
  const prices: Price[] = []
  const today = new Date()
  let basePrice = 70000

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // 랜덤 가격 변동
    const change = (Math.random() - 0.5) * 2000
    basePrice = Math.max(50000, basePrice + change)

    prices.push({
      code,
      date: date.toISOString().split('T')[0],
      openPrice: basePrice + (Math.random() - 0.5) * 1000,
      highPrice: basePrice + Math.random() * 2000,
      lowPrice: basePrice - Math.random() * 2000,
      closePrice: basePrice,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      changeRate: (change / (basePrice - change)) * 100,
    })
  }

  return prices
}

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // 날짜 범위 계산
    let days = 30 // 기본 30일
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }

    // 샘플 데이터 생성 (실제로는 데이터베이스에서 조회)
    const prices = generateSamplePrices(code, Math.min(days, 365))

    // 날짜 필터링
    let filteredPrices = prices
    if (startDate) {
      filteredPrices = filteredPrices.filter((p) => p.date >= startDate)
    }
    if (endDate) {
      filteredPrices = filteredPrices.filter((p) => p.date <= endDate)
    }

    return NextResponse.json(filteredPrices)
  } catch (error) {
    console.error('시세 데이터 조회 에러:', error)
    return NextResponse.json(
      { error: '시세 데이터 조회 실패' },
      { status: 500 }
    )
  }
}


