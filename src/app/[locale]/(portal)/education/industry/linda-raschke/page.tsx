import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜琳达·拉斯基的短线交易法则',
    'Fuli Education | Linda Raschke Short-Term Playbook',
    '解析短线交易女王琳达·拉斯基的价格行为方法与资金管理模型，学习如何在波动中保持纪律与稳定收益。',
    'Learn Linda Raschke’s price action methods and capital management models to trade short-term volatility with discipline.',
    '价格行为, 短线交易, 资金管理, Linda Raschke, 波段交易',
    'price action, short-term trading, capital management, Linda Raschke, swing trading',
    lang,
    {
      url: '/education/industry/linda-raschke',
      type: 'article',
      section: 'Education - Industry',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const priceActionBlocks = [
  {
    zh: {
      title: '结构先行',
      detail:
        '先判断市场所处的结构（趋势、震荡、区间突破），再选择合适的策略。琳达强调“结构决定战术”，不会在无序区间强行寻找趋势信号。',
    },
    en: {
      title: 'Structure First',
      detail:
        'Diagnose the market structure (trend, range, breakout) before picking tactics. “Structure dictates tactics” avoids forcing trend signals inside noise.',
    },
  },
  {
    zh: {
      title: '价格行为确认',
      detail:
        '利用关键价位（前高/低、开盘价、均价线）寻找反转或延续信号。吞没、失败突破、盘整突破是她最常用的触发模式。',
    },
    en: {
      title: 'Price Action Confirmation',
      detail:
        'Use key reference levels (prior highs/lows, open, VWAP) to confirm reversals or continuations. Engulfing bars, failed breaks, and coil breakouts are staple triggers.',
    },
  },
  {
    zh: {
      title: '多时间框架对齐',
      detail:
        '以 60 分钟或日线判断主方向，再在 5-15 分钟图执行。大周期给背景，小周期负责入场细节。',
    },
    en: {
      title: 'Multi-Timeframe Alignment',
      detail: 'Use 60-minute/daily charts for bias and the 5-15 minute chart for execution so macro context guides micro entries.',
    },
  },
];

const moneyManagement = [
  {
    zh: '固定风险/合约：每笔交易承担帐户权益 0.5%-1% 的风险，通过止损距离反推手数。',
    en: 'Fixed risk per trade: expose only 0.5%-1% of equity and derive size from the stop distance.',
  },
  {
    zh: '分批出场：一半仓位在 1R 附近获利，另一半跟随移动止损或追踪均线，让盈利延伸。',
    en: 'Scale out: take half off near 1R, trail the rest with stops or moving averages to let winners extend.',
  },
  {
    zh: '当日亏损上限：连续亏损达到 3 笔或亏损超过当日额度（如 2R），立即停止交易，防止情绪失控。',
    en: 'Daily loss cap: stop trading after three consecutive losses or a 2R drawdown to avoid tilt.',
  },
  {
    zh: '记录资金曲线与心理状态，若状态不佳则减半仓位或暂停，重置胜率基线。',
    en: 'Log equity curve and mindset; cut size or pause when off balance to reset the win-rate baseline.',
  },
];

const setups = [
  {
    label: { zh: 'Holy Grail 回踩', en: 'Holy Grail Pullback' },
    zh: '强势趋势中等待均线（例如 20EMA）回踩并出现反向极端（RSI<40），随后一根确认K线入场，止损设在最低点下方。',
    en: 'In strong trends, wait for a pullback to the 20EMA with RSI < 40, then enter on a confirmation bar; stop goes below the swing low.',
  },
  {
    label: { zh: '失败突破反打', en: 'False Break Reversal' },
    zh: '价突破区间后迅速回到区间内，并伴随成交量缩减或反转K，立即反向进场，目标指向区间另一端。',
    en: 'When price breaks a range but snaps back inside with a reversal candle/volume contraction, fade it and target the opposite side.',
  },
  {
    label: { zh: '爆发前的盘整', en: 'Coil Before Expansion' },
    zh: '在高低点收窄的盘整区设置双向挂单，突破后一旦盈利 1R 就保护成本，避免假突破造成回撤。',
    en: 'Bracket tight coils with stop orders in both directions; once price moves 1R in profit, move stops to breakeven to dodge fake-outs.',
  },
];

export default async function LindaRaschkePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#140a29] via-[#1f1f4f] to-black text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-[-4rem] right-[-2rem] w-[28rem] h-[28rem] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-3rem] left-[-1rem] w-[24rem] h-[24rem] bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6">
          <span className="inline-flex items-center px-4 py-1 text-xs tracking-[0.2em] border border-white/40 uppercase">
            {isZh ? '价格行为 · 资金管理' : 'Price Action · Capital Management'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {isZh ? '琳达·拉斯基的短线交易蓝图' : 'Linda Raschke’s Short-Term Blueprint'}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {isZh
              ? '以精准的价格行为判断与严苛的资金管理著称，琳达证明短线交易也能系统化、可复制且可持续。'
              : 'Known for precise price action and strict money management, Linda proved short-term trading can be systematic, repeatable, and sustainable.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '结构识别' : 'Structure ID'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '情绪复盘' : 'Emotion Review'}</div>
            <div className="px-4 py-2 bg-white/10 border border-white/30">{isZh ? '风险恒定' : 'Constant Risk'}</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#0a1b49] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '价格行为三要素' : 'Price Action Triad'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '结构 · 触发 · 多周期' : 'Structure · Trigger · Multi-timeframe'}</p>
          </div>
          <div className="px-6 py-8 space-y-6 text-gray-700 dark:text-gray-200 leading-relaxed">
            {priceActionBlocks.map((block, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60">
                <p className="text-lg font-bold">{isZh ? block.zh.title : block.en.title}</p>
                <p className="text-sm mt-2">{isZh ? block.zh.detail : block.en.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#051128] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '资金管理准则' : 'Capital Management Rules'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '控制回撤，延长寿命' : 'Control drawdowns, extend career'}</p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <ul className="list-disc pl-5 space-y-3">
              {moneyManagement.map((item, idx) => (
                <li key={idx}>{isZh ? item.zh : item.en}</li>
              ))}
            </ul>
            <div className="mt-6 border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60 text-sm">
              <p className="font-semibold">{isZh ? '执行提醒' : 'Execution Reminder'}</p>
              <p className="mt-2">
                {isZh
                  ? '琳达常说：“好交易来自心理稳定的交易者。”资金管理就是心理稳定的前提。'
                  : 'Linda often says “Good trades come from a calm trader.” Money management keeps the mind calm.'}
              </p>
            </div>
          </div>
        </article>

        <article className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="bg-[#11204f] text-white px-6 py-5">
            <p className="text-2xl font-black">{isZh ? '经典短线 setup' : 'Classic Short-Term Setups'}</p>
            <p className="text-sm text-white/70 mt-2">{isZh ? '可直接用于练习的模板' : 'Templates you can practice today'}</p>
          </div>
          <div className="px-6 py-8 space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {setups.map((setup, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-800/60">
                  <p className="font-semibold text-base">{isZh ? setup.label.zh : setup.label.en}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{isZh ? setup.zh : setup.en}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isZh
                ? '练习提示：选定一个 setup，坚持至少 30 次样本，并记录盈亏曲线与执行感受，才能评估真实胜率。'
                : 'Practice tip: pick one setup, trade at least 30 samples, and log P/L plus execution notes to assess real edge.'}
            </p>
          </div>
        </article>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black">
            {isZh ? '串联短线与宏观框架' : 'Bridge Short-Term and Macro'}
          </h2>
          <p className="text-lg text-white/70 dark:text-black/70 leading-relaxed">
            {isZh
              ? '短线交易依赖结构、节奏与资金管理，同样需要宏观背景与行业理解来筛选品种。'
              : 'Short-term trading needs structure and money rules, but macro and industry context guide instrument selection.'}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <LocaleLink
              href="/education/industry"
              className="px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isZh ? '返回行业介绍' : 'Back to Industry Overview'}
            </LocaleLink>
            <LocaleLink
              href="/education/industry/turtle-trading"
              className="px-6 py-3 border-2 border-white text-black bg-white font-semibold hover:bg-transparent hover:text-white transition-all dark:border-black dark:bg-black dark:text-white dark:hover:bg-transparent dark:hover:text-black"
            >
              {isZh ? '学习海龟法则' : 'Study Turtle Rules'}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}

