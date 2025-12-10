# Git 인증 정보 확인 방법

## Git이 사용한 계정 확인

### 방법 1: Windows 자격 증명 관리자 확인

1. **Windows 검색**에서 "자격 증명 관리자" 또는 "Credential Manager" 검색
2. **Windows 자격 증명 관리자** 실행
3. **Windows 자격 증명** 탭 클릭
4. **일반 자격 증명** 섹션에서 찾기:
   - `git:https://github.com`
   - 또는 `github.com`
5. 클릭하면 **사용자 이름** 확인 가능

**여기서 보이는 사용자 이름이 Git이 사용한 계정입니다.**

### 방법 2: Git 설정 확인

터미널에서:
```bash
# Git 사용자 이름 확인
git config --global user.name

# Git 사용자 이메일 확인
git config --global user.email
```

**참고**: 이것은 커밋 작성자 정보일 뿐, GitHub 인증 계정과는 다를 수 있습니다.

### 방법 3: GitHub에서 확인

1. **GitHub 로그인** (`root-jang` 계정)
2. **우측 상단 프로필** → **Settings**
3. **Security** → **Active sessions** 또는 **Personal access tokens** 확인

## jang-geunho 계정이 나타나는 이유

가능한 원인:
1. **이전에 다른 계정으로 로그인했음**
   - Windows 자격 증명 관리자에 저장됨
2. **회사 계정으로 로그인했음**
   - `jang-geunho`가 회사 계정이라면 이전에 사용했을 수 있음
3. **Git 설정에 다른 이메일이 저장됨**

## 해결 방법

### 1. Windows 자격 증명 삭제

1. **자격 증명 관리자** 실행
2. **Windows 자격 증명** 탭
3. `git:https://github.com` 찾기
4. **화살표 클릭** → **제거** 클릭
5. 다시 푸시 시도:
   ```bash
   git push -u origin main
   ```
6. 이번에는 `root-jang` 계정 정보 입력

### 2. Personal Access Token 사용 (가장 확실)

1. **GitHub 로그인** (`root-jang` 계정)
2. **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. **repo** 체크 → **Generate token**
5. **토큰 복사**
6. 푸시 시:
   ```bash
   git push -u origin main
   ```
   - Username: `root-jang`
   - Password: 복사한 토큰

## 확인 체크리스트

- [ ] Windows 자격 증명 관리자에서 `git:https://github.com` 확인
- [ ] 사용자 이름이 `jang-geunho`인지 확인
- [ ] 자격 증명 삭제 또는 Personal Access Token 사용

