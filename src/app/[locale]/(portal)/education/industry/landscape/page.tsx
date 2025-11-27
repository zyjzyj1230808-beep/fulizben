import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜行业全景深度解析',
    'Fuli Education | Market Landscape Deep Dive',
    '拆解外汇市场日均 6 万亿美元成交量的来源，理解银行间、机构与零售参与者之间的流动性传导机制。',
    'Break down the $6T+ daily forex turnover and understand how interbank flows, institutions, and retail traders transmit liquidity.',
    '金融市场结构, 银行间市场, 对冲基金, 零售交易者, 市场流动性',
    'market structure, interbank flows, hedge funds, retail traders, liquidity',
    lang,
    {
      url: '/education/industry/landscape',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const interbankPoints = [
  {
    zh: '全球主要商业银行、投行和央行构成核心交易网络，是 6 万亿美元日均成交量的“源头活水”。',
    en: 'Major commercial banks, investment banks, and central banks form the core network that supplies most of the $6T+ daily turnover.',
  },
  {
    zh: '通过电子经纪平台（EBS、Reuters）撮合大额即期、远期和掉期交易，决定基础报价。',
    en: 'Electronic broking platforms (EBS, Reuters) match large spot, forward, and swap tickets that anchor market quotes.',
  },
  {
    zh: '流动性供给根据时区轮动：伦敦、纽约和东京时段的交接决定全天波动峰值。',
    en: 'Liquidity rotates by timezone, with London, New York, and Tokyo handoffs creating the day’s volatility peaks.',
  },
];

const institutionPoints = [
  {
    zh: '对冲基金与资产管理人利用期权、互换等衍生品对冲或放大宏观观点，放大趋势行情。',
    en: 'Hedge funds and asset managers use options and swaps to hedge or amplify macro views, reinforcing directional trends.',
  },
  {
    zh: '保险、企业财务等“真实需求”会定期调整外汇敞口，带来可预测的流动性窗口。',
    en: 'Real-money flows from insurers and corporate treasuries rebalance FX exposure on predictable schedules, creating liquidity windows.',
  },
  {
    zh: '高频与量化基金通过统计套利与流动性回补，缩短价差并在极端行情时吸收冲击。',
    en: 'Quant and HFT funds compress spreads via statistical arbitrage and often absorb shocks during dislocations.',
  },
];

const retailPoints = [
  {
    zh: '线上经纪商与差价合约平台降低了入场门槛，散户交易者数量与交易频次持续增长。',
    en: 'Online brokers and CFD platforms lower entry barriers, pushing retail participation and trade frequency to new highs.',
  },
  {
    zh: '社群复制交易、自动化策略工具（EA、API）让“跟单”与自建模型并行发展。',
    en: 'Copy-trading communities and automation tools (EAs, APIs) allow mirror strategies to coexist with custom models.',
  },
  {
    zh: '零售流通常集中在高波动时段，会短暂放大价差，但也为专业交易员提供情绪信号。',
    en: 'Retail flows bunch around high-volatility windows, briefly widening spreads yet offering sentiment signals to pros.',
  },
];

const observationPoints = [
  {
    zh: '伦敦定盘价、纽约收盘价等“锚点”决定隔夜仓位的再平衡节奏。',
    en: 'London fixings and New York closes act as anchors that dictate the cadence of overnight rebalancing.',
  },
  {
    zh: '美联储、欧洲央行等央行资产负债表与政策前瞻，左右机构与银行间的期限结构配置。',
    en: 'Central-bank balance sheets and policy guidance steer how institutions and interbank desks position along the curve.',
  },
  {
    zh: '交易平台成交深度、价差与新闻情绪可帮助量化零售流的“拥挤度”。',
    en: 'Venue depth, spread dynamics, and news sentiment help gauge how crowded retail flows are.',
  },
  {
    zh: '衍生品交割日、期权大额未平仓位（max pain）会放大波动并触发连锁对冲。',
    en: 'Derivative expiries and large option open interest (max pain) amplify volatility and trigger hedging cascades.',
  },
];

export default async function IndustryLandscapePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-black via-[#0a1b49] to-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[26rem] h-[26rem] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6">
          <span className="inline-flex items-center px-4 py-1 text-xs tracking-[0.2em] border border-white/30 uppercase">
            {isZh ? '行业全景' : 'Market Landscape'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {isZh ? '谁在驱动 6 万亿美元的日均成交量？' : 'Who Drives the $6 Trillion Daily Turnover?'}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {isZh
              ? '拆解银行间市场、机构资金与零售交易者的角色，理解流动性从核心到终端的传导路径，为你判断行情背景提供依据。'
              : 'Break down the roles of interbank dealers, institutional capital, and retail traders to map how liquidity travels from core venues to end-users.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/10 border border-white/30">
              6T+ {isZh ? '日均成交量 (USD)' : 'Daily Volume (USD)'}
            </div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">
              {isZh ? '3 大时区轮动' : '3 Major Sessions'}
            </div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">
              {isZh ? '主导货币对 90+' : '90+ Major Pairs'}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="bg-[#0a1b49] text-white px-6 py-5">
            <p className="text-2xl font-black">
              {isZh ? '银行间市场：流动性的源头' : 'Interbank Market: Source of Liquidity'}
            </p>
            <p className="text-sm text-white/70 mt-2">
              {isZh ? '报价定锚 · 大额交易 · 时区轮动' : 'Quote Anchors · Block Trades · Time-Zone Rotation'}
            </p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            {interbankPoints.map((item, idx) => (
              <p key={idx}>{isZh ? item.zh : item.en}</p>
            ))}
            <div className="grid md:grid-cols-3 gap-4 text-sm mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '主导货币' : 'Major Currencies'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">USD · EUR · JPY · GBP · CHF</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '核心平台' : 'Core Venues'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">EBS, Reuters, CME FX Futures</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '波动高峰' : 'Volatility Peaks'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '伦敦/纽约交接时段' : 'London / New York Overlap'}
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg md:col-span-3">
                <p className="font-semibold">{isZh ? '观察方法' : 'How to Monitor'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh
                    ? '留意央行议息纪要、美元指数与美债收益率曲线，一旦利差结构扭曲，银行间报价会迅速重新定价。'
                    : 'Track central-bank minutes, the DXY, and Treasury curves—any distortion in rate differentials forces rapid repricing across interbank quotes.'}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="bg-[#051128] text-white px-6 py-5">
            <p className="text-2xl font-black">
              {isZh ? '机构与基金：策略驱动的波动' : 'Institutions & Funds: Strategy-Driven Moves'}
            </p>
            <p className="text-sm text-white/70 mt-2">
              {isZh ? '对冲 · 投机 · 套利' : 'Hedging · Speculation · Arbitrage'}
            </p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            {institutionPoints.map((item, idx) => (
              <p key={idx}>{isZh ? item.zh : item.en}</p>
            ))}
            <div className="grid md:grid-cols-3 gap-4 text-sm mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '常用工具' : 'Primary Instruments'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '期权、互换、NDF、杠杆 ETF、宏观基金篮子' : 'Options, swaps, NDFs, levered ETFs, macro baskets'}
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '典型目标' : 'Typical Goals'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '对冲资产负债 · 放大宏观观点' : 'Hedge balance sheets · Express macro views'}
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '流动性特征' : 'Liquidity Traits'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '推动趋势，制造中期波段' : 'Trend-driving, creates mid-term swings'}
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg md:col-span-3">
                <p className="font-semibold">{isZh ? '跟踪提示' : 'Monitoring Tips'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh
                    ? '关注 CFTC 持仓报告、期权隐含波动率曲线以及大型基金的致投资者信，以判断杠杆方向。'
                    : 'Watch CFTC positioning, option vol surfaces, and big-fund investor letters to infer leverage direction.'}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="bg-[#11204f] text-white px-6 py-5">
            <p className="text-2xl font-black">
              {isZh ? '零售交易者：情绪与创新的前哨' : 'Retail Traders: Sentiment & Innovation'}
            </p>
            <p className="text-sm text-white/70 mt-2">
              {isZh ? '线上经纪 · 复制交易 · 自动化' : 'Online Brokers · Copy Trading · Automation'}
            </p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            {retailPoints.map((item, idx) => (
              <p key={idx}>{isZh ? item.zh : item.en}</p>
            ))}
            <div className="grid md:grid-cols-3 gap-4 text-sm mt-6">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '热门品种' : 'Popular Instruments'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">XAUUSD · NAS100 · BTCUSD · 主流货币对</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '工具生态' : 'Tooling'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  MT4/5, TradingView, API, 社群复制
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <p className="font-semibold">{isZh ? '信号价值' : 'Signal Value'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh ? '放大情绪，提供反向与动量参考' : 'Amplifies sentiment, offers contrarian & momentum cues'}
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg md:col-span-3">
                <p className="font-semibold">{isZh ? '实战建议' : 'Practical Tips'}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isZh
                    ? '留意经纪商流动性报告、跟单平台热门策略的回撤情况，一旦“ crowded trade ”信号出现，需警惕剧烈反转。'
                    : 'Monitor broker liquidity updates and drawdowns of top copy strategies—“crowded trade” flags often precede sharp reversals.'}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 shadow-lg">
          <div className="px-6 py-8 space-y-4 text-gray-800 dark:text-gray-100 leading-relaxed">
            <h2 className="text-2xl font-black">
              {isZh ? '如何观察流动性传导？' : 'How to Monitor Liquidity Transmission'}
            </h2>
            <p>
              {isZh
                ? '下面这些指标帮助你在宏观驱动、机构调仓与零售情绪之间建立映射，提前感知波动的“多米诺骨牌”。'
                : 'Use the checklist below to map macro drivers, institutional rebalancing, and retail sentiment—spotting the domino before volatility erupts.'}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {observationPoints.map((item, idx) => (
                <li key={idx}>{isZh ? item.zh : item.en}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isZh
                ? '将这些指标与自己的交易日志同步记录，可快速定位行情反转时最先出现的异常。'
                : 'Log these indicators alongside your trades to pinpoint which anomaly foreshadowed each reversal.'}
            </p>
          </div>
        </article>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black">
            {isZh ? '回到行业介绍，继续你的学习' : 'Return to Industry Overview'}
          </h2>
          <p className="text-lg text-white/70 dark:text-black/70 leading-relaxed">
            {isZh
              ? '理解参与者结构只是第一步，配合历史事件与宏观驱动，你才能建立面向趋势、事件与情绪的完整框架。'
              : 'Understanding participant structure is step one—combine it with history and macro drivers to build your holistic market playbook.'}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <LocaleLink
              href="/education/industry"
              className="px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isZh ? '返回行业介绍' : 'Back to Industry Overview'}
            </LocaleLink>
            <LocaleLink
              href="/education/beginner"
              className="px-6 py-3 border-2 border-white text-black bg-white font-semibold hover:bg-transparent hover:text-white transition-all dark:border-black dark:bg-black dark:text-white dark:hover:bg-transparent dark:hover:text-black"
            >
              {isZh ? '前往入门学习' : 'Go to Beginner Learning'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

