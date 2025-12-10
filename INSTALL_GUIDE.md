# 설치 가이드 - 단계별 안내

## 1단계: Node.js 설치 (필수)

### 왜 필요한가?
- 웹 개발의 핵심 도구입니다
- C# 개발에 Visual Studio가 필요하듯, 웹 개발에 Node.js가 필요합니다
- `npm` (Node Package Manager)도 함께 설치됩니다

### 설치 방법

1. **Node.js 공식 사이트 접속**
   - https://nodejs.org/
   - 또는 검색: "Node.js download"

2. **LTS 버전 다운로드** (안정 버전, 추천)
   - "LTS" 버튼 클릭
   - Windows Installer (.msi) 다운로드

3. **설치 실행**
   - 다운로드한 `.msi` 파일 실행
   - "Next" 버튼으로 진행 (기본 설정 그대로)
   - 설치 완료까지 대기 (2-3분)

4. **설치 확인**
   - **중요**: VS Code를 완전히 종료하고 다시 실행
   - VS Code 터미널에서 (`Ctrl + ``):
     ```bash
     node --version
     npm --version
     ```
   - 버전 번호가 나오면 성공!

## 2단계: Git 설치 (선택사항, 추천)

### 왜 필요한가?
- 코드 버전 관리
- GitHub에 업로드 가능

### 설치 방법

1. **Git 공식 사이트 접속**
   - https://git-scm.com/download/win

2. **다운로드 및 설치**
   - Windows용 다운로드
   - 설치 파일 실행 후 기본 설정으로 설치

3. **설치 확인**
   ```bash
   git --version
   ```

## 3단계: VS Code 확장 프로그램 설치 (권장)

VS Code를 열고 다음 확장 프로그램 설치:

1. **ESLint** - 코드 검사
2. **Prettier** - 코드 포맷팅
3. **Tailwind CSS IntelliSense** - CSS 자동완성
4. **TypeScript and JavaScript Language Features** - TypeScript 지원

**설치 방법:**
- VS Code 왼쪽 사이드바에서 확장 프로그램 아이콘 클릭 (또는 `Ctrl + Shift + X`)
- 검색창에 이름 입력 후 "Install" 클릭

## 4단계: 프로젝트 실행

### VS Code에서 프로젝트 열기

1. **VS Code 실행**

2. **파일 → 폴더 열기**
   - 또는 `Ctrl + K, Ctrl + O`
   - 폴더 선택: `C:\Users\geunh\OneDrive\문서\GitHub\finviz_kr`

3. **터미널 열기**
   - `Ctrl + `` (백틱 키)
   - 또는 상단 메뉴: 터미널 → 새 터미널

4. **의존성 설치**
   ```bash
   npm install
   ```
   - 처음 실행 시 1-3분 소요
   - `node_modules` 폴더가 생성됨

5. **개발 서버 실행**
   ```bash
   npm run dev
   ```

6. **브라우저에서 확인**
   - 브라우저 열기
   - 주소창에 입력: `http://localhost:3000`
   - 웹사이트가 표시됨!

## 5단계: 개발 시작

### 코드 수정해보기

1. VS Code에서 `app/page.tsx` 파일 열기
2. 텍스트 수정 (예: "FinViz KR" → "내 사이트")
3. 저장 (`Ctrl + S`)
4. 브라우저가 자동으로 새로고침됨!

### 서버 중지하기

터미널에서 `Ctrl + C` 누르기

### 다시 시작하기

```bash
npm run dev
```

## 문제 해결

### "node가 인식되지 않습니다"
- Node.js 설치 후 VS Code를 완전히 종료하고 다시 실행
- Windows를 재시작해보기

### "npm install이 실패합니다"
- 인터넷 연결 확인
- 방화벽/보안 프로그램 확인
- 관리자 권한으로 VS Code 실행

### "포트 3000이 이미 사용 중입니다"
- 다른 터미널/프로그램에서 사용 중
- 다른 포트 사용: `npm run dev -- -p 3001`

### VS Code 터미널이 PowerShell인 경우
- 문제없습니다! PowerShell에서도 동일하게 작동합니다

## 다음 단계

모든 설치가 완료되면:
1. `npm install` 실행
2. `npm run dev` 실행
3. 브라우저에서 `http://localhost:3000` 접속
4. 개발 시작!


