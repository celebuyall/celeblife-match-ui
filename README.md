# Haarpeer Report Generator

AI 기반 인플루언서 매칭 리포트 자동 생성 도구

## 프로젝트 개요

Haarpeer Report Generator는 인플루언서 협업 보고서를 자동으로 생성하는 웹 애플리케이션입니다. Google Gemini AI를 활용하여 리포트 텍스트를 분석하고, 인플루언서의 DNA 차트, 매칭 포인트, 콘텐츠 아이디어, 전략적 기둥을 포함한 인터랙티브 대시보드를 생성합니다.

### 주요 기능

- **AI 기반 데이터 추출**: Google Gemini 2.0 Flash를 사용한 리포트 텍스트 자동 분석
- **실시간 미리보기**: 생성될 대시보드를 즉시 확인 가능
- **인터랙티브 대시보드**:
  - 인플루언서 프로필 및 아이덴티티
  - 커머스 DNA 레이더 차트
  - 매칭 스코어 게이지
  - 매칭 포인트 분석
  - 콘텐츠 아이디어 제안
  - 전략적 기둥 (Strategic Pillars)
- **프로젝트 다운로드**: 완성된 React 프로젝트를 ZIP 파일로 다운로드
- **다중 플랫폼 지원**: Instagram, YouTube 인플루언서 지원
- **카테고리별 분석**: 일반, 뷰티, 푸드 카테고리 지원

## 기술 스택

### Frontend
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 7.2.4** - 빌드 도구 및 개발 서버
- **Tailwind CSS 4.1.18** - 스타일링
- **Lucide React** - 아이콘 라이브러리
- **Recharts 3.7.0** - 차트 및 데이터 시각화

### Backend (Serverless)
- **Vercel Functions** - 서버리스 API
- **Google Generative AI** - Gemini 2.0 Flash API
- **@vercel/node** - Vercel 런타임

### Utilities
- **JSZip 3.10.1** - 프로젝트 ZIP 파일 생성

## 설치 방법

### 1. 프로젝트 클론 또는 다운로드

```bash
cd /home/jun/jun/UI/haarpeer-report-generator
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Google AI API 키를 설정합니다:

```bash
cp .env.example .env
```

`.env` 파일 내용:

```
GOOGLE_AI_API_KEY=your_gemini_api_key_here
```

**API 키 발급 방법:**
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. "Create API Key" 클릭
3. 발급된 키를 복사하여 `.env` 파일에 입력

## 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속합니다.

## 빌드 및 배포

### 로컬 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

### Vercel 배포

이 프로젝트는 Vercel에 최적화되어 있습니다.

1. **Vercel CLI 설치** (선택사항):
   ```bash
   npm i -g vercel
   ```

2. **배포**:
   ```bash
   vercel
   ```

3. **환경 변수 설정**:
   - Vercel 대시보드에서 프로젝트 설정으로 이동
   - Environment Variables에 `GOOGLE_AI_API_KEY` 추가

## API 엔드포인트

### POST `/api/extract`

리포트 텍스트를 분석하여 구조화된 TypeScript 코드를 생성합니다.

**요청 본문:**

```json
{
  "reportText": "리포트 내용 전체 텍스트",
  "metadata": {
    "handle": "@influencer_handle",
    "platform": "youtube",
    "profileUrl": "https://youtube.com/@handle",
    "category": "푸드",
    "productStoreUrl": "https://store.example.com",
    "campaignPlanUrl": "https://plan.example.com",
    "channelReportUrl": "https://report.example.com"
  }
}
```

**응답:**

```json
{
  "success": true,
  "dataTs": "// 생성된 TypeScript data.ts 파일 내용"
}
```

**에러 응답:**

```json
{
  "success": false,
  "error": "에러 메시지"
}
```

### 요청 검증

- `reportText`: 필수, 문자열
- `metadata.handle`: 필수, 인플루언서 핸들
- `metadata.platform`: 필수, `"instagram"` 또는 `"youtube"`
- `metadata.category`: 필수, `"일반"`, `"뷰티"`, 또는 `"푸드"`
- `metadata.profileUrl`: 필수, 프로필 URL
- `metadata.productStoreUrl`: 필수, 상품 스토어 URL
- `metadata.campaignPlanUrl`: 필수, 캠페인 기획서 URL
- `metadata.channelReportUrl`: 필수, 채널 리포트 URL

### 에러 처리

- `400`: 잘못된 요청 (필수 필드 누락, 잘못된 형식)
- `405`: 허용되지 않은 메서드 (POST만 허용)
- `500`: 서버 오류 (API 키 미설정, Gemini API 오류)

### 타임아웃 및 재시도

- 요청 타임아웃: 60초
- 자동 재시도: 1회 (네트워크 오류 및 5xx 에러만)

## 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|-----------|
| `GOOGLE_AI_API_KEY` | Google Gemini API 키 | 필수 |

## 프로젝트 구조

```
haarpeer-report-generator/
├── api/
│   └── extract.ts              # Vercel Serverless Function (Gemini AI 호출)
├── src/
│   ├── components/
│   │   ├── DeployButton.tsx    # 프로젝트 다운로드 버튼
│   │   ├── LoadingState.tsx    # 로딩 상태 표시
│   │   ├── MetadataForm.tsx    # 메타데이터 입력 폼
│   │   ├── PreviewFrame.tsx    # 대시보드 미리보기
│   │   └── ReportInput.tsx     # 리포트 텍스트 입력
│   ├── lib/
│   │   ├── api.ts              # API 클라이언트 (타임아웃, 재시도 로직)
│   │   ├── projectGenerator.ts # ZIP 파일 생성 로직
│   │   ├── types.ts            # TypeScript 타입 정의
│   │   └── prompts/
│   │       └── food-extract.ts # Gemini AI 프롬프트
│   ├── templates/
│   │   └── food/               # 생성될 대시보드 템플릿
│   │       ├── App.tsx         # 대시보드 메인 컴포넌트
│   │       ├── data.ts         # 데이터 구조 샘플
│   │       ├── types.ts        # 타입 정의
│   │       └── components/
│   │           ├── Icons.tsx   # 아이콘 컴포넌트
│   │           └── Logo.tsx    # 로고 컴포넌트
│   ├── App.tsx                 # 메인 애플리케이션
│   ├── main.tsx                # React 엔트리 포인트
│   └── index.css               # 글로벌 스타일 (Tailwind 설정)
├── public/
│   └── vite.svg                # 파비콘
├── .env.example                # 환경 변수 템플릿
├── package.json                # 프로젝트 의존성
├── tsconfig.json               # TypeScript 설정
├── vite.config.ts              # Vite 설정
├── vercel.json                 # Vercel 배포 설정
└── README.md                   # 이 파일
```

## 사용 방법

### 1. 리포트 입력

왼쪽 패널의 "보고서 내용" 영역에 인플루언서 매칭 리포트 전체 텍스트를 붙여넣습니다.

### 2. 메타데이터 입력

메타데이터 폼에 다음 정보를 입력합니다:
- **인플루언서 핸들**: 예) `@foodie_lee`
- **플랫폼**: Instagram 또는 YouTube 선택
- **프로필 URL**: 인플루언서 채널 링크
- **카테고리**: 일반, 뷰티, 푸드 중 선택
- **상품 스토어 URL**: 제품 페이지 링크
- **캠페인 기획서 URL**: 캠페인 기획 문서 링크
- **채널 리포트 URL**: 채널 분석 리포트 링크

### 3. 보고서 생성

"보고서 생성" 버튼을 클릭하면:
1. AI가 리포트를 분석합니다 (약 10-30초 소요)
2. 오른쪽 패널에 실시간 미리보기가 표시됩니다
3. 생성이 완료되면 "프로젝트 다운로드" 버튼이 활성화됩니다

### 4. 프로젝트 다운로드

"프로젝트 다운로드 (ZIP)" 버튼을 클릭하면:
- 완전한 React 프로젝트가 ZIP 파일로 다운로드됩니다
- 압축 해제 후 `npm install` → `npm run dev`로 실행 가능합니다

## 생성되는 대시보드 구성

생성되는 대시보드는 다음 섹션으로 구성됩니다:

1. **인플루언서 프로필 히어로**
   - 프로필 이미지 및 기본 정보
   - 핵심 아이덴티티 태그
   - 커머스 DNA 레이더 차트

2. **제품 정의 (Product Definition)**
   - 제품 하이라이트
   - 핵심 콘셉트

3. **매칭 스코어 (Match Score)**
   - 매칭 점수 게이지 (0-100)
   - 시너지 요약

4. **매칭 포인트 분석**
   - 핵심 매칭 포인트
   - 연결 논리 및 근거

5. **콘텐츠 아이디어**
   - 3가지 콘텐츠 제안
   - 콘셉트 및 전개 방향

6. **전략적 기둥 (Strategic Pillars)**
   - 3가지 전략적 접근 방식
   - 맥락, 솔루션, 핵심 포인트

## 개발 가이드

### 컴포넌트 수정

- `src/components/`: 재사용 가능한 UI 컴포넌트
- `src/templates/food/`: 생성되는 대시보드 템플릿 (수정 시 프로젝트 다운로드에 반영)

### 프롬프트 수정

AI 추출 로직을 변경하려면:
- `src/lib/prompts/food-extract.ts`: Gemini AI 프롬프트 수정

### 스타일 커스터마이징

- `src/index.css`: Tailwind CSS 커스텀 컬러 (`--color-olive-*`)
- Olive 톤 중심의 디자인 시스템 사용

## 트러블슈팅

### API 키 오류
```
Server configuration error: GOOGLE_AI_API_KEY not set
```
→ `.env` 파일에 `GOOGLE_AI_API_KEY`가 설정되어 있는지 확인하세요.

### 타임아웃 오류
```
요청 시간이 초과되었습니다.
```
→ 리포트 텍스트가 너무 길거나 네트워크가 느릴 수 있습니다. 다시 시도하세요.

### CORS 오류 (로컬 개발 시)
→ `api/extract.ts`에 CORS 헤더가 설정되어 있습니다. Vercel 개발 서버 사용을 권장합니다:
```bash
vercel dev
```

## 라이선스

이 프로젝트는 비공개(Private) 프로젝트입니다.

## 기여

내부 프로젝트로, 기여는 팀원으로 제한됩니다.

## 지원

문의사항이나 버그 리포트는 프로젝트 관리자에게 연락하세요.

---

**Made with AI & ❤️ by Haarpeer Team**
