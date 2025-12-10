# Git & GitHub 연동 가이드

## 1단계: Git 초기화 (처음 한 번만)

### VS Code 터미널에서 실행

```bash
# Git 저장소 초기화
git init

# 사용자 정보 설정 (처음 한 번만)
git config --global user.name "당신의 이름"
git config --global user.email "당신의이메일@example.com"
```

## 2단계: .gitignore 확인

프로젝트에 이미 `.gitignore` 파일이 있습니다. 이 파일은 Git에 올리지 않을 파일들을 지정합니다.

**이미 포함된 항목:**
- `node_modules/` (라이브러리 폴더)
- `.next/` (빌드 결과물)
- `.env` (환경 변수 파일)

## 3단계: 파일 추가 및 커밋

```bash
# 모든 파일 추가
git add .

# 커밋 (변경사항 저장)
git commit -m "초기 커밋: FinViz KR 프로젝트"
```

## 4단계: GitHub 저장소 생성

1. **GitHub 접속**: https://github.com
2. **로그인** (계정이 없으면 회원가입)
3. **우측 상단 + 버튼** → **New repository** 클릭
4. **저장소 이름 입력**: `finviz-kr` (또는 원하는 이름)
5. **Public 또는 Private 선택**
6. **"Initialize this repository with a README" 체크 해제** (이미 로컬에 파일이 있으므로)
7. **Create repository** 클릭

## 5단계: GitHub에 푸시

GitHub에서 저장소를 만들면 나오는 페이지에서 다음 명령어를 복사하거나, 아래 명령어 사용:

```bash
# 원격 저장소 추가 (YOUR_USERNAME을 본인 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/finviz-kr.git

# 메인 브랜치 이름 설정 (최신 Git은 main 사용)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**GitHub 인증:**
- Personal Access Token 필요할 수 있음
- 또는 GitHub Desktop 사용 가능

## VS Code에서 Git 사용하기

### 방법 1: VS Code 내장 Git 기능 (추천)

1. **왼쪽 사이드바에서 소스 제어 아이콘 클릭** (또는 `Ctrl + Shift + G`)
2. **변경된 파일 확인**
3. **+ 버튼**으로 파일 스테이징
4. **커밋 메시지 입력** 후 **✓ 버튼** 클릭
5. **... 메뉴** → **Push** 클릭

### 방법 2: 터미널 사용

위의 명령어들을 터미널에서 직접 실행

## GitHub Desktop 사용 (더 쉬운 방법)

1. **GitHub Desktop 다운로드**: https://desktop.github.com
2. **설치 후 GitHub 계정 로그인**
3. **File → Add Local Repository**
4. 프로젝트 폴더 선택
5. **Commit 버튼**으로 커밋
6. **Push origin** 버튼으로 업로드

## 자주 사용하는 Git 명령어

```bash
# 상태 확인
git status

# 변경사항 확인
git diff

# 커밋 히스토리 확인
git log

# 최신 변경사항 가져오기
git pull

# 변경사항 업로드
git push
```

## 문제 해결

### "fatal: not a git repository"
- `git init` 먼저 실행

### "Permission denied"
- GitHub Personal Access Token 필요
- Settings → Developer settings → Personal access tokens

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/finviz-kr.git
```

