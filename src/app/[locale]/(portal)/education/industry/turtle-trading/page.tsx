import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜海龟交易法则与系统化执行',
    'Fuli Education | Turtle Trading & System Discipline',
    '回顾理查德·丹尼斯培训“海龟”交易员的故事，学习如何搭建系统化策略、设定仓位与止损，并用纪律执行。',
    'Revisit Richard Dennis’s Turtle experiment to learn how to build systematic strategies, size positions, set stops, and execute with discipline.',
    '海龟交易法则, 系统化交易, 资金管理, 趋势跟随, 纪律执行',
    'turtle trading, systematic trading, position sizing, trend following, discipline',
    lang,
    {
      url: '/education/industry/turtle-trading',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const turtlePrinciples = [
  {
    zh: {
      title: '策略可复制',
      detail:
        '任何方法只要能够被清晰定义，就可以通过规则教授给新人。海龟计划证明“天赋并非必要，系统才是核心”。',
    },
    en: {
      title: 'Repeatable Strategy',
      detail:
        'If a method can be defined clearly, it can be taught. The Turtle experiment proved talent isn’t the core—systems are.',
    },
  },
  {
    zh: {
      title: '风险恒定化',
      detail:
        '海龟用 N 值（20 日 ATR）计算波动，基于合约波动度来确定仓位，做到“每笔交易承担同等风险”。',
    },
    en: {
      title: 'Constant Risk Units',
      detail: '“N”(20-day ATR) tuned position size so every trade risked the same dollar amount despite volatility differences.',
    },
  },
  {
    zh: {
      title: '趋势跟随 + 分批入场',
      detail:
        '突破系统分批建立仓位，顺势加码。亏损迅速止损，获利让利润奔跑，是海龟哲学的精髓。',
    },
    en: {
      title: 'Trend Following with Pyramiding',
      detail: 'Breakout entries build positions in tranches—cut losses fast, let winners run via pyramiding.',
    },
  },
];

const executionChecklist = [
  {
    zh: '记录策略条件：入场、加码、止损、退场触发点全部写成清单，避免临盘改动。',
    en: 'Document entry, add-on, stop, and exit triggers; do not improvise mid-trade.',
  },
  {
    zh: '使用头寸表（Position Sheet）每日回顾：包含合约、N 值、仓位规模、风险单位、浮动盈亏。',
    en: 'Maintain a position sheet with instruments, N values, size, risk units, and P/L for daily review.',
  },
  {
    zh: '设定“违纪惩罚”：一旦违反规则，强制减仓或暂停交易，用制度约束情绪。',
    en: 'Create “penalties” for rule violations—scale down or pause trading to keep emotions in check.',
  },
  {
    zh: '定期回测与前瞻验证：保证策略在不同市场环境下仍可执行，再根据波动调整参数。',
    en: 'Backtest and forward-test regularly to ensure robustness, then retune parameters for volatility shifts.',
  },
];

const ruleTable = [
  {
    label: { zh: '入场', en: 'Entries' },
    zh: '系统 1：20 日突破；系统 2：55 日突破。若上一次信号亏损，允许跳过下一次系统 1 信号。',
    en: 'System 1: 20-day breakout; System 2: 55-day breakout. Skip the next System-1 signal only if the prior one lost.',
  },
  {
    label: { zh: '加码', en: 'Pyramiding' },
    zh: '按 N 值间隔分 4 段加码，每次加仓不超过初始仓位，确保风险单位递增受控。',
    en: 'Add up to four units spaced one N apart; each add-on cannot exceed the initial unit so risk scales smoothly.',
  },
  {
    label: { zh: '止损', en: 'Stops' },
    zh: '固定止损 = 入场价 - 2N（多头）或 +2N（空头）。一旦 hit 不得犹豫立即执行。',
    en: 'Hard stop = entry minus 2N (long) or plus 2N (short). Execute instantly when touched.',
  },
  {
    label: { zh: '资金管理', en: 'Money Management' },
    zh: '每个市场最多 4 个单位，同一相关市场最多 6 个单位，整体风险单位不超过 12。',
    en: 'Max 4 units per market, 6 across correlated markets, 12 risk units portfolio-wide.',
  },
];

export default async function TurtleTradingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#030814] via-[#0b1740] to-black text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-[-4rem] right-[-1rem] w-[26rem] h-[26rem] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-3rem] left-[-2rem] w-[28rem] h-[28rem] bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6">
          <span className="inline-flex items-center px-4 py-1 text-xs tracking-[0.2em] border border-white/40 uppercase">
            {isZh ? '系统化交易' : 'System Trading'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {isZh ? '海龟交易法则：纪律胜过天赋' : 'Turtle Trading: Discipline Over Talent'}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {isZh
              ? '理查德·丹尼斯用海龟计划证明：只要有清晰规则与严格执行，普通人也能成长为专业交易员。'
              : 'Richard Dennis proved through the Turtle program that clear rules plus strict execution can turn rookies into pros.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '趋势跟随' : 'Trend Following'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '风险单位' : 'Risk Units'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '执行纪律' : 'Execution Discipline'}</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#0a1b49] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '海龟实验的三大原则' : 'Three Principles of the Turtle Experiment'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '系统 > 天赋 > 直觉' : 'Systems > Talent > Gut'}</p>
          </div>
          <div className="px-6 py-8 space-y-6 text-gray-700 dark:text-gray-200 leading-relaxed">
            {turtlePrinciples.map((item, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60">
                <p className="text-lg font-bold">{isZh ? item.zh.title : item.en.title}</p>
                <p className="text-sm mt-2">{isZh ? item.zh.detail : item.en.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#051128] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '核心规则速览' : 'Core Rulebook Overview'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '入场、加码、止损、资金管理' : 'Entries, pyramids, stops, sizing'}</p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              {isZh
                ? '海龟体系以简洁著称：所有规则都可以写在几页纸上。以下表格总结了最关键的执行细节，可作为你建立系统交易手册的参考。'
                : 'The Turtle system was deliberately simple—its rules fit on a few pages. Use the table below as a template for your own systematic playbook.'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {ruleTable.map((rule, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60 text-sm">
                  <p className="font-semibold text-base">{isZh ? rule.label.zh : rule.label.en}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{isZh ? rule.zh : rule.en}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#11204f] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '执行与复盘检查表' : 'Execution & Review Checklist'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '纪律是交易系统的保险杠' : 'Discipline is the shock absorber'}</p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <ul className="list-disc pl-5 space-y-3">
              {executionChecklist.map((item, idx) => (
                <li key={idx}>{isZh ? item.zh : item.en}</li>
              ))}
            </ul>
            <div className="mt-6 border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60 text-sm">
              <p className="font-semibold">{isZh ? '海龟警句' : 'Turtle Maxims'}</p>
              <p className="mt-2">
                {isZh
                  ? '“我们无法控制行情，但可以控制风险；遵守规则就是最大的优势。”——理查德·丹尼斯'
                  : '“We can’t control markets, only risk; following the rules is the edge.” — Richard Dennis'}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black">
            {isZh ? '继续探索宏观与行业内容' : 'Keep Exploring Macro & Industry Topics'}
          </h2>
          <p className="text-lg text-white/70 dark:text-black/70 leading-relaxed">
            {isZh
              ? '将海龟法则与宏观驱动、行业全景结合，打造属于你的系统化交易体系。'
              : 'Combine Turtle principles with macro drivers and industry landscape to build your own systematic process.'}
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

