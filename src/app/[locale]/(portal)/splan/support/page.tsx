"use client";

import React from "react";
import LocaleLink from "@/components/navigation/LocaleLink";

const applicationTiers = [
  {
    id: "public",
    label: { zh: "公益名额", en: "Public Benefit Tier" },
    badge: { zh: "免费", en: "Free" },
    fee: { zh: "报名费：免费（99 元押金）", en: "Application Fee: Free (¥99 deposit)" },
    requirements: {
      zh: ["国内 985 或海外 TOP50 本科及以上学历", "35 岁以下人士"],
      en: ["Domestic 985 or overseas TOP50 bachelor degree and above", "Applicants under 35"],
    },
    rules: {
      zh: [
        "需先缴纳 99 元押金，领取课程资料后提交不少于 800 字学习报告，可申请退还押金",
        "通过小额实盘考核后，获得「梦想启航」资格：10万-100万无风险资金账户",
        "训练期间不遵守要求、无故缺勤 2 次以上或未提交交易总结，视为自动退出",
        "每人仅 1 次免费申请机会，放弃或未通过者需以挑战名额方式重新申请",
      ],
      en: [
        "Pay ¥99 deposit first; submit ≥800-word study report after receiving materials to request a refund",
        "Pass the micro live test to unlock “Dream Launch” funding: ¥100k-1m risk-free capital",
        "Non-compliance, two unexcused absences, or missing journals leads to automatic withdrawal",
        "Only one free attempt; quitting or failing requires reapplying via the Challenge Tier",
      ],
    },
    tip: {
      zh: "提示：请提前准备学习报告与模拟账户成绩，提高押金退还成功率。",
      en: "Tip: Prepare study reports and sim results in advance to secure your deposit refund.",
    },
  },
  {
    id: "challenge",
    label: { zh: "挑战名额", en: "Challenge Tier" },
    badge: { zh: "¥999", en: "¥999" },
    fee: { zh: "报名费：999 元", en: "Application Fee: ¥999" },
    requirements: {
      zh: ["大专及以上学历", "40 岁以下人士"],
      en: ["Associate degree or above", "Applicants under 40"],
    },
    rules: {
      zh: [
        "通过模拟考核（连续 10 个交易日不亏损）可申请退还报名费",
        "通过小额实盘考核后，获得「梦想启航」资格：10万-100万无风险资金账户",
        "训练期间不遵守要求、无故缺勤 2 次以上或未提交交易总结，视为自动退出且不退报名费",
      ],
      en: [
        "Pass the simulation test (10 consecutive non-losing trading days) to request a refund",
        "Pass the micro live test to unlock “Dream Launch” funding: ¥100k-1m risk-free capital",
        "Non-compliance, two unexcused absences, or missing journals leads to automatic withdrawal without refund",
      ],
    },
    tip: {
      zh: "建议：提前完成模拟训练，提高一次性通过率并节省成本。",
      en: "Advice: Complete simulation drills early to boost pass rate and save on costs.",
    },
  },
  {
    id: "commercial",
    label: { zh: "商业名额", en: "Commercial Tier" },
    badge: { zh: "¥1999", en: "¥1999" },
    fee: { zh: "报名费：1999 元", en: "Application Fee: ¥1999" },
    requirements: {
      zh: ["申请资格无限制"],
      en: ["Open to all applicants"],
    },
    rules: {
      zh: [
        "通过模拟考核（连续 10 个交易日不亏损）可申请退还报名费",
        "通过小额实盘考核后，获得「梦想启航」资格：10万-100万无风险资金账户",
        "训练期间不遵守要求、无故缺勤 2 次以上或未提交交易总结，视为自动退出且不退报名费",
      ],
      en: [
        "Pass the simulation test (10 consecutive non-losing trading days) to request a refund",
        "Pass the micro live test to unlock “Dream Launch” funding: ¥100k-1m risk-free capital",
        "Non-compliance, two unexcused absences, or missing journals leads to automatic withdrawal without refund",
      ],
    },
    tip: {
      zh: "适合希望直接进入密集训练流程的交易者，请提前规划训练时间。",
      en: "Ideal for traders who want fast-track intensive training; plan your schedule early.",
    },
  },
];

export default function FuliSupportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative">
        <div className="absolute inset-0">
          <div className="h-40 bg-gradient-to-r from-[#0b1f4a] via-[#122f63] to-[#0b1f4a] opacity-10 dark:opacity-20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-16">
          <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
            <div className="bg-gradient-to-r from-black to-gray-900 dark:from-white dark:to-gray-100 px-6 py-4 border-b-2 border-black dark:border-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-white dark:bg-black text-black dark:text-white font-black text-xl">🚀</span>
                <h1 className="text-2xl md:text-3xl font-black text-white dark:text-black">梦想启航项目</h1>
              </div>
              <span className="px-3 py-1 text-xs md:text-sm font-bold bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white">
                Fuli Support
              </span>
            </div>
            <div className="p-6 md:p-10">
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                通过赞助、奖金激励与严谨的申请机制，帮助通过考核的交易员快速启航，迈向职业化之路。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">A</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">赞助</h3>
                      <p className="text-gray-700 dark:text-gray-300">提供 10万 - 100万 的挑战账号</p>
                    </div>
                  </div>
                </div>
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">B</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">奖金</h3>
                      <p className="text-gray-700 dark:text-gray-300">挑战账户收益的 60% 以上现金奖励</p>
                    </div>
                  </div>
                </div>
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">C</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">申请资格</h3>
                      <p className="text-gray-700 dark:text-gray-300">模拟账户通过考核的交易员</p>
                    </div>
                  </div>
                </div>
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">D</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">合作机构推荐</h3>
                      <p className="text-gray-700 dark:text-gray-300">交易员孵化器</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <LocaleLink
                  href="/splan/join-us"
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all text-center"
                >
                  立即申请
                </LocaleLink>
                <LocaleLink
                  href="/splan/faq"
                  className="px-6 py-3 bg-transparent text-black dark:text-white font-bold border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-center"
                >
                  查看常见问题
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="py-16 border-t-2 border-b-2 border-black dark:border-white bg-white dark:bg-gray-950"
      >
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold tracking-widest uppercase">
              APPLICATION FLOW
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white">
              提交申请 · 双重甄选流程
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              我们更看重态度与动机，而非空洞的承诺。认真填写报名表，是对训练的敬畏；
              深度动机面试，则确保你不是来「赌一把」，而是愿意把交易当成终身事业。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              id="apply-form"
              className="border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900 p-8 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff]"
            >
              <div className="inline-block px-4 py-1 border-2 border-black dark:border-white text-xs font-bold tracking-[0.3em] mb-4">
                STEP 01
              </div>
              <h3 className="text-2xl font-black text-black dark:text-white mb-3">
                提交申请 · 填写申请表
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                态度测试：我们会从字里行间判断你是否认真对待报名表。越具体的经历、越真实的交易复盘，
                越能看出你的投入度与自驱力。敷衍填表会被直接淘汰。
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="text-black dark:text-white">•</span>
                  <span>详细描述过往交易经验与最大的学习挫折。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-black dark:text-white">•</span>
                  <span>上传近期交易日志或成绩截图，证明你已投入实践。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-black dark:text-white">•</span>
                  <span>明确可投入的时间与资源，避免盲目承诺。</span>
                </li>
              </ul>
              <div className="mt-6">
                <LocaleLink
                  href="/splan/join-us"
                  className="inline-flex items-center justify-center px-5 py-2 border-2 border-black dark:border-white font-bold text-sm bg-black text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all"
                >
                  填写申请表
                </LocaleLink>
              </div>
            </div>

            <div
              id="interview"
              className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff]"
            >
              <div className="inline-block px-4 py-1 border-2 border-black dark:border-white text-xs font-bold tracking-[0.3em] mb-4">
                STEP 02
              </div>
              <h3 className="text-2xl font-black text-black dark:text-white mb-3">
                面试 · 动机深度访谈
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                我们会深入了解你为何想成为交易员：是为了短期暴富，还是把它视为值得深耕的终身职业？
                只有内在驱动力强、具备职业敬畏心的人，才能进入下一阶段。
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="text-black dark:text-white">•</span>
                  <span>动机访谈：拆解你对交易的理解、目标与长期计划。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-black dark:text-white">•</span>
                  <span>风险观测试：评估你是否具备敬畏市场的心态。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-black dark:text-white">•</span>
                  <span>职业化评估：确认你愿意遵守训练纪律并持续复盘。</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                提示：无需夸大成绩，坦诚分享真实经历与反思，远比包装出来的精彩故事更重要。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 border-t-2 border-b-2 border-black dark:border-white py-16 mt-16">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold tracking-widest uppercase">
              APPLY CONDITIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white">
              {`申请条件与资格路径`}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {`根据背景与目标选择合适的名额类型，完成对应考核即可逐步解锁「梦想启航」资金支持。`}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {applicationTiers.map((tier) => (
              <div
                key={tier.id}
                className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] flex flex-col gap-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-black dark:text-white">{tier.label.zh}</h3>
                    <span className="px-3 py-1 border-2 border-black dark:border-white text-sm font-bold">
                      {tier.badge.zh}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{tier.fee.zh}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                    申请资格
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {tier.requirements.zh.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-black dark:text-white">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                    规则
                  </h4>
                  <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
                    {tier.rules.zh.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ol>
                </div>

                <div className="pt-4 border-t border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tier.tip.zh}</p>
                  {tier.id === "public" && (
                    <div className="mt-4">
                      <LocaleLink
                        href="/splan/join-us"
                        className="inline-flex w-full items-center justify-center px-4 py-2 border-2 border-black dark:border-white text-sm font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all"
                      >
                        前往免费培训
                      </LocaleLink>
                    </div>
                  )}
                  {tier.id === "commercial" && (
                    <div className="mt-4">
                      <LocaleLink
                        href="/splan/donate"
                        className="inline-flex w-full items-center justify-center px-4 py-2 border-2 border-black dark:border-white text-sm font-bold bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                      >
                        捐赠支持
                      </LocaleLink>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff]">
              <div className="inline-block px-4 py-1 border-2 border-black dark:border-white text-xs font-bold tracking-[0.3em] mb-4">
                PSY TEST
              </div>
              <h3 className="text-3xl font-black text-black dark:text-white mb-4">
                心理测评：风险与心态审查
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                我们拒绝赌徒心态与极端风险厌恶者，确保参训者具备理性、沉着的心理素质。心理测评覆盖以下维度：
              </p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                {["风险偏好", "纪律性", "情绪稳定性", "抗压能力"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 mt-1 bg-black dark:bg-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                说明：完成心理测评是进入训练营的必要步骤，测评不合格将无法参与后续阶段。
              </p>
              <div className="mt-6">
                <LocaleLink
                  href="/splan/psychology-test"
                  className="inline-flex items-center justify-center px-5 py-2 border-2 border-black dark:border-white font-bold text-sm bg-black text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all"
                >
                  立即进行心理测评
                </LocaleLink>
              </div>
            </div>

            <div className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-8 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] space-y-6">
              <div className="inline-block px-4 py-1 border-2 border-black dark:border-white text-xs font-bold tracking-[0.3em]">
                BASIC REQUIREMENTS
              </div>
              <h3 className="text-3xl font-black text-black dark:text-white">
                申请基本要求
              </h3>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="font-bold text-black dark:text-white mb-1">时间要求</p>
                  <p>
                    北京时间 7:00 - 次日 6:00 之间，需保证至少连续 8 小时固定在线时间段。推荐交易时间为 13:00 - 23:00。
                  </p>
                </div>
                <div>
                  <p className="font-bold text-black dark:text-white mb-1">设备要求</p>
                  <p>
                    自有 Windows 电脑；若使用 macOS，需自行购买云电脑。确保稳定网络与专业交易软件。
                  </p>
                </div>
                <div>
                  <p className="font-bold text-black dark:text-white mb-1">环境要求</p>
                  <p>安静、独立、不受打扰的交易环境，避免外界干扰。</p>
                </div>
                <div>
                  <p className="font-bold text-black dark:text-white mb-1">经济与心态</p>
                  <p>
                    经济生活无压力，能承受至少 3-6 个月的学习与实训周期。如果希望短期暴富或一夜暴富，请绕道而行。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

