# 배포 가이드

## Vercel 배포 (권장)

Vercel은 Next.js를 개발한 회사에서 제공하는 배포 플랫폼으로, Next.js 프로젝트 배포에 최적화되어 있습니다.

### 1. Vercel 계정 생성

1. [Vercel 공식 사이트](https://vercel.com/) 접속
2. GitHub 계정으로 로그인 (또는 이메일로 가입)

### 2. 프로젝트 배포

#### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

#### 방법 2: Vercel 웹 대시보드 사용

1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 연결
3. 프로젝트 설정:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. "Deploy" 클릭

### 3. 환경 변수 설정

Vercel 대시보드에서 환경 변수 설정:

1. 프로젝트 설정 → Environment Variables
2. 다음 변수 추가 (필요시):
   - `NEXT_PUBLIC_API_URL`: API 서버 URL
   - `DART_API_KEY`: DART API 키 (선택사항)

### 4. 도메인 연결

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 도메인 추가 및 DNS 설정

## 다른 배포 옵션

### AWS (EC2, S3 + CloudFront)

- EC2 인스턴스에 Node.js 설치
- PM2로 프로세스 관리
- Nginx를 리버스 프록시로 사용

### Docker 배포

```dockerfile
# Dockerfile 예시
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 빌드 및 테스트

### 로컬 빌드 테스트

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 모드로 실행
npm start
```

### 환경 변수 확인

`.env.local` 파일 생성 (로컬 개발용):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 성능 최적화

1. 이미지 최적화: Next.js Image 컴포넌트 사용
2. 코드 스플리팅: 자동으로 처리됨
3. 정적 페이지 생성: 가능한 페이지는 SSG 사용
4. 캐싱: API 응답 캐싱 설정

## 모니터링

- Vercel Analytics 사용 (무료 티어 제공)
- 에러 로깅: Sentry 연동 고려


