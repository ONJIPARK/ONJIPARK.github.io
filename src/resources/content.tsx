import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Column, Line, Row, Text } from "@once-ui-system/core";
import type { ReactNode } from "react";

// About 페이지용 짧은 항목 목록
const List = ({ items }: { items: ReactNode[] }) => (
  <Column as="ul" gap="4" paddingTop="8">
    {items.map((item, index) => (
      <Text as="li" key={index} variant="body-default-m" onBackground="neutral-weak">
        {item}
      </Text>
    ))}
  </Column>
);

// 이름 — 날짜를 양쪽 정렬로 보여주는 목록 (자격증 등)
const DatedList = ({ items }: { items: [ReactNode, string][] }) => (
  <Column as="ul" gap="8" paddingTop="8">
    {items.map(([name, date], index) => (
      <Row as="li" key={index} fillWidth horizontal="between" vertical="center" gap="16">
        <Text variant="body-default-m" onBackground="neutral-strong">
          {name}
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {date}
        </Text>
      </Row>
    ))}
  </Column>
);

// ──────────────────────────────────────────────────────────
// [수정 필요] 이름·이메일·링크는 실제 값으로 교체하세요.
// ──────────────────────────────────────────────────────────
const person: Person = {
  firstName: "온지",
  lastName: "박",
  name: "박온지",
  role: "AI Product Planner",
  avatar: "/images/profile-onji.jpg", // public/images/profile-onji.jpg 에 프로필 사진 넣기
  email: "dhswl653@gmail.com",
  location: "Asia/Seoul",
  languages: ["한국어", "English"],
  locale: "ko",
};

const newsletter: Newsletter = {
  display: false,
  title: <>뉴스레터</>,
  description: <></>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/ONJIPARK",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/onji-park/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — AI Product Planner`,
  description:
    "AI 솔루션을 직접 만들고, 직접 팔고, 직접 구축까지 해본 AI Product Planner의 포트폴리오",
  headline: <>AI 솔루션을 만들고, 팔고, 구축까지 이어온 기획자</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AKeeON</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          대표 프로젝트
        </Text>
      </Row>
    ),
    href: "/work/akeeon-ax-platform",
  },
  subline: (
    <>
      AK아이에스 AX사업팀에서 AWS·Azure 위에 AI 플랫폼{" "}
      <Text as="span" size="xl" weight="strong">
        AKeeON
      </Text>
      을 팀 자체 개발하고, 첫 대외 판매부터 구축 PL까지 전 주기를 경험했습니다.
      <br />
      RPA 개발 3년 + AI 기획·개발 2년.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `${person.name}, AI Product Planner @ AK아이에스 AX사업팀`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduce",
    description: (
      <>
        <p>
          <strong>AI 솔루션을 직접 만들고, 직접 팔고, 직접 구축까지 해본 AI Product Planner</strong>
          입니다. 3년의 RPA 개발, 2년의 AI 기획·개발 경험을 바탕으로 기술 실현 가능성과 비즈니스
          가치를 동시에 판단합니다.
        </p>
        <p>
          AK아이에스 AX사업팀에서 외주 없이 팀 자체 개발한 AX 플랫폼{" "}
          <strong>AKeeON(AI Chatbot · Admin Page)</strong>의 초기 구축과 기획을 함께 맡았고,
          AWS·Azure 클라우드 위에서 AI Chatbot, Admin Page, SAP 연동 Agent 등을 직접 개발했습니다.
          이 솔루션은 2년여 만에 애경그룹의 AI 플랫폼으로 자리매김했습니다.
        </p>
        <p>
          솔루션을 팔기 위해 제품소개서·가격 모델·솔루션 소개 영상·계약 프로세스를 직접 만들었고,
          홀딩스·AK PLAZA·제주항공·애경케미칼·애경스페셜티 등 계열사와 에어제타 등 대외 고객을
          직접 만나 데모와 소개를 수행했습니다.{" "}
          <strong>
            AKeeON의 첫 대외 판매 건인 애경케미칼 프로젝트에 PL로 참여해 성공적으로 완료했고,
            현재 2차 프로젝트를 수행 중
          </strong>
          입니다.
        </p>
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "AK아이에스 · AX사업팀",
        timeframe: "2025.01 – 현재",
        role: "AI Product Planner",
        achievements: [
          <>
            <strong>사업 기획</strong>
            <List
              items={[
                "AKeeON 제품소개서 · 가격 모델 · 계약 프로세스 수립",
                "솔루션 소개 영상 기획 · 편집",
                "국군복지몰 · 에어제타 AI OCR 제안",
              ]}
            />
          </>,
          <>
            <strong>고객 컨택 · 데모</strong>
            <List
              items={[
                "계열사: AK홀딩스, AK PLAZA, 제주항공, 애경케미칼, 애경스페셜티",
                "대외 고객: 에어제타 등",
                "고객 대상 시연 · 결과보고",
              ]}
            />
          </>,
          <>
            <strong>구축 · 개발</strong>
            <List
              items={[
                "AKeeON 초기 구축 (AI Hub, Orchestrator)",
                "애경케미칼 1차·2차 프로젝트 PL — 사규검색 RAG · SAP CO · SAP 판매오더 Agent 3종",
                "제주항공 RAG PoC",
                "에어제타 운항 편조 Agent PoC",
              ]}
            />
          </>,
          <>
            <strong>파트너</strong>
            <List
              items={[
                "에티버스 · 클루커스 · AWS · Microsoft 협업",
                "Microsoft AI Partner Solution Showcase 참여",
              ]}
            />
          </>,
        ],
        images: [],
      },
      {
        company: "AK아이에스 · AI & RPA팀",
        timeframe: "2022.02 – 2025.01",
        role: "RPA Developer",
        achievements: [
          <>
            <strong>KB국민은행 RPA 상시개발</strong> (2024.04 – 2025.01)
            <List
              items={[
                "KB 프레임워크 기반 신규 과제 설계 · 개발",
                "노후 프레임워크 개선",
                "고객 만족도 80% 이상",
              ]}
            />
          </>,
          <>
            <strong>현대카드/커머셜 RPA 상시개발</strong> (2022.03 – 2023.12)
            <List
              items={[
                "특허 큐 기반 병렬 처리 아키텍처로 전사 업무 자동화 과제 설계 · 개발",
                "망분리 · 금융 보안 환경에서 150여 개 과제 프레임워크 · 패턴 습득",
              ]}
            />
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education & Certifications",
    institutions: [
      {
        name: "명지대학교 경영정보학과",
        description: <>경영정보학 학사 · 학점 4.29 · 조기 · 과수석 졸업</>,
      },
      {
        name: "자격증",
        description: (
          <DatedList
            items={[
              ["빅데이터분석기사", "2025.07"],
              ["AWS Solutions Architect – Associate", "2025.05"],
              ["정보처리기사", "2023.11"],
              ["ADsP (데이터분석 준전문가)", "2022.09"],
            ]}
          />
        ),
      },
      {
        name: "AI RPA 사업 실습 연계 인턴십 · 산학 협력프로그램",
        description: (
          <List
            items={[
              "2021 · 한국보육진흥원 평가 인증 시스템 자동화",
              "2021 · (주)코스알엑스 AI RPA 과제 PM — 과제 발굴, 프로세스 정의서 작성",
            ]}
          />
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Key Skills",
    skills: [
      {
        title: "Cloud Native AI (AWS / Azure)",
        description: (
          <List
            items={[
              <>
                <strong>AWS</strong> — Bedrock · S3 · OpenSearch · Lambda · DynamoDB · ECS Fargate
                기반 Serverless RAG/Agent 구성
              </>,
              <>
                <strong>Azure</strong> — OpenAI · AI Foundry · AI Search · Blob Storage · Container
                Apps(ACA) 기반 RAG 파이프라인 구축 및 컨테이너 배포
              </>,
            ]}
          />
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Azure", icon: "azure" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
      {
        title: "AI 사업 발굴 · 기획",
        description: (
          <List
            items={[
              "Pain Point 인터뷰 → AX 과제 도출 → PoC 범위 정의 → 제안서·견적 → 계약까지 전 주기",
              "제품소개서 · 가격 모델 · 소개 영상 · 데모 시나리오 등 세일즈 자산 기획 · 제작",
              "임원진 대상 결과보고",
            ]}
          />
        ),
        tags: [],
        images: [],
      },
      {
        title: "AI Agent · RAG 개발",
        description: (
          <List
            items={[
              "End-to-End RAG 파이프라인 — 문서 전처리 → 임베딩 → 검색 → 응답 생성",
              "Hybrid Search · Multi Query · 메타데이터 필터링으로 정확도 95%+ 개선",
              "Tool Calling 기반 SAP CO · 판매오더 Agent, 항공 운항 편조 Agent 설계",
            ]}
          />
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "FastAPI", icon: "fastapi" },
          { name: "LangChain", icon: "langchain" },
          { name: "React", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
        ],
        images: [],
      },
      {
        title: "Backend / Data · RPA",
        description: (
          <List
            items={[
              "FastAPI 서비스 설계 · Redis 인증 · MySQL ERD/데이터 모델링 · CI/CD",
              "UiPath 기반 금융권 업무 자동화",
              "Document Understanding(OCR) 라벨링 · 학습 파이프라인",
            ]}
          />
        ),
        tags: [
          { name: "MySQL", icon: "mysql" },
          { name: "Redis", icon: "redis" },
          { name: "UiPath", icon: "uipath" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/news",
  label: "News",
  title: "News & Activities",
  description: "프로젝트 보도, 행사 참여, 발표 등 활동 소식",
  // src/app/news/posts 에 .mdx 파일을 추가하면 자동으로 목록에 표시됩니다.
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: "AI 플랫폼 구축, Agent PoC, 사업 제안 프로젝트",
  // src/app/work/projects 에 .mdx 파일을 추가하면 자동으로 목록에 표시됩니다.
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: "",
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
