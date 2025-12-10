# GitHub 인증 문제 해결

## 문제 상황
```
remote: Permission to root-jang/finviz-kr.git denied to jang-geunho.
fatal: unable to access 'https://github.com/root-jang/finviz-kr.git/': The requested URL returned error: 403
```

## 원인 확인

### 1. 저장소 소유자 확인
- 저장소 URL: `root-jang/finviz-kr`
- 로그인 계정: `jang-geunho`
- **문제**: 다른 사용자의 저장소에 접근하려고 함

### 해결 방법 1: 본인 계정으로 저장소 생성 (추천)

1. **GitHub에서 본인 계정으로 로그인 확인**
   - 현재 로그인한 계정이 `jang-geunho`인지 확인

2. **새 저장소 생성**
   - Repository name: `finviz-kr`
   - 소유자: `jang-geunho` (본인 계정)
   - Create repository

3. **원격 저장소 URL 변경**
   ```bash
   # 기존 원격 저장소 제거
   git remote remove origin
   
   # 본인 계정 저장소로 추가
   git remote add origin https://github.com/jang-geunho/finviz-kr.git
   
   # 푸시
   git push -u origin main
   ```

### 해결 방법 2: Personal Access Token 사용

`root-jang` 계정의 저장소에 접근하려면 Personal Access Token이 필요합니다.

#### Personal Access Token 생성

1. **GitHub 로그인**
2. **우측 상단 프로필 클릭** → **Settings**
3. **왼쪽 하단 Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token (classic)** 클릭
6. **Note**: "finviz-kr" 입력
7. **Expiration**: 원하는 기간 선택 (예: 90 days)
8. **Select scopes**: 
   - ✅ `repo` (전체 체크)
   - ✅ `workflow` (필요시)
9. **Generate token** 클릭
10. **토큰 복사** (⚠️ 한 번만 보여줌! 복사해두기)

#### 토큰으로 푸시

```bash
# 푸시 시도
git push -u origin main

# Username 입력: jang-geunho (또는 root-jang)
# Password 입력: 복사한 Personal Access Token 붙여넣기
```

또는 URL에 토큰 포함:
```bash
git remote set-url origin https://토큰@github.com/root-jang/finviz-kr.git
git push -u origin main
```

## 추천 방법

**본인 계정(`jang-geunho`)으로 새 저장소를 만드는 것을 추천합니다.**

이유:
- 권한 문제 없음
- Personal Access Token 불필요
- 더 안전함

## 단계별 해결

### 방법 1 실행 (본인 계정 사용)

1. GitHub에서 `jang-geunho` 계정으로 로그인
2. 새 저장소 생성: `finviz-kr`
3. 터미널에서:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/jang-geunho/finviz-kr.git
   git push -u origin main
   ```

### 방법 2 실행 (토큰 사용)

1. Personal Access Token 생성 (위 방법 참고)
2. 터미널에서:
   ```bash
   git push -u origin main
   # Username: jang-geunho
   # Password: (토큰 붙여넣기)
   ```

