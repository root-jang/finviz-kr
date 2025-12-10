# Git 저장소 구조 문제 해결

## 문제 상황

GitHub에 `OneDrive/문서/GitHub/finviz_kr` 경로가 포함되어 올라갔습니다.
이는 Git 저장소가 상위 폴더에서 초기화되었거나, 잘못된 위치에서 커밋했을 가능성이 있습니다.

## 해결 방법

### 1단계: .git 폴더 위치 확인

VS Code 터미널에서:
```bash
# 현재 폴더에 .git이 있는지 확인
dir .git
```

또는 상위 폴더 확인:
```bash
cd ..
dir .git
```

### 2단계: 잘못된 .git 폴더 제거

상위 폴더에 .git이 있다면:
```bash
# 상위 폴더로 이동
cd ..

# .git 폴더 삭제 (주의!)
rmdir /s /q .git
```

### 3단계: 올바른 위치에서 Git 초기화

프로젝트 폴더로 돌아가서:
```bash
# 프로젝트 폴더로 이동
cd finviz_kr

# Git 초기화
git init

# 사용자 정보 설정 (이미 했다면 생략)
git config user.name "root-jang"
git config user.email "your-email@example.com"
```

### 4단계: 파일 추가 및 커밋

```bash
# 모든 파일 추가
git add .

# 커밋
git commit -m "프로젝트 구조 수정"
```

### 5단계: GitHub에 다시 푸시

```bash
# 원격 저장소 확인
git remote -v

# 원격 저장소가 없다면 추가
git remote add origin https://github.com/root-jang/finviz-kr.git

# 강제 푸시 (기존 내용 덮어쓰기)
git push -u origin main --force
```

**주의**: `--force` 옵션은 기존 내용을 덮어씁니다. 혼자 작업하는 경우에만 사용하세요!

## VS Code에서 확인

1. **왼쪽 파일 탐색기**에서 `.git` 폴더 확인
2. `.git` 폴더가 프로젝트 루트에 있어야 함
3. 상위 폴더에 `.git`이 있다면 문제!

## 올바른 구조

```
finviz_kr/
├── .git/          ← 여기에 있어야 함!
├── app/
├── components/
├── package.json
└── ...
```

## 잘못된 구조

```
OneDrive/
└── 문서/
    └── GitHub/
        ├── .git/  ← 여기 있으면 안 됨!
        └── finviz_kr/
            ├── app/
            └── ...
```

