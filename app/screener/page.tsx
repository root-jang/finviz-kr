'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getStocks } from '@/lib/api'
import { Stock } from '@/lib/types'

/**
 * 스크리너 페이지
 * 다양한 조건으로 종목을 필터링하여 검색
 */
export default function ScreenerPage() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)

  // 필터 조건
  const [filters, setFilters] = useState({
    market: 'ALL' as 'ALL' | 'KOSPI' | 'KOSDAQ',
    sector: '',
    minMarketCap: '',
    maxMarketCap: '',
  })

  // 종목 데이터 로드
  useEffect(() => {
    async function loadStocks() {
      setLoading(true)
      try {
        const data = await getStocks()
        setStocks(data)
        setFilteredStocks(data)
      } catch (error) {
        console.error('종목 데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStocks()
  }, [])

  // 필터링 로직
  useEffect(() => {
    let filtered = stocks

    // 시장 구분 필터
    if (filters.market !== 'ALL') {
      filtered = filtered.filter((stock) => stock.market === filters.market)
    }

    // 섹터 필터
    if (filters.sector) {
      filtered = filtered.filter(
        (stock) => stock.sector?.toLowerCase().includes(filters.sector.toLowerCase())
      )
    }

    // 시가총액 필터
    if (filters.minMarketCap) {
      const minCap = parseFloat(filters.minMarketCap) * 1000000000000 // 조 단위
      filtered = filtered.filter(
        (stock) => stock.marketCap && stock.marketCap >= minCap
      )
    }

    if (filters.maxMarketCap) {
      const maxCap = parseFloat(filters.maxMarketCap) * 1000000000000 // 조 단위
      filtered = filtered.filter(
        (stock) => stock.marketCap && stock.marketCap <= maxCap
      )
    }

    setFilteredStocks(filtered)
  }, [stocks, filters])

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      market: 'ALL',
      sector: '',
      minMarketCap: '',
      maxMarketCap: '',
    })
  }

  // 시가총액 포맷팅
  const formatMarketCap = (marketCap?: number): string => {
    if (!marketCap) return '-'
    if (marketCap >= 1000000000000) {
      return `${(marketCap / 1000000000000).toFixed(1)}조`
    }
    return `${(marketCap / 1000000000).toFixed(0)}억`
  }

  // 고유 섹터 목록 추출
  const sectors = Array.from(
    new Set(stocks.map((stock) => stock.sector).filter(Boolean))
  ).sort()

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-DEFAULT mx-auto mb-4"></div>
          <p className="text-gray-600">종목 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">스크리너</h1>
        <p className="text-gray-600 mb-6">
          다양한 조건으로 종목을 필터링하여 검색할 수 있습니다.
        </p>

        {/* 필터 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">필터 조건</h2>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              초기화
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 시장 구분 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시장 구분
              </label>
              <select
                value={filters.market}
                onChange={(e) =>
                  setFilters({ ...filters, market: e.target.value as any })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              >
                <option value="ALL">전체</option>
                <option value="KOSPI">코스피</option>
                <option value="KOSDAQ">코스닥</option>
              </select>
            </div>

            {/* 섹터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                섹터
              </label>
              <select
                value={filters.sector}
                onChange={(e) =>
                  setFilters({ ...filters, sector: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              >
                <option value="">전체</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            {/* 최소 시가총액 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최소 시가총액 (조)
              </label>
              <input
                type="number"
                value={filters.minMarketCap}
                onChange={(e) =>
                  setFilters({ ...filters, minMarketCap: e.target.value })
                }
                placeholder="예: 10"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              />
            </div>

            {/* 최대 시가총액 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최대 시가총액 (조)
              </label>
              <input
                type="number"
                value={filters.maxMarketCap}
                onChange={(e) =>
                  setFilters({ ...filters, maxMarketCap: e.target.value })
                }
                placeholder="예: 100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              />
            </div>
          </div>
        </div>

        {/* 결과 섹션 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                검색 결과 ({filteredStocks.length}개)
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    종목코드
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    종목명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시장
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    섹터
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시가총액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상세
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      조건에 맞는 종목이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((stock) => (
                    <tr
                      key={stock.code}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stock.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stock.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            stock.market === 'KOSPI'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {stock.market}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stock.sector || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatMarketCap(stock.marketCap)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href={`/stocks/${stock.code}`}
                          className="text-primary-DEFAULT hover:text-primary-dark font-medium"
                        >
                          보기 →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


