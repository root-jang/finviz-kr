'use client'

import { useState, useEffect } from 'react'
import { getStocks } from '@/lib/api'
import { Stock } from '@/lib/types'

/**
 * 시장 지도(Heat Map) 페이지
 * 섹터별 주가 흐름을 시각적으로 표현
 */
export default function HeatmapPage() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMarket, setSelectedMarket] = useState<'KOSPI' | 'KOSDAQ'>('KOSPI')

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

  // 섹터별 종목 그룹화
  const sectorGroups = stocks
    .filter((stock) => stock.market === selectedMarket && stock.sector)
    .reduce((acc, stock) => {
      const sector = stock.sector!
      if (!acc[sector]) {
        acc[sector] = []
      }
      acc[sector].push(stock)
      return acc
    }, {} as Record<string, Stock[]>)

  // 색상 계산 함수 (등락률에 따라)
  const getColorClass = (changeRate?: number): string => {
    if (!changeRate) return 'bg-gray-200'
    if (changeRate > 3) return 'bg-red-600'
    if (changeRate > 1) return 'bg-red-400'
    if (changeRate > 0) return 'bg-red-200'
    if (changeRate > -1) return 'bg-blue-200'
    if (changeRate > -3) return 'bg-blue-400'
    return 'bg-blue-600'
  }

  // 텍스트 색상 계산
  const getTextColor = (changeRate?: number): string => {
    if (!changeRate) return 'text-gray-700'
    return Math.abs(changeRate) > 1 ? 'text-white' : 'text-gray-900'
  }

  // 샘플 등락률 생성 (실제로는 API에서 가져옴)
  const getChangeRate = (stock: Stock): number => {
    // 실제로는 stock.latestPrice?.changeRate 사용
    return (Math.random() - 0.5) * 6 // -3% ~ +3% 범위
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-DEFAULT mx-auto mb-4"></div>
          <p className="text-gray-600">시장 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">시장 지도</h1>
        <p className="text-gray-600 mb-6">
          섹터별 주가 흐름을 시각적으로 확인할 수 있습니다.
        </p>

        {/* 시장 선택 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMarket('KOSPI')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedMarket === 'KOSPI'
                  ? 'bg-primary-DEFAULT text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              코스피
            </button>
            <button
              onClick={() => setSelectedMarket('KOSDAQ')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedMarket === 'KOSDAQ'
                  ? 'bg-primary-DEFAULT text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              코스닥
            </button>
          </div>
        </div>

        {/* 범례 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-sm font-semibold mb-2">범례</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded"></div>
              <span>+3% 이상</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-400 rounded"></div>
              <span>+1% ~ +3%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-200 rounded"></div>
              <span>0% ~ +1%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-200 rounded"></div>
              <span>-1% ~ 0%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-400 rounded"></div>
              <span>-3% ~ -1%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span>-3% 이하</span>
            </div>
          </div>
        </div>

        {/* 섹터별 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(sectorGroups).map(([sector, sectorStocks]) => (
            <div
              key={sector}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">{sector}</h2>
              <div className="grid grid-cols-2 gap-2">
                {sectorStocks.map((stock) => {
                  const changeRate = getChangeRate(stock)
                  return (
                    <div
                      key={stock.code}
                      className={`p-3 rounded-md ${getColorClass(changeRate)} ${getTextColor(changeRate)} transition-transform hover:scale-105 cursor-pointer`}
                    >
                      <div className="font-semibold text-sm mb-1">
                        {stock.name}
                      </div>
                      <div className="text-xs opacity-90">
                        {changeRate > 0 ? '+' : ''}
                        {changeRate.toFixed(2)}%
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 섹터가 없는 경우 */}
        {Object.keys(sectorGroups).length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">
              {selectedMarket} 시장의 섹터별 데이터가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


