# FinViz KR - 국내 증시 분석 플랫폼

finviz.com의 국내 증시 버전 웹사이트. 코스피100, 코스닥 주요 종목 및 ETF 정보를 제공하는 주식 분석 플랫폼입니다.

## 개발 환경 구축 가이드

### 1. 필수 도구 설치

#### Node.js 설치
1. [Node.js 공식 사이트](https://nodejs.org/) 접속
2. LTS 버전 다운로드 및 설치 (v20.x 이상 권장)
3. 설치 후 터미널에서 확인:
   ```bash
   node --version
   npm --version
   ```

#### Git 설치
1. [Git 공식 사이트](https://git-scm.com/download/win) 접속
2. Windows용 Git 다운로드 및 설치
3. 설치 후 터미널에서 확인:
   ```bash
   git --version
   ```

#### Visual Studio Code 설치 (권장)
1. [VS Code 공식 사이트](https://code.visualstudio.com/) 접속
2. 다운로드 및 설치
3. 필수 확장 프로그램 설치:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

### 2. 프로젝트 초기화

프로젝트 폴더에서 다음 명령어 실행:

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **차트**: Recharts
- **데이터베이스**: SQLite (개발용) → PostgreSQL (프로덕션)

## 프로젝트 구조

```
finviz_kr/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 페이지
│   ├── stocks/           # 종목 관련 페이지
│   └── api/              # API 라우트
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 함수
├── data/                  # 데이터 수집 스크립트 (Python)
├── public/                # 정적 파일
└── package.json
```

## 개발 단계

1. ✅ 개발 환경 구축
2. ✅ 데이터 수집 시스템 구축
3. ✅ 핵심 기능 구현
   - 종목 리스트 페이지
   - 종목 상세 페이지 (차트 포함)
   - 스크리너 기능
   - 시장 지도 (Heat Map)
   - ETF 정보 페이지
4. ✅ UI/UX 개선 (반응형 디자인)
5. ✅ 배포 준비

## 주요 기능

- **종목 리스트**: 코스피, 코스닥 주요 종목 정보 조회
- **종목 상세**: 주가 차트, 재무정보 (추후 구현)
- **스크리너**: 다양한 조건으로 종목 필터링
- **시장 지도**: 섹터별 주가 흐름 시각화
- **ETF 정보**: 주요 ETF 정보 및 수익률 확인

## 다음 단계

1. 실제 데이터 API 연동 (KRX, DART 등)
2. 데이터베이스 연동 (SQLite → PostgreSQL)
3. 재무정보 상세 구현
4. 뉴스/공시 정보 연동
5. 사용자 인증 및 관심종목 기능
6. 실시간 데이터 업데이트

## 라이선스

MIT License

