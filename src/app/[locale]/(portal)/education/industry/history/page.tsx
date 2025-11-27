import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜历史与关键事件全景',
    'Fuli Education | History & Key Events',
    '梳理从布雷顿森林体系解体、黑色星期三到全球金融危机的演变，理解宏观事件如何塑造资产配置与交易机会。',
    'Trace the evolution from Bretton Woods through Black Wednesday and the global financial crisis to understand how macro shocks shape asset allocation and trading opportunities.',
    '布雷顿森林体系, 黑色星期三, 亚洲金融危机, 全球金融危机, 外汇历史',
    'Bretton Woods, Black Wednesday, Asian Financial Crisis, Global Financial Crisis, FX history',
    lang,
    {
      url: '/education/industry/history',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

interface TimelineItem {
  year: string;
  zh: {
    title: string;
    summary: string;
    impact: string[];
  };
  en: {
    title: string;
    summary: string;
    impact: string[];
  };
}

const timeline: TimelineItem[] = [
  {
    year: '1971',
    zh: {
      title: '美元与黄金脱钩，布雷顿森林体系终结',
      summary:
        '美国宣布暂停美元兑黄金，与会国家被迫接受自由浮动或管理浮动汇率，利率与资本流动管制逐步放开，现代外汇市场由此诞生。',
      impact: [
        '各国央行需要通过利率与干预来稳定本币，央行政策成为汇率波动的核心驱动力。',
        '金融机构开始积极交易外汇衍生品以管理风险，离岸美元市场快速壮大。',
        '美元指数成为衡量全球流动性的基准，避险资产与商品价格对美元强弱更敏感。',
      ],
    },
    en: {
      title: 'Nixon Shock and the end of Bretton Woods',
      summary:
        'The US suspended dollar-to-gold convertibility, forcing peers into free or managed floats. Capital controls and administered rates gradually disappeared, giving birth to the modern FX market.',
      impact: [
        'Central banks relied on policy rates and interventions to stabilize currencies, putting monetary policy at the center of FX moves.',
        'Financial institutions ramped up derivatives trading to manage exposures, expanding the offshore dollar market.',
        'The US Dollar Index emerged as the benchmark for global liquidity, while commodities and safe havens became more sensitive to USD swings.',
      ],
    },
  },
  {
    year: '1992',
    zh: {
      title: '英镑黑色星期三：投机力量挑战固定汇率',
      summary:
        '英国在加入欧洲汇率机制（ERM）后，英镑需维持与德国马克的固定区间。经济疲弱与高利率矛盾使英镑遭受索罗斯等宏观基金集中做空，英政府被迫退出 ERM。',
      impact: [
        '显示“固定汇率+独立货币政策”的不可持续，欧洲转向准备货币联盟与统一货币。',
        '宏观对冲基金借助杠杆与衍生品，证明投机资本可以撼动主权政策，催生更多趋势跟随策略。',
        '英镑大幅贬值后，英国出口与经济迅速复苏，为浮动汇率带来正面案例。',
      ],
    },
    en: {
      title: 'Black Wednesday: Speculators vs. ERM',
      summary:
        'Post-ERM entry, the pound had to stay within a tight band to the deutsche mark. A weak economy, high rates, and speculative pressure from funds like Soros’s Quantum forced the UK to abandon the peg.',
      impact: [
        'Highlighted the incompatibility of fixed FX and independent monetary policy, accelerating Europe’s path toward monetary union.',
        'Demonstrated that leveraged macro funds using derivatives could overwhelm sovereign defenses, boosting trend-following strategies.',
        'After devaluation the UK rebounded quickly, offering a success story for floating regimes.',
      ],
    },
  },
  {
    year: '1997',
    zh: {
      title: '亚洲金融危机：资本流动引爆连锁贬值',
      summary:
        '泰铢遭遇做空后，被迫放弃盯住美元，紧接着印尼、韩国等经济体因高外债与短债结构失衡爆发危机，资本大量撤离新兴市场。',
      impact: [
        '凸显短期外债与外汇储备比例的重要性，促使亚洲各国积累巨额储备以自保。',
        '国际组织与各国央行加强危机协同应对机制，IMF、世行援助附带结构改革条件。',
        '新兴市场货币被迫实行更灵活的汇率制度，外汇对冲需求大幅增长。',
      ],
    },
    en: {
      title: 'Asian Financial Crisis: Contagion across EM FX',
      summary:
        'Speculative attacks forced Thailand to abandon its USD peg, triggering cascading devaluations in Indonesia, Korea, and others where short-term USD debt dwarfed reserves.',
      impact: [
        'Showcased the risks of mismatched external debt, prompting Asian economies to hoard reserves as self-insurance.',
        'Sparked coordinated responses by the IMF and global central banks, with aid tied to structural reforms.',
        'Pushed many EM currencies toward flexible regimes and accelerated demand for FX hedging tools.',
      ],
    },
  },
  {
    year: '2008',
    zh: {
      title: '全球金融危机：避险资本席卷市场',
      summary:
        '美国次贷泡沫破裂后，银行间信任瓦解，美元融资骤紧，VIX 飙升。投资者涌向美元、日元与美债，风险资产大幅抛售，全球进入“去杠杆”循环。',
      impact: [
        '美元与高评级主权资产成为“终极避险”，也让美元流动性成为各类资产的生命线。',
        'G20 协调推出量化宽松与财政刺激，开启超宽松时代，推动资产价格与通胀预期再平衡。',
        '交易员更加关注系统性风险指标（TED Spread、LIBOR-OIS、VIX），风险管理成为投研核心。',
      ],
    },
    en: {
      title: 'Global Financial Crisis: Flight-to-Quality Supercycle',
      summary:
        'The US housing bust shattered interbank trust. USD funding evaporated, VIX spiked, and investors rushed into dollars, yen, and Treasuries while dumping risky assets, igniting a global deleveraging loop.',
      impact: [
        'Solidified USD and top sovereign bonds as ultimate safe havens, making dollar liquidity the lifeblood for all assets.',
        'G20 coordination ushered in QE and fiscal stimulus, starting an ultra-easy era that reshaped asset prices and inflation expectations.',
        'Risk indicators like the TED spread, LIBOR-OIS, and VIX became central to trading desks, embedding risk management into every strategy.',
      ],
    },
  },
];

export default async function IndustryHistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#0b0f23] via-[#11204f] to-black text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-5rem] right-[-2rem] w-[30rem] h-[30rem] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-4rem] left-[-2rem] w-[26rem] h-[26rem] bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6">
          <span className="inline-flex items-center px-4 py-1 text-xs tracking-[0.2em] border border-white/40 uppercase">
            {isZh ? '历史与关键事件' : 'History & Key Events'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {isZh ? '宏观事件如何改变资产配置？' : 'How Macro Shocks Reshape Allocation'}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {isZh
              ? '纵览外汇与宏观市场的重大节点，理解政策、投机与资本流动之间的互动，才能在下一次危机来临前做好准备。'
              : 'Review the pivotal FX and macro milestones to grasp how policy, speculation, and capital flows interact—so you are prepared before the next crisis hits.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '1971-2008 关键事件' : 'Events from 1971-2008'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '汇率制度演进' : 'FX Regime Evolution'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '危机与机会并存' : 'Crises & Opportunities'}</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        {timeline.map((item) => (
          <article
            key={item.year}
            className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-900"
          >
            <div className="bg-[#0a1b49] text-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] opacity-70">{item.year}</p>
                <p className="text-2xl font-black">{isZh ? item.zh.title : item.en.title}</p>
              </div>
              <div className="text-sm text-white/80">
                {isZh ? '宏观制度拐点' : 'Macro Regime Shift'}
              </div>
            </div>
            <div className="px-6 py-8 space-y-6 text-gray-800 dark:text-gray-100 leading-relaxed">
              <p>{isZh ? item.zh.summary : item.en.summary}</p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60 text-sm space-y-3">
                <p className="font-semibold text-base">
                  {isZh ? '对交易员/资产配置的影响' : 'Implications for Traders & Allocators'}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {(isZh ? item.zh.impact : item.en.impact).map((impact, idx) => (
                    <li key={idx}>{impact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black">
            {isZh ? '回到行业介绍或继续探索' : 'Return or Keep Exploring'}
          </h2>
          <p className="text-lg text-white/70 dark:text-black/70 leading-relaxed">
            {isZh
              ? '历史不会简单重复，但会留下轨迹。结合行业全景与宏观事件，你能建立更稳固的交易框架。'
              : 'History doesn’t repeat, but it leaves rhymes. Combine market landscape and macro history to build a resilient trading framework.'}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <LocaleLink
              href="/education/industry"
              className="px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isZh ? '返回行业介绍' : 'Back to Industry Overview'}
            </LocaleLink>
            <LocaleLink
              href="/education/industry/landscape"
              className="px-6 py-3 border-2 border-white text-black bg-white font-semibold hover:bg-transparent hover:text-white transition-all dark:border-black dark:bg-black dark:text-white dark:hover:bg-transparent dark:hover:text-black"
            >
              {isZh ? '查看行业全景' : 'View Market Landscape'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

