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
- 히어로(S-02) `scroll` 문구/화살표는 모바일에서는 숨기고, md 이상에서만 진입 시부터 bounce 반복하며 사용자가 스크롤 시작하면 페이드아웃.
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
> 기존 페이지(work/careers)는 현재 시맨틱 타이포 토큰과 새 브레이크포인트 체계로 마이그레이션 완료.
> `pnpm build` / `pnpm lint` 통과 확인함 (기존 경고만 잔존).

### 2.1 컬러 — 시맨틱 토큰 (`src/styles/theme/colors.css`)

| 변수                         | 값        |
| ---------------------------- | --------- |
| `--color-primary`            | `#FF6E0C` |
| `--color-primary-foreground` | `#FFFFFF` |
| `--color-background`         | `#FFFFFF` |
| `--color-surface`            | `#F9F9FA` |
| `--color-surface-accent`     | `#FFF7EC` |
| `--color-foreground`         | `#15161B` |
| `--color-foreground-muted`   | `#70727C` |
| `--color-border`             | `#F3F3F7` |
| `--color-border-accent`      | `#FF6E0C` |

### 2.2 컬러 — Primitive 팔레트 (hover / 상태값 조정용)

- **Neutral**: `0 #FFFFFF` · `50 #F9F9FA` · `100 #F3F3F7` · `200 #EBEBF0` · `300 #DEDEE3` · `400 #B4B4BB` · `500 #8C8C94` · `600 #70727C` · `700 #41424A` · `800 #292A30` · `900 #15161B` · `1000 #000000`
- **Orange**: `50 #FFF7EC` · `100 #FFECD3` · `200 #FFD6A6` · `300 #FFB86E` · `400 #FF8E34` · `500 #FF6E0C` · `600 #F05506` · `700 #C73E07` · `800 #9E310E` · `900 #7F2B0F` · `950 #451305`
- 딤 오버레이: `#0F141A` @ 70% opacity (히어로 이미지 위 텍스트 대비용)
- 버튼 hover는 `primary` → Orange `600`(`#F05506`), active는 Orange `700` 정도로.

#### 2.2.1 텍스트 컬러 사용 규칙

- 기본 밝은 배경에서는 주요 텍스트에 `text-foreground`, 설명·보조 텍스트에 `text-foreground-muted`를 사용한다.
- section guide, 활성 링크, 브랜드 강조 문구와 강조 수치는 `text-primary`를 사용한다.
- 어두운 배경에서는 주요 텍스트에 `text-white`, 보조 텍스트에 `text-neutral-300` 또는 white opacity를 사용한다.
- `bg-primary`처럼 색상 대비가 강한 배경의 텍스트는 `text-primary-foreground`를 사용한다.
- 비활성·메타·placeholder는 semantic muted token을 우선하고, 필요한 경우 Neutral `400~600` 범위에서 선택한다.
- 컴포넌트에서 직접 hex 값을 넣지 않는다. semantic token으로 표현할 수 없는 hover·active·상태값에만 Primitive 팔레트를 사용한다.

### 2.3 타이포그래피 — 폰트 **SUIT** (`src/styles/theme/typo.css`, `src/assets/fonts`)

SUIT = 오픈소스(SIL OFL), https://github.com/sun-typeface/SUIT . `src/assets/fonts/SUIT-{Regular,Medium,SemiBold,Bold}.woff2`
(400/500/600/700), 라이선스 원문 `SUIT-LICENSE.txt`. 추후 서브셋 woff2로 교체 예정.

| 스타일      | CSS token        | 크기 / 줄간격 / 자간 | 용도                              |
| ----------- | ---------------- | -------------------- | --------------------------------- |
| Display 1   | `text-display-1` | 56 / 66 / -2%        | 히어로 primary headline           |
| Display 2   | `text-display-2` | 48 / 58 / -2%        | 메인 섹션 headline                |
| Display 3   | `text-display-3` | 40 / 50 / -2%        | secondary hero / 강조 headline    |
| Display 4   | `text-display-4` | 32 / 42 / -2%        | 태블릿 메인 섹션 headline         |
| Heading 1   | `text-heading-1` | 24 / 34 / -2%        | 섹션 subheading                   |
| Heading 2   | `text-heading-2` | 20 / 28 / -2%        | 컴포넌트 title / card title       |
| Heading 3   | `text-heading-3` | 18 / 26 / -2%        | 작은 컴포넌트 heading             |
| Body 1      | `text-body-1`    | 16 / 24 / -1%        | primary body copy                 |
| Body 2      | `text-body-2`    | 14 / 20 / -1%        | secondary body copy / navigation  |
| Label       | `text-label`     | 14 / 18 / -1%        | button / tab / chip / eyebrow     |
| Label Large | `text-label-lg`  | 16 / 20 / -1%        | large header controls             |
| Caption 1   | `text-caption-1` | 12 / 18 / -2%        | metadata / supplemental text      |
| Caption 2   | `text-caption-2` | 11 / 14 / 0%         | legal / 매우 작은 supporting text |

- **모바일에서는 Display 1~3을 각각 한 단계 다운스케일** (D1→D2, D2→D3, D3→H1 크기).
- Body 2와 Label은 크기가 14px로 같아도 line-height와 의미가 다른 **별도 semantic style**이다. 서로 합치거나 대체하지 않는다.
- 신규·수정 UI는 숫자형 `text-*`나 arbitrary font-size 대신 위 semantic token만 사용한다.
- semantic style을 선택한 뒤 font weight를 콘텐츠 위계에 맞춰 적용한다. 크기가 같다는 이유만으로 다른 semantic style을 대신 사용하지 않는다.

#### 2.3.1 폰트 weight 사용 규칙

SUIT weight는 `400 Regular`, `500 Medium`, `600 SemiBold`, `700 Bold` 네 단계만 사용한다. 기본 weight는 아래 기준으로 선택하고, 색상은 2.2.1의 semantic token을 따른다.

| 역할 | 기본 weight | 사용 원칙 |
| --- | ---: | --- |
| Section guide | `600` | 브랜드 안내를 강하게 드러내는 S-04~S-06 같은 경우 `700` 허용 |
| Section main | `700` | 페이지·섹션 대표 제목은 항상 Bold |
| Section supporting | `400` | 제목보다 낮은 위계의 설명 문장 |
| Content main | `600` | tab·step·card·table row 제목; 선택 상태나 핵심 항목은 `700` 허용 |
| Content supporting | `400` | content main을 보조하는 설명·역할·본문 |
| Badge | `600` | 선택·강조 badge는 `700` 허용 |
| Navigation | `500` | 일반 메뉴·링크 |
| Button / CTA | `700` | 행동을 명확히 전달하는 레이블 |

- weight는 폰트 크기 token과 독립적으로 적용한다. 같은 14px이어도 `Body 2`, `Label`, `Caption 1`은 역할과 line-height가 다르므로 대체하지 않는다.

#### 2.3.2 페이지 공통 반응형 타이포 역할

새 페이지를 만들거나 기존 페이지에 새 section을 추가할 때는 특정 화면의 개별 크기를 복제하지 않고 아래 역할별 mapping을 기본값으로 사용한다. breakpoint 기준은 mobile `< 768px`, tablet `768~1359px`, desktop `1360px 이상`이다.

| 역할 | 의미 / 예시 | Mobile | Tablet | Desktop | 기본 weight | 기본 컬러 |
| --- | --- | --- | --- | --- | ---: | --- |
| Section guide | section의 맥락을 먼저 알리는 eyebrow·소라벨 (`우리 동네에서`, `How we work`) | `Caption 1` · 12px | `Body 1` · 16px | `Body 1` · 16px | 600 | `text-primary` |
| Section main | section 전체를 대표하는 headline | `Heading 3` · 18px | `Display 4` · 32px | `Display 3` · 40px | 700 | `text-foreground` / `text-white` |
| Section supporting | section main 바로 아래의 설명 문장 | `Body 1` · 16px | `Heading 2` · 20px | `Heading 2` · 20px | 400 | `text-foreground-muted` / `text-neutral-300` |
| Content main | tab·step·card·table row의 제목 | `Body 2` · 14px | `Heading 2` · 20px | `Heading 2` · 20px | 600 | `text-foreground` / `text-white` |
| Content supporting | content main을 보조하는 설명·역할·본문 | `Body 2` · 14px | `Body 1` · 16px | `Body 1` · 16px | 400 | `text-foreground-muted` / `text-neutral-300` |
| Badge | card·section의 compact category badge | `Caption 1` · 12px | `Label` · 14px | `Label` · 14px | 600 | `text-primary` / `text-white` |

- Section main은 S-04~S-06과 동일하게 mobile `28px`, tablet `50px`, desktop `54px`의 체감 행간을 사용한다. 이는 토큰의 기본 line-height에 각 breakpoint의 multi-line gap을 반영한 값이다.
- Mobile·tablet에서는 section main→section supporting, content main→content supporting 간격을 `8px`으로 통일한다. Desktop에서는 콘텐츠 밀도에 따라 기존 `16px` 기본 간격을 사용한다.
- Badge의 기본 padding은 mobile `px-2 py-1`, tablet·desktop `px-3 py-2`이며 `rounded-full`을 사용한다.
- 위 mapping은 페이지 종류와 관계없이 같은 semantic role에 우선 적용한다. 한 페이지 안에서 동일한 역할에 서로 다른 token을 사용하지 않는다.
- heading tag level(`h1`~`h4`)은 문서 구조에 따라 선택하고, 시각적 크기는 위 semantic role로 결정한다. tag level을 바꾸기 위해 font-size를 함께 바꾸지 않는다.
- 특정 페이지에서 더 크거나 작은 위계가 필요하면 임의 클래스를 먼저 추가하지 않는다. 기존 역할로 해결할 수 없는 이유와 영향을 확인한 뒤 디자인 시스템의 새 role 또는 명시적 variant로 제안한다.

### 2.4 Spacing

`2 · 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64` (px).
Tailwind v4 `--spacing` 기준값과 정합되게 사용한다.

| 값             | 대표 용도                                                |
| -------------- | -------------------------------------------------------- |
| `2 / 4`        | 아이콘 내부 보정, 선·마커 위치의 미세 간격               |
| `8 / 12`       | 동일 그룹 내부의 아이콘·텍스트·보조 요소 간격            |
| `16 / 20`      | 일반적인 텍스트, 버튼, 폼 요소 사이의 간격               |
| `24 / 28 / 32` | 컴포넌트 내부 padding, 서로 구분되는 콘텐츠 그룹 간 간격 |
| `40 / 48`      | 섹션 내부의 큰 콘텐츠 그룹 간 간격                       |
| `56 / 64`      | 섹션 상하 여백, 큰 구조 사이의 간격                      |

- 신규 또는 수정되는 랜딩페이지 UI에서는 spacing scale 밖의 arbitrary value를 사용하지 않는다. `[13px]`, `[22px]`처럼 scale을 우회하는 margin / padding / gap / inset 값을 만들지 않는다.
- 동일한 위계와 역할을 가진 요소에는 같은 spacing step을 우선 사용한다.
- 인접한 두 step 중 선택할 때는 콘텐츠 밀도와 기존 표준 컴포넌트 패턴을 기준으로 가장 가까운 값을 사용한다.
- 새 spacing 값이 필요해 보여도 먼저 기존 scale 조합으로 해결 가능한지 검토한다. 해결할 수 없는 경우에만 디자인 시스템 변경안으로 제안하며, 사용자 확인 전에는 추가하지 않는다.
- 기존 코드의 6px, 10px, 14px spacing은 새 표준의 근거로 사용하지 않는다. 해당 구현은 `Legacy / Migration Notes`에 따라 수정 시 정리한다.

### 2.5 Radius

`r1 = 4px` · `r2 = 8px` · `r3 = 12px` · `r4 = 16px` · `r5 = 20px` · `r6 = 24px` · `full = 999px`.

| 토큰   | 대표 용도                                    |
| ------ | -------------------------------------------- |
| `r1`   | badge, 작은 control                          |
| `r2`   | input, small button                          |
| `r3`   | default button, compact card                 |
| `r4`   | 일반 card, media container                   |
| `r5`   | large card, 강조 media container             |
| `r6`   | landing section의 large mockup frame         |
| `full` | pill button, chip, floating header container |

- 동일한 컴포넌트 타입은 동일한 radius token을 사용한다.
- card마다 임의의 radius를 만들지 않으며 일반 card에는 `full`을 사용하지 않는다.
- 이미지가 container 경계에 맞닿는 경우 이미지와 container의 radius를 가능하면 일치시킨다.
- 신규 또는 수정되는 랜딩페이지 UI에서 scale 밖의 arbitrary radius를 사용하지 않는다.
- 기존 코드의 10px, `rounded-3xl` 등은 새 표준으로 채택하지 않고 `Legacy / Migration Notes`의 정리 대상으로 취급한다.

### 2.6 Component sizing

현재 프로젝트에는 공용 Button의 Small / Medium / Large 체계가 없다. 기존 화면에 우연히 사용된 크기를 근거로 새 3단계 규격을 만들지 않으며, 아래처럼 현재 명확히 결정할 수 있는 기준만 적용한다.

| 컴포넌트    | 기준                                                                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header      | viewport 상단에 고정된 full-width 직사각형 bar로 구성하고 `white` background와 하단 `border`를 사용한다. 내부 상하 padding은 16px이며, 중앙 navigation이 보이는 921px 이상은 높이 76px, 그 미만은 높이 60px을 사용한다. 콘텐츠만 `<Content>`의 container 폭 원칙을 따르며 header 자체에는 radius를 적용하지 않는다. |
| Header CTA  | `primary` 배경, `primary-foreground` 텍스트, `full` radius와 Label Large typography를 사용한다. 76px header 내부 control 규격에 따라 height는 44px, horizontal padding은 24px을 사용한다. 모바일·태블릿에서는 숨기고 데스크탑인 `xl` 이상에서만 노출한다.                                                           |
| Primary CTA | 주요 전환 행동에만 사용하며 `primary` 배경, `primary-foreground` 텍스트, `full` radius와 Label typography를 사용한다. Header CTA와 같은 Label button 규격인 height 48px, horizontal padding 24px을 적용한다.                                                                                                        |
| Chip / Tab  | Chip은 compact inline 형태와 `full` radius, Label typography를 사용한다. Tab은 콘텐츠 위계에 따라 Label 또는 Heading 2를 사용하되 같은 tab group 안에서는 동일한 typography와 spacing을 유지한다. 고정 height는 **TBD**다.                                                                                          |
| Card        | 일반 card는 `r4`, compact card는 `r3`를 사용한다. 내부 padding은 spacing `24 / 28 / 32` 중 밀도에 맞는 값을 선택하고, 기본 상태는 shadow 없이 background / border / spacing으로 구분한다. 고정 height와 aspect ratio는 콘텐츠 및 media 요구가 확정될 때 결정한다.                                                   |

- Header 중앙 navigation은 배경·테두리·radius가 없는 Label Large 텍스트 메뉴이며 내부 항목 간격을 너비와 관계없이 24px로 고정한다. 페이지 이동 control과 Header CTA는 Label Large, height 44px, horizontal padding 24px의 동일한 캡슐형 size level을 적용한다.
- 태블릿에서 중앙 navigation이 보이는 `921~1359px` 구간은 로고와 중앙 navigation 사이에 48px 간격을 사용한다. 데스크탑(`xl`)에서는 중앙 정렬을 위해 이 추가 간격을 적용하지 않는다.
- 중앙 navigation이 숨겨지는 `920px 이하`에서는 페이지 이동 control의 캡슐 배경·테두리·padding을 제거하고 텍스트와 divider만 남긴다. 이 구간의 header 높이는 60px이며, 모바일 햄버거 아이콘은 28px을 사용한다.
- `/work`의 상단 소개, tool card, AI Workflow와 표, Side Project와 team card는 2.3.2의 페이지 공통 반응형 타이포 역할을 적용한 기준 구현이다.
- `/work` tool card와 AI Workflow의 지정 문구 줄바꿈은 데스크탑(`xl`)에서만 고정하고, 모바일·태블릿에서는 원문이 가용 너비에 따라 자연스럽게 흐르게 한다. 데스크탑 전용 줄 배열과 기본 원문을 같은 데이터 객체에서 관리한다.
- `/work` 하단 Side Project 안내 자체는 card frame·배경·border·radius 없이 content 기준선에 직접 놓고 별도의 우측 illustration이나 image frame을 사용하지 않는다. 설명 아래 team grid는 사진 없이 이름·역할·LinkedIn action만 포함한 7개 card로 구성하며, desktop은 4-column이라 첫 행 4개·둘째 행 3개, tablet은 2-column, mobile은 1-column로 배치한다.
- button label에 같은 typography token을 사용하면 같은 size level로 간주하고 동일한 height와 horizontal padding을 적용한다. 크기 차이가 필요하면 padding만 임의로 바꾸지 않고 typography를 포함한 별도 size level을 먼저 정의한다.
- 컴포넌트의 높이와 padding을 정할 근거가 부족하면 기존의 비표준 값을 복제하지 않고 `TBD`로 남긴다.
- 공용 Button size 체계가 필요해지는 시점에 실제 사용 사례를 모아 별도 제안하고, 사용자 확인 후 Small / Medium / Large 규격을 확정한다.

### 2.7 Shadow

- 기본 surface와 card에는 shadow를 사용하지 않는다.
- floating header는 기본 상태에서 shadow 없이 유지하고, **scroll 상태에서만** subtle shadow를 허용한다.
- modal / drawer처럼 다른 레이어 위에 떠 있는 UI는 정보 위계를 구분하기 위한 elevation shadow를 허용한다.
- card 구분은 shadow보다 background / border / spacing을 우선한다.
- 장식만을 위한 shadow와 `shadow-card` 반복 사용을 금지한다.
- 새로운 shadow 값을 임의로 만들지 않는다. 필요한 elevation 값이 현재 token으로 해결되지 않으면 먼저 디자인 시스템 변경안으로 제안한다.
- 현재 상시 header shadow는 canonical rule이 아니라 `Legacy / Migration Notes`의 정리 대상이다.

### 2.8 디자인 의사결정 우선순위

UI를 새로 만들거나 수정할 때 아래 순서로 판단한다.

1. 기존 디자인 token을 사용한다.
2. 이 문서에 정의된 semantic rule을 적용한다.
3. 동일 유형의 표준 컴포넌트 패턴을 재사용한다.
4. 정확히 일치하는 값이 없으면 가장 가까운 기존 spacing / radius / typography scale step을 사용한다.
5. 그래도 해결할 수 없는 경우에만 새로운 규칙을 제안한다.

- 기존 token이 있는데 arbitrary value를 만들지 않는다.
- 한 화면만 맞추기 위한 별도의 스타일 체계를 만들지 않는다.
- 기존 표준 컴포넌트와 유사한데 불필요한 variant를 추가하지 않는다.
- 기존 구현이 디자인 시스템과 충돌하면 해당 값을 복제하지 않고 migration 대상으로 간주한다.
- 디자인 시스템의 token, semantic rule, component sizing을 사용자 확인 없이 변경하지 않는다.

---

## 3. 브레이크포인트 & 컨테이너

| 구간         | 뷰포트 폭   | 레이아웃 기준                        | Horizontal page padding                             |
| ------------ | ----------- | ------------------------------------ | --------------------------------------------------- |
| **모바일**   | ~767px      | 모바일 목업 (세로 스택)              | 16px                                                |
| **태블릿**   | 768~1359px  | **PC 레이아웃을 축소** (모바일 아님) | 32px                                                |
| **데스크탑** | 1360px 이상 | PC 목업                              | 32px, content가 1320px에 도달한 뒤 좌우 여백만 증가 |

### 3.1 Content width

- `--container-content: 1320px`(132rem, globals.css)은 padding을 포함한 wrapper 폭이 아니라 **실제 grid content area의 최대 폭**이다.
- horizontal page padding은 content width 바깥의 wrapper에서 처리한다. viewport가 좁을 때 실제 content width는 `viewport width - 좌우 page padding`만큼 자연스럽게 줄어든다.
- viewport가 충분히 넓어지면 실제 content area는 1320px에서 멈추고, 추가 공간은 `mx-auto`의 좌우 여백으로만 흡수한다.
- `<Content>`는 위 규칙의 단일 소스다. 바깥 wrapper가 `w-full px-4 md:px-8`으로 page padding을 담당하고, 안쪽 content가 `mx-auto w-full max-w-content`로 실제 1320px 상한을 담당한다.
- Header도 `<Content>`와 동일한 2중 구조를 사용한다. 바깥 wrapper의 `px-4 md:px-8`은 page padding만 담당하고, 안쪽 header grid에는 horizontal padding을 중복 적용하지 않아 실제 콘텐츠 기준선이 다른 section의 1320px grid와 일치해야 한다.
- `md` 이상에서 page padding은 32px로 연속 유지한다. 실제 content width는 viewport에서 좌우 64px을 뺀 값으로 줄어들고, 충분히 넓어지면 1320px 상한에서 멈춘다.

### 3.2 Grid columns & gutter

| 구간         | Columns | Grid gutter |
| ------------ | ------- | ----------- |
| **모바일**   | 4       | **TBD**     |
| **태블릿**   | 12      | 16px        |
| **데스크탑** | 12      | 24px        |

- grid gutter는 column 사이의 간격이며 horizontal page padding이나 section 내부의 composition spacing과 구분한다.
- 태블릿에서도 12-column PC 구조를 유지하고 크기·여백·이미지만 축소한다.
- S-04~S-06의 grid gutter는 tablet 16px / desktop 24px을 기준으로 하며, 현재 목업-텍스트 composition gap은 768~1199px에서 24px, 1200~1359px에서 32px, desktop에서 40px을 별도로 사용한다. S-03~S-06의 모바일 main headline은 모두 중앙 정렬한다. S-04~S-06의 모바일 section label도 중앙 정렬한다. S-04~S-06의 모바일 main headline은 S-03과 같은 `text-heading-3`를 사용하고, 2-line main headline row gap은 2px이다. 모바일 section label은 `text-caption-1`, item button text는 `text-body-2`를 사용한다. 모바일 section label→main headline 간격은 16px, main headline→mockup frame 간격은 20px이다. 모바일 mockup frame 내부 이미지 헤드룸은 20px로 통일한다. 모바일 mockup frame→안내 문구 버튼(step/tab) 목록
  간격은 S-04·S-05는 20px(mt-5)이지만 **S-06만 40px(mt-10)** — 요청에 따라 S-06만 의도적으로 분리해뒀다.
  Compound mockup은 좌측 아이폰 프레임 상단을 기준으로 체감 헤드룸이 동일해 보이도록 모바일에서 이미지 내부 캔버스 차이를 translate 보정으로 맞춘다.
- 데스크탑(`1360px+`) S-04~S-06은 story track과 viewport panel 모두 `min(100svh, 1080px)`로 통일한다. track만 `120vh`·`140vh`로 늘리지 않으며, 스텝 전환은 레이아웃 위치가 변하지 않는 opacity transition만 사용한다.
- S-04~S-06의 스크롤 연동 스텝은 페이지 로드 후 처음 아래로 지날 때만 순방향으로 진행한다. 위로 스크롤할 때 이전 스텝으로 돌아가지 않으며, 진행 기록은 새로고침할 때 초기화한다. 항목 직접 클릭은 항상 허용한다.
- 아직 section migration을 진행하지 않은 상태에서 새 grid utility, component 또는 token을 임의로 추가하지 않는다.

### 3.3 Common span patterns

| Pattern                | Span        |
| ---------------------- | ----------- |
| full                   | 12          |
| equal split            | `6 / 6`     |
| text + visual          | `5 / 7`     |
| visual + text          | `7 / 5`     |
| statistics             | `4 / 4 / 4` |
| mobile stacked content | 4           |

- 위 span은 동일 유형 section에서 우선 재사용하는 canonical pattern이다.
- S-06, Hero, Final CTA, FAQ의 최종 span은 현재 비율을 그대로 표준화하지 않고 각 section 디자인 시 결정한다.
- 모바일에서 좌우 split content는 기본적으로 full `span 4`의 세로 stack으로 전환한다.

### 3.4 Tablet section height

- Mobile visual landing sections S-02~S-07 use a shared `680px` vertical rhythm. S-08 Final CTA and Footer are excluded and keep their own content-driven heights.
- Tablet (768~1199px) visual landing sections use `--section-height-tablet: clamp(640px, 60vw, 820px)`. At 1200~1359px, the shared height is fixed at `720px` to prevent wide-tablet sections from becoming too tall.
- Hero and S-04~S-06 use this shared tablet height. Trust 지표 영역은 768px 이상에서 `640px`, Final CTA는 768px 이상에서 `440px`을 고정 사용한다. FAQ remains content-driven because its expanded information does not fit a fixed visual-section height.

### 3.5 Header & narrow content

- Header의 outer alignment는 다른 section과 동일한 `<Content>` content 기준선을 사용한다.
- Header 내부의 logo / navigation / CTA는 기존 flex 구조를 유지한다. grid 도입을 이유로 근거 없는 `2 / 8 / 2` column 구조를 만들지 않는다.
- FAQ는 **centered narrow content** pattern으로 정의한다. 기존 512.5px / 425px arbitrary max-width는 새 grid 표준으로 채택하지 않으며 실제 width와 span은 FAQ 리디자인 시 결정한다.

### 3.6 Breakpoint 규칙

- 태블릿(768~1359)은 모바일 레이아웃으로 바꾸지 않고 **PC 구조를 그대로 축소** (폰트·여백·이미지만 스케일 다운).
  단, 헤더 앵커 메뉴는 모바일에서 햄버거로 전환 (P-04).
- Tailwind 브레이크포인트: `sm 501 / md 768 / lg 1200 / xl 1360` (globals.css). 리디자인 섹션은 **`md`(모바일↔PC축소) + `xl`(데스크탑 고정)** 을 기준으로 쓴다. `sm`·`lg`는 기존 페이지 호환용으로 유지.
- Tailwind `md`의 `min-width: 768px`과 별도 CSS의 `max-width: 768px`을 동시에 사용해 768px을 양쪽 구간에 포함하지 않는다. 기존 header token media query는 migration target이며 Header 작업 시 정리한다.

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

- **원본과 서빙본을 분리한다** (design-import처럼 git에 안 잡히는 곳에 원본을 두지 않는다 — 장기적으로 유실 위험):
  - **원본**: `src/assets/images/` — git으로 추적되는 실제 마스터 파일(PNG/JPG). 여기가 이 사이트 이미지 에셋의 근본 저장소다.
  - **서빙본**: `public/images/*.webp` — `pnpm images:optimize`(`scripts/optimize-images.mjs`)로 원본을 82% 품질 webp로 변환해 생성. 코드(`next/image` 문자열 경로)는 항상 이 webp만 참조한다. `next.config.ts`가 `output:'export'`+`images.unoptimized:true`라 next/image가 요청 시점에 최적화해주지 않으므로 빌드 전 미리 변환해둔다.
  - 원본을 교체·추가하면 `pnpm images:optimize`(전체) 또는 `pnpm images:optimize <이름 일부>`(해당 파일만)로 다시 생성한다.
  - 파일이 아직 없는 섹션은 경로만 지정해두고 `alt` + 대체 배경색(`surface`)이 보이게 처리 (E-02 / M-01: "이미지를 불러오지 못했습니다").
  - PC용·모바일용 파일이 다른 경우 분리(공유 금지). 앱 스크린샷 명명 예: `s04-map-desktop.png` / `s04-map-mobile.png`.
- 해상도는 실제 표시 크기의 1.5배 이상 전제. `alt`에 키워드 자연스럽게 ("강아지 유치원 지도 탐색 화면").
- 앱 스토어 스크린샷 7장 구조: 브랜딩 히어로 → 검색 → 필터 → 비교 → 등하원 알림 → 알림장 → 앨범.

### 5.2 아이콘 / 로고

- 전부 **SVG 컴포넌트** (`src/assets/icons/*.tsx`, `props: React.SVGProps<SVGSVGElement>` 스프레드, `index.ts`에서 re-export).
- 파비콘/OG 로고마크는 `knockdog_favicon.svg` 기반.

### 5.3 링크

- 외부 링크(앱스토어, 약관 Notion 등)는 **새 창**: `target="_blank"` + `rel="noopener noreferrer"`.
- 앱 스토어 URL은 `src/constants/storeLink.ts` 사용 (App Store / Google Play).
- 다운로드 CTA(S-01, S-08): User-Agent로 iOS→App Store, Android→Google Play 바로 이동, 감지 불가(데스크탑)면 스토어 선택 팝업(M-02).
- 다운로드 QR은 `https://home.knockdog.net/download/`를 사용한다. `public/download/index.html`은 공통 홈페이지 레이아웃을 렌더링하지 않고 head script에서 기기를 판별해 Android→Google Play, iPhone/iPad→App Store로 즉시 이동시킨다.

---

## 6. 화면 구성 (PRD 4장 요약 — 상세는 PRD 원본)

| ID   | 섹션          | 핵심                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-01 | 헤더(GNB)     | viewport 전체 너비를 채우는 흰색 직사각형 header bar와 하단 divider를 사용하며, 내부 상하 padding은 16px이고 콘텐츠는 공통 content 폭에 정렬한다. `921px 이상`은 높이 76px으로 중앙 앵커 5개, 페이지 이동 캡슐(높이 44px·좌우 padding 24px), 앱 다운로드 CTA 캡슐을 보인다. `920px 이하`는 높이 60px으로 중앙 앵커와 페이지 이동 캡슐을 제거하고, 페이지 이동 텍스트와 divider만 양끝 정렬로 남긴다. 모바일은 햄버거를 유지하며 펼침 메뉴에는 `일하는 방식`과 `지원하기`만 표시한다.                                                                                                                                                                                                                                   |
| S-02 | 히어로        | 서브카피 1줄 + 대형 헤드라인("탐색하고," / 이미지 위 오버레이 "연결하고, 기록하는.") + 보호자·반려견 실사 이미지 1장(PC/모바일 분리) + 하단 `scroll` bounce(md 이상만 노출). 모바일 headline은 `text-display-3`, supporting copy는 `text-heading-3`를 사용한다. 모바일 앱 다운로드 버튼은 `text-label`과 Label button 규격을 사용한다. 모바일 hero content는 현재 breakpoint의 실제 header 하단부터 hero 하단까지의 가용 영역 정중앙에 배치하고, 텍스트와 CTA도 가로 중앙 정렬한다. headline→supporting copy 16px / supporting copy→CTA 20px 간격을 사용한다. 모바일 hero image object-position은 `66% 30%`를 사용하고, 초광폭(`2400px+`)에서는 세로 기준점 `60%`로 피사체를 위로 조정한다. 좌우 스플릿 정적 레이아웃. |
| S-03 | 신뢰지표      | 높이 `100vh`(PC·모바일). 아이콘+헤드라인("탐색 부터 알림장 까지," — "탐색"/"알림장" 강조 칩) + 서브카피. 모바일 headline/chip은 `text-heading-3`, 2-line headline row gap과 headline inline 요소 간격은 각각 4px, headline→통계 카드 간격은 20px + 가로 통계 카드 3개(누적 다운로드 / 등록된 유치원 / 앱스토어 평점). 각 지표는 동일 너비 칼럼 안에서 아이콘 → 수치 → 설명 순서로 화면 중앙축에 맞춰 배치한다. 진입 시 fade-in + 카운트업 1회. **3개 값 모두 확보됐을 때만 렌더** (하나라도 없으면 섹션 전체 미렌더, E-01/P-02).                                                                                                                                                                                       |
| S-04 | 우리 동네에서 | 높이 `100vh`. **좌 텍스트 / 우 이미지**. 소라벨 + 탭메뉴 3개(지도에서 한눈에 / 원하는 조건만 쏙쏙 / 나란히 놓고 비교), 탭별 서브타이틀·카피·이미지. 스크롤이 스텝 범위 도달 시 탭 전환, 탭 클릭 시 해당 슬라이드로. 모바일 상하 padding은 24px.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| S-05 | 보호자와 함께 | 높이 `100vh`. **좌 이미지 / 우 텍스트** (S-04와 반대 순서 교차). 탭메뉴 3개(등원부터 하원까지 / 오늘 하루를 담은 알림장 / 소중한 순간은 앨범에). 모바일 상하 padding은 24px.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| S-06 | 원장님과 함께 | 높이 `100vh`. 좌우 교차. 좌측 소라벨 + **세로 스텝 인디케이터(점 4개 + 포인트 컬러 연결선)** + 헤드라인/서브카피, 우측 스텝별 이미지. 페이지 로드 후 처음 아래로 스크롤할 때 STEP 1→2→3→4 순차 활성화 & 우측 콘텐츠 전환. 위로 스크롤할 때는 역방향 전환하지 않는다(FR-LP-013). 모바일 상하 padding은 24px.                                                                                                                                                                                                                                                                                                                                                                                                            |
| S-07 | FAQ           | 중앙 헤드라인("자주 묻는 질문들") + 본문보다 좁은 단일 컬럼 아코디언 10문항(보호자 5 + 원장 5). 클릭 시 해당 답변만 높이 확장, `+`↔`-` 전환. **다중 펼침 허용** (다른 항목 자동 접힘 없음, FR-LP-008). SEO FAQ 스키마(JSON-LD) 필요.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| S-08 | 최종 CTA      | 좌측 2줄 헤드라인("지금 바로 똑독과 함께하세요!") + "지금 시작하기" 버튼, 우측 마스코트 일러스트 + QR 코드 박스(SVG/고화질). QR 스캔·버튼 모두 스토어 자동 감지 → 스토어 이동/선택 팝업. 배경 사진은 md 이상 모든 너비에서 세로 기준점 `25%`를 사용해 강아지 얼굴이 잘리지 않도록 배치한다. 모바일은 확대 후 상단 기준점으로 약 40% 더 아래에 배치하되, 501~767px에서는 세로 기준점 `30%`로 약 30% 위로 보정한다.                                                                                                                                                                                                                                                                                                      |
| S-09 | 푸터          | 로고 + App Store/Google Play 배지 2개 + 약관 링크 3종(이용약관/개인정보처리방침/이용정책, 각 Notion 링크 **새 창**) + 회사 정보 블록((주)펫캠퍼스, 대표·주소·사업자등록번호·고객센터·이메일) + Copyright. 회사 실제 값은 `meta/data/company.json` / 기존 똑독 페이지 확인.                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### 카피 규칙 (P-05 / P-06)

- 헤드라인·서브텍스트·해시태그·FAQ 문항은 **PRD 5.1 / 6장 확정본을 그대로 사용**. 임의로 새 카피 만들지 않는다.
- 메타태그(`title` / `description` / OG / keywords / robots)와 heading(h1~h3) 계층은 PRD 4장 기준으로 시맨틱하게.

---

## 7. Legacy / Migration Notes

아래 항목은 현재 코드에 존재하지만 디자인 시스템의 허용 예외나 새 표준이 아니다. 해당 컴포넌트를 다음에 수정할 때 canonical spacing / radius / typography / shadow 규칙에 맞춰 함께 정리한다. 이번 문서 작업에서는 UI 코드를 변경하지 않는다.

| 대상                           | 현재 구현                              | Migration 방향                                             |
| ------------------------------ | -------------------------------------- | ---------------------------------------------------------- |
| `AppDownload`, `HeaderMetrics` | `py-2.5` = 10px                        | spacing scale의 가장 가까운 적절한 step으로 정리           |
| `Drawer`, `HeroSection`        | `gap-1.5` = 6px                        | 동일 그룹 위계에 맞는 `4` 또는 `8` step을 검토해 정리      |
| Final CTA                      | `py-3.5` = 14px                        | CTA 표준화 시 canonical spacing step으로 정리              |
| `Drawer`                       | `rounded-t-[10px]`                     | 역할에 맞는 `r2` 또는 `r3`를 검토해 정리                   |
| S-04 split                     | `0.78fr / 1.22fr`                      | section 리디자인 시 canonical span 적용 여부 결정          |
| S-05 split                     | `1.22fr / 0.78fr`                      | section 리디자인 시 canonical span 적용 여부 결정          |
| S-06 split                     | `0.9fr / 1.1fr`                        | 최종 span TBD — S-06 리디자인 시 결정                      |
| FAQ narrow content             | `512.5px / 425px`                      | centered narrow content로 유지하되 최종 width / span은 TBD |
| Trust heading                  | `575px`                                | Trust section 리디자인 시 grid span으로 재검토             |
| Director heading               | `350px`                                | S-06 리디자인 시 grid span과 함께 재검토                   |
| S-04~S-06 split gap            | 기존 64px → tablet 32px / desktop 40px | grid gutter와 분리한 composition spacing으로 적용          |
| 기존 Content                   | 1359→1360 width 감소                   | outer padding / inner max-width 분리로 해소됨              |
| Header breakpoint              | 768px 경계 중첩                        | Header 작업 시 `md` 경계와 겹치지 않도록 정리              |

- migration 과정에서도 현재 값을 그대로 새 token으로 승격하지 않는다.
- migration 때문에 디자인 시스템 값을 바꿔야 한다면 먼저 변경 이유와 영향을 제안하고 사용자 확인을 받는다.
- 위 목록은 정리 우선순위를 기록한 것이며, 관련 없는 화면 수정까지 한 번에 확장하는 근거로 사용하지 않는다.

---

## 8. 명령어

```bash
pnpm dev      # 개발 서버 (turbopack)
pnpm build    # 프로덕션 빌드
pnpm lint     # eslint
```

---

## 9. 디렉터리

- 섹션 컴포넌트: `src/feature/<page>/*Section.tsx`
- 공용 컴포넌트: `src/components/`
- 아이콘(SVG): `src/assets/icons/` (`index.ts` re-export)
- 이미지 원본(git 추적): `src/assets/images/` — `*-desktop.*` / `*-mobile.*`
- 이미지 서빙본(원본에서 생성, `pnpm images:optimize`): `public/images/*.webp`
- 상수/링크: `src/constants/`
- 데이터(JSON): `meta/data/` (`fetchGitHubContent()`)
- 테마 토큰: `src/styles/theme/{colors,typo,animate}.css` (진입점 `src/styles/globals.css`)
- 유틸: `src/lib/tw.ts`(`cn`), `src/lib/github.ts`
