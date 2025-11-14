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
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white">
            {isZh ? '成长路径与支持体系' : 'Growth Path & Support System'}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '浮力资本构建了完整的职业发展体系，从学习认证到资金合作，每一步都有明确的评估标准与支持资源。'
              : 'Fuli Capital has built a complete career development system, from learning certification to funding partnership, with clear evaluation standards and support resources at every step.'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '四阶段成长路线' : 'Four-Phase Growth Path'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '从基础学习到专业合作，每个阶段都配备专属导师与绩效评估体系，确保成长路径清晰可追踪。'
                : 'From foundational learning to professional collaboration, each phase includes dedicated mentors and performance evaluation systems to ensure a clear, trackable growth path.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li className="flex items-start">
                <span className="mr-2 font-bold text-black dark:text-white">1.</span>
                <span>{isZh ? '学习认证：巩固基础与心理素质' : 'Learning & certification to solidify fundamentals and psychology'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold text-black dark:text-white">2.</span>
                <span>{isZh ? '模拟考核：验证策略与执行力' : 'Simulation assessments to validate strategies and execution'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold text-black dark:text-white">3.</span>
                <span>{isZh ? '资金合作：逐步扩张交易规模' : 'Funding partnership to scale trading capital'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold text-black dark:text-white">4.</span>
                <span>{isZh ? '团队共建：参与策略研究与管理' : 'Team collaboration in research and portfolio management'}</span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-black mb-4 text-black dark:text-white">
              {isZh ? '资金支持与风控机制' : 'Funding & Risk Controls'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {isZh
                ? '通过渐进式资金计划与严格风险阈值，确保交易员在扩大规模的同时保持回撤控制，实现可持续增长。'
                : 'Gradual funding increments paired with strict drawdown limits help traders scale while keeping risk under control, achieving sustainable growth.'}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isZh ? '多档资金账户，从 $25k 至 $200k' : 'Funding tiers from $25k up to $200k'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isZh ? '最大回撤控制与日内亏损限制' : 'Maximum drawdown and daily loss limits'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isZh ? '定期绩效复盘与策略优化会议' : 'Regular performance reviews and strategy optimization sessions'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white">
            {isZh ? '晋升里程碑' : 'Milestone Progression'}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '每个阶段都对应明确的评估指标与支持资源，帮助你在真实市场中稳定前进，逐步实现职业目标。'
              : 'Each phase has clear evaluation metrics and support resources to help you progress steadily in live markets, gradually achieving your career goals.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {milestoneSteps.map((step, index) => (
            <div key={index} className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? step.zh.title : step.en.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isZh ? step.zh.description : step.en.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-16" id="career-positions">
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black mb-4 text-sm font-semibold tracking-wider uppercase">
              {isZh ? '职业发展路径' : 'Career Development Path'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white">
              {isZh ? '多元化职业体系' : 'Diverse Career System'}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {isZh
                ? '浮力资本构建了从交易执行到团队管理的完整职业发展体系，为不同阶段的交易者提供清晰的成长路径与晋升机会。'
                : 'Fuli Capital has built a complete career development system from trading execution to team management, providing clear growth paths and promotion opportunities for traders at different stages.'}
            </p>
          </div>

          {/* 交易员序列 */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-3">
                {isZh ? '交易员序列' : 'Trader Series'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {isZh
                  ? '从短线到长线，根据交易周期与策略复杂度划分职业等级，逐步提升资金规模与分润比例。'
                  : 'From short-term to long-term trading, career levels are defined by trading timeframe and strategy complexity, gradually increasing capital size and profit share.'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold mb-3">
                    {isZh ? '入门级' : 'Entry Level'}
                  </div>
                  <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? '初级交易员' : 'Junior Trader'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {isZh ? '专注1分钟和5分钟短线交易，快速进出场，适合高频交易策略。' : 'Focus on 1-minute and 5-minute short-term trading with quick entries and exits, suitable for high-frequency strategies.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '资金规模：$25k - $50k' : 'Capital: $25k - $50k'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '分润比例：70% - 80%' : 'Profit Split: 70% - 80%'}</span>
                  </li>
                </ul>
              </div>
              <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold mb-3">
                    {isZh ? '进阶级' : 'Intermediate'}
                  </div>
                  <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? '中级交易员' : 'Intermediate Trader'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {isZh ? '专注15分钟周期交易，平衡风险与收益，适合波段交易策略。' : 'Focus on 15-minute timeframe trading, balancing risk and reward, suitable for swing trading strategies.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '资金规模：$50k - $100k' : 'Capital: $50k - $100k'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '分润比例：80% - 85%' : 'Profit Split: 80% - 85%'}</span>
                  </li>
                </ul>
              </div>
              <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold mb-3">
                    {isZh ? '高级' : 'Senior'}
                  </div>
                  <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? '高级交易员' : 'Senior Trader'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {isZh ? '专注长线交易与趋势跟踪，管理大额资金，参与策略研究与组合管理。' : 'Focus on long-term trading and trend following, managing large capital, participating in strategy research and portfolio management.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '资金规模：$100k - $200k' : 'Capital: $100k - $200k'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '分润比例：85% - 90%' : 'Profit Split: 85% - 90%'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 管理序列 */}
          <div className="space-y-8 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-3">
                {isZh ? '管理序列' : 'Management Series'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {isZh
                  ? '从教学支持到团队领导，为具备管理潜力的交易员提供横向发展路径，培养综合能力与领导力。'
                  : 'From teaching support to team leadership, providing lateral development paths for traders with management potential, cultivating comprehensive skills and leadership.'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold mb-3">
                    {isZh ? '教学支持' : 'Teaching Support'}
                  </div>
                  <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? '助教' : 'Teaching Assistant'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {isZh
                    ? '协助带班导师整理交易日志、统计绩效数据并跟进学员执行力，为学员提供日常支持与答疑。'
                    : 'Assist lead mentors with journaling reviews, performance statistics, and trainee accountability, providing daily support and Q&A for trainees.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '交易日志审核与反馈' : 'Trading journal review and feedback'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '学员进度跟踪与统计' : 'Trainee progress tracking and statistics'}</span>
                  </li>
                </ul>
              </div>
              <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold mb-3">
                    {isZh ? '风险监管' : 'Risk Oversight'}
                  </div>
                  <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? '监理' : 'Supervisor'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {isZh
                    ? '负责风控巡查、日内风险提示与策略执行质量的审核，确保交易员遵守风险规则与交易纪律。'
                    : 'Oversee risk controls, deliver intraday alerts, and audit strategy execution quality, ensuring traders comply with risk rules and trading discipline.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '实时风控监控与预警' : 'Real-time risk monitoring and alerts'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '策略执行质量评估' : 'Strategy execution quality assessment'}</span>
                  </li>
                </ul>
              </div>
              <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold mb-3">
                    {isZh ? '团队领导' : 'Team Leadership'}
                  </div>
                  <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:underline">
                    {isZh ? '团队长' : 'Team Leader'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {isZh
                    ? '统筹策略共建、协调资金分配并带领团队达成季度绩效目标，负责团队发展规划与人才培养。'
                    : 'Coordinate strategy co-creation, manage capital allocation, and drive quarterly targets for the squad, responsible for team development planning and talent cultivation.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '团队策略研究与优化' : 'Team strategy research and optimization'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{isZh ? '资金分配与绩效管理' : 'Capital allocation and performance management'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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

