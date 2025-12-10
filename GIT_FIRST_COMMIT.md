# 첫 커밋 및 GitHub 업로드 가이드

## 다음 단계

### 1단계: 파일 추가 (Staging)

VS Code 터미널에서:
```bash
git add .
```

**이 명령어는:**
- 현재 폴더의 모든 파일을 Git에 추가
- `.gitignore`에 있는 파일은 제외됨

### 2단계: 첫 커밋 만들기

```bash
git commit -m "초기 커밋: FinViz KR 프로젝트"
```

**커밋 메시지는:**
- 무엇을 변경했는지 설명
- 나중에 히스토리에서 확인 가능

### 3단계: GitHub 저장소 생성

1. **GitHub 접속**: https://github.com
2. **로그인**
3. **우측 상단 + 버튼** 클릭 → **New repository** 선택
4. **저장소 정보 입력:**
   - Repository name: `finviz-kr` (또는 원하는 이름)
   - Description: "국내 증시 분석 플랫폼" (선택사항)
   - Public 또는 Private 선택
   - **"Initialize this repository with a README" 체크 해제** (중요!)
   - **"Add .gitignore" 체크 해제** (이미 있음)
   - **"Choose a license" None 선택**
5. **Create repository** 클릭

### 4단계: GitHub에 연결 및 푸시

GitHub에서 저장소를 만들면 나오는 페이지에 명령어가 있습니다. 또는 아래 명령어 사용:

```bash
# 원격 저장소 추가 (YOUR_USERNAME을 본인 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/finviz-kr.git

# 메인 브랜치 이름 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/honggildong/finviz-kr.git
git branch -M main
git push -u origin main
```

## 인증 문제 해결

### Personal Access Token 필요

GitHub에 푸시할 때 인증이 필요할 수 있습니다:

1. **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **Generate new token (classic)** 클릭
3. **Note**: "finviz-kr" 입력
4. **Expiration**: 원하는 기간 선택
5. **Select scopes**: `repo` 체크
6. **Generate token** 클릭
7. **토큰 복사** (한 번만 보여줌!)
8. 푸시할 때 비밀번호 대신 이 토큰 입력

### 또는 GitHub Desktop 사용

명령어 대신 GitHub Desktop을 사용하면 더 쉽습니다:
1. GitHub Desktop 실행
2. File → Add Local Repository
3. 프로젝트 폴더 선택
4. Commit 버튼으로 커밋
5. Push origin 버튼으로 업로드

## VS Code에서 Git 사용 (GUI 방법)

1. **왼쪽 사이드바에서 소스 제어 아이콘 클릭** (`Ctrl + Shift + G`)
2. **변경된 파일들이 보임**
3. **변경사항 옆 + 버튼** 클릭 (또는 "Stage All Changes")
4. **커밋 메시지 입력** (예: "초기 커밋: FinViz KR 프로젝트")
5. **✓ 버튼** 클릭 (커밋)
6. **... 메뉴** 클릭 → **Push** 선택
7. **원격 저장소 URL 입력** (GitHub 저장소 주소)

## 확인

GitHub 저장소 페이지에서 파일들이 보이면 성공!

