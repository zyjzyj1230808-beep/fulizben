import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import LocaleLink from '@/components/navigation/LocaleLink';

// Generate SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '金融交易教育中心 - 学习路径总览 | Buoyancy Capital',
    'Forex Trading Education Hub - Overview | Buoyancy Capital',
    '浮力教育中心总览页面，概览行业介绍、入门学习、职业之路等核心专题，快速导航至对应课程与资源。',
    'Discover the Buoyancy education overview covering industry insights, beginner learning, and career development with quick access to dedicated resources.',
    '金融教育总览, 浮力教育中心, 行业介绍, 金融入门, 职业交易员发展, 学习路径导航',
    'forex education overview, Buoyancy education hub, industry insights, beginner forex learning, trading career development, learning path navigation',
    lang,
    {
      url: '/education',
      type: 'website',
      section: 'Education',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const featurePages = [
  {
    id: 'industry',
    icon: '🌍',
    title: { zh: '行业介绍', en: 'Industry Overview' },
    description: {
      zh: '洞悉全球金融市场格局、主要参与者、经典影视與傳奇人物故事。',
      en: 'Understand the global forex landscape, key participants, curated media, and trader stories.',
    },
    href: '/education/industry',
    highlights: {
      zh: ['市场结构梳理', '影视作品推荐', '传奇交易者故事'],
      en: ['Market structure guides', 'Recommended media', 'Legendary trader stories'],
    },
  },
  {
    id: 'beginner',
    icon: '🚀',
    title: { zh: '入门学习', en: 'Beginner Learning' },
    description: {
      zh: '从基础概念、技术分析到风险控制，30天搭建完整知识框架。',
      en: 'Build a complete foundation in 30 days, covering basics, technical analysis, and risk control.',
    },
    href: '/education/beginner',
    highlights: {
      zh: ['基础知识模块', '技术分析必修', '风险管理与实战练习'],
      en: ['Core basics modules', 'Essential technical analysis', 'Risk management workshops'],
    },
  },
  {
    id: 'career',
    icon: '🎓',
    title: { zh: '职业之路', en: 'Career Path' },
    description: {
      zh: '了解浮力资本的成长机制、资金支持与职业发展路线图。',
      en: 'Explore Fuli Capital’s growth framework, funding support, and professional roadmap.',
    },
    href: '/education/career',
    highlights: {
      zh: ['交易员晋升体系', '资金与考核机制', '团队协作与资源'],
      en: ['Trader advancement system', 'Funding and evaluations', 'Collaboration resources'],
    },
  },
];

export default async function EducationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - 增强版 */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">{isZh ? '专业交易教育' : 'Professional Trading Education'}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">{isZh ? '金融交易教育中心' : 'Forex Trading Education Center'}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh ? (
              <>
                系统化学习金融交易知识，从零基础到职业交易员<br />
                专业、实战、高效的学习路径
              </>
            ) : (
              <>
                Systematic forex trading education from beginner to professional<br />
                Professional, practical, and efficient learning path
              </>
            )}
          </p>

          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">25+</span> {isZh ? '专业课程' : 'Courses'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">4</span> {isZh ? '学习方向' : 'Categories'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">100%</span> {isZh ? '免费学习' : 'Free Learning'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">24/7</span> {isZh ? '随时访问' : 'Always Available'}
            </div>
          </div>
        </div>
      </div>




      {/* Core Learning Areas */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4">
            {isZh ? '核心学习专栏' : 'Core Learning Areas'}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '按照学习阶段浏览浮力教育中心的三大核心主题，每个页面都提供更深入的内容与实战资源。'
              : 'Navigate Fuli Education’s three core themes by learning stage, each with in-depth content and practical resources.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featurePages.map((page) => {
            const highlights = isZh ? page.highlights.zh : page.highlights.en;

            return (
              <LocaleLink
                key={page.id}
                href={page.href}
                className="group block h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-lg"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl md:text-5xl">{page.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">
                      {isZh ? page.title.zh : page.title.en}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors">
                      {isZh ? page.description.zh : page.description.en}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors">
                  {highlights.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-lg">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 font-bold">
                  <span>{isZh ? '查看专题' : 'View Details'}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </LocaleLink>
            );
          })}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Why Learn Here Section */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-black dark:text-white">
              {isZh ? '为什么选择 Buoyancy Capital 教育中心？' : 'Why Choose Buoyancy Capital Education Center?'}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {isZh
                ? '我们提供系统化的金融交易教育，由职业交易员编写，注重实战应用。所有课程完全免费，24/7随时访问，配套专业交易工具支持。'
                : 'We provide systematic forex trading education written by professional traders with focus on practical application. All courses are completely free, accessible 24/7, with professional trading tools support.'}
            </p>
            <p className="text-xl font-bold text-black dark:text-white">
              {isZh ? '从零基础到职业交易员，助你在金融市场稳定盈利' : 'From beginner to professional trader, helping you achieve consistent profits in forex markets'}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black dark:bg-white text-white dark:text-black p-12 border-2 border-black dark:border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {isZh ? '准备好成为职业交易员了吗？' : 'Ready to Become a Professional Trader?'}
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              {isZh ? (
                <>
                  完成教育中心的学习后，加入 Buoyancy Capital 30天系统化培训<br />
                  通过考核，获得真实资金进行交易
                </>
              ) : (
                <>
                  After completing the education center, join Buoyancy Capital 30-day systematic training<br />
                  Pass the evaluation and receive real funds for trading
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink
                href="/splan/join-us"
                className="px-10 py-4 bg-white dark:bg-black text-black dark:text-white font-bold text-lg border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all inline-block text-center"
              >
                {isZh ? '了解培训计划' : 'Learn About Training'}
              </LocaleLink>
              <LocaleLink
                href="/splan/psychology-test"
                className="px-10 py-4 bg-transparent text-white dark:text-black font-bold text-lg border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all inline-block text-center"
              >
                {isZh ? '免费心理测评' : 'Free Psychology Test'}
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
