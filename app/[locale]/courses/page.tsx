"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { colors } from "@/lib/colors"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CoursePageProps {
  params: {
    locale: string
  }
}

const translations = {
  "en": {
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
    privateContact: "Please contact us directly and we will arrange a dedicated consultant for a detailed consultation."
  },
  "zh-Hant": {
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
    privateContact: "請直接聯繫我們，我們將為您安排專屬顧問進行詳細諮詢。"
  },
  "zh-Hans": {
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
    privateContact: "请直接联系我们，我们将为您安排专属顾问进行详细咨询。"
  }
}

export default function CoursesPage({ params }: CoursePageProps) {
  const locale = params.locale || "zh-Hant"
  const t = translations[locale as keyof typeof translations] || translations["zh-Hant"]
  const [activeTab, setActiveTab] = useState("beginner")

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <Image 
          src="/images/course-hero.jpg" 
          alt="Vietnamese language courses" 
          fill 
          priority
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

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
            <TabsTrigger value="certification" className="data-[state=active]:bg-[#a4a78b] data-[state=active]:text-white">
              {t.tabCertification}
            </TabsTrigger>
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
                title="初階入門"
                hours="24"
                classSize="3-6"
                objectives={[
                  "建立越南語發音系統基礎",
                  "掌握日常基礎對話能力（自我介紹、個人興趣、生活場景）",
                  "能理解並使用高頻實用短句"
                ]}
                content={[
                  "母音/輔音發音規則、聲調辨識訓練",
                  "主題式對話：姓名、國籍、職業、購物、時間表達",
                  "聽力口說強化 + 基礎讀寫入門"
                ]}
              />
              
              {/* A1 Course */}
              <CourseCard 
                level="A1" 
                title="初階基礎"
                hours="24"
                classSize="3-6"
                objectives={[
                  "聽懂簡短生活對話（如問路、交通、議價）",
                  "學習「主動提問」與「關鍵資訊捕捉」技巧"
                ]}
                content={[
                  "情境模擬：市集購物、餐廳點餐、交通工具搭乘",
                  "商業場景基礎用語（詢價、預約、簡單洽談）"
                ]}
              />
              
              {/* A2 Course */}
              <CourseCard 
                level="A2" 
                title="初階進階"
                hours="24"
                classSize="3-6"
                objectives={[
                  "流暢應對日常需求（訂房、票務、線上交易）",
                  "閱讀簡單公告、菜單、行程說明"
                ]}
                content={[
                  "旅遊規劃：酒店預訂、景點諮詢、緊急狀況處理",
                  "數位生活：網購對話、社群媒體常用語"
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
                title="中階"
                hours="30"
                highlights={[
                  "使用《越南語B1標準教材》Unit 1-8",
                  "培養「段落式表達」能力（如：描述經歷、說明工作流程）"
                ]}
                achievements={[
                  "理解非專業性長文（部落格、簡易新聞）",
                  "能用因果句、複合句陳述觀點"
                ]}
              />
              
              {/* B2 Course */}
              <CourseCard 
                level="B2" 
                title="中階"
                hours="30"
                focus={[
                  "學術/職場場景：會議討論、數據解讀、文化差異分析",
                  "高階文法：關係子句、虛擬語氣、正式書信結構"
                ]}
                materials={[
                  "補充《商業越南語》模組",
                  "時事議題討論（經濟趨勢、社會現象）"
                ]}
              />
              
              {/* B3 Course */}
              <CourseCard 
                level="B3" 
                title="中高階"
                hours="30"
                specialization={[
                  "精讀各類文本：合約條款、學術論文、政策報導",
                  "進階寫作訓練：論說文、企劃書架構"
                ]}
              />
            </div>
          </TabsContent>
          
          {/* Advanced Level Content */}
          <TabsContent value="advanced" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* C1 Course */}
              <CourseCard 
                level="C1" 
                title="高階"
                hours="30"
                subtitle="專業人士適用"
                objectives={[
                  "參與專業研討會、進行技術性簡報",
                  "分析專業領域文獻（如法律、醫療、工程）"
                ]}
              />
              
              {/* C2 Course */}
              <CourseCard 
                level="C2" 
                title="精通級"
                hours="30"
                subtitle="母語級要求"
                objectives={[
                  "掌握方言/慣用語差異",
                  "即興演說、文學作品賞析、跨文化談判"
                ]}
              />
              
              {/* C3 Course */}
              <CourseCard 
                level="C3" 
                title="精通級"
                hours="30"
                customization={[
                  "針對特定領域深化（如：影視翻譯、外交辭令）",
                  "專題研究指導（論文寫作、口譯技巧）"
                ]}
              />
            </div>
          </TabsContent>
          
          {/* Certification Courses */}
          <TabsContent value="certification" className="space-y-8">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.darkOlive }}>{t.tabCertification}</h3>
              <p className="text-lg mb-6">{t.certificationMessage}</p>
              <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300" 
                style={{ backgroundColor: colors.secondary, color: colors.lightCream }}>
                {t.contactButton}
              </button>
            </div>
          </TabsContent>
          
          {/* Corporate Courses */}
          <TabsContent value="corporate" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Corporate A0 */}
              <CourseCard 
                level="A0" 
                title="初級企業班"
                hours="24"
                classSize="4-8"
                subtitle="精緻小班"
                objectives={[
                  "建立越南語發音系統基礎（聲調/母音/輔音精準辨識）",
                  "掌握生存級會話能力（自我介紹、基礎問答）"
                ]}
                content={[
                  "語音系統：29個字母發音規則+6種聲調訓練",
                  "主題會話：個人資料、職業表述、日常用品指稱",
                  "技能配比：聽說70%｜讀寫30%"
                ]}
              />
              
              {/* Corporate A1 */}
              <CourseCard 
                level="A1" 
                title="初級企業班"
                hours="24"
                achievements={[
                  "聽懂慢速生活對話（語速100字/分鐘）",
                  "完成基礎交易溝通（議價誤差≤15%）"
                ]}
                content={[
                  "都市生存：公共交通搭乘、方位問答",
                  "商業場景：市場採購、簡易合約條款理解"
                ]}
              />
              
              {/* Corporate A2 */}
              <CourseCard 
                level="A2" 
                title="初級企業班"
                hours="24"
                content={[
                  "旅遊情境模擬：酒店預訂/票務處理/緊急狀況應對",
                  "數位溝通：社交軟體常用語、線上購物對話"
                ]}
                achievements={[
                  "基礎文法正確率達80%",
                  "可理解300字內生活短文"
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Corporate B1 */}
              <CourseCard 
                level="B1" 
                title="中級企業班"
                hours="30"
                subtitle="《標準越南語B1》單元1-8"
                specialization={[
                  "職場應用：會議記錄摘要、工作郵件撰寫",
                  "學術基礎：圖表描述、簡單數據解讀"
                ]}
                achievements={[
                  "能進行10分鐘連續性主題陳述",
                  "聽懂廣播新聞主要訊息（理解率70%+）"
                ]}
              />
              
              {/* Corporate B2 */}
              <CourseCard 
                level="B2" 
                title="中級企業班"
                hours="30"
                content={[
                  "媒體分析：新聞報導立場辨識",
                  "論述寫作：正反觀點表述（500字內）",
                  "專業詞彙：經濟/社會/教育領域200+關鍵詞"
                ]}
                materials={[
                  "《商務越南語實戰》補充單元"
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Corporate C1 */}
              <CourseCard 
                level="C1" 
                title="高階企業班"
                hours="36"
                subtitle="專家級訓練"
                objectives={[
                  "學術論文精讀（抽樣率達85%）",
                  "專業簡報技巧（含Q&A應對策略）",
                  "跨文化溝通案例研討"
                ]}
              />
              
              {/* Corporate C2-C3 */}
              <CourseCard 
                level="C2-C3" 
                title="高階企業班"
                hours="36"
                subtitle="母語者認證標準"
                objectives={[
                  "方言辨識：河內/胡志明市口音差異",
                  "文學賞析：現代詩歌修辭解讀",
                  "即席演說：無準備時間即興表達"
                ]}
                customization={[
                  "領域強化：法律/醫療/工程專業術語",
                  "藝術表達：影視劇本創作指導"
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
              <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300" 
                style={{ backgroundColor: colors.secondary, color: colors.lightCream }}>
                {t.contactButton}
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16" style={{ backgroundColor: colors.primary }}>  
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.darkOlive }}>{t.ctaTitle}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: colors.grayGreen }}>{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg font-medium transition-all duration-300" 
              style={{ backgroundColor: colors.darkOlive, color: colors.lightCream }}>
              {t.enrollButton}
            </button>
            <button className="px-8 py-3 rounded-lg font-medium transition-all duration-300 border-2" 
              style={{ borderColor: colors.darkOlive, color: colors.darkOlive }}>
              {t.contactButton}
            </button>
          </div>
        </div>
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
  // Get current locale from URL
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';
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
        <button className="w-full py-2 rounded-lg font-medium transition-all duration-300" 
          style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}>
          {t.moreButton}
        </button>
      </div>
    </motion.div>
  )
}
