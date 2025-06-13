"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { colors } from "@/lib/colors"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseInfo {
  title: string
  subtitle?: string
  hours?: string
  objectives?: string[]
  content?: string[]
  highlights?: string[]
  focus?: string[]
  materials?: string[]
  achievements?: string[]
  specialization?: string[]
  customization?: string[]
}

interface CourseDetails {
  [key: string]: CourseInfo
}

interface TranslationBase {
  title: string
  subtitle: string
  tabBeginner: string
  tabIntermediate: string
  tabAdvanced: string
  tabCertification: string
  tabCorporate: string
  tabPrivate: string
  hours: string
  classSize: string
  objectives: string
  coreContent: string
  highlights: string
  focus: string
  materials: string
  achievements: string
  specialization: string
  customization: string
  contactButton: string
  enrollButton: string
  moreButton: string
  ctaTitle: string
  ctaSubtitle: string
  certificationMessage: string
  privateMessage: string
  privateContact: string
  courseDetails: CourseDetails
  corporateCourses?: CourseDetails
}

interface Translations {
  [key: string]: TranslationBase
}

interface CoursePageProps {
  params: {
    locale: string;
  };
}

const translations: Translations = {
  "en": {
    // ... existing translations ...
    corporateCourses: {
      A0: {
        title: "Corporate A0",
        objectives: [
          "Establish Vietnamese pronunciation system foundation (tones/vowels/consonants)",
          "Master survival-level conversation skills (self-introduction, basic Q&A)"
        ],
        content: [
          "Phonetic system: 29 letter pronunciation rules + 6 tone training",
          "Themed conversations: personal information, profession, daily items",
          "Skill ratio: 70% listening/speaking | 30% reading/writing"
        ]
      },
      A1: {
        title: "Corporate A1",
        achievements: [
          "Understand slow-paced daily conversations (100 words/minute)",
          "Complete basic transactional communication (negotiation margin ≤15%)"
        ],
        content: [
          "City survival: public transportation, asking for directions",
          "Business scenarios: market purchases, understanding simple contract terms"
        ]
      },
      A2: {
        title: "Corporate A2",
        content: [
          "Travel scenario simulation: hotel booking/ticketing/emergency response",
          "Digital communication: social media phrases, online shopping dialogues"
        ],
        achievements: [
          "Basic grammar accuracy reaches 80%",
          "Can understand short daily life passages under 300 words"
        ]
      },
      B1: {
        title: "Corporate B1",
        specialization: [
          "Workplace applications: meeting minutes, work email composition",
          "Academic foundation: chart description, basic data interpretation"
        ],
        achievements: [
          "Can deliver 10-minute continuous topic presentations",
          "Understand main messages in broadcast news (70%+ comprehension)"
        ]
      },
      B2: {
        title: "Corporate B2",
        content: [
          "Media analysis: identifying news report perspectives",
          "Discursive writing: presenting pros and cons (within 500 characters)",
          "Professional vocabulary: 200+ key terms in economics/society/education"
        ],
        materials: [
          "Supplementary units from 'Practical Business Vietnamese'"
        ]
      },
      C1: {
        title: "Corporate C1",
        objectives: [
          "Intensive reading of academic papers (85%+ comprehension)",
          "Professional presentation skills (including Q&A strategies)",
          "Cross-cultural communication case studies"
        ]
      },
      C2C3: {
        title: "Corporate Mastery C2-C3",
        subtitle: "Native Speaker Certification Standard",
        hours: "36",
        objectives: [
          "Dialect recognition: Hanoi/Ho Chi Minh City accent differences",
          "Literary analysis: interpreting modern poetry rhetoric",
          "Advanced negotiation strategies: cross-cultural conflict management"
        ],
        customization: [
          "Field specialization: legal/medical/engineering terminology",
          "Artistic expression: film and TV script writing guidance"
        ]
      }
    },
    // ... rest of the English translations ...
    title: "Our Vietnamese Courses",
    subtitle: "Comprehensive learning paths for all levels",
    tabBeginner: "Beginner",
    tabIntermediate: "Intermediate",
    tabAdvanced: "Advanced",
    tabCertification: "Certification",
    tabCorporate: "Corporate",
    tabPrivate: "Private Lessons",
    hours: "Hours",
    classSize: "Class Size",
    objectives: "Learning Objectives",
    coreContent: "Core Content",
    highlights: "Highlights",
    focus: "Focus Areas",
    materials: "Materials",
    achievements: "Achievements",
    specialization: "Specialization",
    customization: "Customization",
    contactButton: "Contact Us",
    enrollButton: "Enroll Now",
    moreButton: "Learn More",
    ctaTitle: "Ready to start your Vietnamese learning journey?",
    ctaSubtitle: "Whether you're a beginner or looking to enhance your existing language skills, we have courses suitable for you.",
    certificationMessage: "Certification courses are currently being planned. Please contact us for more details.",
    privateMessage: "We offer customized private lessons tailored to your needs and learning goals.",
    privateContact: "Please contact us directly and we will arrange a dedicated consultant for a detailed consultation.",
    courseDetails: {
      A0: {
        title: "Starter Level",
        objectives: [
          "Establish Vietnamese pronunciation system foundation",
          "Master basic daily conversation skills (self-introduction, personal interests, daily scenarios)",
          "Understand and use high-frequency practical phrases"
        ],
        content: [
          "Vowel/consonant pronunciation rules, tone recognition training",
          "Themed conversations: name, nationality, occupation, shopping, time expression",
          "Listening & speaking enhancement + basic reading/writing introduction"
        ]
      },
      A1: {
        title: "Beginner Foundation",
        objectives: [
          "Understand short daily conversations (e.g., asking for directions, transportation, bargaining)",
          "Learn techniques for 'active questioning' and 'key information capturing'"
        ],
        content: [
          "Scenario simulation: market shopping, ordering at restaurants, taking public transport",
          "Basic business terms (inquiries, appointments, simple negotiations)"
        ]
      },
      A2: {
        title: "Elementary Level",
        objectives: [
          "Handle routine social interactions and simple transactions",
          "Describe in simple terms aspects of background and immediate environment"
        ],
        content: [
          "Expressing opinions, making comparisons, describing experiences",
          "Handling travel arrangements, dealing with emergencies, basic workplace communication"
        ]
      },
      B1: {
        title: "Intermediate Level",
        objectives: [
          "Deal with most situations likely to arise while traveling in Vietnam",
          "Produce simple connected text on familiar topics"
        ],
        content: [
          "Discussing news, current affairs, and cultural topics",
          "Writing personal letters, emails, and short reports"
        ],
        highlights: [
          "Using 'Standard Vietnamese B1' textbook Units 1-8",
          "Developing paragraph-level expression skills (e.g., describing experiences, explaining work processes)"
        ]
      },
      B2: {
        title: "Upper Intermediate",
        objectives: [
          "Interact with a degree of fluency and spontaneity with native speakers",
          "Produce clear, detailed text on a wide range of subjects"
        ],
        content: [
          "Debating, presenting arguments, and discussing abstract topics",
          "Understanding complex texts, including technical discussions in your field"
        ],
        focus: [
          "Academic/workplace scenarios: meeting discussions, data interpretation, cultural difference analysis",
          "Advanced grammar: relative clauses, subjunctive mood, formal letter structure"
        ]
      },
      B3: {
        title: "Advanced Intermediate",
        objectives: [
          "Express ideas fluently and spontaneously without much obvious searching for expressions",
          "Use language flexibly and effectively for social, academic and professional purposes"
        ],
        content: [
          "Understand a wide range of demanding, longer texts, and recognize implicit meaning",
          "Produce clear, well-structured, detailed text on complex subjects"
        ],
        specialization: [
          "Professional presentation and negotiation skills",
          "Advanced academic writing and research methodologies",
          "Cross-cultural communication strategies"
        ]
      },
      C1: {
        title: "Advanced Level",
        objectives: [
          "Express ideas fluently and spontaneously without much obvious searching for expressions",
          "Use language flexibly and effectively for social, academic, and professional purposes"
        ],
        content: [
          "Academic writing and presentations",
          "Understanding implicit meaning and nuances in complex texts"
        ]
      },
      C2: {
        title: "Proficiency Level",
        objectives: [
          "Understand with ease virtually everything heard or read",
          "Summarize information from different spoken and written sources"
        ],
        content: [
          "Mastery of idiomatic expressions and colloquialisms",
          "Producing clear, well-structured, detailed text on complex subjects"
        ]
      },
      C3: {
        title: "Expert Level",
        objectives: ["Specialized mastery and advanced professional application"],
        content: [
          "Deepen knowledge in specific fields (e.g., audiovisual translation, diplomatic language)",
          "Thesis writing guidance and interpretation techniques"
        ]
      }
    }
  },
  "zh-Hant": {
    // ... existing translations ...
    corporateCourses: {
      A0: {
        title: "企業 A0",
        objectives: [
          "建立越南語發音系統基礎（聲調/母音/子音）",
          "掌握生存級會話能力（自我介紹、基礎問答）"
        ],
        content: [
          "發音系統：29個字母發音規則 + 6個聲調訓練",
          "主題會話：個人資訊、職業、日常物品",
          "技能比例：70% 聽力/口說 | 30% 閱讀/寫作"
        ]
      },
      A1: {
        title: "企業 A1",
        achievements: [
          "理解慢速日常對話（每分鐘100字）",
          "完成基礎交易溝通（議價誤差≤15%）"
        ],
        content: [
          "城市生存：大眾運輸、問路",
          "商業場景：市場採購、理解簡單合約條款"
        ]
      },
      A2: {
        title: "企業 A2",
        content: [
          "旅遊情境模擬：飯店訂房/購票/緊急應對",
          "數位溝通：社群用語、網購對話"
        ],
        achievements: [
          "基礎文法準確度達80%",
          "能理解300字以內日常生活短文"
        ]
      },
      B1: {
        title: "企業 B1",
        specialization: [
          "職場應用：會議記錄、工作郵件撰寫",
          "學術基礎：圖表描述、基礎數據解讀"
        ],
        achievements: [
          "能進行10分鐘連續主題發表",
          "理解廣播新聞主要訊息（理解率70%以上）"
        ]
      },
      B2: {
        title: "企業 B2",
        content: [
          "媒體分析：辨識新聞報導觀點",
          "論說文寫作：正反論述（500字內）",
          "專業詞彙：200+個經社教領域關鍵術語"
        ],
        materials: [
          "《實用商務越南語》補充單元"
        ]
      },
      C1: {
        title: "企業 C1",
        objectives: [
          "學術論文精讀（理解率85%以上）",
          "專業簡報技巧（含Q&A策略）",
          "跨文化溝通案例分析"
        ]
      },
      C2C3: {
        title: "企業精通級 C2-C3",
        subtitle: "母語者認證標準",
        hours: "36 小時",
        objectives: [
          "方言辨識：河內/胡志明市口音差異",
          "文學分析：現代詩歌修辭解讀",
          "高階談判策略：跨文化衝突管理"
        ],
        customization: [
          "領域強化：法律/醫療/工程專業術語",
          "藝術表達：影視劇本創作指導"
        ]
      }
    },
    // ... rest of the Traditional Chinese translations ...
    title: "越南語課程",
    subtitle: "為各級別提供全面的學習路徑",
    tabBeginner: "初級",
    tabIntermediate: "中級",
    tabAdvanced: "高級",
    tabCertification: "考證班",
    tabCorporate: "企業班",
    tabPrivate: "個人班",
    hours: "課程時數",
    classSize: "班級人數",
    objectives: "學習目標",
    coreContent: "核心內容",
    highlights: "教學亮點",
    focus: "強化領域",
    materials: "教材延伸",
    achievements: "達成指標",
    specialization: "專業銜接",
    customization: "客製化內容",
    contactButton: "聯絡我們",
    enrollButton: "立即報名",
    moreButton: "了解更多",
    ctaTitle: "準備好開始您的越南語學習之旅了嗎？",
    ctaSubtitle: "無論您是初學者還是想提升現有語言能力，我們都有適合您的課程。",
    certificationMessage: "考證班課程內容正在規劃中，請聯繫我們了解更多詳情。",
    privateMessage: "我們提供客製化個人教學，根據您的需求和學習目標量身打造課程。",
    privateContact: "請直接聯繫我們，我們將為您安排專屬顧問進行詳細諮詢。",
    courseDetails: {
      A0: {
        title: "初階入門",
        objectives: [
          "建立越南語發音系統基礎",
          "掌握日常基礎對話能力（自我介紹、個人興趣、生活場景）",
          "能理解並使用高頻實用短句"
        ],
        content: [
          "母音/輔音發音規則、聲調辨識訓練",
          "主題式對話：姓名、國籍、職業、購物、時間表達",
          "聽力口說強化 + 基礎讀寫入門"
        ]
      },
      A1: {
        title: "初階基礎",
        objectives: [
          "聽懂簡短生活對話（如問路、交通、議價）",
          "學習「主動提問」與「關鍵資訊捕捉」技巧"
        ],
        content: [
          "情境模擬：市集購物、餐廳點餐、交通工具搭乘",
          "商業場景基礎用語（詢價、預約、簡單洽談）"
        ]
      },
      A2: {
        title: "初階進階",
        objectives: [
          "處理日常社交互動和簡單交易",
          "用簡單的詞語描述背景和周圍環境"
        ],
        content: [
          "表達意見、進行比較、描述經驗",
          "安排旅行、處理緊急情況、基礎職場溝通"
        ]
      },
      B1: {
        title: "中級程度",
        objectives: [
          "應對越南旅行中可能遇到的大部分情況",
          "就熟悉的話題撰寫連貫的短文"
        ],
        content: [
          "討論新聞、時事和文化話題",
          "撰寫個人信件、電郵和簡短報告"
        ],
        highlights: [
          "使用《標準越南語B1》教材第1-8單元",
          "發展段落表達能力（如描述經驗、解釋工作流程）"
        ]
      },
      B2: {
        title: "中高級程度",
        objectives: [
          "與母語者進行流暢自然的互動",
          "就廣泛主題撰寫清晰詳細的文章"
        ],
        content: [
          "辯論、提出論點、討論抽象話題",
          "理解複雜文本，包括專業領域的技術討論"
        ],
        focus: [
          "學術/職場情境：會議討論、數據解讀、文化差異分析",
          "進階語法：關係從句、假設語氣、正式書信結構"
        ]
      },
      B3: {
        title: "進階中級",
        objectives: [
          "流利表達想法，無需費力尋找詞語",
          "靈活有效地將語言運用於社交、學術和專業場合"
        ],
        content: [
          "理解各種高難度長篇文本，並能領會言外之意",
          "就複雜主題寫出清晰、結構良好、詳細的文章"
        ],
        specialization: [
          "專業簡報與談判技巧",
          "進階學術寫作與研究方法",
          "跨文化溝通策略"
        ]
      },
      C1: {
        title: "高級程度",
        objectives: [
          "流利表達想法，無需費力尋找詞語",
          "靈活有效地將語言運用於社交、學術和專業場合"
        ],
        content: [
          "學術寫作和演講",
          "理解複雜文本中的隱含意義和細微差別"
        ]
      },
      C2: {
        title: "精通程度",
        objectives: [
          "輕鬆理解所見所聞的幾乎所有內容",
          "總結不同口語和書面來源的資訊"
        ],
        content: [
          "掌握慣用語和口語表達",
          "就複雜主題撰寫清晰、結構良好、詳細的文章"
        ]
      },
      C3: {
        title: "專家級",
        objectives: ["專業領域精熟與高階應用"],
        content: [
          "深化特定領域知識（如影視翻譯、外交用語等）",
          "論文寫作指導與口譯技巧"
        ]
      }
    }
  },
  "zh-Hans": {
    // ... existing translations ...
    corporateCourses: {
      A0: {
        title: "企业 A0",
        objectives: [
          "建立越南语发音系统基础（声调/元音/辅音）",
          "掌握生存级会话能力（自我介绍、基础问答）"
        ],
        content: [
          "发音系统：29个字母发音规则 + 6个声调训练",
          "主题会话：个人信息、职业、日常物品",
          "技能比例：70% 听力/口语 | 30% 阅读/写作"
        ]
      },
      A1: {
        title: "企业 A1",
        achievements: [
          "理解慢速日常对话（每分钟100字）",
          "完成基础交易沟通（议价误差≤15%）"
        ],
        content: [
          "城市生存：公共交通、问路",
          "商业场景：市场采购、理解简单合同条款"
        ]
      },
      A2: {
        title: "企业 A2",
        content: [
          "旅游情境模拟：酒店订房/购票/紧急应对",
          "数字沟通：社群用语、网购对话"
        ],
        achievements: [
          "基础语法准确度达80%",
          "能理解300字以内日常生活短文"
        ]
      },
      B1: {
        title: "企业 B1",
        specialization: [
          "职场应用：会议记录、工作邮件撰写",
          "学术基础：图表描述、基础数据解读"
        ],
        achievements: [
          "能进行10分钟连续主题发表",
          "理解广播新闻主要讯息（理解率70%以上）"
        ]
      },
      B2: {
        title: "企业 B2",
        content: [
          "媒体分析：辨识新闻报导观点",
          "论述文写作：正反论述（500字内）",
          "专业词汇：200+个经社教领域关键术语"
        ],
        materials: [
          "《实用商务越南语》补充单元"
        ]
      },
      C1: {
        title: "企业 C1",
        objectives: [
          "学术论文精读（理解率85%以上）",
          "专业简报技巧（含Q&A策略）",
          "跨文化沟通案例分析"
        ]
      },
      C2C3: {
        title: "企业精通级 C2-C3",
        subtitle: "母语者认证标准",
        hours: "36 小时",
        objectives: [
          "方言辨识：河内/胡志明市口音差异",
          "文学分析：现代诗歌修辞解读",
          "高阶谈判策略：跨文化冲突管理"
        ],
        customization: [
          "领域强化：法律/医疗/工程专业术语",
          "艺术表达：影视剧本创作指导"
        ]
      }
    },
    title: "越南语课程",
    subtitle: "为各级别提供全面的学习路径",
    tabBeginner: "初级",
    tabIntermediate: "中级",
    tabAdvanced: "高级",
    tabCertification: "考证班",
    tabCorporate: "企业班",
    tabPrivate: "个人班",
    hours: "课程时数",
    classSize: "班级人数",
    objectives: "学习目标",
    coreContent: "核心内容",
    highlights: "教学亮点",
    focus: "强化领域",
    materials: "教材延伸",
    achievements: "达成指标",
    specialization: "专业衔接",
    customization: "定制化内容",
    contactButton: "联系我们",
    enrollButton: "立即报名",
    moreButton: "了解更多",
    ctaTitle: "准备好开始您的越南语学习之旅了吗？",
    ctaSubtitle: "无论您是初学者还是想提升现有语言能力，我们都有适合您的课程。",
    certificationMessage: "考证班课程内容正在规划中，请联系我们了解更多详情。",
    privateMessage: "我们提供定制化个人教学，根据您的需求和学习目标量身打造课程。",
    privateContact: "请直接联系我们，我们将为您安排专属顾问进行详细咨询。",
    courseDetails: {
      A0: {
        title: "初阶入门",
        objectives: [
          "建立越南语发音系统基础",
          "掌握日常基础对话能力（自我介绍、个人兴趣、生活场景）",
          "能理解并使用高频实用短句"
        ],
        content: [
          "母音/辅音发音规则、声调辨识训练",
          "主题式对话：姓名、国籍、职业、购物、时间表达",
          "听力口说强化 + 基础读写入门"
        ]
      },
      A1: {
        title: "初阶基础",
        objectives: [
          "听懂简短生活对话（如问路、交通、议价）",
          "学习「主动提问」与「关键信息捕捉」技巧"
        ],
        content: [
          "情境模拟：市集购物、餐厅点餐、交通工具搭乘",
          "商业场景基础用语（询价、预约、简单洽谈）"
        ]
      },
      A2: {
        title: "初阶进阶",
        objectives: [
          "处理日常社交互动和简单交易",
          "用简单的词语描述背景和周围环境"
        ],
        content: [
          "表达意见、进行比较、描述经验",
          "安排旅行、处理紧急情况、基础职场沟通"
        ]
      },
      B1: {
        title: "中级程度",
        objectives: [
          "应对越南旅行中可能遇到的大部分情况",
          "就熟悉的话题撰写连贯的短文"
        ],
        content: [
          "讨论新闻、时事和文化话题",
          "撰写个人信件、电邮和简短报告"
        ],
        highlights: [
          "使用《标准越南语B1》教材第1-8单元",
          "发展段落表达能力（如描述经验、解释工作流程）"
        ]
      },
      B2: {
        title: "中高级程度",
        objectives: [
          "与母语者进行流畅自然的互动",
          "就广泛主题撰写清晰详细的文章"
        ],
        content: [
          "辩论、提出论点、讨论抽象话题",
          "理解复杂文本，包括专业领域的技术讨论"
        ],
        focus: [
          "学术/职场情境：会议讨论、数据解读、文化差异分析",
          "进阶语法：关系从句、虚拟语气、正式书信结构"
        ]
      },
      B3: {
        title: "进阶中级",
        objectives: [
          "流利表达想法，无需费力寻找词语",
          "灵活有效地将语言运用于社交、学术和专业场合"
        ],
        content: [
          "理解各种高难度长篇文本，并能领会言外之意",
          "就复杂主题写出清晰、结构良好、详细的文章"
        ],
        specialization: [
          "专业简报与谈判技巧",
          "进阶学术写作与研究方法",
          "跨文化沟通策略"
        ]
      },
      C1: {
        title: "高级程度",
        objectives: [
          "流利表达想法，无需费力寻找词语",
          "灵活有效地将语言运用于社交、学术和专业场合"
        ],
        content: [
          "学术写作和演讲",
          "理解复杂文本中的隐含意义和细微差别"
        ]
      },
      C2: {
        title: "精通程度",
        objectives: [
          "轻松理解所见所闻的几乎所有内容",
          "总结不同口语和书面来源的信息"
        ],
        content: [
          "掌握惯用语和口语表达",
          "就复杂主题撰写清晰、结构良好、详细的文章"
        ]
      },
      C3: {
        title: "专家级",
        objectives: ["专业领域精熟与高阶应用"],
        content: [
          "深化特定领域知识（如影视翻译、外交用语等）",
          "论文写作指导与口译技巧"
        ]
      }
    }
  }
}

export default function CoursesPage({ params }: CoursePageProps) {
  const locale = params.locale || "zh-Hant";
  const t = (translations[locale as keyof typeof translations] || translations["zh-Hant"]) as unknown as TranslationBase;
  const [activeTab, setActiveTab] = useState("beginner")

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Page Header */}
      <div className="relative text-white py-24">
        <Image
          src="/images/Course_2.jpg"
          alt="Courses banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      {/* Course Tabs */}
      <section className="container mx-auto py-12 px-4">
        <Tabs defaultValue="beginner" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
            <TabsTrigger value="beginner" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabBeginner}
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabIntermediate}
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabAdvanced}
            </TabsTrigger>
            {/* <TabsTrigger value="certification" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabCertification}
            </TabsTrigger> */}
            <TabsTrigger value="corporate" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabCorporate}
            </TabsTrigger>
            <TabsTrigger value="private" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabPrivate}
            </TabsTrigger>
          </TabsList>

          {/* Beginner Level Content */}
          <TabsContent value="beginner" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* A0 Course */}
              <CourseCard 
                level="A0" 
                title={t.courseDetails.A0?.title || "Starter Level"}
                hours="24"
                classSize="3-6"
                objectives={t.courseDetails.A0?.objectives || [
                  "Establish Vietnamese pronunciation system foundation",
                  "Master basic daily conversation skills (self-introduction, personal interests, daily scenarios)",
                  "Understand and use high-frequency practical phrases"
                ]}
                content={t.courseDetails.A0?.content || [
                  "Vowel/consonant pronunciation rules, tone recognition training",
                  "Themed conversations: name, nationality, occupation, shopping, time expression",
                  "Listening & speaking enhancement + basic reading/writing introduction"
                ]}
              />
              
              {/* A1 Course */}
              <CourseCard 
                level="A1" 
                title={t.courseDetails.A1?.title || "Beginner Foundation"}
                hours="24"
                classSize="3-6"
                objectives={t.courseDetails.A1?.objectives || [
                  "Understand short daily conversations (e.g., asking for directions, transportation, bargaining)",
                  "Learn techniques for 'active questioning' and 'key information capturing'"
                ]}
                content={t.courseDetails.A1?.content || [
                  "Scenario simulation: market shopping, ordering at restaurants, taking public transport",
                  "Basic business terms (inquiries, appointments, simple negotiations)"
                ]}
              />
              
              {/* A2 Course */}
              <CourseCard 
                level="A2" 
                title={t.courseDetails.A2?.title || "Elementary Level"}
                hours="24"
                classSize="3-6"
                objectives={t.courseDetails.A2?.objectives || [
                  "Handle routine social interactions and simple transactions",
                  "Describe in simple terms aspects of background and immediate environment"
                ]}
                content={t.courseDetails.A2?.content || [
                  "Expressing opinions, making comparisons, describing experiences",
                  "Handling travel arrangements, dealing with emergencies, basic workplace communication"
                ]}
              />
            </div>
          </TabsContent>
          
          {/* Intermediate Level Content */}
          <TabsContent value="intermediate" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* B1 Course */}
              <CourseCard 
                level="B1" 
                title={t.courseDetails.B1?.title || "Intermediate Level"}
                hours="30"
                classSize="3-6"
                objectives={t.courseDetails.B1?.objectives || [
                  "Develop the ability to understand the main points of clear standard input on familiar matters",
                  "Deal with most situations likely to arise while traveling in an area where the language is spoken"
                ]}
                content={t.courseDetails.B1?.content || [
                  "Produce simple connected text on familiar topics",
                  "Describe experiences, events, dreams, and ambitions briefly"
                ]}
                highlights={t.courseDetails.B1?.highlights || [
                  "使用《标准越南语B1》教材第1-8单元",
                  "发展段落表达能力（如描述经验、解释工作流程）"
                ]}
              />
              
              {/* B2 Course */}
              <CourseCard 
                level="B2" 
                title={t.courseDetails.B2?.title || "Upper Intermediate"}
                hours="30"
                classSize="3-6"
                objectives={t.courseDetails.B2?.objectives || [
                  "Understand the main ideas of complex text on both concrete and abstract topics",
                  "Interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible"
                ]}
                content={t.courseDetails.B2?.content || [
                  "Produce clear, detailed text on a wide range of subjects",
                  "Explain a viewpoint on a topical issue giving the advantages and disadvantages of various options"
                ]}
                focus={t.courseDetails.B2?.focus || [
                  "Academic/workplace scenarios: meeting discussions, data interpretation, cultural difference analysis",
                  "Advanced grammar: relative clauses, subjunctive mood, formal letter structure"
                ]}
              />
              
              {/* B3 Course */}
              <CourseCard 
                level="B3" 
                title={t.courseDetails.B3?.title || "Advanced Intermediate"}
                hours="30"
                classSize="3-6"
                objectives={t.courseDetails.B3?.objectives || [
                  "Express ideas fluently and spontaneously without much obvious searching for expressions",
                  "Use language flexibly and effectively for social, academic and professional purposes"
                ]}
                content={t.courseDetails.B3?.content || [
                  "Understand a wide range of demanding, longer texts, and recognize implicit meaning",
                  "Produce clear, well-structured, detailed text on complex subjects"
                ]}
                specialization={t.courseDetails.B3?.specialization}
              />
            </div>
          </TabsContent>
          
          {/* Advanced Level Content */}
          <TabsContent value="advanced" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* C1 Course */}
              <CourseCard 
                level="C1" 
                title={t.courseDetails.C1?.title || "Advanced Level"}
                hours="30"
                 classSize="3-6"
                subtitle={t.courseDetails.C1?.subtitle || "For Professionals"}
                objectives={t.courseDetails.C1?.objectives || [
                  "Participate in professional seminars and deliver technical presentations",
                  "Analyze specialized literature (e.g., legal, medical, engineering)"
                ]}
              />
              
              {/* C2 Course */}
              <CourseCard 
                level="C2" 
                title={t.courseDetails.C2?.title || "Mastery Level"}
                hours="30"
                 classSize="3-6"
                subtitle={t.courseDetails.C2?.subtitle || "Native-like Proficiency"}
                objectives={t.courseDetails.C2?.objectives || [
                  "Master dialectal/idiomatic differences",
                  "Impromptu speeches, literary analysis, cross-cultural negotiations"
                ]}
              />
              
              {/* C3 Course */}
              <CourseCard 
                level="C3" 
                title={t.courseDetails.C3?.title || "Expert Level"}
                hours="30"
                 classSize="3-6"
                objectives={t.courseDetails.C3?.objectives || ["Specialized mastery and advanced professional application"]}
                content={t.courseDetails.C3?.content || [
                  "Deepen knowledge in specific fields (e.g., audiovisual translation, diplomatic language)",
                  "Thesis writing guidance and interpretation techniques"
                ]}
              />
            </div>
          </TabsContent>
          
          {/* Certification Courses */}
          {/* <TabsContent value="certification" className="space-y-8">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.darkOlive }}>{t.tabCertification}</h3>
              <p className="text-lg mb-6">{t.certificationMessage}</p>
              <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300" 
                style={{ backgroundColor: colors.secondary, color: colors.lightCream }}>
                {t.contactButton}
              </button>
            </div>
          </TabsContent> */}
          
          {/* Corporate Courses */}
          <TabsContent value="corporate" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Corporate A0 */}
              <CourseCard 
                level="A0" 
                title={t.corporateCourses?.A0?.title || t.tabCorporate + " A0"}
                hours="24"
                classSize="4-8"
                subtitle={"Small Group"}
                objectives={t.corporateCourses?.A0?.objectives || [
                  "Establish Vietnamese pronunciation system foundation (tones/vowels/consonants)",
                  "Master survival-level conversation skills (self-introduction, basic Q&A)"
                ]}
                content={t.corporateCourses?.A0?.content || [
                  "Phonetic system: 29 letter pronunciation rules + 6 tone training",
                  "Themed conversations: personal information, profession, daily items",
                  "Skill ratio: 70% listening/speaking | 30% reading/writing"
                ]}
              />
              
              {/* Corporate A1 */}
              <CourseCard 
                level="A1" 
                title={t.corporateCourses?.A1?.title || t.tabCorporate + " A1"}
                hours="24"
                classSize="4-8"
                achievements={t.corporateCourses?.A1?.achievements || [
                  "Understand slow-paced daily conversations (100 words/minute)",
                  "Complete basic transactional communication (negotiation margin ≤15%)"
                ]}
                content={t.corporateCourses?.A1?.content || [
                  "City survival: public transportation, asking for directions",
                  "Business scenarios: market purchases, understanding simple contract terms"
                ]}
              />
              
              {/* Corporate A2 */}
              <CourseCard 
                level="A2" 
                title={t.corporateCourses?.A2?.title || t.tabCorporate + " A2"}
                hours="24"
                classSize="4-8"
                content={t.corporateCourses?.A2?.content || [
                  "Travel scenario simulation: hotel booking/ticketing/emergency response",
                  "Digital communication: social media phrases, online shopping dialogues"
                ]}
                achievements={t.corporateCourses?.A2?.achievements || [
                  "Basic grammar accuracy reaches 80%",
                  "Can understand short daily life passages under 300 words"
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Corporate B1 */}
              <CourseCard 
                level="B1" 
                title={t.corporateCourses?.B1?.title || t.tabCorporate + " B1"}
                hours="30"
                classSize="4-8"
                subtitle={"Standard Vietnamese B1 Units 1-8"}
                specialization={t.corporateCourses?.B1?.specialization || [
                  "Workplace applications: meeting minutes, work email composition",
                  "Academic foundation: chart description, basic data interpretation"
                ]}
                achievements={t.corporateCourses?.B1?.achievements || [
                  "Can deliver 10-minute continuous topic presentations",
                  "Understand main messages in broadcast news (70%+ comprehension)"
                ]}
              />
              
              {/* Corporate B2 */}
              <CourseCard 
                level="B2" 
                title={t.corporateCourses?.B2?.title || t.tabCorporate + " B2"}
                hours="30"
                classSize="4-8"
                content={t.corporateCourses?.B2?.content || [
                  "Media analysis: identifying news report perspectives",
                  "Discursive writing: presenting pros and cons (within 500 characters)",
                  "Professional vocabulary: 200+ key terms in economics/society/education"
                ]}
                materials={t.corporateCourses?.B2?.materials || [
                  "Supplementary units from 'Practical Business Vietnamese'"
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Corporate C1 */}
              <CourseCard 
                level="C1" 
                title={t.corporateCourses?.C1?.title || t.tabCorporate + " C1"}
                hours="36"
                classSize="4-8"
                subtitle={"Expert Level Training"}
                objectives={t.corporateCourses?.C1?.objectives || [
                  "Intensive reading of academic papers (85%+ comprehension)",
                  "Professional presentation skills (including Q&A strategies)",
                  "Cross-cultural communication case studies"
                ]}
              />
              
              {/* Corporate C2-C3 */}
              <CourseCard 
                level="C2-C3" 
                title={t.corporateCourses?.C2C3?.title || t.tabCorporate + " Mastery C2-C3"}
                hours={t.corporateCourses?.C2C3?.hours || "36"}
                classSize="4-8"
                subtitle={t.corporateCourses?.C2C3?.subtitle || "Native Speaker Certification Standard"}
                objectives={t.corporateCourses?.C2C3?.objectives || [
                  "Dialect recognition: Hanoi/Ho Chi Minh City accent differences",
                  "Literary analysis: interpreting modern poetry rhetoric",
                  "Advanced negotiation strategies: cross-cultural conflict management"
                ]}
                customization={t.corporateCourses?.C2C3?.customization || [
                  "Field specialization: legal/medical/engineering terminology",
                  "Artistic expression: film and TV script writing guidance"
                ]}
              />
            </div>
          </TabsContent>
          
          {/* Private Lessons */}
          <TabsContent value="private" className="space-y-8">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.darkOlive }}>{t.tabPrivate}</h3>
              <p className="text-lg mb-6">{t.privateMessage}</p>
              <p className="text-lg mb-8">{t.privateContact}</p>
              <button 
                onClick={() => window.open('https://docs.google.com/forms/d/1NFCWSWVlWv1x-Hgsy2tuKmGpqXbFgNFDDzLZfoyLHEM/viewform?edit_requested=true', '_blank')}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300" 
                style={{ backgroundColor: colors.secondary, color: colors.lightCream }}
              >
                {t.contactButton}
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

    </main>
  )
}

// Course Card Component
interface CourseCardProps {
  level: string
  title: string
  hours: string
  classSize?: string
  subtitle?: string
  objectives?: string[]
  content?: string[]
  highlights?: string[]
  focus?: string[]
  materials?: string[]
  achievements?: string[]
  specialization?: string[]
  customization?: string[]
}

function CourseCard({
  level,
  title,
  hours,
  classSize,
  subtitle,
  objectives,
  content,
  highlights,
  focus,
  materials,
  achievements,
  specialization,
  customization
}: CourseCardProps) {
  // Use usePathname hook to get the current pathname
  const pathname = usePathname();
  // Get current locale from URL
  const locale = pathname?.split('/')[1] || 'en';
  // Default to English if locale is not supported
  const t = translations[locale as keyof typeof translations] || translations['en'];
  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold" style={{ color: colors.darkOlive }}>{title}</h3>
            {subtitle && <p className="text-sm mt-1" style={{ color: colors.grayGreen }}>{subtitle}</p>}
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-semibold" 
            style={{ backgroundColor: `${colors.secondary}30`, color: colors.secondary }}>
            {level}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.secondary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{hours} {locale === 'en' ? 'Hours' : locale === 'zh-Hans' ? '小时' : '小時'}</span>
            </div>
            
            {classSize && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.secondary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{classSize} {locale === 'en' ? 'Students' : '人'}</span>
              </div>
            )}
          </div>
          
          {objectives && objectives.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.objectives}</h4>
              <ul className="space-y-1">
                {objectives.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2 mt-1">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {content && content.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.coreContent}</h4>
              <ul className="space-y-1">
                {content.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {highlights && highlights.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.highlights}</h4>
              <ul className="space-y-1">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">🔹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {focus && focus.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.focus}</h4>
              <ul className="space-y-1">
                {focus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">📍</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {materials && materials.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.materials}</h4>
              <ul className="space-y-1">
                {materials.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {achievements && achievements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.achievements}</h4>
              <ul className="space-y-1">
                {achievements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">✔️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {specialization && specialization.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.specialization}</h4>
              <ul className="space-y-1">
                {specialization.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {customization && customization.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkOlive }}>{t.customization}</h4>
              <ul className="space-y-1">
                {customization.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2">🌟</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 mt-auto border-t border-gray-100">
        <button 
          onClick={() => window.open('https://www.facebook.com/chichivietnamese', '_blank')}
          className="w-full py-2 rounded-lg font-medium transition-all duration-300" 
          style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}
        >
          {t.moreButton}
        </button>
      </div>
    </motion.div>
  )
}
