'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getStockDetail, getPrices } from '@/lib/api'
import { StockDetail, Price } from '@/lib/types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

/**
 * 종목 상세 페이지
 * 종목 정보, 차트, 재무정보 등을 표시
 */
export default function StockDetailPage() {
  const params = useParams()
  const code = params.code as string

  const [stock, setStock] = useState<StockDetail | null>(null)
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [chartPeriod, setChartPeriod] = useState<'1M' | '3M' | '6M' | '1Y'>('1M')

  // 종목 상세 정보 로드
  useEffect(() => {
    async function loadStockDetail() {
      setLoading(true)
      try {
        const data = await getStockDetail(code)
        setStock(data)
      } catch (error) {
        console.error('종목 상세 정보 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      loadStockDetail()
    }
  }, [code])

  // 시세 데이터 로드
  useEffect(() => {
    async function loadPrices() {
      try {
        // 기간에 따른 날짜 계산
        const endDate = new Date()
        const startDate = new Date()
        
        switch (chartPeriod) {
          case '1M':
            startDate.setMonth(startDate.getMonth() - 1)
            break
          case '3M':
            startDate.setMonth(startDate.getMonth() - 3)
            break
          case '6M':
            startDate.setMonth(startDate.getMonth() - 6)
            break
          case '1Y':
            startDate.setFullYear(startDate.getFullYear() - 1)
            break
        }

        const data = await getPrices(
          code,
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        )
        setPrices(data)
      } catch (error) {
        console.error('시세 데이터 로드 실패:', error)
      }
    }

    if (code) {
      loadPrices()
    }
  }, [code, chartPeriod])

  // 차트 데이터 포맷팅
  const chartData = prices.map((price) => ({
    date: price.date,
    price: price.closePrice,
    volume: price.volume,
  }))

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-DEFAULT mx-auto mb-4"></div>
          <p className="text-gray-600">종목 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!stock) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">종목 정보를 찾을 수 없습니다.</p>
          <Link
            href="/stocks"
            className="text-primary-DEFAULT hover:text-primary-dark"
          >
            종목 리스트로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const latestPrice = stock.latestPrice

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/stocks"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          ← 종목 리스트로 돌아가기
        </Link>

        {/* 종목 기본 정보 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{stock.name}</h1>
              <p className="text-gray-600">종목코드: {stock.code}</p>
            </div>
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stock.market === 'KOSPI'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {stock.market}
              </span>
            </div>
          </div>

          {/* 현재가 정보 (샘플) */}
          {latestPrice && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">현재가</p>
                <p className="text-2xl font-bold">
                  {latestPrice.closePrice.toLocaleString()}원
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">등락률</p>
                <p
                  className={`text-2xl font-bold ${
                    (latestPrice.changeRate || 0) > 0
                      ? 'text-danger-DEFAULT'
                      : (latestPrice.changeRate || 0) < 0
                      ? 'text-primary-DEFAULT'
                      : 'text-gray-600'
                  }`}
                >
                  {latestPrice.changeRate
                    ? `${latestPrice.changeRate > 0 ? '+' : ''}${latestPrice.changeRate.toFixed(2)}%`
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">거래량</p>
                <p className="text-xl font-semibold">
                  {latestPrice.volume.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">시가총액</p>
                <p className="text-xl font-semibold">
                  {stock.marketCap
                    ? `${(stock.marketCap / 1000000000000).toFixed(1)}조`
                    : '-'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 차트 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">주가 차트</h2>
            <div className="flex gap-2">
              {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    chartPeriod === period
                      ? 'bg-primary-DEFAULT text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => value.split('-')[1] + '/' + value.split('-')[2]}
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              시세 데이터가 없습니다.
            </div>
          )}
        </div>

        {/* 재무정보 섹션 (추후 구현) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">재무정보</h2>
          <p className="text-gray-600">
            재무정보는 추후 구현 예정입니다.
          </p>
        </div>
      </div>
    </div>
  )
}


