import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜入门学习路径',
    'Fuli Education | Beginner Learning Path',
    '从基础知识、技术分析到风险管理，30 天构建完整的金融交易知识体系，配套精选课程与实战练习。',
    'Build a complete forex knowledge system in 30 days—from fundamentals and technical analysis to risk management—with curated lessons and practical drills.',
    '金融入门课程, 金融基础知识, 技术分析入门, 交易策略学习, 风险管理教程',
    'beginner forex course, forex fundamentals, technical analysis basics, trading strategies, risk management training',
    lang,
    {
      url: '/education/beginner',
      type: 'article',
      section: 'Education - Beginner',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const beginnerCourseGroups = [
  {
    id: 'basics',
    icon: '📚',
    title: { zh: '基础知识', en: 'Basic Knowledge' },
    description: {
      zh: '掌握金融市场的核心概念、交易规则与主要参与者。',
      en: 'Master the core concepts, trading rules, and key participants of the forex market.',
    },
    courses: [
      { title: { zh: '金融交易基础', en: 'Forex Trading Basics' }, slug: 'forex-basics', status: { zh: '热门', en: 'Popular' } },
      { title: { zh: '金融市场交易时段', en: 'Trading Sessions Guide' }, slug: 'trading-sessions-guide', status: { zh: '新', en: 'New' } },
      { title: { zh: '点差与佣金详解', en: 'Spreads and Commissions' }, slug: 'spreads-and-commissions', status: { zh: '新', en: 'New' } },
      { title: { zh: '杠杆与保证金', en: 'Leverage and Margin' }, slug: 'leverage-and-margin', status: { zh: '新', en: 'New' } },
      { title: { zh: '经纪商选择指南', en: 'Broker Selection Guide' }, slug: 'broker-selection-guide', status: { zh: '新', en: 'New' } },
      { title: { zh: '货币对完整解析', en: 'Currency Pairs Guide' }, slug: 'currency-pairs-guide', status: { zh: '新', en: 'New' } },
      { title: { zh: '金融市场参与者', en: 'Market Participants' }, slug: 'market-participants', status: { zh: '新', en: 'New' } },
    ],
  },
  {
    id: 'technical',
    icon: '📊',
    title: { zh: '技术分析', en: 'Technical Analysis' },
    description: {
      zh: '学习图表语言、趋势识别与经典指标，建立分析框架。',
      en: 'Learn chart language, trend recognition, and classic indicators to build your analysis framework.',
    },
    courses: [
      { title: { zh: '布林带指标详解', en: 'Bollinger Bands Guide' }, slug: 'bollinger-bands', status: { zh: '新', en: 'New' } },
      { title: { zh: '肯特纳通道指标', en: 'Keltner Channels' }, slug: 'keltner-channels', status: { zh: '新', en: 'New' } },
      { title: { zh: 'MACD指标完整教程', en: 'MACD Indicator Complete Guide' }, slug: 'macd-indicator', status: { zh: '新', en: 'New' } },
      { title: { zh: 'EMA均线系统', en: 'EMA Moving Averages' }, slug: 'ema-moving-averages', status: { zh: '新', en: 'New' } },
      { title: { zh: 'RSI指标应用指南', en: 'RSI Indicator Guide' }, slug: 'rsi-indicator', status: { zh: '新', en: 'New' } },
      { title: { zh: 'K线形态识别指南', en: 'Candlestick Patterns' }, slug: 'candlestick-patterns', status: { zh: '新', en: 'New' } },
      { title: { zh: '支撑阻力与趋势线', en: 'Support, Resistance & Trendlines' }, slug: 'support-resistance', status: { zh: '新', en: 'New' } },
      { title: { zh: '价格行为交易策略', en: 'Price Action Trading' }, slug: 'price-action', status: { zh: '新', en: 'New' } },
    ],
  },
  {
    id: 'strategies',
    icon: '🎯',
    title: { zh: '交易策略', en: 'Trading Strategies' },
    description: {
      zh: '从日内到波段，建立适合自己的策略组合与执行流程。',
      en: 'From intraday to swing, build playbooks and execution routines tailored to you.',
    },
    courses: [
      { title: { zh: '日内交易完整指南', en: 'Day Trading Complete Guide' }, slug: 'day-trading', status: { zh: '新', en: 'New' } },
      { title: { zh: '波段交易策略', en: 'Swing Trading Strategy' }, slug: 'swing-trading', status: { zh: '新', en: 'New' } },
      { title: { zh: '剥头皮交易技巧', en: 'Scalping Techniques' }, slug: 'scalping', status: { zh: '新', en: 'New' } },
      { title: { zh: '趋势跟踪系统', en: 'Trend Following System' }, slug: 'trend-following', status: { zh: '新', en: 'New' } },
      { title: { zh: '突破交易策略', en: 'Breakout Trading Strategy' }, slug: 'breakout-trading', status: { zh: '新', en: 'New' } },
    ],
  },
  {
    id: 'risk',
    icon: '🛡️',
    title: { zh: '风险管理', en: 'Risk Management' },
    description: {
      zh: '掌握仓位控制、止损策略与交易心理，保障账户增长。',
      en: 'Master position sizing, stop loss methods, and trading psychology to protect capital.',
    },
    courses: [
      { title: { zh: '风险管理基础', en: 'Risk Management Basics' }, slug: 'risk-management', status: { zh: '新', en: 'New' } },
      { title: { zh: '仓位控制与资金管理', en: 'Position Sizing & Money Management' }, slug: 'position-sizing', status: { zh: '新', en: 'New' } },
      { title: { zh: '止损策略大全', en: 'Stop Loss Strategies' }, slug: 'stop-loss-strategies', status: { zh: '新', en: 'New' } },
      { title: { zh: '交易心理学', en: 'Trading Psychology' }, slug: 'trading-psychology', status: { zh: '新', en: 'New' } },
      { title: { zh: '风险回报比优化', en: 'Risk-Reward Optimization' }, slug: 'risk-reward', status: { zh: '新', en: 'New' } },
    ],
  },
];

export default async function BeginnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden border-b-2 border-gray-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6 text-sm font-semibold tracking-wider uppercase">
            {isZh ? '入门学习' : 'Beginner Path'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {isZh ? '30 天构建金融交易基础框架' : 'Build Your Forex Foundation in 30 Days'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            {isZh
              ? '循序渐进学习核心知识、技术分析、策略执行与风险管理，搭建可以复用的交易体系。'
              : 'Learn core concepts, technical analysis, strategy execution, and risk management step by step to build a repeatable trading system.'}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">30</span> {isZh ? '天学习计划' : 'Day Roadmap'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">25+</span> {isZh ? '精选课程' : 'Curated Lessons'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{isZh ? '实战练习' : 'Practice'}</span> {isZh ? '模拟 + 日志' : 'Simulation + Journaling'}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              {isZh ? '三阶段学习路线' : 'Three-Phase Learning Route'}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {isZh
                ? '我们按照理解市场 → 工具与平台 → 模拟实战的顺序设计学习路径，帮助你在短时间内形成系统化的知识结构。'
                : 'We designed the path in three stages—market understanding, tools & platforms, simulation & practice—to help you form a structured knowledge base quickly.'}
            </p>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-black dark:border-white p-4 bg-white dark:bg-gray-900">
              <h3 className="text-xl font-bold text-black dark:text-white">
                {isZh ? '阶段 1：理解市场' : 'Phase 1: Understand the Market'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {isZh
                  ? '聚焦市场结构、货币对、点值与杠杆等基础概念，构建交易语言。'
                  : 'Focus on market structure, currency pairs, pip values, and leverage to build your trading vocabulary.'}
              </p>
            </div>
            <div className="border-2 border-black dark:border-white p-4 bg-white dark:bg-gray-900">
              <h3 className="text-xl font-bold text-black dark:text-white">
                {isZh ? '阶段 2：工具与平台' : 'Phase 2: Tools & Platforms'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {isZh
                  ? '熟悉交易软件、图表设置、指标应用与下单流程，为技术分析打下基础。'
                  : 'Get comfortable with trading platforms, chart setups, indicator usage, and order flow to support technical analysis.'}
              </p>
            </div>
            <div className="border-2 border-black dark:border-white p-4 bg-white dark:bg-gray-900">
              <h3 className="text-xl font-bold text-black dark:text-white">
                {isZh ? '阶段 3：模拟与实战' : 'Phase 3: Simulation & Practice'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {isZh
                  ? '通过模拟账户训练执行节奏，建立交易日志与复盘习惯。'
                  : 'Use demo accounts to train execution rhythm and build journaling and review habits.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-black dark:text-white">
            {isZh ? '入门必修专题一览' : 'Beginner Core Modules'}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '以下模块覆盖基础知识、技术分析、交易策略与风险管理。建议循序渐进学习，并在实际操作前完成模拟练习。'
              : 'These modules cover fundamentals, technical analysis, trading strategies, and risk management. Study them sequentially and complete simulation practice before trading live.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {beginnerCourseGroups.map((category) => {
            return (
              <div
                key={category.id}
                className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl md:text-5xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2 text-black dark:text-white">
                      {isZh ? category.title.zh : category.title.en}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {isZh ? category.description.zh : category.description.en}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.courses.map((course, index) => {
                    const courseTitle = isZh ? course.title.zh : course.title.en;
                    const statusText = isZh ? course.status.zh : course.status.en;
                    const isComingSoon = statusText === '即将推出' || statusText === 'Coming Soon';
                    const isPopular = statusText === '热门' || statusText === 'Popular';
                    const isNew = statusText === '新' || statusText === 'New';

                    return (
                      <LocaleLink
                        key={index}
                        href={isComingSoon ? '#' : `/education/${course.slug}`}
                        className={`block p-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group ${
                          isComingSoon ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
                            {courseTitle}
                          </span>
                          {statusText && (
                            <span
                              className={`text-xs px-3 py-1 border-2 ${
                                isPopular
                                  ? 'bg-red-600 text-white border-red-600'
                                  : isNew
                                  ? 'bg-green-600 text-white border-green-600'
                                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-black dark:border-white'
                              }`}
                            >
                              {statusText}
                            </span>
                          )}
                        </div>
                      </LocaleLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">
            {isZh ? '下一步：提升策略或规划职业发展' : 'Next Step: Advance Strategy or Plan Your Career'}
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
            {isZh
              ? '完成入门学习后，前往行业介绍建立宏观視角，或进入职业之路板块规划長期成长。'
              : 'After the beginner modules, visit Industry Overview for macro context or explore Career Path to plan your progression.'}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LocaleLink
              href="/education/industry"
              className="px-8 py-3 bg-white dark:bg-black text-black dark:text-white font-bold border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all"
            >
              {isZh ? '了解行业背景' : 'Review Industry Background'}
            </LocaleLink>
            <LocaleLink
              href="/education/career"
              className="px-8 py-3 bg-transparent text-white dark:text-black font-bold border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
            >
              {isZh ? '规划职业之路' : 'Plan Your Career Path'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

