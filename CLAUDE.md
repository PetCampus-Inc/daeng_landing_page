# daeng_landing_page (똑독 랜딩페이지 리디자인)

Next.js 15 (App Router) · React 19 · Tailwind v4 · framer-motion 기반 랜딩페이지.
현재 진행 중인 작업: **랜딩페이지 리디자인 2026** ([KD3-255]).

원본 문서는 아래를 기준으로 한다. 값이 충돌하면 **디자인시스템.md > PRD > 기존 코드** 순으로 우선.

- 디자인 시스템: `meta/` 또는 별도 첨부 (`knockdog_landing_designsystem.md`)
- PRD: `knockdog_landing_prd.md` (S-01~S-09 화면 구성 / FR-LP-\* 기능 요구사항 / P-\* 정책)
- 와이어프레임: PC / 모바일 목업 이미지 (첨부)
- 파비콘 원본: `knockdog_favicon.svg` (오렌지 배경 `#FF6E0C` + 흰색 "똑독" 로고마크)

---

## 브랜치 규칙

- `main`에 직접 커밋 금지. 작업 브랜치: **`feature/landing-redesign-2026`**.

---

## 1. 디자인 작업 규칙 (필수)

랜딩 섹션을 **새로 만들거나 수정할 때마다** 먼저 `.claude/skills/frontend-design/SKILL.md`
(Anthropic 공식 frontend-design 스킬, 원문 그대로 보관)를 읽고 그 원칙을 적용한다.
스킬은 조용히 적용해도 되지만, 아래 프로젝트 고유 규칙이 스킬보다 우선한다.

### 1.1 브랜드 방향 (고정 — 모든 섹션 일관 유지)

- **베이스**: 미니멀 화이트. `background` / `surface` 계열 위에 여백으로 구조를 만든다.
- **포인트**: 오렌지(`#FF6E0C`) 하나. 페이지에서 대담하게 쓰는 곳은 소수로 제한하고 주변은 절제.
- 섹션 배경은 화이트 / `surface-accent`(연오렌지) / 풀 오렌지 / 딥 네이비(`#15161B` 계열)로 리듬을 만든다
  (와이어프레임 참고: 신뢰지표=연오렌지, 보호자 섹션=풀 오렌지, 원장 섹션=딥 네이비, 최종 CTA·푸터=오렌지).

### 1.2 피해야 할 AI스러운 패턴 (디자인시스템 8장)

- 보라/파랑 계열 그라디언트 — 브랜드 오렌지 계열만 사용
- 모든 섹션이 동일한 카드+그림자 패턴으로 반복되는 구조 (`shadow-card` 남발 금지)
- 이모지를 아이콘으로 사용 — `src/assets/icons/`의 SVG 컴포넌트만
- 중앙 정렬 일변도 — 섹션마다 좌우 비대칭·이미지 위치 교차로 리듬 (S-04↔S-05 교차)
- 스톡 이미지풍 일러스트 — 실제 앱 스크린샷 + 브랜드 마스코트(흑백 낙서/2등신 chibi/믹스견)만
- 의미 없는 `01 / 02 / 03` 넘버링 (실제 순서일 때만 — S-06 STEP 인디케이터가 그 경우)

### 1.3 인터랙션 · 모션 (PRD 정책 P-03)

- 스크롤 등장 애니메이션은 **기존 framer-motion 패턴만** 사용. 직접 애니메이션 로직 구현 금지.
  - 패턴: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`,
    `transition={{ duration: 0.5, ease: 'easeInOut' }}` (기존 `AppFunctionSection` 참고)
- 섹션 진입 모션은 fade-in + 짧은 slide-up만, **섹션당 최초 1회**.
- 신뢰지표(S-03) 숫자는 진입 시 카운트업 1회 추가.
- 히어로(S-02) `scroll` 문구/화살표는 진입 시부터 bounce 반복, 사용자가 스크롤 시작하면 페이드아웃.
- 버튼류 hover는 색상/투명도 변화 정도의 가벼운 피드백만 (기존 `IconButton`: `transition-all duration-140`, `hover:bg-surface-accent`, `active:scale-95`).
- focus는 키보드에서 보이도록 `:focus-visible` 링을 항상 남긴다 (색만 바꾸지 말 것).
- `prefers-reduced-motion` 존중.
- 패럴랙스·스크롤 목업 순차 전환 등 고난도 모션은 범위 제외 (PRD 2장).
- 팝업(스토어 선택 M-02 등)은 등장 애니메이션 필수, PC/모바일 레이아웃 각각 고려. (기존 `Drawer`/`vaul` 활용 가능)

### 1.4 컴포넌트 컨벤션 (기존 코드 유지)

- **named export** (`export function Foo()` / `export const Foo =`). default export 쓰지 않음.
- 모든 공용/섹션 컴포넌트는 `className?: string` prop을 받고 `cn()`(`@/lib/tw`)으로 병합.
- variant가 필요하면 `class-variance-authority`(`cva`) 사용 (기존 `IconButton` 패턴).
- 클라이언트 상호작용/motion이 있으면 파일 최상단 `'use client'`.
- 섹션 폭 래퍼는 `<Content>` (`@/components/Content`) 사용. 아이콘 버튼은 `<IconButton icon="...">`.
- 섹션 컴포넌트 위치: `src/feature/<page>/<Name>Section.tsx`. 페이지 조립: `src/app/<route>/page.tsx`.
- 데이터(회사정보·QnA 등)는 `fetchGitHubContent()` 통해 `meta/data/*.json`에서 로드.

---

## 2. 디자인 토큰 (디자인시스템.md 기준)

> 아래 값은 `src/styles/theme/*.css` + `src/styles/globals.css`에 **적용 완료**됐다 (커밋: "Apply redesign design tokens").
> 폰트는 SUIT static woff2로 교체(`src/assets/fonts/SUIT-*.woff2`, `next/font/local` → `--suit` → `font-suit`).
> 남은 정렬 작업: 실제 사용 글자만 담은 SUIT 서브셋으로 교체,
> 기존 페이지(work/careers)의 `text-*`·`lg:` 클래스를 새 스케일/브레이크포인트에 맞춰 순차 정리.
> `pnpm build` / `pnpm lint` 통과 확인함 (기존 경고만 잔존).

### 2.1 컬러 — 시맨틱 토큰 (`src/styles/theme/colors.css`)

| 변수 | 값 |
|---|---|
| `--color-primary` | `#FF6E0C` |
| `--color-primary-foreground` | `#FFFFFF` |
| `--color-background` | `#FFFFFF` |
| `--color-surface` | `#F9F9FA` |
| `--color-surface-accent` | `#FFF7EC` |
| `--color-foreground` | `#15161B` |
| `--color-foreground-muted` | `#70727C` |
| `--color-border` | `#F3F3F7` |
| `--color-border-accent` | `#FF6E0C` |

### 2.2 컬러 — Primitive 팔레트 (hover / 상태값 조정용)

- **Neutral**: `0 #FFFFFF` · `50 #F9F9FA` · `100 #F3F3F7` · `200 #EBEBF0` · `300 #DEDEE3` · `400 #B4B4BB` · `500 #8C8C94` · `600 #70727C` · `700 #41424A` · `800 #292A30` · `900 #15161B` · `1000 #000000`
- **Orange**: `50 #FFF7EC` · `100 #FFECD3` · `200 #FFD6A6` · `300 #FFB86E` · `400 #FF8E34` · `500 #FF6E0C` · `600 #F05506` · `700 #C73E07` · `800 #9E310E` · `900 #7F2B0F` · `950 #451305`
- 딤 오버레이: `#0F141A` @ 70% opacity (히어로 이미지 위 텍스트 대비용)
- 버튼 hover는 `primary` → Orange `600`(`#F05506`), active는 Orange `700` 정도로.

### 2.3 타이포그래피 — 폰트 **SUIT** (`src/styles/theme/typo.css`, `src/assets/fonts`)

SUIT = 오픈소스(SIL OFL), https://github.com/sun-typeface/SUIT . `src/assets/fonts/SUIT-{Regular,Medium,SemiBold,Bold}.woff2`
(400/500/600/700), 라이선스 원문 `SUIT-LICENSE.txt`. 추후 서브셋 woff2로 교체 예정.

| 스타일 | 크기 / 줄간격 / 자간 | 용도 |
|---|---|---|
| Display 1 | 56 / 66 / -2% | 히어로 메인 타이틀 (데스크탑) |
| Display 2 | 48 / 58 / -2% | 섹션 대제목 |
| Display 3 | 40 / 50 / -2% | 서브 히어로 |
| Heading 1 | 24 / 34 / -2% | |
| Heading 2 | 20 / 28 / -2% | |
| Heading 3 | 18 / 26 / -2% | |
| Body 1 | 16 / 24 / -1% | 본문 기본 |
| Body 2 | 14 / 20 / -1% | |
| Label | 14 / 18 / -1% | 소라벨·해시태그 |
| Caption 1 | 12 / 18 / -2% | |
| Caption 2 | 11 / 14 / 0% | |

- **모바일에서는 Display 1~3을 각각 한 단계 다운스케일** (D1→D2, D2→D3, D3→H1 크기).
- `tailwind-merge` 확장(`src/lib/tw.ts`)의 `theme.text` 목록도 새 스케일에 맞춰 갱신할 것.

### 2.4 Spacing

`2 · 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64` (px). 완전 둥근 처리용 `Full = 999`.
Tailwind v4 `--spacing` 기준값과 정합되게 사용 (임의 값 `[13px]` 지양).

### 2.5 Radius

`r1 = 4px` · `r2 = 8px` · `r3 = 12px` · `r4 = 16px` · `full = 999px`.

---

## 3. 브레이크포인트 & 컨테이너

| 구간 | 뷰포트 폭 | 레이아웃 기준 | 좌우 패딩 |
|---|---|---|---|
| **모바일** | ~767px | 모바일 목업 (세로 스택) | 16~24px |
| **태블릿** | 768~1359px | **PC 레이아웃을 축소** (모바일 아님) | 24~40px |
| **데스크탑** | 1360px 이상 | PC 목업 | 콘텐츠 폭 고정, 좌우 여백만 증가 |

### 규칙

- 1360px 이상에서 **콘텐츠 폭이 계속 늘어나지 않게** 고정한다.
  콘텐츠 래퍼 고정 폭 `--container-content: 1320px`(132rem, globals.css), `mx-auto`로 중앙 정렬,
  그 이상 넓어지는 공간은 좌우 여백으로만 흡수.
- 태블릿(768~1359)은 모바일 레이아웃으로 바꾸지 않고 **PC 구조를 그대로 축소** (폰트·여백·이미지만 스케일 다운).
  단, 헤더 앵커 메뉴는 모바일에서 햄버거로 전환 (P-04).
- Tailwind 브레이크포인트: `sm 501 / md 768 / lg 1200 / xl 1360` (globals.css). 리디자인 섹션은 **`md`(모바일↔PC축소) + `xl`(데스크탑 고정)** 을 기준으로 쓴다. `sm`·`lg`는 기존 페이지 호환용으로 유지.
- `<Content>` 컴포넌트가 위 규칙의 단일 소스: `mx-auto w-full max-w-content px-4 md:px-6 xl:px-10` (16 / 24 / 40px).

---

## 4. 반응형 기본 방침

- **기본값 = "구조 동일, 크기·여백만 반응형 조정"**. 모바일과 PC가 단순 스케일 차이인 섹션은 하나의 컴포넌트로 처리.
- 모바일/PC가 **배치 자체가 달라지는** 섹션(예: 좌우 스플릿 → 세로 스택, S-06 스텝 인디케이터 방향 전환 등)은
  작업자가 **섹션별 요청 시 그 차이를 명시**한다. 명시 없으면 기본값을 따른다.
- PRD상 명시된 구조 전환: 헤더 메뉴 → 햄버거, S-04·S-05 좌우 교차 → 세로 스택 (P-04).
  S-03 통계 카드 / S-06 스텝 섹션 / S-07 FAQ의 모바일 세부는 목업 확정 후 반영.

---

## 5. 이미지 · 아이콘 · 링크

### 5.1 이미지 (디자인시스템 6장)

- **AI는 이미지 파일을 생성하지 않는다.** 폴더 경로 + 파일명만 지정하고 `<img>`/`next/image`로 참조만 해둔다.
  실제 파일은 디자이너가 이후 채운다. 미존재 시 `alt` + 대체 배경색(`surface`)이 보이게 처리 (E-02 / M-01: "이미지를 불러오지 못했습니다").
- 저장 위치: `src/assets/images/` (또는 `public/images/`). PC용·모바일용 **파일 분리** (공유 금지).
  - 예: `src/assets/images/hero-desktop.png`, `src/assets/images/hero-mobile.png`
  - 앱 스크린샷 명명 예: `s04-map-desktop.png` / `s04-map-mobile.png`, `s05-notice-desktop.png` …
- 해상도는 실제 표시 크기의 1.5배 이상 전제. `alt`에 키워드 자연스럽게 ("강아지 유치원 지도 탐색 화면").
- 이미지 압축 / lazy-load 기본 적용 (Core Web Vitals).
- 앱 스토어 스크린샷 7장 구조: 브랜딩 히어로 → 검색 → 필터 → 비교 → 등하원 알림 → 알림장 → 앨범.

### 5.2 아이콘 / 로고

- 전부 **SVG 컴포넌트** (`src/assets/icons/*.tsx`, `props: React.SVGProps<SVGSVGElement>` 스프레드, `index.ts`에서 re-export).
- 파비콘/OG 로고마크는 `knockdog_favicon.svg` 기반.

### 5.3 링크

- 외부 링크(앱스토어, 약관 Notion 등)는 **새 창**: `target="_blank"` + `rel="noopener noreferrer"`.
- 앱 스토어 URL은 `src/constants/storeLink.ts` 사용 (App Store / Google Play).
- 다운로드 CTA(S-01, S-08): User-Agent로 iOS→App Store, Android→Google Play 바로 이동, 감지 불가(데스크탑)면 스토어 선택 팝업(M-02).

---

## 6. 화면 구성 (PRD 4장 요약 — 상세는 PRD 원본)

| ID | 섹션 | 핵심 |
|---|---|---|
| S-01 | 헤더(GNB) | sticky 고정, 스크롤 시 배경색 유지+옅은 그림자만. 로고→최상단 스무스 스크롤. 앵커 5개(똑독은→S-03 / 우리 동네에서→S-04 / 보호자와 함께→S-05 / 원장님과 함께→S-06 / 무엇이든→S-07), 현재 섹션 항목 강조. 헤더 높이만큼 스크롤 오프셋. 우측 "앱 다운로드" CTA. |
| S-02 | 히어로 | 서브카피 1줄 + 대형 헤드라인("탐색하고," / 이미지 위 오버레이 "연결하고, 기록하는.") + 보호자·반려견 실사 이미지 1장(PC/모바일 분리) + 하단 `scroll` bounce. 좌우 스플릿 정적 레이아웃. |
| S-03 | 신뢰지표 | 높이 `100vh`(PC·모바일). 아이콘+헤드라인("탐색 부터 알림장 까지," — "탐색"/"알림장" 강조 칩) + 서브카피 + 가로 통계 카드 3개(누적 다운로드 / 등록된 유치원 / 앱스토어 평점, 라벨+큰 숫자). 진입 시 fade-in + 카운트업 1회. **3개 값 모두 확보됐을 때만 렌더** (하나라도 없으면 섹션 전체 미렌더, E-01/P-02). |
| S-04 | 우리 동네에서 | 높이 `100vh`. **좌 텍스트 / 우 이미지**. 소라벨 + 탭메뉴 3개(지도에서 한눈에 / 원하는 조건만 쏙쏙 / 나란히 놓고 비교), 탭별 서브타이틀·카피·이미지. 스크롤이 스텝 범위 도달 시 탭 전환, 탭 클릭 시 해당 슬라이드로. |
| S-05 | 보호자와 함께 | 높이 `100vh`. **좌 이미지 / 우 텍스트** (S-04와 반대 순서 교차). 탭메뉴 3개(등원부터 하원까지 / 오늘 하루를 담은 알림장 / 소중한 순간은 앨범에). |
| S-06 | 원장님과 함께 | 높이 `100vh`. 좌우 교차. 좌측 소라벨 + **세로 스텝 인디케이터(점 4개 + 포인트 컬러 연결선)** + 헤드라인/서브카피, 우측 스텝별 이미지. 내부 스크롤 위치에 따라 STEP 1→2→3→4 순차 활성화 & 우측 콘텐츠 전환, 위로 스크롤 시 역방향 (FR-LP-013). |
| S-07 | FAQ | 중앙 헤드라인("자주 묻는 질문들") + 본문보다 좁은 단일 컬럼 아코디언 10문항(보호자 5 + 원장 5). 클릭 시 해당 답변만 높이 확장, `+`↔`-` 전환. **다중 펼침 허용** (다른 항목 자동 접힘 없음, FR-LP-008). SEO FAQ 스키마(JSON-LD) 필요. |
| S-08 | 최종 CTA | 좌측 2줄 헤드라인("지금 바로 똑독과 함께하세요!") + "지금 시작하기" 버튼, 우측 마스코트 일러스트 + QR 코드 박스(SVG/고화질). QR 스캔·버튼 모두 스토어 자동 감지 → 스토어 이동/선택 팝업. |
| S-09 | 푸터 | 로고 + App Store/Google Play 배지 2개 + 약관 링크 3종(이용약관/개인정보처리방침/이용정책, 각 Notion 링크 **새 창**) + 회사 정보 블록((주)펫캠퍼스, 대표·주소·사업자등록번호·고객센터·이메일) + Copyright. 회사 실제 값은 `meta/data/company.json` / 기존 똑독 페이지 확인. |

### 카피 규칙 (P-05 / P-06)

- 헤드라인·서브텍스트·해시태그·FAQ 문항은 **PRD 5.1 / 6장 확정본을 그대로 사용**. 임의로 새 카피 만들지 않는다.
- 메타태그(`title` / `description` / OG / keywords / robots)와 heading(h1~h3) 계층은 PRD 4장 기준으로 시맨틱하게.

---

## 7. 명령어

```bash
pnpm dev      # 개발 서버 (turbopack)
pnpm build    # 프로덕션 빌드
pnpm lint     # eslint
```

---

## 8. 디렉터리

- 섹션 컴포넌트: `src/feature/<page>/*Section.tsx`
- 공용 컴포넌트: `src/components/`
- 아이콘(SVG): `src/assets/icons/` (`index.ts` re-export)
- 이미지(경로만 예약): `src/assets/images/` — `*-desktop.*` / `*-mobile.*`
- 상수/링크: `src/constants/`
- 데이터(JSON): `meta/data/` (`fetchGitHubContent()`)
- 테마 토큰: `src/styles/theme/{colors,typo,animate}.css` (진입점 `src/styles/globals.css`)
- 유틸: `src/lib/tw.ts`(`cn`), `src/lib/github.ts`
