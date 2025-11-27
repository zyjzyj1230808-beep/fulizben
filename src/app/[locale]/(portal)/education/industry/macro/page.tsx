import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜宏观驱动因素全解析',
    'Fuli Education | Macro Drivers Playbook',
    '拆解利率政策、通胀预期、地缘政治与风险情绪如何塑造汇率波动，建立系统化的宏观交易框架。',
    'Break down how rate policy, inflation expectations, geopolitics, and risk sentiment shape FX moves to build a systematic macro trading framework.',
    '利率政策, 通胀数据, 地缘政治, 避险资产, 宏观交易框架',
    'rate policy, inflation data, geopolitics, safe havens, macro framework',
    lang,
    {
      url: '/education/industry/macro',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const rateSignals = [
  {
    zh: '央行前瞻指引（Forward Guidance）与点阵图会影响市场对利差的预期，从而引发货币趋势。',
    en: 'Forward guidance and dot plots shift expectations for rate differentials, sparking currency trends.',
  },
  {
    zh: '掉期点数、国债收益率曲线斜率可帮助判断资金成本是否利于套息或反向交易。',
    en: 'Swap points and yield-curve slopes reveal funding costs, guiding carry or anti-carry setups.',
  },
  {
    zh: '央行资产负债表扩张（QE）通常压低长期利率、推高风险资产，紧缩则相反。',
    en: 'Balance-sheet expansion (QE) suppresses long rates and boosts risk assets, while tightening does the opposite.',
  },
];

const inflationSignals = [
  {
    zh: '核心 CPI、PCE 与工资增速决定通胀黏性，直接影响央行加息节奏。',
    en: 'Core CPI/PCE and wage growth gauge inflation persistence and dictate the pace of tightening.',
  },
  {
    zh: '通胀预期可通过 BEI（盈亏平衡通胀率）或通胀互换读取，出现脱钩时常伴随剧烈行情。',
    en: 'Expectations from breakeven inflation or inflation swaps often foreshadow volatility when they decouple from realized data.',
  },
  {
    zh: '供给冲击（能源、粮食）会造成短期通胀跳涨，影响商品货币与进出口型经济体。',
    en: 'Supply shocks in energy/food trigger short-term inflation spikes, moving commodity currencies and trade-dependent economies.',
  },
];

const sentimentSignals = [
  {
    zh: 'VIX、MOVE、FX波动率指数可量化风险情绪，一旦飙升，避险资产（美元、日元、瑞郎、黄金）获益。',
    en: 'VIX, MOVE, and FX vol indices quantify risk sentiment; spikes send flows into USD, JPY, CHF, and gold.',
  },
  {
    zh: '地缘政治事件（战争、制裁、政权更迭）往往先影响能源与军工，再通过贸易/资本渠道传导到汇率。',
    en: 'Geopolitical shocks (wars, sanctions, regime changes) hit energy and defense first, then spill into FX via trade and capital.',
  },
  {
    zh: '社交媒体、期权偏度与资金流向报告可以捕捉“避险/冒险”情绪的拐点。',
    en: 'Social media tone, option skews, and fund-flow reports flag turning points in risk-on/off positioning.',
  },
];

export default async function IndustryMacroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-black via-[#09163a] to-black text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-[-4rem] right-[-1rem] w-[24rem] h-[24rem] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-3rem] left-[-2rem] w-[28rem] h-[28rem] bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6">
          <span className="inline-flex items-center px-4 py-1 text-xs tracking-[0.2em] border border-white/30 uppercase">
            {isZh ? '宏观驱动因素' : 'Macro Drivers'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {isZh ? '搭建你的宏观交易雷达' : 'Build Your Macro Trading Radar'}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {isZh
              ? '利率政策、通胀预期、地缘政治与风险情绪共同塑造汇率波动。理解这些变量背后的逻辑，能帮助你掌握趋势背景与关键拐点。'
              : 'Rate policy, inflation expectations, geopolitics, and sentiment collectively shape FX swings. Understand their logic to anchor trends and spot inflection points.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '央行政策 vs. 利差' : 'Policy vs. Differentials'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '通胀与数据节奏' : 'Inflation/Data Rhythm'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '情绪与避险资产' : 'Sentiment & Safe Havens'}</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#0a1b49] text-white px-6 py-5">
            <p className="text-2xl font-black">
              {isZh ? '利率政策与利差结构' : 'Rate Policy & Differentials'}
            </p>
            <p className="text-sm text-white/70 mt-2">
              {isZh ? '央行决策是汇率最直接的驱动力' : 'Central bank decisions are FX’s most direct driver'}
            </p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              {isZh
                ? '观察政策利率与掉期曲线的变化，可判断资金成本与套息交易的吸引力。当两个经济体之间的利差扩大，资本倾向于流向收益更高的一方，推动其货币升值；反之亦然。'
                : 'Track policy rates and swap curves to gauge funding costs and carry appeal. When spreads widen in favor of one economy, capital seeks the higher yield, lifting that currency—and vice versa.'}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {rateSignals.map((item, idx) => (
                <li key={idx}>{isZh ? item.zh : item.en}</li>
              ))}
            </ul>
            <div className="grid md:grid-cols-3 gap-4 text-sm mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '关注指标' : 'Key Indicators'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">FOMC/ECB 声明、点阵图、国债收益率、OIS</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '策略启发' : 'Strategy Insights'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{isZh ? '套息/反套息、期限套利' : 'Carry/anti-carry, curve trades'}</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '风险提示' : 'Watch-outs'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{isZh ? '突然转向、口头干预' : 'Policy pivots, verbal intervention'}</p>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#051128] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '经济数据与通胀预期' : 'Economic Data & Inflation Expectations'}</p>
            <p className="text-sm text-white/70 mt-2">
              {isZh ? '数据节奏决定政策节奏' : 'Data cadence sets policy cadence'}
            </p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              {isZh
                ? '经济数据不仅决定当前增长强弱，更通过“预期差”触发行情。通胀指标若长期高企，央行被迫收紧，风险资产承压；若数据突然走软，市场会押注宽松，推动货币与资产价格反弹。'
                : 'Economic data drives both growth assessment and expectation gaps. Persistent inflation forces tighter policy, weighing on risk assets; a sudden data miss prompts easing bets that lift currencies and risk.'}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {inflationSignals.map((item, idx) => (
                <li key={idx}>{isZh ? item.zh : item.en}</li>
              ))}
            </ul>
            <div className="grid md:grid-cols-3 gap-4 text-sm mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '常见数据' : 'Key Data Prints'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">CPI、PCE、PMI、非农、零售销售</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '工具' : 'Tools'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">经济日历、BEI、通胀互换、Nowcast 模型</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '交易提示' : 'Trading Tips'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '数据前减仓或对冲，利用期权捕捉意外波动' : 'Scale risk before releases, use options to capture surprises'}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#11204f] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '市场情绪与避险资产' : 'Market Sentiment & Safe Havens'}</p>
            <p className="text-sm text-white/70 mt-2">
              {isZh ? '风险偏好切换决定波动放大与收敛' : 'Risk appetite shifts dictate volatility expansion/contraction'}
            </p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              {isZh
                ? '当全球风险偏好下降，资金会撤离高收益资产，转入美元、日元、瑞郎与黄金/美债等避险资产；反之，资金回流股票、大宗商品与高收益货币。地缘政治冲突与信用事件往往是情绪突变的催化剂。'
                : 'When risk appetite wanes, capital flees high-yield assets for USD, JPY, CHF, gold, and Treasuries; when it improves, flows reverse into equities, commodities, and high-beta FX. Geopolitics and credit shocks often catalyze the swing.'}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {sentimentSignals.map((item, idx) => (
                <li key={idx}>{isZh ? item.zh : item.en}</li>
              ))}
            </ul>
            <div className="grid md:grid-cols-3 gap-4 text-sm mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '监控工具' : 'Monitoring Tools'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">VIX、MOVE、FX Vol、COT、资金流</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '避险资产' : 'Safe Havens'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">USD、JPY、CHF、黄金、美债</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '实战要点' : 'Practical Notes'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '结合期权偏度与新闻情绪，留意“极端拥挤”时的反向机会' : 'Pair option skew with news tone to fade extremes when positioning is crowded'}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black">
            {isZh ? '回到行业介绍，或继续学习其他板块' : 'Return or Keep Learning'}
          </h2>
          <p className="text-lg text-white/70 dark:text-black/70 leading-relaxed">
            {isZh
              ? '将宏观框架与行业全景、历史事件结合，才能构建多维度的交易决策体系。'
              : 'Combine this macro framework with market landscape and history to build a multi-dimensional playbook.'}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <LocaleLink
              href="/education/industry"
              className="px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isZh ? '返回行业介绍' : 'Back to Industry Overview'}
            </LocaleLink>
            <LocaleLink
              href="/education/industry/history"
              className="px-6 py-3 border-2 border-white text-black bg-white font-semibold hover:bg-transparent hover:text-white transition-all dark:border-black dark:bg-black dark:text-white dark:hover:bg-transparent dark:hover:text-black"
            >
              {isZh ? '了解历史事件' : 'Explore Key Events'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

