/**
 * API 유틸리티 함수
 * 백엔드 API 호출 함수들
 */

import { Stock, Price, StockDetail } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

/**
 * 종목 리스트 조회
 * @param market 시장 구분 (KOSPI, KOSDAQ, 또는 전체)
 */
export async function getStocks(market?: string): Promise<Stock[]> {
  try {
    const url = market
      ? `${API_BASE_URL}/stocks?market=${market}`
      : `${API_BASE_URL}/stocks`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('종목 리스트 조회 실패')
    }
    
    return await response.json()
  } catch (error) {
    console.error('종목 리스트 조회 에러:', error)
    return []
  }
}

/**
 * 종목 상세 정보 조회
 * @param code 종목 코드
 */
export async function getStockDetail(code: string): Promise<StockDetail | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/${code}`)
    
    if (!response.ok) {
      throw new Error('종목 상세 정보 조회 실패')
    }
    
    return await response.json()
  } catch (error) {
    console.error('종목 상세 정보 조회 에러:', error)
    return null
  }
}

/**
 * 종목 시세 데이터 조회
 * @param code 종목 코드
 * @param startDate 시작 날짜 (YYYY-MM-DD)
 * @param endDate 종료 날짜 (YYYY-MM-DD)
 */
export async function getPrices(
  code: string,
  startDate?: string,
  endDate?: string
): Promise<Price[]> {
  try {
    let url = `${API_BASE_URL}/stocks/${code}/prices`
    const params = new URLSearchParams()
    
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('시세 데이터 조회 실패')
    }
    
    return await response.json()
  } catch (error) {
    console.error('시세 데이터 조회 에러:', error)
    return []
  }
}


