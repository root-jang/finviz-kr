# Git 사용자 정보 설정 가이드

## 사용자 정보 설정이란?

Git에서 **커밋(변경사항 저장)을 할 때 누가 했는지 기록**하기 위한 정보입니다.
- **이름**: 커밋 작성자 이름
- **이메일**: 커밋 작성자 이메일

## 왜 필요한가?

컴퓨터에 Git을 처음 설치하면 "누가 이 변경사항을 만들었는지" 모르기 때문에 설정이 필요합니다.
- 팀 프로젝트에서 누가 무엇을 수정했는지 추적 가능
- GitHub에서 커밋 히스토리 확인 시 표시됨

## 이메일은 뭘 써야 하나?

### 옵션 1: GitHub 가입 이메일 (추천)
- GitHub 계정과 연결되어 있으면 좋음
- 공개 저장소에서 프로필 연결 가능

### 옵션 2: 다른 이메일
- 아무 이메일이나 사용 가능
- GitHub과 연결되지 않아도 됨

### 옵션 3: GitHub noreply 이메일 (프라이버시)
- GitHub에서 제공하는 noreply 이메일 사용
- 실제 이메일 주소를 숨기고 싶을 때

## 설정 방법

### VS Code 터미널에서 실행:

```bash
# 이름 설정 (본인 이름 또는 GitHub 사용자명)
git config --global user.name "당신의 이름"

# 이메일 설정 (GitHub 가입 이메일 또는 원하는 이메일)
git config --global user.email "your-email@example.com"
```

**예시:**
```bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
```

## 설정 확인

설정이 제대로 되었는지 확인:
```bash
git config --global user.name
git config --global user.email
```

## 주의사항

- `--global` 옵션: 컴퓨터 전체에 적용 (모든 프로젝트에 사용)
- 프로젝트별로 다르게 설정하려면 `--global` 제거
- 한 번만 설정하면 됨 (다음부터는 안 해도 됨)

## GitHub 이메일 확인 방법

1. GitHub 로그인
2. 우측 상단 프로필 클릭 → **Settings**
3. 왼쪽 메뉴에서 **Emails** 클릭
4. Primary email 또는 다른 이메일 확인

## 다음 단계

사용자 정보 설정 후:
1. `git add .` - 파일 추가
2. `git commit -m "메시지"` - 커밋
3. GitHub에 푸시

