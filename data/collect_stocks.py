"""
종목 리스트 수집 스크립트
KRX 공공데이터포털 또는 기타 소스에서 종목 정보를 수집
"""
import requests
import pandas as pd
from database import StockDatabase
import config
from typing import List, Dict

def collect_from_krx() -> List[Dict]:
    """
    KRX 공공데이터포털에서 종목 리스트 수집
    실제 API 연동 시 구현 필요
    
    Returns:
        종목 정보 리스트
    """
    # TODO: 실제 KRX API 연동 구현
    # 현재는 샘플 데이터 반환
    print("KRX API 연동 필요 - 현재 샘플 데이터 사용")
    
    # 샘플 데이터 (실제 구현 시 API에서 가져옴)
    sample_stocks = [
        {'code': '005930', 'name': '삼성전자', 'market': config.MARKET_KOSPI, 'sector': '전자'},
        {'code': '000660', 'name': 'SK하이닉스', 'market': config.MARKET_KOSPI, 'sector': '반도체'},
        {'code': '035420', 'name': 'NAVER', 'market': config.MARKET_KOSPI, 'sector': '인터넷'},
        {'code': '051910', 'name': 'LG화학', 'market': config.MARKET_KOSPI, 'sector': '화학'},
        {'code': '006400', 'name': '삼성SDI', 'market': config.MARKET_KOSPI, 'sector': '전기전자'},
    ]
    
    return sample_stocks

def collect_from_naver_finance() -> List[Dict]:
    """
    네이버 금융에서 종목 리스트 수집 (참고용)
    주의: 크롤링 시 법적 리스크 있음
    
    Returns:
        종목 정보 리스트
    """
    # TODO: 네이버 금융 크롤링 구현 (법적 검토 필요)
    print("네이버 금융 크롤링 - 법적 검토 필요")
    return []

def main():
    """메인 실행 함수"""
    print("종목 리스트 수집 시작...")
    
    # 데이터베이스 초기화
    db = StockDatabase()
    
    # KRX에서 종목 리스트 수집
    stocks = collect_from_krx()
    
    # 데이터베이스에 저장
    for stock in stocks:
        db.insert_stock(
            code=stock['code'],
            name=stock['name'],
            market=stock['market'],
            sector=stock.get('sector'),
            market_cap=stock.get('market_cap')
        )
        print(f"저장 완료: {stock['name']} ({stock['code']})")
    
    print(f"총 {len(stocks)}개 종목 수집 완료")

if __name__ == '__main__':
    main()


