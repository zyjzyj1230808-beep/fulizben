import LocaleLink from '@/components/navigation/LocaleLink';
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '浮力教育｜职业之路与资金计划',
    'Fuli Education | Trading Career Path & Funding Program',
    '了解从学员到职业交易员的成长路径、资金支持与考核机制，掌握与浮力资本合作的完整流程。',
    'Learn the path from student to professional trader, including funding support, evaluation, and collaboration with Fuli Capital.',
    '职业交易员发展, 交易资金计划, 资金管理, 浮力资本合作, 交易生涯规划',
    'trading career development, funding program, capital allocation, collaboration with Fuli Capital, trading career planning',
    lang,
    {
      url: '/education/career',
      type: 'article',
      section: 'Education - Career',
      author: 'Buoyancy Capital Education Team',
    }
  );
}

const milestoneSteps = [
  {
    zh: { title: '阶段 1：学习与认证', description: '完成入门学习与心理测评，理解风险意识与交易规范。' },
    en: { title: 'Phase 1: Learning & Certification', description: 'Complete beginner learning and psychology assessment to build risk awareness and trading discipline.' },
  },
  {
    zh: { title: '阶段 2：模拟考核', description: '进入30天训练营，通过模拟账户考核交易日志与执行力。' },
    en: { title: 'Phase 2: Simulation Assessment', description: 'Join the 30-day bootcamp, passing simulated account evaluations focused on journaling and execution.' },
  },
  {
    zh: { title: '阶段 3：资金账户', description: '通过考核后获得真实资金账户，按绩效逐步提升交易规模。' },
    en: { title: 'Phase 3: Funded Account', description: 'Secure a funded account after passing evaluations and scale trading size with consistent performance.' },
  },
  {
    zh: { title: '阶段 4：专业合作', description: '成为浮力资本合作交易员，参与组合管理与策略共建。' },
    en: { title: 'Phase 4: Professional Collaboration', description: 'Work with Fuli Capital as a funded trader, engaging in portfolio management and strategy building.' },
  },
];

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {isZh ? '职业之路' : 'Career Path'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {isZh ? '成为浮力资本职业交易员' : 'Become a Fuli Capital Professional Trader'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            {isZh
              ? '我们提供训练营、资金支持与团队协作平台，帮助优秀交易者实现长期稳定收益。'
              : 'We provide bootcamps, funding, and team collaboration to help skilled traders achieve sustainable performance.'}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">90%</span> {isZh ? '最高分润比例' : 'Max Profit Split'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">30</span> {isZh ? '天训练营' : 'Day Bootcamp'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">$200k</span> {isZh ? '资金账户上限' : 'Funding Cap'}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '成长路线概览' : 'Growth Roadmap Overview'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {isZh
                ? '浮力资本将职业发展划分为四个阶段，配套专属导师与绩效评估体系，确保每一步都可量化、可复盘。'
                : 'Fuli Capital structures career development into four phases with dedicated mentors and measurable evaluations to ensure every step is trackable.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>• {isZh ? '学习认证：巩固基础与心理素质' : 'Learning & certification to solidify fundamentals and psychology'}</li>
              <li>• {isZh ? '模拟考核：验证策略与执行力' : 'Simulation assessments to validate strategies and execution'}</li>
              <li>• {isZh ? '资金合作：逐步扩张交易规模' : 'Funding partnership to scale trading capital'}</li>
              <li>• {isZh ? '团队共建：参与策略研究与管理' : 'Team collaboration in research and portfolio management'}</li>
            </ul>
          </div>

          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '资金支持与风控机制' : 'Funding & Risk Controls'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {isZh
                ? '通过渐进式资金计划与严格风险阈值，确保交易员在扩大规模的同时保持回撤控制。'
                : 'Gradual funding increments paired with strict drawdown limits help traders scale while keeping risk under control.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>• {isZh ? '多档资金账户，从 $25k 至 $200k' : 'Funding tiers from $25k up to $200k'}</li>
              <li>• {isZh ? '最大回撤控制与日内亏损限制' : 'Maximum drawdown and daily loss limits'}</li>
              <li>• {isZh ? '定期绩效复盘与策略优化会议' : 'Regular performance reviews and strategy optimization sessions'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-black dark:text-white">
            {isZh ? '晋升里程碑' : 'Milestone Progression'}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '每个阶段都对应明确的评估指标与支持资源，帮助你在真实市场中稳定前进。'
              : 'Each phase has clear evaluation metrics and support resources to help you progress steadily in live markets.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {milestoneSteps.map((step, index) => (
            <div key={index} className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6 shadow-md">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{index + 1}</span>
              <h3 className="text-xl font-black text-black dark:text-white mt-2 mb-3">
                {isZh ? step.zh.title : step.en.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {isZh ? step.zh.description : step.en.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black dark:bg-white text-white dark:text-black py-16 border-t-2 border-b-2 border-black dark:border-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">
            {isZh ? '开启你的职业交易旅程' : 'Start Your Professional Trading Journey'}
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
            {isZh
              ? '准备好接受挑战了吗？完成教育中心课程后，报名训练营并通过考核，即可与我们共同管理真实资金。'
              : 'Ready for the challenge? Complete the education modules, join the bootcamp, pass evaluations, and manage real capital with us.'}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LocaleLink
              href="/splan/join-us"
              className="px-8 py-3 bg-white dark:bg-black text-black dark:text-white font-bold border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all"
            >
              {isZh ? '报名训练营' : 'Apply for Bootcamp'}
            </LocaleLink>
            <LocaleLink
              href="/splan/psychology-test"
              className="px-8 py-3 bg-transparent text-white dark:text-black font-bold border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
            >
              {isZh ? '进行心理测评' : 'Take Psychology Assessment'}
            </LocaleLink>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '推荐下一步' : 'Recommended Next Steps'}
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>
                •{' '}
                <LocaleLink href="/education/industry" className="underline hover:text-black dark:hover:text-white transition-colors">
                  {isZh ? '回顾行业介绍' : 'Review Industry Overview'}
                </LocaleLink>
              </li>
              <li>
                •{' '}
                <LocaleLink href="/education/beginner" className="underline hover:text-black dark:hover:text-white transition-colors">
                  {isZh ? '完善入门学习' : 'Complete Beginner Modules'}
                </LocaleLink>
              </li>
              <li>
                •{' '}
                <LocaleLink href="/splan/donate" className="underline hover:text-black dark:hover:text-white transition-colors">
                  {isZh ? '支持浮力教育项目' : 'Support Fuli Education'}
                </LocaleLink>
              </li>
            </ul>
          </div>

          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <p className="font-bold text-black dark:text-white">
                  {isZh ? '通过考核后多久可以获得资金？' : 'How soon will I get funding after passing evaluations?'}
                </p>
                <p>
                  {isZh
                    ? '通常在 7 个工作日内完成资料确认与账户开通。'
                    : 'Typically within 7 business days after document verification and account setup.'}
                </p>
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">
                  {isZh ? '资金账户是否需要承担亏损？' : 'Am I liable for losses in the funded account?'}
                </p>
                <p>
                  {isZh
                    ? '通过严格的风险控制，个人无需承担额外亏损，但需遵守止损规则。'
                    : 'With strict risk controls, traders are not personally liable for additional losses but must follow stop-loss rules.'}
                </p>
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">
                  {isZh ? '是否可以远程合作？' : 'Can I work remotely?'}
                </p>
                <p>
                  {isZh
                    ? '可以，浮力资本提供线上协作系统与定期策略会议。'
                    : 'Yes. Fuli Capital offers remote collaboration tools and regular strategy sessions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

