# PowerShell에서 Git 인식 문제 해결

## 문제 원인

PowerShell에서 Git 명령어가 인식되지 않는 이유:
1. **실행 정책 문제**: PowerShell 스크립트 실행이 차단됨
2. **PATH 환경 변수 문제**: Git 경로가 PATH에 없음
3. **Git 설치 경로 문제**: Git이 다른 경로에 설치됨

## 해결 방법

### 방법 1: PowerShell 실행 정책 변경 (가장 확실)

**관리자 권한으로 PowerShell 실행:**

1. Windows 검색에서 "PowerShell" 검색
2. "Windows PowerShell" 우클릭 → **관리자 권한으로 실행**
3. 다음 명령어 실행:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
4. "Y" 입력하여 확인
5. VS Code 재시작

### 방법 2: Git 경로를 PATH에 추가

**현재 사용자용:**

1. Windows 검색에서 "환경 변수" 검색
2. "시스템 환경 변수 편집" 클릭
3. "환경 변수" 버튼 클릭
4. "사용자 변수"에서 "Path" 선택 → "편집"
5. "새로 만들기" 클릭
6. Git 경로 추가 (일반적으로):
   - `C:\Program Files\Git\bin`
   - 또는 `C:\Program Files (x86)\Git\bin`
7. "확인" 클릭
8. VS Code 재시작

### 방법 3: VS Code 터미널 기본 프로필을 CMD로 변경 (임시 해결)

1. VS Code에서 `Ctrl + Shift + P`
2. "Terminal: Select Default Profile" 입력
3. "Command Prompt" 선택
4. 새 터미널 열기

이제 CMD 터미널에서 Git이 작동합니다.

## 확인 방법

PowerShell에서:
```powershell
git --version
```

버전이 나오면 성공!

## 추천 방법

**방법 1 (실행 정책 변경) + 방법 2 (PATH 추가)**를 함께 사용하면 가장 확실합니다.

