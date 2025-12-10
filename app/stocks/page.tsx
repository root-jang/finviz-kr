'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getStocks } from '@/lib/api'
import { Stock, Market } from '@/lib/types'

/**
 * 종목 리스트 페이지
 * 코스피, 코스닥 종목을 표시하고 필터링 가능
 */
export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [selectedMarket, setSelectedMarket] = useState<Market | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

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
    if (selectedMarket !== 'ALL') {
      filtered = filtered.filter((stock) => stock.market === selectedMarket)
    }

    // 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (stock) =>
          stock.name.toLowerCase().includes(query) ||
          stock.code.includes(query)
      )
    }

    setFilteredStocks(filtered)
  }, [stocks, selectedMarket, searchQuery])

  // 시가총액 포맷팅
  const formatMarketCap = (marketCap?: number): string => {
    if (!marketCap) return '-'
    if (marketCap >= 1000000000000) {
      return `${(marketCap / 1000000000000).toFixed(1)}조`
    }
    return `${(marketCap / 1000000000).toFixed(0)}억`
  }

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
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">종목 리스트</h1>

        {/* 필터 섹션 */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* 시장 구분 필터 */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMarket('ALL')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedMarket === 'ALL'
                    ? 'bg-primary-DEFAULT text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedMarket('KOSPI')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedMarket === 'KOSPI'
                    ? 'bg-primary-DEFAULT text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                코스피
              </button>
              <button
                onClick={() => setSelectedMarket('KOSDAQ')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedMarket === 'KOSDAQ'
                    ? 'bg-primary-DEFAULT text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                코스닥
              </button>
            </div>

            {/* 검색 입력 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="종목명 또는 종목코드로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              />
            </div>
          </div>
        </div>

        {/* 종목 테이블 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
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
                      검색 결과가 없습니다.
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

        {/* 결과 개수 표시 */}
        <div className="mt-4 text-sm text-gray-600">
          총 {filteredStocks.length}개 종목
        </div>
      </div>
    </div>
  )
}

