# Git 설치 가이드

## Git 설치 (필수)

### 방법 1: Git 공식 사이트에서 설치 (추천)

1. **Git 공식 사이트 접속**: https://git-scm.com/download/win
2. **Windows용 다운로드** 클릭
3. **설치 파일 실행**
4. **기본 설정으로 설치** (Next 버튼 계속 클릭)
5. **설치 완료 후 VS Code 재시작**

### 방법 2: GitHub Desktop 설치 (더 쉬운 방법)

GitHub Desktop은 Git을 포함하고 있어서 더 쉽게 사용할 수 있습니다.

1. **GitHub Desktop 다운로드**: https://desktop.github.com
2. **설치 및 GitHub 계정 로그인**
3. **File → Add Local Repository**로 프로젝트 추가
4. **GUI로 쉽게 커밋 및 푸시 가능**

## 설치 확인

VS Code 터미널에서:
```bash
git --version
```

버전 번호가 나오면 성공!

## 설치 후 Git 초기화

프로젝트 폴더에서:
```bash
git init
```

