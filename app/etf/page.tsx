'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/**
 * ETF 정보 타입
 */
interface ETF {
  code: string
  name: string
  category: string
  nav: number // 기준가
  changeRate: number // 등락률
  volume: number // 거래량
  aum: number // 순자산총액
}

/**
 * ETF 페이지
 * 주요 ETF 정보 및 수익률 확인
 */
export default function ETFPage() {
  const [etfs, setEtfs] = useState<ETF[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  // ETF 데이터 로드 (임시 샘플 데이터)
  useEffect(() => {
    // 실제로는 API에서 가져옴
    const sampleETFs: ETF[] = [
      {
        code: '069500',
        name: 'KODEX 코스피',
        category: '지수',
        nav: 35000,
        changeRate: 0.5,
        volume: 1000000,
        aum: 5000000000000,
      },
      {
        code: '229200',
        name: 'KODEX 코스닥150',
        category: '지수',
        nav: 12000,
        changeRate: -0.3,
        volume: 500000,
        aum: 2000000000000,
      },
      {
        code: '114800',
        name: 'KODEX 인버스',
        category: '레버리지/인버스',
        nav: 8500,
        changeRate: -0.5,
        volume: 300000,
        aum: 1000000000000,
      },
      {
        code: '122630',
        name: 'KODEX 레버리지',
        category: '레버리지/인버스',
        nav: 15000,
        changeRate: 1.2,
        volume: 800000,
        aum: 3000000000000,
      },
      {
        code: '251350',
        name: 'KODEX 반도체',
        category: '섹터',
        nav: 25000,
        changeRate: 2.1,
        volume: 600000,
        aum: 1500000000000,
      },
      {
        code: '091160',
        name: 'KODEX 바이오',
        category: '섹터',
        nav: 18000,
        changeRate: 0.8,
        volume: 400000,
        aum: 1200000000000,
      },
    ]

    setTimeout(() => {
      setEtfs(sampleETFs)
      setLoading(false)
    }, 500)
  }, [])

  // 카테고리 필터링
  const filteredETFs =
    selectedCategory === 'ALL'
      ? etfs
      : etfs.filter((etf) => etf.category === selectedCategory)

  // 고유 카테고리 목록
  const categories = Array.from(new Set(etfs.map((etf) => etf.category)))

  // AUM 포맷팅
  const formatAUM = (aum: number): string => {
    if (aum >= 1000000000000) {
      return `${(aum / 1000000000000).toFixed(1)}조`
    }
    return `${(aum / 1000000000).toFixed(0)}억`
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-DEFAULT mx-auto mb-4"></div>
          <p className="text-gray-600">ETF 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">ETF 정보</h1>
        <p className="text-gray-600 mb-6">
          주요 ETF 정보 및 수익률을 확인할 수 있습니다.
        </p>

        {/* 카테고리 필터 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-primary-DEFAULT text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-DEFAULT text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ETF 테이블 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    종목코드
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ETF명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    기준가
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등락률
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    거래량
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    순자산총액
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredETFs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      ETF 데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredETFs.map((etf) => (
                    <tr
                      key={etf.code}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {etf.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {etf.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          {etf.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {etf.nav.toLocaleString()}원
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                          etf.changeRate > 0
                            ? 'text-danger-DEFAULT'
                            : etf.changeRate < 0
                            ? 'text-primary-DEFAULT'
                            : 'text-gray-600'
                        }`}
                      >
                        {etf.changeRate > 0 ? '+' : ''}
                        {etf.changeRate.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {etf.volume.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatAUM(etf.aum)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 결과 개수 표시 */}
        <div className="mt-4 text-sm text-gray-600">
          총 {filteredETFs.length}개 ETF
        </div>
      </div>
    </div>
  )
}


