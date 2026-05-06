# 프론트엔드 3주차 과제 — CSS를 설계하는 방법

## 0. 문제 인식

```css
.box1 {}
.box2 {}
.red-text {}
.big-text {}
```

```html
<div class="box1">
  <p class="red-text big-text">안녕하세요</p>
</div>
```

위 코드 방식의 문제점

1. 클래스 이름만 보고 역할을 명확하게 알 수 없다. box1이 어떤 박스인지, red-text가 어떤 맥락에서 쓰이는지 이름만으로 파악이 불가능하다.
2. 스타일 충돌이 발생할 가능성이 있다. red-text는 프로젝트 어디서든 쓸 수 있는 이름이라 전혀 다른 컴포넌트에 의도치 않게 적용될 수 있다.
3. 프로젝트가 커졌을 때 유지보수가 어렵다. box1을 수정하고 싶어도 어디에 쓰이는 박스인지 파악하기 위해 HTML 전체를 뒤져야 한다.
4. 팀 협업 시 네이밍 기준이 없으면 팀원마다 다른 방식으로 클래스명을 짓게 되어 코드가 뒤섞인다.

## 1. 조사 및 정리

### 1) CSS를 무작정 작성했을 때 생기는 문제

**클래스명 충돌**

전역으로 작성된 CSS는 어떤 요소에든 적용될 수 있다. 같은 이름을 다른 컴포넌트에서 우연히 사용하면 의도하지 않은 스타일이 적용된다.

**중복 코드**

비슷한 스타일인데 이름이 달라서 동일한 CSS 선언을 여러 번 반복하게 된다. 나중에 수정할 때 모든 곳을 다 찾아서 바꿔야 한다.

**유지보수 어려움**

시간이 지나면 어떤 클래스가 어디서 쓰이는지, 지워도 되는지 판단하기 어려워진다. 결국 쓰이지 않는 스타일이 계속 쌓이게 된다.

### 2) BEM이란 무엇인가

BEM은 Block, Element, Modifier의 약자로 CSS 클래스명을 짓는 방법론이다. 클래스 이름만 봐도 어떤 컴포넌트의 어떤 부분인지 바로 알 수 있도록 규칙을 정한 것이다.

**Block** — 독립적으로 존재할 수 있는 컴포넌트 단위
**Element** — Block 안에 속한 구성 요소. 언더바 두 개(__)로 연결
**Modifier** — Block이나 Element의 변형 상태. 하이픈 두 개(--)로 연결

```css
.card {}                     /* Block */
.card__avatar {}             /* Element */
.card__tag {}                /* Element */
.card__tag--featured {}      /* Modifier */
.card--red {}                /* Block Modifier */
```

### 3) Tailwind CSS는 어떤 방식인가

Tailwind CSS는 Utility-first 방식의 CSS 프레임워크다. 미리 만들어진 작은 유틸리티 클래스들을 HTML에 직접 조합해서 스타일을 완성한다. CSS 파일을 별도로 작성하지 않고 HTML 안에서 스타일을 바로 적용할 수 있다.

```html
<div class="rounded-2xl shadow-md bg-white hover:-translate-y-2 transition-all dark:bg-slate-800">
```

## 2. UI 구조 설계

(설계 사진 첨부)

## 3. 구현 (Tailwind CSS)

**사용한 요소**
- 프로필 아바타 영역 (이니셜 표시)
- 이름, 직책, 지역
- 한 줄 소개
- 기술 태그 (React, TypeScript, Tailwind, Java, Python)
- GitHub / Blog 버튼 2개
- 온라인 상태 뱃지

**사용한 Tailwind 기능**
- `grid`, `grid-cols-2`, `flex` — 레이아웃 구성
- `px`, `py`, `pt`, `pb`, `gap` — 여백
- `rounded-2xl`, `rounded-full` — 둥근 모서리
- `shadow-md`, `hover:shadow-xl` — 그림자
- `hover:-translate-y-2`, `active:scale-95` — hover 인터랙션
- `sm:grid-cols-2` — 반응형 레이아웃

## 4. 추가 도전 

- `@keyframes fadeInUp` — 페이지 로드 시 카드가 아래에서 위로 등장하는 애니메이션 적용
- `@keyframes popIn` — 아바타가 카드보다 살짝 늦게 등장하는 딜레이 애니메이션 적용
- `@keyframes pulse` — 상태 뱃지의 초록 점이 천천히 깜빡이는 효과 적용
- `dark:` 접두사 활용한 다크모드 스타일 적용 및 토글 버튼 구현
- 모바일(560px 미만)에서 카드가 가로 레이아웃으로 전환되는 반응형 구성
- 카드 2개를 `sm:grid-cols-2`로 데스크탑에서 2열 grid 배치
- `card--red` Modifier로 색깔을 바꿔 빨간색 카드 변형 추가 

## 5. 비교 및 회고

### 1) BEM 방식으로 다시 설계

내가 만든 카드 UI를 BEM 방식으로 설계하면 클래스명을 아래와 같이 구성할 수 있다.

| 클래스명 | 역할 |
|---|---|
| `.card` | 카드 전체 Block |
| `.card--red` | 빨간색 카드 변형 |
| `.card__banner` | 상단 배너 영역 |
| `.card__banner-status` | 상태 뱃지 |
| `.card__banner-dot` | 상태 점 |
| `.card__banner-dot--pulse` | 깜빡이는 상태 점 |
| `.card__avatar-wrap` | 아바타 위치 잡는 wrapper |
| `.card__avatar` | 아바타 원형 영역 |
| `.card__body` | 카드 본문 영역 |
| `.card__name` | 이름 |
| `.card__role` | 직책/지역 |
| `.card__bio` | 한 줄 소개 |
| `.card__tags` | 태그 목록 wrapper |
| `.card__tag` | 개별 태그 |
| `.card__tag--featured` | 강조 태그 (파란색/빨간색) |
| `.card__divider` | 구분선 |
| `.card__buttons` | 버튼 영역 wrapper |
| `.card__btn` | 기본 버튼 |
| `.card__btn--primary` | 주요 버튼 (GitHub) |

### 2) Tailwind 사용 경험

**편했던 점**
- CSS 파일을 별도로 만들지 않아도 돼서 빠르게 구현할 수 있었다.
- hover, 반응형, 다크모드를 HTML 클래스 안에서 바로 처리할 수 있어서 왔다갔다 할 필요가 없었다.
- 클래스 네이밍 걱정 없이 구현이 가능했다.

**불편했던 점**
- 고봉밥처럼 클래스가 너무 많아져서 HTML 가독성이 떨어졌다.
- 빨간 카드를 만들 때 파란 카드의 색상 클래스를 전부 다시 바꿔서 써야 했다...
  (BEM이라면 `card--red` 하나만 추가하면 가능함을 확인하고 기운이 빠졌다.)
- 나중에 다시 봤을 때 어떤 클래스가 어떤 역할인지 한눈에 파악하기 어려웠다.

**BEM vs Tailwind 비교**

| 항목 | Tailwind | BEM |
|---|---|---|
| 스타일 위치 | HTML 클래스 안 | CSS 파일 |
| HTML 클래스 길이 | 길다 | 짧고 명확하다 |
| CSS 파일 | 없음 | 별도 작성 필요 |
| 카드 색상 변형 | 색상 클래스 전부 재작성 | `card--red` 한 줄만 추가하면 쉽게 변경 가능 |
| 다크모드 | `dark:` 클래스 인라인 추가로 번거로움 | `body.is-dark .card` 로 일괄 처리 |
| 가독성 | 파악하기 어렵다 | 클래스명만 봐도 구조 파악 가능 |
| 개발 속도 | 빠르다 | 느리다 |
| 유지보수 | 수정 시 HTML을 직접 일일이 찾아야 함 | CSS 파일에서 일괄 수정 가능 |
