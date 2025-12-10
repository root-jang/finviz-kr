# 데이터 수집 시스템

국내 증시 데이터를 수집하는 Python 스크립트들입니다.

## 데이터 소스

### 1. KRX 한국거래소 (공공데이터포털)
- **URL**: https://www.data.go.kr/
- **특징**: 무료, 공공 API
- **제공 데이터**: 일일 시세, 종목 정보, 거래량 등

### 2. DART (금융감독원 전자공시시스템)
- **URL**: https://opendart.fss.or.kr/
- **특징**: API 키 필요 (무료 신청 가능)
- **제공 데이터**: 재무정보, 공시 정보

### 3. 네이버/다음 금융 (참고용)
- **주의**: 크롤링 시 법적 리스크 있음
- **용도**: 초기 개발/테스트용으로만 사용

## 설치 방법

```bash
# Python 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# 가상환경 활성화 (Mac/Linux)
source venv/bin/activate

# 필요한 패키지 설치
pip install -r requirements.txt
```

## 사용 방법

```bash
# 종목 리스트 수집
python collect_stocks.py

# 시세 데이터 수집
python collect_prices.py

# 재무정보 수집 (DART API 필요)
python collect_financials.py
```

## 데이터베이스

초기에는 SQLite를 사용하며, 추후 PostgreSQL로 전환 예정.


