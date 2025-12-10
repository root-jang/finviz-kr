# Git 구조 수정 - 실행 가이드

## VS Code 터미널에서 실행하세요

PowerShell에서 Git이 인식되지 않으므로, VS Code 터미널에서 직접 실행해야 합니다.

### 방법 1: VS Code 터미널 사용 (CMD로 변경)

1. **VS Code에서 `Ctrl + Shift + P`**
2. **"Terminal: Select Default Profile" 입력**
3. **"Command Prompt" 선택**
4. **새 터미널 열기** (`Ctrl + ``)

### 방법 2: GitHub Desktop 사용 (가장 쉬움)

GitHub Desktop을 사용하면 명령어 없이 쉽게 수정할 수 있습니다.

## 수정 단계

### VS Code 터미널 (CMD)에서 실행:

```cmd
REM 1. 현재 위치 확인
cd C:\Users\geunh\OneDrive\문서\GitHub\finviz_kr

REM 2. 기존 .git 제거 (있다면)
if exist .git rmdir /s /q .git

REM 3. Git 초기화
git init

REM 4. 파일 추가
git add .

REM 5. 커밋
git commit -m "프로젝트 구조 수정: 올바른 경로로 재커밋"

REM 6. 원격 저장소 설정
git remote remove origin
git remote add origin https://github.com/root-jang/finviz-kr.git

REM 7. 브랜치 이름 설정
git branch -M main

REM 8. 강제 푸시
git push -u origin main --force
```

## GitHub Desktop 사용 (추천)

1. **GitHub Desktop 실행**
2. **File → Add Local Repository**
3. **프로젝트 폴더 선택**: `C:\Users\geunh\OneDrive\문서\GitHub\finviz_kr`
4. **Repository → Remove** (기존 원격 저장소 제거)
5. **Repository → Repository Settings → Remote**
6. **Primary remote repository**에 `https://github.com/root-jang/finviz-kr.git` 입력
7. **변경사항 커밋** 후 **Push origin** 클릭

