import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜宏观对冲基金与风险对冲策略',
    'Fuli Education | Macro Hedge Funds & Risk Hedging',
    '拆解乔治·索罗斯量子基金的宏观交易框架，理解顶级对冲基金如何运用多资产策略管理风险、放大收益。',
    'Break down George Soros’s Quantum Fund framework to see how elite macro funds deploy multi-asset strategies for risk management and alpha.',
    '宏观对冲基金, 量子基金, 风险对冲, 宏观交易, 套利策略',
    'macro hedge fund, Quantum Fund, risk hedging, macro trading, arbitrage',
    lang,
    {
      url: '/education/industry/quantum-hedge',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const fundPillars = [
  {
    zh: {
      title: '自上而下的宏观洞察',
      detail:
        '从利率、通胀、政治格局到资本流动，先构建宏观叙事，再寻找最能表达观点的资产组合。量子基金会同时观察货币、债券、股指及商品，以确认跨市场共振。',
    },
    en: {
      title: 'Top-Down Macro Insight',
      detail:
        'Start with the macro story—rates, inflation, politics, capital flows—then pick the asset mix that captures it best. The Quantum Fund tracked FX, bonds, equities, and commodities to confirm cross-asset resonance.',
    },
  },
  {
    zh: {
      title: '多资产对冲与杠杆',
      detail:
        '以核心仓位表达主要观点，同时用期权、互换、相对价值对冲系统性风险。例如做空英镑同时买入德债或美债，以防止突发政策造成全面回撤。',
    },
    en: {
      title: 'Multi-Asset Hedging & Leverage',
      detail:
        'Express the primary view with core positions, then hedge systemic risk using options, swaps, or RV structures. Shorting GBP while owning bunds or Treasuries cushioned policy surprises.',
    },
  },
  {
    zh: {
      title: '动态仓位管理',
      detail:
        '量子基金以“反身性”理论著称：价格变化会反过来影响基本面。因此仓位需根据新信息快速调整，利润出场后保留一部分“试探仓”以跟踪趋势。',
    },
    en: {
      title: 'Dynamic Position Management',
      detail:
        'Reflexivity means price action can reshape fundamentals, so positions must adjust quickly to new data. Profits are partially taken while leaving test positions to ride or fade trends.',
    },
  },
];

const hedgingBlocks = [
  {
    label: { zh: '货币 & 利率', en: 'FX & Rates' },
    zh: '利用即期/远期、掉期与期权构建主仓，常与利差交易或收益率曲线策略配合，对冲政策突变。',
    en: 'Build core bets via spot/forward, swaps, and options; pair with carry or curve trades to hedge policy shocks.',
  },
  {
    label: { zh: '商品 & 黄金', en: 'Commodities & Gold' },
    zh: '在通胀或地缘政治主导时，透过黄金、石油与工业金属期货表达风险，对冲货币贬值与供应冲击。',
    en: 'When inflation or geopolitics dominate, use gold, oil, and base metals futures to hedge currency debasement and supply shocks.',
  },
  {
    label: { zh: '股指 & 信用', en: 'Equity & Credit' },
    zh: '通过股指期货、可转债或信用违约互换 (CDS) 平衡 Beta 暴露，或利用跨市场价差捕捉套利机会。',
    en: 'Use equity futures, convertibles, or CDS to balance beta exposure or exploit cross-market spreads.',
  },
];

const playbookSteps = [
  {
    zh: '明确宏观假设：利差、流动性、政策、结构性矛盾等，写成可以验证的前提。',
    en: 'Define the macro hypothesis—rate spreads, liquidity, policy, structural imbalances—and phrase it as testable assumptions.',
  },
  {
    zh: '选择最灵敏的资产组合表达观点，并设置对冲腿以抵御系统性风险。',
    en: 'Pick the asset mix that reacts fastest to the thesis and add hedging legs to neutralize systemic shocks.',
  },
  {
    zh: '保持风险预算动态调整，监控反身性反馈：市场走势是否验证或削弱假设？',
    en: 'Adjust risk budgets dynamically and watch reflexive feedback: does price action validate or weaken your hypothesis?',
  },
  {
    zh: '定期复盘，更新宏观情景与仓位，避免把旧逻辑套在新周期上。',
    en: 'Review regularly, refresh scenarios and positions, and avoid forcing old logic onto a new cycle.',
  },
];

export default async function QuantumHedgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#050b1f] via-[#101c44] to-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-3rem] right-[-2rem] w-[28rem] h-[28rem] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-4rem] left-[-1rem] w-[24rem] h-[24rem] bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6">
          <span className="inline-flex items-center px-4 py-1 text-xs tracking-[0.2em] border border-white/40 uppercase">
            {isZh ? '宏观对冲' : 'Macro Hedge'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {isZh ? '量子基金如何构建宏观对冲策略？' : 'How Did the Quantum Fund Build Macro Hedges?'}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {isZh
              ? '乔治·索罗斯通过量子基金展现了宏观对冲基金的核心逻辑：顶层宏观叙事 + 多资产对冲 + 动态风险控制。'
              : 'George Soros’s Quantum Fund showcased the macro hedge fund playbook: top-down narrative + multi-asset hedges + dynamic risk control.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '宏观假设' : 'Macro Hypotheses'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '多资产对冲' : 'Multi-Asset Hedges'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '反身性管理' : 'Reflexive Management'}</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#0a1b49] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '三大支柱' : 'Three Core Pillars'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '量子基金的思考框架' : 'Quantum Fund’s thinking framework'}</p>
          </div>
          <div className="px-6 py-8 space-y-6 text-gray-700 dark:text-gray-200 leading-relaxed">
            {fundPillars.map((pillar, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60">
                <p className="text-lg font-bold">{isZh ? pillar.zh.title : pillar.en.title}</p>
                <p className="text-sm mt-2">{isZh ? pillar.zh.detail : pillar.en.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#051128] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '风险对冲模块' : 'Risk Hedging Modules'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '多资产协同' : 'Coordinated multi-asset coverage'}</p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              {isZh
                ? '宏观基金不靠单一市场取胜，而是通过跨资产组合增强鲁棒性。以下模块展示如何把货币、商品、股指、信用等串联成“进攻 + 防守”的交易体系。'
                : 'Macro funds win by orchestrating multiple assets, not single markets. The modules below illustrate how FX, commodities, equities, and credit form an offense-plus-defense system.'}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {hedgingBlocks.map((block, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60 text-sm">
                  <p className="font-semibold text-base">{isZh ? block.label.zh : block.label.en}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{isZh ? block.zh : block.en}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#11204f] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '宏观对冲操作手册' : 'Macro Hedging Playbook'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '供你落地实践' : 'Practical execution guide'}</p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <ol className="list-decimal pl-6 space-y-3 text-sm">
              {playbookSteps.map((step, idx) => (
                <li key={idx}>{isZh ? step.zh : step.en}</li>
              ))}
            </ol>
            <div className="mt-6 border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60 text-sm">
              <p className="font-semibold">{isZh ? '风险控制提示' : 'Risk Control Notes'}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  {isZh
                    ? '单一观点的实际杠杆不得超过总资金的 2-3 倍，确保出现突发事件时有充足缓冲。'
                    : 'Keep effective leverage per thesis within 2-3x equity to retain buffers against shocks.'}
                </li>
                <li>
                  {isZh
                    ? '使用期权或跨资产对冲腿时，定期更新希腊值，避免“隐性裸奔”。'
                    : 'When using options or cross-asset hedges, refresh Greeks frequently to avoid hidden naked exposure.'}
                </li>
                <li>
                  {isZh ? '记录宏观假设的触发条件，一旦失效迅速减仓。' : 'Document invalidation triggers and cut exposure fast when they fire.'}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black">
            {isZh ? '继续探索浮力教育内容' : 'Keep Exploring Fuli Education'}
          </h2>
          <p className="text-lg text-white/70 dark:text-black/70 leading-relaxed">
            {isZh
              ? '结合行业全景、宏观驱动与传奇交易员案例，打造你的多维交易体系。'
              : 'Blend market landscape, macro drivers, and trader case studies to build a multi-dimensional playbook.'}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <LocaleLink
              href="/education/industry"
              className="px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isZh ? '返回行业介绍' : 'Back to Industry Overview'}
            </LocaleLink>
            <LocaleLink
              href="/education/industry/macro"
              className="px-6 py-3 border-2 border-white text-black bg-white font-semibold hover:bg-transparent hover:text-white transition-all dark:border-black dark:bg-black dark:text-white dark:hover:bg-transparent dark:hover:text-black"
            >
              {isZh ? '查看宏观驱动因素' : 'Explore Macro Drivers'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

