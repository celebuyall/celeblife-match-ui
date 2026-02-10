# Vercel 배포 완전 가이드

Vite + React + Vercel Serverless를 배포할 때 발생하는 모든 문제와 해결책을 정리한 실전 가이드입니다.

## 배포 아키텍처

```
Frontend: Vite + React
├─ src/                    (클라이언트 코드)
│  └─ lib/api.ts          (API 호출)
├─ api/                    (Vercel Serverless Functions)
│  ├─ extract.ts          (API 엔드포인트)
│  ├─ food-extract.ts     (음식 추출 로직)
│  ├─ template-files.ts   (리포트 템플릿)
│  └─ tsconfig.json       (Serverless 전용 설정)
└─ vercel.json            (Vercel 배포 설정)
```

---

## 발생한 8가지 문제와 해결책

### 문제 1: vercel.json 캐치올 리라이트가 vercel dev를 깬다

**증상**
```
Failed to parse source for import analysis because the content contains invalid JS syntax
```

**원인**
`vercel.json`에서 SPA 폴백을 위해 캐치올 리라이트를 설정하면:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Vite 개발 서버가 HTML을 JavaScript로 해석하려다가 실패합니다.

**해결책**
Vercel의 `framework: "vite"` 설정이 자동으로 SPA 폴백을 처리하므로 캐치올 리라이트를 제거합니다.

```json
{
  "framework": "vite",
  "buildCommand": "vite build",
  "outputDirectory": "dist"
}
```

**교훈**
프레임워크를 명시하면 Vercel이 알아서 라우팅을 처리합니다. 수동으로 덮어씌우지 마세요.

---

### 문제 2: 기존 Vercel 프로젝트 이름 충돌

**증상**
```
Missing required fields: reportA, reportB, meta
```

**원인**
`vercel dev` 실행 시 `.vercel` 디렉토리가 로컬에 저장된 프로젝트 정보를 읽습니다.
만약 해당 Vercel 프로젝트가 이전 코드(reportA, reportB, meta를 요구하는)를 배포했다면,
새 코드의 API 스펙과 맞지 않는 오류가 발생합니다.

**해결책**
```bash
# 로컬 프로젝트 설정 초기화
rm -rf .vercel

# 다시 링크 (새로운 프로젝트 이름으로)
vercel link
# → 프로젝트 이름을 celeblife-match-ui 같은 다른 이름으로 설정
```

**교훈**
기존 프로젝트를 UI/스펙 변경하면서 유지하기 어렵습니다. 깔끔한 시작을 위해 새 프로젝트를 만드세요.

---

### 문제 3: API_BASE_URL 포트 불일치

**증상**
```
네트워크 오류 (Network error)
Fetch failed to http://localhost:3000/api
```

**원인**
`src/lib/api.ts`가 개발 환경에서 하드코딩:
```typescript
const API_BASE_URL = 'http://localhost:3000/api';
```

하지만 포트 3000이 다른 프로세스에서 사용 중이면, `vercel dev`는 자동으로 포트 3001을 사용합니다.

**해결책**
```bash
# 포트 3000을 사용하는 프로세스 종료
lsof -ti:3000 | xargs kill -9

# vercel dev 재시작
vercel dev
```

또는 환경 변수로 동적 설정:
```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
```

**교훈**
로컬 개발에서는 환경에 따라 포트가 달라질 수 있습니다. 하드코딩을 피하세요.

---

### 문제 4: DeployButton에서 theme 필드 누락

**증상**
```
TS2741: Property 'theme' is missing
```

**원인**
공유 인터페이스에 `theme` 필드를 추가했는데,
`src/components/DeployButton.tsx`가 자신만의 `Metadata` 인터페이스를 정의했습니다.

```typescript
// 여러 파일에 같은 이름의 인터페이스가 산재되어 있음
interface Metadata {
  category: string;
  foodName: string;
  // theme이 없음!
}
```

**해결책**
1. 공유 인터페이스를 한 파일에 정의:
```typescript
// src/types/index.ts
export interface Metadata {
  category: string;
  foodName: string;
  theme: '뷰티' | '푸드';
}
```

2. 모든 파일에서 import:
```typescript
// src/components/DeployButton.tsx
import { Metadata } from '../types';
```

3. 중복 정의 검사:
```bash
grep -r "interface Metadata" src/
# 한 곳에서만 나와야 함
```

**교훈**
인터페이스를 수정하면 항상 그 인터페이스를 사용하는 모든 곳을 검사하세요.
```bash
grep -r "interface [이름]" .
```

---

### 문제 5: Vercel 프로덕션에서 환경 변수 미설정

**증상**
```
네트워크 오류
GOOGLE_AI_API_KEY is undefined
```

**원인**
`.env` 파일은 로컬 개발 전용입니다.
Vercel에 배포되면 로컬 파일에 접근할 수 없으므로, 프로덕션에서 API 키가 없어 API 함수가 실패합니다.

**해결책**
Vercel 대시보드에서 환경 변수를 설정합니다:

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. Settings → Environment Variables
4. 필요한 변수 추가:

| 변수명 | 값 | 필수 | 설명 |
|--------|-----|------|------|
| `GOOGLE_AI_API_KEY` | Google AI API 키 | ✓ | Gemini API 호출용 |
| `VERCEL_DEPLOY_TOKEN` | Vercel 토큰 | ✗ | 필요시만 |
| `VERCEL_TEAM_ID` | Team ID | ✗ | 팀 프로젝트용 |

5. "Save and Redeploy" 클릭

**교훈**
프로덕션은 로컬과 완전히 다른 환경입니다. 모든 외부 의존성(API 키, DB 연결)을 명시적으로 설정하세요.

---

### 문제 6: Vercel Serverless TypeScript 컴파일 설정 불일치

**증상**
```
Relative import paths need explicit file extensions
Cannot use JSX unless the '--jsx' flag is provided
```

**원인**
Vercel의 Serverless 함수 컴파일러가 기본으로 `moduleResolution: node16`을 사용합니다.
이는 다음을 요구합니다:
- 상대 import에 명시적 확장자 필요
- JSX 사용 불가

하지만 API 코드가 두 가지를 모두 필요로 합니다.

**해결책**
`api/tsconfig.json` 생성:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "lib": ["ES2020"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true
  }
}
```

**주요 설정**
- `moduleResolution: "bundler"`: 확장자 없이 import 가능
- `jsx: "react-jsx"`: JSX 지원

**교훈**
API와 클라이언트는 다른 환경에서 실행됩니다. 각각 전용 tsconfig를 가져야 합니다.

---

### 문제 7: Vercel Serverless가 api/ 외부 import를 해결할 수 없다

**증상**
```
ERR_MODULE_NOT_FOUND
Cannot find module '../src/lib/prompts/food-extract'
```

**원인**
`api/extract.ts`가 `src/` 디렉토리의 파일을 import:
```typescript
import { extractFood } from '../src/lib/prompts/food-extract';
```

Vercel의 Serverless 번들러는 `api/` 디렉토리를 진입점으로 사용하며,
외부 디렉토리의 모든 파일을 번들링하지 않습니다.

**해결책**
`src/lib/prompts/food-extract.ts`를 `api/food-extract.ts`로 이동:

```
before:
src/lib/prompts/food-extract.ts
api/extract.ts ← import '../src/lib/prompts/food-extract'

after:
api/food-extract.ts
api/extract.ts ← import './food-extract'
```

그런 다음 import 업데이트:
```typescript
// api/extract.ts
import { extractFood } from './food-extract.js';
```

**교훈**
Serverless 함수의 모든 의존성은 `api/` 디렉토리에 함께 위치해야 합니다.
크로스 디렉토리 import는 프로덕션에서 실패합니다.

---

### 문제 8: Node.js ESM은 명시적 .js 확장자를 요구한다

**증상**
```
ERR_MODULE_NOT_FOUND
Cannot find module './food-extract'
```

**원인**
`package.json`에 `"type": "module"`이 설정되어 있으면,
Node.js는 모든 import에 명시적 파일 확장자를 요구합니다.

```typescript
// ❌ 실패
import { extractFood } from './food-extract';

// ✓ 성공
import { extractFood } from './food-extract.js';
```

**해결책**
`api/` 디렉토리의 모든 로컬 import에 `.js` 확장자 추가:

```typescript
// api/extract.ts
import { extractFood } from './food-extract.js';
import { getTemplates } from './template-files.js';
```

확인용 명령어:
```bash
grep -r "from '\." api/ | grep -v "\.js"
# 결과가 없어야 함
```

**교훈**
Vercel 프로덕션은 ESM을 사용합니다. 로컬 import는 항상 `.js` 확장자가 필요합니다.

---

### 문제 9: 배포된 리포트 템플릿의 타입 오류

**증상**
```
TS7053: Element implicitly has an 'any' type
'theme' implicitly has type 'any'
```

**원인**
AI가 생성한 데이터는 `theme: string`이지만,
템플릿 코드에서 이를 타입 안전하게 처리합니다:

```typescript
// AI 데이터
const data = { theme: 'beauty' }; // string

// 템플릿 코드
const colors: Record<ItemTheme, ItemThemeColors> = getThemeColors();
const themeColors = colors[data.theme]; // TS7053 에러
```

AI가 제공하는 데이터는 정확한 타입을 보장할 수 없기 때문입니다.

**해결책**
`api/template-files.ts`의 tsconfig에서 `noImplicitAny: false` 설정:

```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "strict": false
  }
}
```

또는 코드에서 타입 단언:
```typescript
const themeColors = colors[data.theme as ItemTheme];
```

**교훈**
자동 생성 데이터를 처리하는 코드는 엄격한 타입 검사보다 유연성이 중요합니다.

---

## 배포 전 체크리스트

배포하기 전에 반드시 확인하세요:

### 1. vercel.json 설정
- [ ] `framework: "vite"` 설정됨
- [ ] 캐치올 리라이트 없음 (`source: "/(.*)"` 제거됨)
- [ ] buildCommand와 outputDirectory 명시됨

### 2. API 폴더 구조
- [ ] 모든 api/ 로컬 import에 `.js` 확장자 있음
  ```bash
  grep -r "from '\." api/ | grep -v "\.js"
  # 결과가 없어야 함
  ```
- [ ] api/ 의존성이 모두 api/ 디렉토리에 위치함
  ```bash
  # src/ 에서 import하는 항목 없음
  grep -r "from '\.\./src" api/
  ```

### 3. TypeScript 설정
- [ ] `api/tsconfig.json` 존재
- [ ] `moduleResolution: "bundler"` 설정됨
- [ ] `jsx: "react-jsx"` 설정됨
- [ ] 프로젝트 루트 tsconfig와 분리됨

### 4. 인터페이스 일관성
- [ ] 공유 타입이 한 파일에만 정의됨
  ```bash
  grep -r "interface Metadata" src/
  grep -r "interface ReportData" src/
  # 각각 한 곳에서만 나와야 함
  ```
- [ ] 모든 컴포넌트가 공유 타입을 import함

### 5. 환경 변수
- [ ] `.env.local` 또는 `.env.development`에 개발용 변수 설정됨
- [ ] Vercel 대시보드에 프로덕션 변수 설정됨
  - `GOOGLE_AI_API_KEY`
  - (필요시) `VERCEL_DEPLOY_TOKEN`
  - (필요시) `VERCEL_TEAM_ID`

### 6. 템플릿 TypeScript
- [ ] 템플릿 파일의 noImplicitAny가 false이거나 타입 단언 사용

### 7. 로컬 테스트
- [ ] `vercel dev` 성공적 실행
  ```bash
  vercel dev
  # 포트 3000 (또는 3001)에서 정상 실행
  ```
- [ ] 브라우저에서 모든 기능 테스트
- [ ] API 호출이 정상 작동

### 8. 프로젝트 이름
- [ ] Vercel 프로젝트 이름이 기존 프로젝트와 충돌하지 않음
- [ ] 새로운 환경인 경우 `.vercel` 디렉토리 제거 후 재링크

### 9. 배포 후 확인
- [ ] Vercel 배포 로그에 에러 없음
- [ ] 프로덕션 URL에서 앱이 정상 로드됨
- [ ] 모든 API 호출이 작동함
- [ ] 환경 변수가 정상 로드됨

---

## 문제 해결 플로우

배포 후 문제가 발생하면 이 순서대로 확인하세요:

```
1. Vercel 대시보드에서 배포 로그 확인
   ├─ 빌드 에러 있음? → 4번으로
   └─ 빌드 성공? → 2번으로

2. 프로덕션 URL 접속
   ├─ 페이지 로드 실패? → 3번으로
   ├─ 페이지 로드 성공, API 호출 실패? → 5번으로
   └─ 모두 성공? → 완료!

3. 정적 파일 문제 확인
   ├─ vercel.json의 rewrites 확인
   ├─ outputDirectory가 "dist"인지 확인
   └─ build를 다시 시도

4. 빌드 에러 분석
   ├─ "ERR_MODULE_NOT_FOUND"? → 문제 7, 8 참고
   ├─ "TS 에러"? → 문제 4, 6, 9 참고
   └─ 기타? → 로그 메시지 검색

5. API 호출 실패
   ├─ 네트워크 에러? → 문제 3, 5 참고
   ├─ 함수 실행 에러? → 문제 6, 7, 8, 9 참고
   └─ 권한 에러? → 환경 변수 확인 (문제 5)
```

---

## 참고: 로컬 개발 vs 프로덕션 차이

| 항목 | 로컬 개발 | 프로덕션 |
|------|---------|---------|
| 파일 접근 | 모든 파일 가능 | api/ 및 dist만 가능 |
| Import 확장자 | 선택사항 | 필수 (.js) |
| 환경 변수 | .env 파일 | Vercel 대시보드 |
| TypeScript 컴파일 | 프로젝트 루트 tsconfig | api/tsconfig.json (함수용) |
| 라우팅 | framework 자동 처리 | 수동 rewrites (권장 안 함) |
| 네트워크 | localhost 접근 가능 | 외부 API만 |

---

## 유용한 명령어

```bash
# 로컬 개발 시작
vercel dev

# 프로덕션 빌드 테스트
npm run build && vercel build && vercel start

# 배포 전 lint 확인
npx tsc --noEmit
npx eslint src/ api/

# import 확장자 검사
grep -r "from '\." api/ | grep -v "\.js"

# 중복 인터페이스 검사
grep -r "interface " src/ | cut -d: -f1 | sort | uniq -d

# 포트 사용 확인
lsof -ti:3000
```

---

## 결론

이 9가지 문제는 모두 **로컬 개발 환경과 Vercel 프로덕션 환경의 근본적인 차이**에서 비롯됩니다.

핵심 원칙:
1. **api/ 디렉토리는 독립적인 환경** - 외부 의존성 없음
2. **파일 확장자는 필수** - ESM 환경에서
3. **환경 변수는 명시적으로** - 프로덕션에서
4. **타입은 유연하게** - AI 생성 데이터 처리 시
5. **로컬 테스트 필수** - `vercel dev`로 항상 검증

이 가이드를 참고하여 배포 문제를 예방하고 빠르게 해결하세요.
