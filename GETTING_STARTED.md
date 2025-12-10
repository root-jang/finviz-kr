# 웹 개발 시작 가이드 (C#/C++ 개발자용)

## 웹 개발 vs 데스크톱 앱 개발의 차이

### 데스크톱 앱 (C#/C++)
- **빌드 결과물**: `.exe` 파일
- **실행 방법**: exe 파일 더블클릭
- **디버깅**: Visual Studio에서 F5로 디버깅
- **배포**: exe 파일 배포

### 웹 개발 (Next.js/React)
- **빌드 결과물**: 웹 서버에서 실행되는 코드
- **실행 방법**: 개발 서버 실행 → 브라우저에서 접속
- **디버깅**: 브라우저 개발자 도구 + VS Code 디버거
- **배포**: 웹 서버에 배포 (Vercel, AWS 등)

## 프로젝트 열기 및 실행 방법

### 1단계: VS Code에서 프로젝트 열기

1. **VS Code 실행**
2. **파일 → 폴더 열기** (또는 `Ctrl + K, Ctrl + O`)
3. 프로젝트 폴더 선택: `C:\Users\geunh\OneDrive\문서\GitHub\finviz_kr`
4. 폴더가 VS Code에서 열림

### 2단계: 터미널 열기

VS Code에서 터미널을 여는 방법:
- **단축키**: `Ctrl + `` (백틱, 숫자 1 왼쪽 키)
- **메뉴**: 터미널 → 새 터미널
- **상단 메뉴**: 터미널 → 새 터미널

### 3단계: Node.js 설치 확인

터미널에서 다음 명령어 실행:

```bash
node --version
npm --version
```

**만약 에러가 나면:**
- Node.js가 설치되지 않은 것입니다
- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드 및 설치
- 설치 후 VS Code를 재시작

### 4단계: 프로젝트 의존성 설치

프로젝트 폴더에서 다음 명령어 실행:

```bash
npm install
```

**이 명령어는:**
- `package.json` 파일을 읽어서 필요한 라이브러리들을 다운로드
- `node_modules` 폴더에 설치됨
- C#의 NuGet 패키지 설치와 비슷한 개념

**처음 실행 시 시간이 걸릴 수 있습니다 (1-3분)**

### 5단계: 개발 서버 실행

```bash
npm run dev
```

**이 명령어는:**
- Next.js 개발 서버를 시작
- 코드 변경 시 자동으로 새로고침 (Hot Reload)
- C#의 F5 디버깅과 비슷하지만, 계속 실행되는 서버

**성공하면 다음과 같은 메시지가 나타납니다:**
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### 6단계: 브라우저에서 확인

1. 브라우저 열기 (Chrome, Edge 등)
2. 주소창에 입력: `http://localhost:3000`
3. 웹사이트가 표시됨!

## 개발 워크플로우

### 코드 수정하기

1. VS Code에서 파일 수정 (예: `app/page.tsx`)
2. 파일 저장 (`Ctrl + S`)
3. **자동으로 새로고침됨!** (브라우저에서 확인)

### 서버 중지하기

터미널에서 `Ctrl + C` 누르기

### 다시 시작하기

```bash
npm run dev
```

## 디버깅 방법

### 1. 브라우저 개발자 도구 (가장 많이 사용)

1. 브라우저에서 `F12` 누르기
2. **Console 탭**: JavaScript 에러 확인
3. **Network 탭**: API 호출 확인
4. **Elements 탭**: HTML/CSS 확인 및 수정

### 2. VS Code 디버거 사용

1. VS Code에서 `F5` 누르기
2. "Chrome" 또는 "Edge" 선택
3. 브라우저가 자동으로 열림
4. 중단점(Breakpoint) 설정 가능

### 3. 콘솔 로그 사용

코드에 `console.log()` 추가:
```typescript
console.log('디버깅 메시지', 변수명)
```

터미널 또는 브라우저 콘솔에서 확인

## 주요 명령어 정리

| 명령어 | 설명 | C# 비교 |
|--------|------|--------|
| `npm install` | 라이브러리 설치 | NuGet 패키지 설치 |
| `npm run dev` | 개발 서버 실행 | F5 디버깅 |
| `npm run build` | 프로덕션 빌드 | Release 빌드 |
| `npm start` | 프로덕션 서버 실행 | exe 실행 |

## 프로젝트 구조 이해

```
finviz_kr/
├── app/              # 페이지 파일들 (C#의 Form과 비슷)
│   ├── page.tsx      # 메인 페이지
│   └── stocks/       # 종목 관련 페이지
├── components/       # 재사용 가능한 컴포넌트 (C#의 UserControl)
├── lib/              # 유틸리티 함수들 (C#의 Helper 클래스)
├── public/           # 정적 파일 (이미지 등)
├── package.json      # 프로젝트 설정 (C#의 .csproj와 비슷)
└── tsconfig.json     # TypeScript 설정
```

## 문제 해결

### "npm이 인식되지 않습니다"
- Node.js를 설치하고 VS Code를 재시작

### "포트 3000이 이미 사용 중입니다"
- 다른 터미널에서 서버가 실행 중일 수 있음
- 해당 터미널을 닫거나 `Ctrl + C`로 중지

### "모듈을 찾을 수 없습니다"
- `npm install` 다시 실행

### 코드 변경이 반영되지 않음
- 브라우저 새로고침 (`F5`)
- 개발 서버 재시작 (`Ctrl + C` 후 `npm run dev`)

## 다음 단계

1. 프로젝트를 VS Code에서 열기
2. 터미널에서 `npm install` 실행
3. `npm run dev` 실행
4. 브라우저에서 `http://localhost:3000` 접속
5. 코드 수정해보기!


