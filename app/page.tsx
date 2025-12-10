'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getStocks } from '@/lib/api'
import { Stock } from '@/lib/types'

/**
 * 메인 홈 페이지 - FinViz 스타일
 * 시장 요약, Top Gainers/Losers 등 표시
 */
export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)

  // 종목 데이터 로드
  useEffect(() => {
    async function loadStocks() {
      setLoading(true)
      try {
        const data = await getStocks()
        setStocks(data)
      } catch (error) {
        console.error('종목 데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStocks()
  }, [])

  // 샘플 시세 데이터 생성 (실제로는 API에서 가져옴)
  const getStockWithPrice = (stock: Stock) => {
    const basePrice = 50000 + Math.random() * 100000
    const changeRate = (Math.random() - 0.5) * 10 // -5% ~ +5%
    const volume = Math.floor(Math.random() * 10000000) + 1000000

    return {
      ...stock,
      price: basePrice,
      change: changeRate,
      changePercent: changeRate,
      volume: volume,
    }
  }

  // Top Gainers (상승률 상위)
  const topGainers = stocks
    .map(getStockWithPrice)
    .filter((s) => s.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 10)

  // Top Losers (하락률 상위)
  const topLosers = stocks
    .map(getStockWithPrice)
    .filter((s) => s.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 10)

  // 시장 통계 (실제로는 API에서 가져옴)
  const [marketStats, setMarketStats] = useState({
    advancing: 0,
    declining: 0,
    newHigh: 0,
    newLow: 0,
    aboveSMA50: 0,
    belowSMA50: 0,
    aboveSMA200: 0,
    belowSMA200: 0,
  })

  // 시장 통계 로드
  useEffect(() => {
    async function loadMarketStats() {
      try {
        const response = await fetch('/api/market/stats')
        const data = await response.json()
        if (data.total) {
          setMarketStats(data.total)
        }
      } catch (error) {
        console.error('시장 통계 로드 실패:', error)
        // 실패 시 샘플 데이터 사용
        setMarketStats({
          advancing: Math.floor(stocks.length * 0.55),
          declining: Math.floor(stocks.length * 0.41),
          newHigh: Math.floor(stocks.length * 0.15),
          newLow: Math.floor(stocks.length * 0.10),
          aboveSMA50: Math.floor(stocks.length * 0.48),
          belowSMA50: Math.floor(stocks.length * 0.52),
          aboveSMA200: Math.floor(stocks.length * 0.53),
          belowSMA200: Math.floor(stocks.length * 0.47),
        })
      }
    }

    if (stocks.length > 0) {
      loadMarketStats()
    }
  }, [stocks.length])

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  const formatPercent = (percent: number): string => {
    const sign = percent > 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  if (loading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-DEFAULT mx-auto mb-4"></div>
          <p className="text-gray-600">시장 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* 시장 요약 섹션 - FinViz 스타일 */}
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">상승</div>
              <div className="text-danger-DEFAULT font-bold text-lg">
                {marketStats.advancing} {stocks.length > 0 && `(${((marketStats.advancing / (marketStats.advancing + marketStats.declining || 1)) * 100).toFixed(1)}%)`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">하락</div>
              <div className="text-primary-DEFAULT font-bold text-lg">
                {marketStats.declining} {stocks.length > 0 && `(${((marketStats.declining / (marketStats.advancing + marketStats.declining || 1)) * 100).toFixed(1)}%)`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">신고가</div>
              <div className="text-danger-DEFAULT font-bold text-lg">
                {marketStats.newHigh}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">신저가</div>
              <div className="text-primary-DEFAULT font-bold text-lg">
                {marketStats.newLow}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">SMA50 위</div>
              <div className="text-gray-900 font-bold text-lg">
                {marketStats.aboveSMA50} {stocks.length > 0 && `(${((marketStats.aboveSMA50 / (marketStats.aboveSMA50 + marketStats.belowSMA50 || 1)) * 100).toFixed(1)}%)`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">SMA50 아래</div>
              <div className="text-gray-900 font-bold text-lg">
                {marketStats.belowSMA50} {stocks.length > 0 && `(${((marketStats.belowSMA50 / (marketStats.aboveSMA50 + marketStats.belowSMA50 || 1)) * 100).toFixed(1)}%)`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">SMA200 위</div>
              <div className="text-gray-900 font-bold text-lg">
                {marketStats.aboveSMA200} {stocks.length > 0 && `(${((marketStats.aboveSMA200 / (marketStats.aboveSMA200 + marketStats.belowSMA200 || 1)) * 100).toFixed(1)}%)`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-1">SMA200 아래</div>
              <div className="text-gray-900 font-bold text-lg">
                {marketStats.belowSMA200} {stocks.length > 0 && `(${((marketStats.belowSMA200 / (marketStats.aboveSMA200 + marketStats.belowSMA200 || 1)) * 100).toFixed(1)}%)`}
              </div>
            </div>
          </div>
        </div>

        {/* Top Gainers & Top Losers - FinViz 스타일 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Top Gainers */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">
                Top Gainers
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">종목</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">현재가</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">등락률</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">거래량</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topGainers.length > 0 ? (
                    topGainers.map((stock) => (
                      <tr key={stock.code} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Link
                            href={`/stocks/${stock.code}`}
                            className="text-primary-DEFAULT hover:underline font-medium"
                          >
                            {stock.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2 text-right font-medium">
                          {formatPrice(stock.price)}
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-danger-DEFAULT">
                          {formatPercent(stock.changePercent)}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-600">
                          {(stock.volume / 1000000).toFixed(2)}M
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-3 py-4 text-center text-gray-500 text-sm">
                        데이터 없음
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Top Losers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">종목</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">현재가</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">등락률</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">거래량</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topLosers.length > 0 ? (
                    topLosers.map((stock) => (
                      <tr key={stock.code} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Link
                            href={`/stocks/${stock.code}`}
                            className="text-primary-DEFAULT hover:underline font-medium"
                          >
                            {stock.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2 text-right font-medium">
                          {formatPrice(stock.price)}
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-DEFAULT">
                          {formatPercent(stock.changePercent)}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-600">
                          {(stock.volume / 1000000).toFixed(2)}M
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-3 py-4 text-center text-gray-500 text-sm">
                        데이터 없음
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">빠른 링크</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/stocks"
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
            >
              종목 리스트
            </Link>
            <Link
              href="/screener"
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
            >
              스크리너
            </Link>
            <Link
              href="/heatmap"
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
            >
              시장 지도
            </Link>
            <Link
              href="/etf"
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
            >
              ETF
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
