# Git 계정 인증 문제 해결

## 문제 상황
- GitHub 계정: `root-jang` ✅
- Git 인증 시도 계정: `jang-geunho` ❌
- 결과: `root-jang`의 저장소에 접근 불가

## 해결 방법

### 방법 1: Windows Credential Manager에서 기존 인증 정보 삭제

Git이 저장한 기존 인증 정보를 삭제하고 다시 시도:

1. **Windows 검색**에서 "Credential Manager" 검색
2. **Windows 자격 증명 관리자** 실행
3. **Windows 자격 증명** 탭 클릭
4. **git:https://github.com** 찾기
5. **화살표 클릭** → **제거** 클릭
6. 터미널에서 다시 푸시:
   ```bash
   git push -u origin main
   ```
7. 이번에는 `root-jang` 계정 정보 입력

### 방법 2: Personal Access Token 사용 (추천)

GitHub에서 Personal Access Token을 생성하여 사용:

#### 1. Personal Access Token 생성

1. **GitHub 로그인** (`root-jang` 계정)
2. **우측 상단 프로필** → **Settings**
3. **왼쪽 하단 Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token (classic)** 클릭
6. **Note**: "finviz-kr" 입력
7. **Expiration**: 원하는 기간 선택 (예: 90 days)
8. **Select scopes**: 
   - ✅ **repo** (전체 체크)
9. **Generate token** 클릭
10. **토큰 복사** (⚠️ 한 번만 보여줌! 복사해두기)

#### 2. 토큰으로 푸시

```bash
git push -u origin main
```

**입력할 정보:**
- **Username**: `root-jang`
- **Password**: 복사한 Personal Access Token 붙여넣기

### 방법 3: URL에 토큰 포함 (자동 인증)

토큰을 URL에 포함시키면 매번 입력할 필요 없음:

```bash
# 토큰을 URL에 포함 (YOUR_TOKEN을 실제 토큰으로 변경)
git remote set-url origin https://YOUR_TOKEN@github.com/root-jang/finviz-kr.git

# 푸시 (이제 인증 정보 입력 안 해도 됨)
git push -u origin main
```

**예시:**
```bash
git remote set-url origin https://ghp_xxxxxxxxxxxx@github.com/root-jang/finviz-kr.git
git push -u origin main
```

## 추천 방법

**방법 2 (Personal Access Token)**를 추천합니다:
- 안전함
- 매번 입력할 필요 없음 (토큰 저장 가능)
- 명확한 권한 관리

## 단계별 실행

1. GitHub에서 Personal Access Token 생성 (`root-jang` 계정)
2. 터미널에서:
   ```bash
   git push -u origin main
   ```
3. Username: `root-jang` 입력
4. Password: 복사한 토큰 붙여넣기

## 주의사항

- Personal Access Token은 비밀번호가 아닙니다
- 토큰은 한 번만 보여주므로 복사해두세요
- 토큰을 잃어버리면 새로 생성해야 합니다

