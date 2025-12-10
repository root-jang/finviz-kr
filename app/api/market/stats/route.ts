/**
 * 시장 통계 API 라우트
 * GET /api/market/stats
 */
import { NextResponse } from 'next/server'

// 임시 샘플 데이터 (실제로는 KRX API에서 가져옴)
export async function GET() {
  try {
    // TODO: 실제 KRX API 연동
    const stats = {
      kospi: {
        index: 2650.23,
        change: 12.45,
        changePercent: 0.47,
        advancing: 306,
        declining: 228,
      },
      kosdaq: {
        index: 856.78,
        change: -5.32,
        changePercent: -0.62,
        advancing: 245,
        declining: 312,
      },
      total: {
        advancing: 551,
        declining: 540,
        newHigh: 18,
        newLow: 10,
        aboveSMA50: 266,
        belowSMA50: 287,
        aboveSMA200: 291,
        belowSMA200: 261,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('시장 통계 조회 에러:', error)
    return NextResponse.json(
      { error: '시장 통계 조회 실패' },
      { status: 500 }
    )
  }
}

