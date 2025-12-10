# 다음 단계 가이드

## ✅ 완료된 작업

- [x] 프로젝트 초기화
- [x] 개발 환경 구축
- [x] 핵심 기능 구현
- [x] Git 초기화 및 커밋
- [x] GitHub에 푸시 완료!

## 🎯 다음 단계

### 1. GitHub에서 확인

1. **브라우저에서 GitHub 접속**: https://github.com/root-jang/finviz-kr
2. **파일들이 올라갔는지 확인**
3. **README.md 파일 확인** (프로젝트 설명)

### 2. 앞으로 개발할 때 워크플로우

#### 코드 수정 후 GitHub에 올리기

```bash
# 1. 변경사항 확인
git status

# 2. 파일 추가
git add .

# 3. 커밋 (변경사항 저장)
git commit -m "변경 내용 설명"

# 4. GitHub에 푸시
git push
```

**예시:**
```bash
git add .
git commit -m "홈페이지 제목 수정"
git push
```

### 3. VS Code에서 Git 사용 (GUI 방법)

1. **왼쪽 사이드바 소스 제어 아이콘** 클릭 (`Ctrl + Shift + G`)
2. **변경된 파일 확인**
3. **+ 버튼**으로 스테이징
4. **커밋 메시지 입력** 후 **✓ 버튼** 클릭
5. **... 메뉴** → **Push** 클릭

### 4. 다음 개발 작업

#### 우선순위 1: 실제 데이터 API 연동

현재는 샘플 데이터를 사용 중입니다. 실제 데이터를 가져오려면:

1. **KRX 공공데이터포털 API 연동**
   - https://www.data.go.kr/
   - 무료 API 신청
   - `data/collect_stocks.py` 수정

2. **DART API 연동** (재무정보)
   - https://opendart.fss.or.kr/
   - API 키 신청 (무료)
   - `data/collect_financials.py` 구현

#### 우선순위 2: 데이터베이스 연동

1. **Python 스크립트로 데이터 수집**
   ```bash
   cd data
   python collect_stocks.py
   python collect_prices.py
   ```

2. **Next.js API에서 데이터베이스 조회**
   - `app/api/stocks/route.ts` 수정
   - SQLite 데이터베이스 연결

#### 우선순위 3: 추가 기능

1. **재무정보 상세 페이지**
2. **뉴스/공시 정보 연동**
3. **사용자 관심종목 기능**
4. **실시간 데이터 업데이트**

### 5. 배포 준비

#### Vercel 배포 (가장 쉬움)

1. **Vercel 접속**: https://vercel.com
2. **GitHub 계정으로 로그인**
3. **New Project** 클릭
4. **GitHub 저장소 선택**: `root-jang/finviz-kr`
5. **Deploy** 클릭
6. **자동으로 배포됨!**

#### 도메인 연결

1. **도메인 구매** (예: namecheap, 가비아 등)
2. **Vercel에서 도메인 연결**
3. **DNS 설정**

## 📝 커밋 메시지 작성 팁

좋은 커밋 메시지 예시:
- `"홈페이지 제목 및 설명 수정"`
- `"종목 리스트 페이지 스타일 개선"`
- `"KRX API 연동 추가"`
- `"반응형 디자인 개선"`

나쁜 커밋 메시지 예시:
- `"수정"`
- `"asdf"`
- `"123"`

## 🔄 일상적인 개발 워크플로우

1. **코드 수정**
2. **로컬에서 테스트** (`npm run dev`)
3. **작동 확인**
4. **커밋 및 푸시**
5. **GitHub에서 확인**

## 🎉 축하합니다!

프로젝트가 GitHub에 성공적으로 올라갔습니다!

이제 자유롭게 개발하시면 됩니다. 궁금한 점이 있으면 언제든지 물어보세요!

