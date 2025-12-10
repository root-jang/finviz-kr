# API 연동 가이드

## 국내 증시 데이터 API 소스

### 1. KRX 한국거래소 공공데이터포털

**URL**: https://www.data.go.kr/

**특징**:
- 무료 공공 API
- 종목 정보, 일일 시세 데이터 제공
- API 키 신청 필요

**신청 방법**:
1. 공공데이터포털 회원가입
2. "한국거래소" 검색
3. 원하는 API 선택 및 신청
4. API 키 발급

**주요 API**:
- 상장 종목 조회
- 일일 시세 조회
- 시장 통계 조회

### 2. DART (금융감독원 전자공시시스템)

**URL**: https://opendart.fss.or.kr/

**특징**:
- 무료 API (회원가입 필요)
- 재무정보, 공시 정보 제공
- API 키 신청 필요

**신청 방법**:
1. DART 홈페이지 회원가입
2. API 키 신청
3. 승인 대기 (보통 즉시 승인)

**주요 API**:
- 재무정보 조회
- 공시 정보 조회
- 기업 정보 조회

### 3. 한국투자증권 API (유료 옵션)

**특징**:
- 실시간 데이터 제공
- 안정적인 서비스
- 유료 (월 구독)

**용도**:
- 초기에는 무료 API 사용
- 추후 수익화 시 고려

## 구현 단계

### Phase 1: KRX API 연동

1. 공공데이터포털에서 API 키 발급
2. `lib/krx-api.ts` 파일에 실제 API 호출 구현
3. `data/collect_stocks.py` 수정하여 실제 데이터 수집
4. 데이터베이스에 저장

### Phase 2: DART API 연동

1. DART API 키 발급
2. 재무정보 수집 스크립트 작성
3. 데이터베이스에 저장

### Phase 3: Next.js API 라우트 수정

1. `app/api/stocks/route.ts`에서 데이터베이스 조회
2. 실제 데이터 반환

## 환경 변수 설정

`.env.local` 파일 생성:

```env
# KRX API 키
KRX_API_KEY=your_krx_api_key_here

# DART API 키
DART_API_KEY=your_dart_api_key_here

# 데이터베이스 경로
DB_PATH=./data/stocks.db
```

## 참고 자료

- [공공데이터포털 API 가이드](https://www.data.go.kr/)
- [DART API 문서](https://opendart.fss.or.kr/guide/main.do)
- [KRX 정보데이터시스템](http://data.krx.co.kr/)

