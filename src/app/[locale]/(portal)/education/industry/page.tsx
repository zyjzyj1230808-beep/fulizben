import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜行业介绍与市场洞察',
    'Fuli Education | Industry Insights & Market Overview',
    '深入了解全球金融市场结构、主要参与者、经典影视与传奇交易员故事，为你的交易旅程打下宏观基础。',
    'Understand the global forex market structure, key participants, iconic media, and legendary trader stories to build a solid macro foundation.',
    '金融行业介绍, 市场结构, 金融历史, 经典交易影视, 传奇交易员故事',
    'forex industry overview, market structure, forex history, trading movies, legendary traders',
    lang,
    {
      url: '/education/industry',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const mediaRecommendations = [
  {
    zh: '华尔街之狼（The Wolf of Wall Street）',
    en: 'The Wolf of Wall Street',
    description: {
      zh: '深入了解投机交易的极端案例，提醒我们保持纪律与风险意识。',
      en: 'A deep dive into speculative extremes, reminding traders about discipline and risk awareness.',
    },
  },
  {
    zh: '商海通牒（Margin Call）',
    en: 'Margin Call',
    description: {
      zh: '根据2008年金融危机改编，展现风控缺失带来的连锁反应。',
      en: 'Based on the 2008 financial crisis, highlighting the cascading impact of missing risk controls.',
    },
  },
  {
    zh: '大空头（The Big Short）',
    en: 'The Big Short',
    description: {
      zh: '揭示金融市场泡沫与逆向思维的重要性。',
      en: 'Reveals financial bubbles and the value of contrarian thinking.',
    },
  },
];

const traderStories = [
  {
    zh: '乔治·索罗斯：量子基金的传奇',
    en: 'George Soros: The Quantum Fund Legend',
    insight: {
      zh: '宏观对冲基金与风险对冲策略的经典案例。',
      en: 'A classic case of macro hedge funds and risk hedging strategies.',
    },
  },
  {
    zh: '理查德·丹尼斯：海龟交易法则',
    en: 'Richard Dennis: The Turtle Trading Rules',
    insight: {
      zh: '强调系统化交易与严格执行的重要性。',
      en: 'Highlights the importance of systematic trading and strict execution.',
    },
  },
  {
    zh: '琳达·拉斯基：短线交易女王',
    en: 'Linda Raschke: Queen of Short-Term Trading',
    insight: {
      zh: '价格行为与资金管理的模范代表。',
      en: 'A role model for price action and capital management.',
    },
  },
];

export default async function IndustryPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {isZh ? '行业洞察' : 'Industry Insight'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {isZh ? '金融行业介绍与市场格局' : 'Forex Industry Overview & Market Landscape'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            {isZh
              ? '掌握市场结构、参与者类型与历史事件，理解推动汇率波动的真正力量。'
              : 'Understand market structure, participant archetypes, and historical events to grasp the forces that move currencies.'}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">6T+</span> {isZh ? '日均成交量（美元）' : 'Daily Volume (USD)'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{isZh ? '24 小时' : '24 Hours'}</span> {isZh ? '全球连续交易' : 'Global Trading'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">90+</span> {isZh ? '主要货币对' : 'Major Pairs'}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '行业全景' : 'Market Landscape'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '金融市场日均成交量超过 6 万亿美元，由银行间交易、对冲基金、机构投资者与散户共同构成。理解各参与者的动机与操作工具，有助于判断市场流动性与波动。'
                : 'With daily turnover exceeding $6 trillion, the forex market is shaped by interbank flows, hedge funds, institutional investors, and retail participants. Understanding their motivations and tools helps you read liquidity and volatility.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>• {isZh ? '银行间市场：主要流动性提供者' : 'Interbank market as primary liquidity source'}</li>
              <li>• {isZh ? '机构与基金：利用衍生品对冲或投机' : 'Institutions & funds hedging and speculating via derivatives'}</li>
              <li>• {isZh ? '零售交易者：技术与复制交易快速发展' : 'Retail growth driven by technology and copy trading'}</li>
            </ul>
          </div>

          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '历史与关键事件' : 'History & Key Events'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '从布雷顿森林体系解体到自由浮动汇率诞生，再到亚洲金融危机，金融市场不断演进，影响全球资产配置。'
                : 'From the collapse of Bretton Woods to the rise of free-floating exchange rates and the Asian financial crisis, forex markets have continually reshaped global capital flows.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>• {isZh ? '1971 年：美元与黄金脱钩，金融市场自由化' : '1971: USD decouples from gold, leading to market liberalization'}</li>
              <li>• {isZh ? '1992 年：英镑黑色星期三事件' : '1992: Black Wednesday and the pound crisis'}</li>
              <li>• {isZh ? '2008 年：全球金融危机触发避险行情' : '2008: Global financial crisis sparks flight to safety'}</li>
            </ul>
          </div>

          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '宏观驱动因素' : 'Macro Drivers'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '利率政策、通胀预期、地缘政治与风险情绪是驱动汇率波动的核心变量。建立宏观框架有助于理解趋势背景。'
                : 'Interest rate policy, inflation expectations, geopolitics, and risk sentiment drive currency trends. Building a macro framework helps contextualize market moves.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>• {isZh ? '央行政策与利差' : 'Central bank policy and rate differentials'}</li>
              <li>• {isZh ? '经济数据与通胀指标' : 'Economic releases and inflation metrics'}</li>
              <li>• {isZh ? '市场情绪与避险资产' : 'Risk sentiment and safe-haven assets'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '影视作品精选' : 'Featured Media'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '以下影视作品帮助你从故事层面理解市场波动、风险事件与人性因素。'
                : 'These films and documentaries showcase market swings, risk events, and the human element behind trading.'}
            </p>
            <ul className="space-y-4">
              {mediaRecommendations.map((item, index) => (
                <li key={index} className="border border-gray-200 dark:border-gray-800 p-4">
                  <p className="font-bold text-black dark:text-white">
                    {isZh ? item.zh : item.en}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 leading-relaxed">
                    {isZh ? item.description.zh : item.description.en}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '传奇交易员故事' : 'Legendary Trader Stories'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '向顶级交易者学习，他们的成功都建立在纪律、风控与可复制的策略体系之上。'
                : 'Learn from top traders whose success rests on discipline, risk control, and repeatable strategies.'}
            </p>
            <ul className="space-y-4">
              {traderStories.map((item, index) => (
                <li key={index} className="border border-gray-200 dark:border-gray-800 p-4">
                  <p className="font-bold text-black dark:text-white">
                    {isZh ? item.zh : item.en}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 leading-relaxed">
                    {isZh ? item.insight.zh : item.insight.en}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">
            {isZh ? '下一步：进入入门学习或职业发展' : 'Next Step: Beginner Learning or Career Path'}
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
            {isZh
              ? '继续探索浮力教育中心，我们按照学习阶段为你提供系统化内容。'
              : 'Continue exploring the Fuli Education Center with structured content tailored to your learning stage.'}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LocaleLink
              href="/education/beginner"
              className="px-8 py-3 bg-white dark:bg-black text-black dark:text-white font-bold border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all"
            >
              {isZh ? '进入入门学习' : 'Go to Beginner Learning'}
            </LocaleLink>
            <LocaleLink
              href="/education/career"
              className="px-8 py-3 bg-transparent text-white dark:text-black font-bold border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
            >
              {isZh ? '了解职业之路' : 'Explore Career Path'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

