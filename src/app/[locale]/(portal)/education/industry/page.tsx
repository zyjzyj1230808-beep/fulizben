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

type MediaItem = {
  zh: string;
  en: string;
  country: { zh: string; en: string };
  link: string;
  description: { zh: string; en: string };
  rating?: string;
};

const mediaRecommendations: {
  documentaries: MediaItem[];
  tvSeries: MediaItem[];
  movies: MediaItem[];
} = {
  documentaries: [
    {
      zh: '《魔鬼交易员》',
      en: 'Rogue Trader',
      country: { zh: '英国', en: 'UK' },
      link: 'https://search.bilibili.com/all?keyword=%E9%AD%94%E9%AC%BC%E4%BA%A4%E6%98%93%E5%91%98',
      description: {
        zh: '讲述了历史上最著名的金融欺诈案之一——尼克·利森搞垮巴林银行的故事。它深刻揭示了风险管理的重要性、人性的贪婪以及制度上的漏洞。对于任何想从事交易的人来说，这都是一堂血淋淋的风险教育课。',
        en: 'Retells how Nick Leeson brought down Barings Bank, underscoring risk controls, human greed, and structural loopholes. It is a visceral lesson for anyone entering trading.',
      },
    },
    {
      zh: '《比特币的崛起》',
      en: 'The Rise of Bitcoin',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E6%AF%94%E7%89%B9%E5%B8%81%E7%9A%84%E5%B4%9B%E8%B5%B7',
      description: {
        zh: '如果你想了解最新的金融前沿——加密货币，这部纪录片是很好的起点。它记录了比特币从极客玩具成长为全球性资产的早期历程，涵盖了支持者与怀疑者的各种观点，能帮助你理解这个新兴市场的巨大波动性和潜力。',
        en: 'A superb primer on the crypto frontier, tracing Bitcoin’s rise from geek experiment to global asset while covering both believers and skeptics to explain the market’s volatility and potential.',
      },
    },
    {
      zh: '《监守自盗》',
      en: 'Inside Job',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E7%9B%91%E5%AE%88%E8%87%AA%E7%9B%97',
      description: {
        zh: '荣获奥斯卡最佳纪录片奖。它系统地剖析了2008年全球金融危机的起源和根源，采访了包括政府官员、金融分析师、大学教授在内的众多知情人士，并回答“这场危机是如何发生的？谁该负责？”等关键问题，是理解现代金融体系弊病的必看之作。',
        en: 'An Oscar-winning deep dive into the 2008 crisis that interviews insiders across government, finance, and academia to answer how it happened and who was responsible—essential viewing on systemic flaws.',
      },
    },
    {
      zh: '《华尔街》',
      en: 'Wall Street',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E5%8D%8E%E5%B0%94%E8%A1%97%E7%BA%AA%E5%BD%95%E7%89%87',
      description: {
        zh: '这部纪录片通过采访华尔街的顶级银行家、交易员和分析师，深入探讨了现代金融体系的运作方式、2008年金融危机的后果以及金融创新带来的巨大影响。它提供了一个非常系统和内部的视角。',
        en: 'Interviews top Wall Street bankers, traders, and analysts to explore modern market mechanics, the aftermath of 2008, and the sweeping impact of financial innovation.',
      },
    },
    {
      zh: '《行为经济学入门》',
      en: 'Introduction to Behavioral Economics',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E8%A1%8C%E4%B8%BA%E7%BB%8F%E6%B5%8E%E5%AD%A6%E5%85%A5%E9%97%A8',
      description: {
        zh: '这并非纯粹的交易纪录片，但它对理解市场至关重要。它解释了人类心理如何系统性地偏离理性，从而导致可预测的投资错误。理解了行为偏差，才能更好地把握市场脉搏。',
        en: 'Though not a trading doc per se, it reveals how human psychology systematically departs from rationality and drives predictable investing errors—essential for reading market sentiment.',
      },
    },
  ],
  tvSeries: [
    {
      zh: '《亿万》',
      en: 'Billions',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E4%BA%BF%E4%B8%87%20Billions',
      description: {
        zh: '堪称金融题材的“神作”。剧情围绕一名对冲基金亿万富翁和一位美国司法部长之间的智斗展开。它不仅展示了高超的交易策略、市场操纵和内幕信息战，更深入探讨了权力、法律与道德的灰色地带，充满精彩的金融与心理博弈。',
        en: 'Often hailed as the definitive finance drama, following a hedge-fund titan and a U.S. Attorney locked in mind games that mix elite trading tactics, market manipulation, and moral gray zones.',
      },
    },
    {
      zh: '《黑钱》',
      en: 'Dirty Money',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E9%BB%91%E9%92%B1%20Dirty%20Money',
      description: {
        zh: '这部纪录片剧集每一集都深入一个不同的企业丑闻或金融腐败案例。它揭示了在巨大利益驱使下，企业如何铤而走险，以及背后的道德沦丧。对于理解宏观市场环境和公司治理风险极具价值。',
        en: 'Each episode dives into a new corporate scandal, revealing how firms chase profit at the expense of governance and ethics—vital context for understanding market and compliance risk.',
      },
    },
    {
      zh: '《投行风云》',
      en: 'Industry',
      country: { zh: '英国', en: 'UK' },
      link: 'https://search.bilibili.com/all?keyword=%E6%8A%95%E8%A1%8C%E9%A3%8E%E4%BA%91',
      description: {
        zh: '这部英国剧集背景设定在1980年代伦敦的投行，聚焦于一群年轻的毕业生，揭示了那个时代金融业的贪婪、毒品、性以及残酷的职场文化。它更侧重于投行文化而非交易细节，但能让人感受到这个高压行业的原始生态。',
        en: 'Set in a 1980s London investment bank, it follows young graduates through a world of greed, drugs, and brutal workplace dynamics—capturing the raw culture of high-pressure finance.',
      },
    },
  ],
  movies: [
    {
      zh: '《大空头》',
      en: 'The Big Short',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E5%A4%A7%E7%A9%BA%E5%A4%B4',
      description: {
        zh: '以2008年金融危机为背景，讲述了几位洞察先机的投资鬼才，如何通过做空美国房地产市场而大幅获利的故事。电影用各种通俗有趣的方式（如让明星在浴缸里讲解CDO）解释复杂的金融衍生品，是理解金融创新双刃剑效应的最佳教材。',
        en: 'Charts contrarian investors who shorted the U.S. housing market in 2008, using witty devices—like celebrity bathtub explainers—to demystify CDOs and the double-edged nature of financial innovation.',
      },
    },
    {
      zh: '《商海通牒》',
      en: 'Margin Call',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E5%95%86%E6%B5%B7%E9%80%9A%E7%89%92',
      description: {
        zh: '电影将时间浓缩在2008年金融危机爆发前的24小时内，聚焦一家投资银行的交易员们如何发现风险并艰难求生。它不像《大空头》那样宏观，而是更细腻地刻画了交易大厅里的人性、职业道德和生存压力。',
        en: 'Condenses the 24 hours before the crisis, focusing on traders at an investment bank as they discover risk and grapple with ethics, survival, and the weight of their decisions.',
      },
    },
    {
      zh: '《国家破产之日》',
      en: 'Default Day',
      country: { zh: '韩国', en: 'Korea' },
      link: 'https://search.bilibili.com/all?keyword=%E5%9B%BD%E5%AE%B6%E7%A0%B4%E4%BA%A7%E4%B9%8B%E6%97%A5',
      description: {
        zh: '这部电影从韩国的视角再现了1997年亚洲金融风暴。它同时展现了政府官员、金融机构、企业和普通家庭在国家级经济危机中的不同选择和命运。对于理解宏观经济事件如何影响金融市场和个体命运，非常有启发。',
        en: 'Recreates the 1997 Asian crisis through Korea’s lens, showing how officials, financiers, companies, and households confronted national default—revealing how macro shocks shape markets and lives.',
      },
    },
    {
      zh: '《聪明钱》',
      en: 'Smart Money',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E8%81%AA%E6%98%8E%E9%92%B1%20%E7%94%B5%E5%BD%B1',
      description: {
        zh: '基于真实故事，讲述了纽约皇后区的一群普通蓝领工人，如何利用他们对保龄球的专业知识，在保龄球锦标赛的投注市场中发现了漏洞，并从中套利的故事。这是一个关于发现边缘机会、模型和套利的绝佳案例。',
        en: 'Based on true events of Queens blue-collar workers who leveraged bowling expertise to spot inefficiencies in betting markets—a great case study in niche edge and arbitrage.',
      },
    },
    {
      zh: '《套利交易》',
      en: 'Arbitrage',
      country: { zh: '美国', en: 'USA' },
      link: 'https://search.bilibili.com/all?keyword=%E5%A5%97%E5%88%A9%E4%BA%A4%E6%98%93%20%E7%94%B5%E5%BD%B1',
      description: {
        zh: '理查·基尔主演，讲述一位对冲基金大佬在试图出售自己公司时，却要竭力掩盖一桩致命失误和巨大的财务欺诈。这部电影深刻描绘了成功金融家光鲜背后的压力、欺瞒和道德困境。',
        en: 'Richard Gere portrays a hedge-fund titan scrambling to hide a fatal mistake while selling his firm, exposing the pressure, deceit, and moral compromise lurking behind success.',
      },
    },
  ],
};

const traderStories = [
  {
    zh: '乔治·索罗斯：量子基金的传奇',
    en: 'George Soros: The Quantum Fund Legend',
    insight: {
      zh: '宏观对冲基金与风险对冲策略的经典案例。',
      en: 'A classic case of macro hedge funds and risk hedging strategies.',
    },
    cta: {
      href: '/education/industry/quantum-hedge',
      labelZh: '深入了解宏观对冲',
      labelEn: 'Explore Macro Hedging',
    },
  },
  {
    zh: '理查德·丹尼斯：海龟交易法则',
    en: 'Richard Dennis: The Turtle Trading Rules',
    insight: {
      zh: '强调系统化交易与严格执行的重要性。',
      en: 'Highlights the importance of systematic trading and strict execution.',
    },
    cta: {
      href: '/education/industry/turtle-trading',
      labelZh: '学习海龟法则',
      labelEn: 'Study Turtle Rules',
    },
  },
  {
    zh: '琳达·拉斯基：短线交易女王',
    en: 'Linda Raschke: Queen of Short-Term Trading',
    insight: {
      zh: '价格行为与资金管理的模范代表。',
      en: 'A role model for price action and capital management.',
    },
    cta: {
      href: '/education/industry/linda-raschke',
      labelZh: '学习短线法则',
      labelEn: 'Study Short-Term Playbook',
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
            <LocaleLink
              href="/education/industry/landscape"
              className="mt-6 inline-flex items-center justify-center px-4 py-2 border-2 border-black dark:border-white text-black dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm"
            >
              {isZh ? '查看详细解析' : 'View Detailed Breakdown'}
            </LocaleLink>
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
            <LocaleLink
              href="/education/industry/history"
              className="mt-6 inline-flex items-center justify-center px-4 py-2 border-2 border-black dark:border-white text-black dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm"
            >
              {isZh ? '查看关键事件' : 'Explore Timeline'}
            </LocaleLink>
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
            <LocaleLink
              href="/education/industry/macro"
              className="mt-6 inline-flex items-center justify-center px-4 py-2 border-2 border-black dark:border-white text-black dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm"
            >
              {isZh ? '建立宏观框架' : 'Build Macro Framework'}
            </LocaleLink>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-black dark:text-white">
              {isZh ? '影视作品精选' : 'Featured Media'}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {isZh
                ? '以下影视作品帮助你从故事层面理解市场波动、风险事件与人性因素。'
                : 'These films and documentaries showcase market swings, risk events, and the human element behind trading.'}
            </p>
          </div>

          {/* 纪录片 */}
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h3 className="text-2xl font-black mb-6 text-black dark:text-white flex items-center gap-2">
              <span className="text-3xl">📹</span>
              {isZh ? '纪录片' : 'Documentaries'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaRecommendations.documentaries.map((item, index) => (
                <article
                  key={index}
                  className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-900"
                >
                  <div className="bg-[#0a1b49] text-white px-6 py-5">
                    <p className="text-lg font-bold">{isZh ? item.zh : item.en}</p>
                    <p className="text-sm text-white/70 mt-2">
                      {item.rating
                        ? isZh
                          ? `豆瓣评分 ${item.rating}`
                          : `Douban ${item.rating}`
                        : `${isZh ? '纪录片' : 'Documentary'} · ${
                            isZh ? item.country.zh : item.country.en
                          }`}
                    </p>
                  </div>
                  <div className="px-6 py-6 flex flex-col flex-1 text-black dark:text-white">
                    <p className="text-base font-bold mb-3">{isZh ? item.zh : item.en}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed flex-1">
                      <span className="font-semibold block mb-1">{isZh ? '核心看点' : 'Key Takeaway'}</span>
                      {isZh ? item.description.zh : item.description.en}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex items-center justify-center px-5 py-2 text-sm font-semibold bg-[#0a1b49] text-white rounded-md hover:bg-[#132863] transition-colors"
                    >
                      {isZh ? '观看视频' : 'Watch Video'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 电视剧 */}
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h3 className="text-2xl font-black mb-6 text-black dark:text-white flex items-center gap-2">
              <span className="text-3xl">📺</span>
              {isZh ? '电视剧' : 'TV Series'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaRecommendations.tvSeries.map((item, index) => (
                <article
                  key={index}
                  className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-900"
                >
                  <div className="bg-[#0a1b49] text-white px-6 py-5">
                    <p className="text-lg font-bold">{isZh ? item.zh : item.en}</p>
                    <p className="text-sm text-white/70 mt-2">
                      {item.rating
                        ? isZh
                          ? `豆瓣评分 ${item.rating}`
                          : `Douban ${item.rating}`
                        : `${isZh ? '电视剧' : 'TV Series'} · ${
                            isZh ? item.country.zh : item.country.en
                          }`}
                    </p>
                  </div>
                  <div className="px-6 py-6 flex flex-col flex-1 text-black dark:text-white">
                    <p className="text-base font-bold mb-3">{isZh ? item.zh : item.en}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed flex-1">
                      <span className="font-semibold block mb-1">{isZh ? '核心看点' : 'Key Takeaway'}</span>
                      {isZh ? item.description.zh : item.description.en}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex items-center justify-center px-5 py-2 text-sm font-semibold bg-[#0a1b49] text-white rounded-md hover:bg-[#132863] transition-colors"
                    >
                      {isZh ? '观看视频' : 'Watch Video'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 电影 */}
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h3 className="text-2xl font-black mb-6 text-black dark:text-white flex items-center gap-2">
              <span className="text-3xl">🎬</span>
              {isZh ? '电影' : 'Movies'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaRecommendations.movies.map((item, index) => (
                <article
                  key={index}
                  className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-900"
                >
                  <div className="bg-[#0a1b49] text-white px-6 py-5">
                    <p className="text-lg font-bold">{isZh ? item.zh : item.en}</p>
                    <p className="text-sm text-white/70 mt-2">
                      {item.rating
                        ? isZh
                          ? `豆瓣评分 ${item.rating}`
                          : `Douban ${item.rating}`
                        : `${isZh ? '电影' : 'Film'} · ${
                            isZh ? item.country.zh : item.country.en
                          }`}
                    </p>
                  </div>
                  <div className="px-6 py-6 flex flex-col flex-1 text-black dark:text-white">
                    <p className="text-base font-bold mb-3">{isZh ? item.zh : item.en}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed flex-1">
                      <span className="font-semibold block mb-1">{isZh ? '核心看点' : 'Key Takeaway'}</span>
                      {isZh ? item.description.zh : item.description.en}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex items-center justify-center px-5 py-2 text-sm font-semibold bg-[#0a1b49] text-white rounded-md hover:bg-[#132863] transition-colors"
                    >
                      {isZh ? '观看视频' : 'Watch Video'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 传奇交易员故事 */}
        <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
          <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
            {isZh ? '传奇交易员故事' : 'Legendary Trader Stories'}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {isZh
              ? '向顶级交易者学习，他们的成功都建立在纪律、风控与可复制的策略体系之上。'
              : 'Learn from top traders whose success rests on discipline, risk control, and repeatable strategies.'}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {traderStories.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow">
                <p className="font-bold text-black dark:text-white mb-2">
                  {isZh ? item.zh : item.en}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                  {isZh ? item.insight.zh : item.insight.en}
                </p>
                {item.cta && (
                  <LocaleLink
                    href={item.cta.href}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[#0a1b49] hover:underline"
                  >
                    {isZh ? item.cta.labelZh : item.cta.labelEn}
                  </LocaleLink>
                )}
              </div>
            ))}
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

