"""
시세 데이터 수집 스크립트
일일 주가 데이터를 수집하여 데이터베이스에 저장
"""
import requests
from datetime import datetime, timedelta
from database import StockDatabase
import config
from typing import List, Dict, Optional

def collect_price_from_krx(code: str, date: str = None) -> Optional[Dict]:
    """
    KRX에서 특정 종목의 시세 데이터 수집
    
    Args:
        code: 종목 코드
        date: 날짜 (YYYY-MM-DD, None이면 오늘)
    
    Returns:
        시세 데이터 딕셔너리
    """
    # TODO: 실제 KRX API 연동 구현
    # 현재는 샘플 데이터 반환
    print(f"KRX API 연동 필요 - {code} 시세 데이터 수집")
    
    # 샘플 데이터 (실제 구현 시 API에서 가져옴)
    if date is None:
        date = datetime.now().strftime('%Y-%m-%d')
    
    # 랜덤 샘플 데이터 생성 (실제로는 API에서 가져옴)
    import random
    base_price = 50000 + random.randint(-10000, 10000)
    
    return {
        'code': code,
        'date': date,
        'open_price': base_price * 0.99,
        'high_price': base_price * 1.02,
        'low_price': base_price * 0.98,
        'close_price': base_price,
        'volume': random.randint(1000000, 10000000),
        'change_rate': random.uniform(-5.0, 5.0)
    }

def collect_all_prices():
    """모든 종목의 시세 데이터 수집"""
    print("시세 데이터 수집 시작...")
    
    db = StockDatabase()
    stocks = db.get_stocks()
    
    for stock in stocks:
        try:
            price_data = collect_price_from_krx(stock['code'])
            if price_data:
                db.insert_price(
                    code=price_data['code'],
                    date=price_data['date'],
                    open_price=price_data['open_price'],
                    high_price=price_data['high_price'],
                    low_price=price_data['low_price'],
                    close_price=price_data['close_price'],
                    volume=price_data['volume'],
                    change_rate=price_data.get('change_rate')
                )
                print(f"시세 저장 완료: {stock['name']} ({stock['code']})")
        except Exception as e:
            print(f"에러 발생 - {stock['name']} ({stock['code']}): {e}")
    
    print("시세 데이터 수집 완료")

def main():
    """메인 실행 함수"""
    collect_all_prices()

if __name__ == '__main__':
    main()


