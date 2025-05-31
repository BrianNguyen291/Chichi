import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { ChevronRight, Calendar, MapPin, DollarSign, FileText, Monitor, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ExamInfoPageProps {
  params: {
    locale: string;
  };
}

const translations = {
  en: {
    title: 'VIETNAMESE LANGUAGE PROFICIENCY EXAM INFORMATION',
    subtitle: 'Detailed information about the Vietnamese Language Proficiency Exam organized by the University of Social Sciences and Humanities - Vietnam National University, Hanoi',
    examScheduleTitle: 'Exam Schedule 2025',
    examScheduleNote: 'Note: Backup exam dates are used when necessary.',
    examRound: 'Round',
    examDate: 'Main Exam Date',
    registrationDeadline: 'Registration Deadline',
    backupDate: 'Backup Date',
    round1: 'Round 1',
    round2: 'Round 2',
    round3: 'Round 3',
    round4: 'Round 4',
    locationTitle: 'Exam Location',
    locationDesc: 'The exam is held at:',
    locationName: 'Building BC, University of Social Sciences and Humanities - VNU',
    locationAddress: '336 Nguyen Trai, Thanh Xuan, Hanoi',
    locationNote: 'Note: The university may cancel the exam if fewer than 30 candidates register.',
    feesTitle: 'Exam Fees',
    feeRegular: '3,800,000 VND: For candidates not studying at the university.',
    feeStudent: '2,500,000 VND: For candidates who have studied at the university for 60 hours or more within 6 months before the exam date.',
    feeNote: 'Note: Fees may change for each exam period.',
    applicationTitle: 'Application Documents',
    applicationDesc: 'Candidates need to prepare:',
    applicationItem1: '02 photos (4x6 cm) taken within 6 months before registration, with full name and date of birth written on the back.',
    applicationItem2: 'Copy of valid passport.',
    applicationItem3: 'Exam registration form (provided by the university).',
    applicationItem4: 'Exam fee (paid directly when submitting documents).',
    submissionTitle: 'Where to Submit Documents',
    submissionDesc: 'Candidates can submit documents at:',
    submissionPlace1: 'Vietnamese Language and Culture Center, Room 114, Building A, University of Social Sciences and Humanities, 336 Nguyen Trai, Thanh Xuan, Hanoi.',
    submissionPlace2: 'Training Department, Room 604, Building E, at the same address above.',
    submissionPlace3: 'Faculty of Vietnamese Studies and Vietnamese Language, Building B7 Bis, Tran Dai Nghia Street, Bach Khoa Ward, Hai Ba Trung District, Hanoi.',
    submissionTime: 'Document reception time: Monday to Friday, morning from 8:30 to 11:30, afternoon from 14:00 to 16:30.',
    examFormatTitle: 'Exam Format',
    examFormatItem1: 'Computer-based test.',
    examFormatItem2: 'Morning: Listening, Reading, and Writing skills from 8:00 to 11:00 (candidates must arrive before 7:15).',
    examFormatItem3: 'Afternoon: Speaking skills starting at 13:30.',
    contactTitle: 'Contact Information',
    contactWebsite: 'Website:',
    contactEmail: 'Email:',
    contactPhone: 'Phone:',
    learnMoreButton: 'Learn More About Our Courses',
    registerButton: 'Register for the Exam'
  },
  'zh-Hant': {
    title: '越南語能力考試資訊',
    subtitle: '以下是河內國家大學下屬社會科學與人文大學組織的《外國人越南語能力標準框架》考試的詳細資訊。',
    examScheduleTitle: '2025年考試時間表',
    examScheduleNote: '注意：備用考試日期在必要時使用。',
    examRound: '考試批次',
    examDate: '主要考試日期',
    registrationDeadline: '報名截止日期',
    backupDate: '備用日期',
    round1: '第一輪',
    round2: '第二輪',
    round3: '第三輪',
    round4: '第四輪',
    locationTitle: '考試地點',
    locationDesc: '考試在以下地點舉行：',
    locationName: '河內國家大學下屬社會科學與人文大學BC棟',
    locationAddress: '河內市青春郡阮廌路336號',
    locationNote: '注意：如果報名考生少於30人，學校可能取消考試。',
    feesTitle: '考試費用',
    feeRegular: '3,800,000越南盾：適用於非本校在學考生',
    feeStudent: '2,500,000越南盾：適用於考試日前6個月內在本校學習滿60小時以上的考生',
    feeNote: '注意事項：考試費用可能因不同考試批次而有所調整',
    applicationTitle: '報名資料',
    applicationDesc: '考生需準備以下資料：',
    applicationItem1: '2張4x6公分證件照（近6個月內拍攝），照片背面需註明：考生姓名及出生日期',
    applicationItem2: '有效護照影本',
    applicationItem3: '考試報名表（使用學校提供的標準表格）',
    applicationItem4: '考試費用（提交資料時現場繳納）',
    submissionTitle: '資料提交地點',
    submissionDesc: '考生可選擇以下地點提交報名資料：',
    submissionPlace1: '越南語言文化中心，河內市青春郡阮廌路336號社會科學與人文大學A棟114室',
    submissionPlace2: '培訓辦公室，河內市青春郡阮廌路336號E棟604室',
    submissionPlace3: '越南學與越南語系，河內市二徵夫人郡博學區陳大義街B7 Bis棟',
    submissionTime: '受理時間：週一至週五，上午8:30-11:30，下午14:00-16:30',
    examFormatTitle: '考試形式',
    examFormatItem1: '電腦考試',
    examFormatItem2: '上午：聽力、閱讀和寫作技能考試，時間從8:00到11:00（考生需在7:15前到達）',
    examFormatItem3: '下午：口語技能考試從13:30開始',
    contactTitle: '聯絡資訊',
    contactWebsite: '網站：',
    contactEmail: '電子郵件：',
    contactPhone: '電話：',
    learnMoreButton: '了解更多課程資訊',
    registerButton: '報名考試'
  },
  'zh-Hans': {
    title: '越南语能力考试信息',
    subtitle: '以下是河内国家大学下属社会科学与人文大学组织的《外国人越南语能力标准框架》考试的详细信息。',
    examScheduleTitle: '2025年考试时间表',
    examScheduleNote: '注意：备用考试日期在必要时使用。',
    examRound: '考试批次',
    examDate: '主要考试日期',
    registrationDeadline: '报名截止日期',
    backupDate: '备用日期',
    round1: '第一轮',
    round2: '第二轮',
    round3: '第三轮',
    round4: '第四轮',
    locationTitle: '考试地点',
    locationDesc: '考试在以下地点举行：',
    locationName: '河内国家大学下属社会科学与人文大学BC栋',
    locationAddress: '河内市青春郡阮廌路336号',
    locationNote: '注意：如果报名考生少于30人，学校可能取消考试。',
    feesTitle: '考试费用',
    feeRegular: '3,800,000越南盾：适用于非本校在学考生',
    feeStudent: '2,500,000越南盾：适用于考试日前6个月内在本校学习满60小时以上的考生',
    feeNote: '注意事项：考试费用可能因不同考试批次而有所调整',
    applicationTitle: '报名资料',
    applicationDesc: '考生需准备以下资料：',
    applicationItem1: '2张4x6公分证件照（近6个月内拍摄），照片背面需注明：考生姓名及出生日期',
    applicationItem2: '有效护照影本',
    applicationItem3: '考试报名表（使用学校提供的标准表格）',
    applicationItem4: '考试费用（提交资料时现场缴纳）',
    submissionTitle: '资料提交地点',
    submissionDesc: '考生可选择以下地点提交报名资料：',
    submissionPlace1: '越南语言文化中心，河内市青春郡阮廌路336号社会科学与人文大学A栋114室',
    submissionPlace2: '培训办公室，河内市青春郡阮廌路336号E栋604室',
    submissionPlace3: '越南学与越南语系，河内市二征夫人郡博学区陈大义街B7 Bis栋',
    submissionTime: '受理时间：周一至周五，上午8:30-11:30，下午14:00-16:30',
    examFormatTitle: '考试形式',
    examFormatItem1: '电脑考试',
    examFormatItem2: '上午：听力、阅读和写作技能考试，时间从8:00到11:00（考生需在7:15前到达）',
    examFormatItem3: '下午：口语技能考试从13:30开始',
    contactTitle: '联系信息',
    contactWebsite: '网站：',
    contactEmail: '电子邮件：',
    contactPhone: '电话：',
    learnMoreButton: '了解更多课程信息',
    registerButton: '报名考试'
  }
};

const examSchedule = {
  en: [
    {
      round: 'Round 1',
      date: 'March 29-30, 2025',
      deadline: 'Feb 26 - Mar 11',
      backup: 'March 30, 2025'
    },
    {
      round: 'Round 2',
      date: 'June 28-29, 2025',
      deadline: 'May 27 - Jun 10',
      backup: 'June 29, 2025'
    },
    {
      round: 'Round 3',
      date: 'September 27-28, 2025',
      deadline: 'Aug 26 - Sep 09',
      backup: 'September 28, 2025'
    },
    {
      round: 'Round 4',
      date: 'December 27-28, 2025',
      deadline: 'Nov 25 - Dec 09',
      backup: 'December 29, 2025'
    }
  ],
  'zh-Hant': [
    {
      round: '第一輪',
      date: '2025年3月29-30日',
      deadline: '2月26日 - 3月11日',
      backup: '2025年3月30日'
    },
    {
      round: '第二輪',
      date: '2025年6月28-29日',
      deadline: '5月27日 - 6月10日',
      backup: '2025年6月29日'
    },
    {
      round: '第三輪',
      date: '2025年9月27-28日',
      deadline: '8月26日 - 9月9日',
      backup: '2025年9月28日'
    },
    {
      round: '第四輪',
      date: '2025年12月27-28日',
      deadline: '11月25日 - 12月9日',
      backup: '2025年12月29日'
    }
  ],
  'zh-Hans': [
    {
      round: '第一轮',
      date: '2025年3月29-30日',
      deadline: '2月26日 - 3月11日',
      backup: '2025年3月30日'
    },
    {
      round: '第二轮',
      date: '2025年6月28-29日',
      deadline: '5月27日 - 6月10日',
      backup: '2025年6月29日'
    },
    {
      round: '第三轮',
      date: '2025年9月27-28日',
      deadline: '8月26日 - 9月9日',
      backup: '2025年9月28日'
    },
    {
      round: '第四轮',
      date: '2025年12月27-28日',
      deadline: '11月25日 - 12月9日',
      backup: '2025年12月29日'
    }
  ]
};

export default function ExamInfoPage({ params: { locale } }: ExamInfoPageProps) {
  const currentLocale = (locale as 'en' | 'zh-Hant' | 'zh-Hans') || 'en';
  const t = translations[currentLocale] || translations.en;
  const schedule = examSchedule[currentLocale] || examSchedule.en;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Section className="py-16 bg-gradient-to-br from-[#f8f5f0] to-[#e8e4d8]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{t.title}</h1>
            <p className="text-lg text-gray-700 mb-8">{t.subtitle}</p>
          </div>
        </div>
      </Section>

      {/* Exam Schedule Section */}
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Calendar className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.examScheduleTitle}</h2>
            </div>
            
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#a4a78b] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">{t.examRound}</th>
                    <th className="py-3 px-4 text-left">{t.examDate}</th>
                    <th className="py-3 px-4 text-left">{t.registrationDeadline}</th>
                    <th className="py-3 px-4 text-left">{t.backupDate}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schedule.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium">{item.round}</td>
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.deadline}</td>
                      <td className="py-3 px-4">{item.backup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-600 italic">{t.examScheduleNote}</p>
          </div>
        </div>
      </Section>

      {/* Location Section */}
      <Section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <MapPin className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.locationTitle}</h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <p className="mb-4">{t.locationDesc}</p>
              <h3 className="text-xl font-semibold mb-2">{t.locationName}</h3>
              <p className="text-gray-700">{t.locationAddress}</p>
              <p className="text-sm text-gray-600 italic">{t.locationNote}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Fees Section */}
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <DollarSign className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.feesTitle}</h2>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">1</span>
                  <span>{t.feeRegular}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">2</span>
                  <span>{t.feeStudent}</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 italic">{t.feeNote}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Application Documents Section */}
      <Section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <FileText className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.applicationTitle}</h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <p className="mb-4">{t.applicationDesc}</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">1</span>
                  <span>{t.applicationItem1}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">2</span>
                  <span>{t.applicationItem2}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">3</span>
                  <span>{t.applicationItem3}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">4</span>
                  <span>{t.applicationItem4}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Submission Places Section */}
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <MapPin className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.submissionTitle}</h2>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="mb-4">{t.submissionDesc}</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">1</span>
                  <span>{t.submissionPlace1}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">2</span>
                  <span>{t.submissionPlace2}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">3</span>
                  <span>{t.submissionPlace3}</span>
                </li>
              </ul>
              <p className="mt-4 text-gray-700">{t.submissionTime}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Exam Format Section */}
      <Section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Monitor className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.examFormatTitle}</h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">1</span>
                  <span>{t.examFormatItem1}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">2</span>
                  <span>{t.examFormatItem2}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#a4a78b] text-white text-sm mr-3 mt-0.5">3</span>
                  <span>{t.examFormatItem3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Phone className="h-8 w-8 text-[#a4a78b] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.contactTitle}</h2>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="font-medium min-w-32">{t.contactWebsite}</span>
                  <a href="https://ussh.vnu.edu.vn/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ussh.vnu.edu.vn</a>
                </li>
                <li className="flex items-center">
                  <span className="font-medium min-w-32">{t.contactEmail}</span>
                  <a href="mailto:contact@ussh.edu.vn" className="text-blue-600 hover:underline">contact@ussh.edu.vn</a>
                </li>
                <li className="flex items-center">
                  <span className="font-medium min-w-32">{t.contactPhone}</span>
                  <a href="tel:+842438583799" className="text-blue-600 hover:underline">+84 24 3858 3799</a>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#a4a78b] hover:bg-[#8a8c74] transition-all duration-300">
                <Link href={`/${locale}/courses`}>
                  {t.learnMoreButton}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-[#eae7df] text-[#a4a78b] hover:bg-[#d8d4c8] transition-all duration-300">
                <Link href={`/${locale}/contact`}>
                  {t.registerButton}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
