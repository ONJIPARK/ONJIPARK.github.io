# 포트폴리오 세팅 가이드 (Magic Portfolio → GitHub Pages)

이 폴더는 Magic Portfolio 템플릿에 경력기술서 v0.3 내용을 넣고, GitHub Pages(정적 호스팅)에서 돌아가도록 수정한 버전입니다.

## 1. 배포 (5단계)

1. 새 GitHub 계정으로 리포 생성: 이름은 `<계정명>.github.io` (Public)
2. 이 폴더 내용을 그대로 push (main 브랜치)
3. 리포 Settings → Pages → **Source: GitHub Actions** 선택
4. Actions 탭에서 "Deploy to GitHub Pages" 워크플로우가 끝나면 `https://<계정명>.github.io` 접속
5. `src/resources/once-ui.config.ts`의 `baseURL`을 실제 주소로 수정 후 다시 push (SEO용)

로컬 미리보기: `npm install` → `npm run dev` → http://localhost:3000

## 2. 꼭 수정할 것 ([수정 필요] 표시)

| 파일 | 항목 |
|---|---|
| `src/resources/content.tsx` | `person` 이름·이메일, `social` GitHub/LinkedIn 링크, 대학/전공 |
| `public/images/avatar.jpg` | 프로필 사진 (정사각형 권장) |
| `public/images/projects/*/cover-01.jpg` | 프로젝트 커버 이미지 (지금은 템플릿 샘플) |
| `public/images/news/*.jpg` | 뉴스 썸네일 |
| `src/app/blog/posts/*.mdx` | 기사 링크(`https://example.com`) |
| `public/images/og/home.jpg` | 링크 공유 시 미리보기 이미지 |

## 3. 내용 추가하기

- **프로젝트 추가**: `src/app/work/projects/` 에 `.mdx` 파일 추가 (기존 파일 복사해서 수정)
- **뉴스 추가**: `src/app/blog/posts/` 에 `.mdx` 파일 추가. `tag`는 Event / Project / Press 등 자유
- 홈 화면 "대표 프로젝트" 배지: `content.tsx` → `home.featured.href`

## 4. 디자인 바꾸기

`src/resources/once-ui.config.ts` → `style` 블록 한 곳에서 전부 바뀝니다.

```ts
theme: "system",   // dark | light | system
neutral: "slate",  // sand | gray | slate | mint | rose | dusk
brand: "indigo",   // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
accent: "orange",
border: "conservative", // rounded | playful | conservative | sharp
```

폰트는 같은 파일의 `Noto_Sans_KR` 부분을 바꾸면 됩니다 (Pretendard는 `next/font/local`로 교체).

## 5. 원본 템플릿 대비 수정한 부분 (GitHub Pages용)

- `next.config.mjs`: `output: "export"`, `images.unoptimized: true`
- `src/app/api/` 삭제 (서버 라우트는 정적 호스팅에서 동작 불가 → OG 이미지 자동생성·비밀번호 보호 기능 제거)
- `src/app/layout.tsx`: `RouteGuard` 제거
- `robots.ts`, `sitemap.ts`: `force-static` 추가
- `.github/workflows/deploy-pages.yml` 추가

라이선스는 CC BY-NC 4.0 (개인 포트폴리오 사용 가능, 푸터 저작자 표기 유지).
