"""
데이터 수집 설정 파일
"""
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# DART API 키 (선택사항)
DART_API_KEY = os.getenv('DART_API_KEY', '')

# 데이터베이스 경로
DB_PATH = os.getenv('DB_PATH', 'stocks.db')

# 수집 주기 (분 단위)
COLLECT_INTERVAL = int(os.getenv('COLLECT_INTERVAL', '60'))

# KRX 공공데이터포털 API 키 (필요시)
KRX_API_KEY = os.getenv('KRX_API_KEY', '')

# 주요 시장 구분
MARKET_KOSPI = 'KOSPI'
MARKET_KOSDAQ = 'KOSDAQ'

# 주요 종목 코드 (코스피 100, 코스닥 150 등)
# 실제 데이터 수집 시 동적으로 업데이트됨
MAJOR_STOCKS = {
    MARKET_KOSPI: [],  # 코스피 100 종목 코드
    MARKET_KOSDAQ: [],  # 코스닥 150 종목 코드
}


