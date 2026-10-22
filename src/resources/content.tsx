import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

// ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
// [?˜ì • ?„ìš”] ?´ë¦„Â·?´ë©”?¼Â·ë§?¬ëŠ” ?¤ì œ ê°’ìœ¼ë¡?êµì²´?˜ì„¸??
// ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const person: Person = {
  firstName: "?‹â—‹",
  lastName: "??,
  name: "?‹â—‹??,
  role: "AI Product Planner",
  avatar: "/images/avatar.jpg", // public/images/avatar.jpg ???„ë¡œ???¬ì§„ ?£ê¸°
  email: "your.email@example.com",
  location: "Asia/Seoul",
  languages: ["?œêµ­??, "English"],
  locale: "ko",
};

const newsletter: Newsletter = {
  display: false,
  title: <>?´ìŠ¤?ˆí„°</>,
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
    link: "https://www.linkedin.com/in/your-id/",
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
  title: `${person.name} ??AI Product Planner`,
  description:
    "AI ?”ë£¨?˜ì„ ì§ì ‘ ë§Œë“¤ê³? ì§ì ‘ ?”ê³ , ì§ì ‘ êµ¬ì¶•ê¹Œì? ?´ë³¸ AI Product Planner???¬íŠ¸?´ë¦¬??,
  headline: <>AI ?”ë£¨?˜ì„ ë§Œë“¤ê³? ?”ê³ , êµ¬ì¶•ê¹Œì? ?´ì–´??ê¸°íš??/>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AKeeON</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          ?€???„ë¡œ?íŠ¸
        </Text>
      </Row>
    ),
    href: "/work/akeeon-ax-platform",
  },
  subline: (
    <>
      AK?„ì´?ìŠ¤ AX?¬ì—…?€?ì„œ AWSÂ·Azure ?„ì— AI ?Œë«??" "}
      <Text as="span" size="xl" weight="strong">
        AKeeON
      </Text>
      ???€ ?ì²´ ê°œë°œ?˜ê³ , ì²??€???ë§¤ë¶€??êµ¬ì¶• PLê¹Œì? ??ì£¼ê¸°ë¥?ê²½í—˜?ˆìŠµ?ˆë‹¤.
      <br />
      RPA ê°œë°œ 3??+ AI ê¸°íšÂ·ê°œë°œ 2??
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About ??${person.name}`,
  description: `${person.name}, AI Product Planner @ AK?„ì´?ìŠ¤ AX?¬ì—…?€`,
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
          <strong>AI ?”ë£¨?˜ì„ ì§ì ‘ ë§Œë“¤ê³? ì§ì ‘ ?”ê³ , ì§ì ‘ êµ¬ì¶•ê¹Œì? ?´ë³¸ AI Product Planner</strong>
          ?…ë‹ˆ?? 3?„ì˜ RPA ê°œë°œ, 2?„ì˜ AI ê¸°íšÂ·ê°œë°œ ê²½í—˜??ë°”íƒ•?¼ë¡œ ê¸°ìˆ  ?¤í˜„ ê°€?¥ì„±ê³?ë¹„ì¦ˆ?ˆìŠ¤
          ê°€ì¹˜ë? ?™ì‹œ???ë‹¨?©ë‹ˆ??
        </p>
        <p>
          AK?„ì´?ìŠ¤ AX?¬ì—…?€?ì„œ ?¸ì£¼ ?†ì´ ?€ ?ì²´ ê°œë°œ??AX ?Œë«??" "}
          <strong>AKeeON(AI Chatbot Â· Admin Page)</strong>??ì´ˆê¸° êµ¬ì¶•ê³?ê¸°íš???¨ê»˜ ë§¡ì•˜ê³?
          AWSÂ·Azure ?´ë¼?°ë“œ ?„ì—??AI Chatbot, Admin Page, SAP ?°ë™ Agent ?±ì„ ì§ì ‘ ê°œë°œ?ˆìŠµ?ˆë‹¤.
          ???”ë£¨?˜ì? 2?„ì—¬ ë§Œì— ? ê²½ê·¸ë£¹??AI ?Œë«?¼ìœ¼ë¡??ë¦¬ë§¤ê??ˆìŠµ?ˆë‹¤.
        </p>
        <p>
          ?”ë£¨?˜ì„ ?”ê¸° ?„í•´ ?œí’ˆ?Œê°œ?œÂ·ê?ê²?ëª¨ë¸Â·?”ë£¨???Œê°œ ?ìƒÂ·ê³„ì•½ ?„ë¡œ?¸ìŠ¤ë¥?ì§ì ‘ ë§Œë“¤?ˆê³ ,
          ?€?©ìŠ¤Â·AK PLAZAÂ·?œì£¼??³µÂ·? ê²½ì¼€ë¯¸ì¹¼Â·? ê²½?¤í˜?œí‹° ??ê³„ì—´?¬ì? ?ì–´?œí? ???€??ê³ ê°??          ì§ì ‘ ë§Œë‚˜ ?°ëª¨?€ ?Œê°œë¥??˜í–‰?ˆìŠµ?ˆë‹¤.{" "}
          <strong>
            AKeeON??ì²??€???ë§¤ ê±´ì¸ ? ê²½ì¼€ë¯¸ì¹¼ ?„ë¡œ?íŠ¸??PLë¡?ì°¸ì—¬???±ê³µ?ìœ¼ë¡??„ë£Œ?ˆê³ ,
            ?„ì¬ 2ì°??„ë¡œ?íŠ¸ë¥??˜í–‰ ì¤?          </strong>
          ?…ë‹ˆ??
        </p>
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "AK?„ì´?ìŠ¤ Â· AX?¬ì—…?€",
        timeframe: "2025.01 ???„ì¬",
        role: "AI Product Planner",
        achievements: [
          <>
            <strong>?¬ì—… ê¸°íš</strong> ??AKeeON ?œí’ˆ?Œê°œ?? ê°€ê²?ëª¨ë¸, ?”ë£¨???Œê°œ ?ìƒ ê¸°íšÂ·?¸ì§‘,
            ê³„ì•½ ?„ë¡œ?¸ìŠ¤ ?˜ë¦½. êµ?µ°ë³µì?ëª°Â·ì—?´ì œ?€ AI OCR ?œì•ˆ ?‘ì—….
          </>,
          <>
            <strong>ê³ ê° ì»¨íƒÂ·?°ëª¨</strong> ??AK?€?©ìŠ¤, AK PLAZA, ?œì£¼??³µ, ? ê²½ì¼€ë¯¸ì¹¼,
            ? ê²½?¤í˜?œí‹° ??ê³„ì—´??ë°??ì–´?œí? ???€??ê³ ê° ?€???œì—°Â·ê²°ê³¼ë³´ê³ .
          </>,
          <>
            <strong>êµ¬ì¶•Â·ê°œë°œ</strong> ??AKeeON ì´ˆê¸° êµ¬ì¶•(AI Hub, Orchestrator), ? ê²½ì¼€ë¯¸ì¹¼
            1ì°¨Â?ì°??„ë¡œ?íŠ¸ PL(?¬ê·œê²€??RAG Â· SAP CO Â· SAP ?ë§¤?¤ë” Agent 3ì¢?, ?œì£¼??³µ RAG PoC,
            ?ì–´?œí? ?´í•­ ?¸ì¡° Agent PoC.
          </>,
          <>
            <strong>?ŒíŠ¸??/strong> ???í‹°ë²„ìŠ¤Â·?´ë£¨ì»¤ìŠ¤Â·AWSÂ·Microsoft?€ ?‘ì—…, Microsoft AI
            Partner Solution Showcase ì°¸ì—¬.
          </>,
        ],
        images: [],
      },
      {
        company: "AK?„ì´?ìŠ¤ Â· RPA",
        timeframe: "2022.02 ??2025.01",
        role: "RPA Developer",
        achievements: [
          <>
            <strong>KBêµ???€??RPA ?ì‹œê°œë°œ</strong>(2024.04??025.01) ??KB ?„ë ˆ?„ì›Œ??ê¸°ë°˜ ? ê·œ
            ê³¼ì œ ?¤ê³„Â·ê°œë°œ, ?¸í›„ ?„ë ˆ?„ì›Œ??ê°œì„ , ê³ ê° ë§Œì¡±??80% ?´ìƒ.
          </>,
          <>
            <strong>?„ë?ì¹´ë“œ/ì»¤ë¨¸??RPA ?ì‹œê°œë°œ</strong>(2022.03??023.12) ???¹í—ˆ ??ê¸°ë°˜ ë³‘ë ¬
            ì²˜ë¦¬ ?„í‚¤?ì²˜ë¡??„ì‚¬ ?…ë¬´ ?ë™??ê³¼ì œ ?¤ê³„Â·ê°œë°œ, ë§ë¶„ë¦?·ê¸ˆ??ë³´ì•ˆ ?˜ê²½?ì„œ 150??ê°?            ê³¼ì œ ?„ë ˆ?„ì›Œ??·íŒ¨???µë“.
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
        name: "?‹â—‹?€?™êµ ?‹â—‹?™ê³¼", // [?˜ì • ?„ìš”] ?€?™Â·ì „ê³µÂ·ì¡¸?…ì—°??        description: <>3??ë°?ì¡°ê¸° Â· ?˜ì„ ì¡¸ì—…</>,
      },
      {
        name: "?ê²©ì¦?,
        description: (
          <>
            ë¹…ë°?´í„°ë¶„ì„ê¸°ì‚¬(2025.07) Â· AWS Solutions Architect ??Associate(2025.05) Â·
            ?•ë³´ì²˜ë¦¬ê¸°ì‚¬(2023.11) Â· ADsP(2022.09)
          </>
        ),
      },
      {
        name: "AI RPA ?¬ì—… ?¤ìŠµ ?°ê³„ ?¸í„´??Â· ?°í•™ ?‘ë ¥?„ë¡œê·¸ë¨",
        description: (
          <>
            2021 ???œêµ­ë³´ìœ¡ì§„í¥???‰ê? ?¸ì¦ ?œìŠ¤???ë™?? (ì£?ì½”ìŠ¤?Œì—‘??AI RPA ê³¼ì œ PM(ê³¼ì œ
            ë°œêµ´Â·?„ë¡œ?¸ìŠ¤ ?•ì˜???‘ì„±)
          </>
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
          <>
            AWS Bedrock Â· S3 Â· OpenSearch Â· Lambda Â· DynamoDB Â· ECS Fargate ê¸°ë°˜ Serverless
            RAG/Agent êµ¬ì„±. Azure OpenAI Â· AI Foundry Â· AI Search Â· Blob Storage Â· Container
            Apps(ACA) ê¸°ë°˜ RAG ?Œì´?„ë¼??êµ¬ì¶• ë°?ì»¨í…Œ?´ë„ˆ ë°°í¬.
          </>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Azure", icon: "azure" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
      {
        title: "AI ?¬ì—… ë°œêµ´ Â· ê¸°íš",
        description: (
          <>
            Pain Point ?¸í„°ë·???AX ê³¼ì œ ?„ì¶œ ??PoC ë²”ìœ„ ?•ì˜ ???œì•ˆ?œÂ·ê²¬????ê³„ì•½ê¹Œì? ??ì£¼ê¸°.
            ?œí’ˆ?Œê°œ?? ê°€ê²?ëª¨ë¸, ?Œê°œ ?ìƒ, ?°ëª¨ ?œë‚˜ë¦¬ì˜¤ ???¸ì¼ì¦??ì‚° ê¸°íšÂ·?œì‘. ?„ì›ì§??€??            ê²°ê³¼ë³´ê³ .
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "AI Agent Â· RAG ê°œë°œ",
        description: (
          <>
            ë¬¸ì„œ ?„ì²˜ë¦¬â€“ì„ë² ë”©?“ê??‰â€“ì‘???ì„± End-to-End RAG ?Œì´?„ë¼?? Hybrid Search Â· Multi
            Query Â· ë©”í??°ì´???„í„°ë§ìœ¼ë¡??•í™•??ê°œì„ (95%+). Tool Calling ê¸°ë°˜ SAP CO Â· ?ë§¤?¤ë”
            Agent, ??³µ ?´í•­ ?¸ì¡° Agent ?¤ê³„.
          </>
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
        title: "Backend / Data Â· RPA",
        description: (
          <>
            FastAPI ?œë¹„???¤ê³„, Redis ?¸ì¦, MySQL ERDÂ·?°ì´??ëª¨ë¸ë§? CI/CD. UiPath ê¸°ë°˜ ê¸ˆìœµê¶?            ?…ë¬´ ?ë™?? Document Understanding(OCR) ?¼ë²¨ë§Â·í•™???Œì´?„ë¼??
          </>
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
  path: "/blog",
  label: "News",
  title: "News & Activities",
  description: "?„ë¡œ?íŠ¸ ë³´ë„, ?‰ì‚¬ ì°¸ì—¬, ë°œí‘œ ???œë™ ?Œì‹",
  // src/app/blog/posts ??.mdx ?Œì¼??ì¶”ê??˜ë©´ ?ë™?¼ë¡œ ëª©ë¡???œì‹œ?©ë‹ˆ??
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects ??${person.name}`,
  description: "AI ?Œë«??êµ¬ì¶•, Agent PoC, ?¬ì—… ?œì•ˆ ?„ë¡œ?íŠ¸",
  // src/app/work/projects ??.mdx ?Œì¼??ì¶”ê??˜ë©´ ?ë™?¼ë¡œ ëª©ë¡???œì‹œ?©ë‹ˆ??
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery ??${person.name}`,
  description: "",
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
