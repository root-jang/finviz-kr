# PowerShell 실행 정책 오류 해결 방법

## 문제 상황
```
npm : 이 시스템에서 스크립트를 실행할 수 없으므로...
PSSecurityException
```

## 해결 방법 (3가지 중 선택)

### 방법 1: VS Code 터미널을 CMD로 변경 (가장 간단, 추천)

1. VS Code에서 `Ctrl + Shift + P` 누르기
2. "Terminal: Select Default Profile" 입력 후 선택
3. "Command Prompt" 선택
4. 터미널 새로 열기 (`Ctrl + ``)
5. 이제 CMD 터미널에서 `npm install` 실행 가능!

### 방법 2: PowerShell 실행 정책 변경 (관리자 권한 필요)

**관리자 권한으로 PowerShell 실행:**
1. Windows 검색에서 "PowerShell" 검색
2. "Windows PowerShell" 우클릭 → "관리자 권한으로 실행"
3. 다음 명령어 실행:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
4. "Y" 입력하여 확인
5. VS Code 재시작

### 방법 3: 현재 세션에서만 실행 정책 변경

VS Code 터미널에서:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

## 추천: 방법 1 (CMD 사용)

가장 간단하고 안전한 방법입니다. CMD는 실행 정책 제한이 없어서 바로 사용 가능합니다.


