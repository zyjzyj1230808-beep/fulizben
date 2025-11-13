"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IncubatorPartnerPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-100 dark:from-emerald-950 dark:via-gray-950 dark:to-sky-950">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-200/70 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-100 via-white to-sky-100 dark:from-emerald-900/40 dark:via-slate-900/70 dark:to-sky-950/40 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />
          <div className="relative px-8 py-12 md:px-16 md:py-18 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/85 dark:bg-gray-900/50 px-4 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-300 shadow-sm">
                {isZh ? "资金协同 · 实战孵化" : "Capital Synergy · Practical Incubation"}
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 dark:text-white">
                {isZh ? "稳准狠自营交易孵化器" : "WZH Prop Trading Incubator"}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {isZh
                  ? "依托严格的遴选体系与资金支持能力，孵化器携手浮力资本打造“选拔—训练—实盘—共赢”全链路合作，为交易员提供可持续的成长与收益空间。"
                  : "Leveraging rigorous selection and funding capabilities, the incubator partners with Fuli Capital to build a holistic pipeline—from scouting and training to live trading and shared success—offering traders sustainable growth and upside."}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="inline-block size-2 rounded-full bg-emerald-500" />
                  {isZh ? "严选团队 · 资金护航 · 实战共赢" : "Selective Cohorts · Capital Backing · Shared Outcomes"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="inline-block size-2 rounded-full bg-sky-500" />
                  {isZh ? "匹配浮力矩阵与全球自营需求" : "Aligned with Fuli matrix and global prop demand"}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-96">
              <div className="rounded-2xl border border-white/70 dark:border-white/10 bg-white/85 dark:bg-gray-900/70 p-6 shadow-xl backdrop-blur">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isZh ? "合作价值速览" : "Value Snapshot"}
                </h2>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-emerald-500" />
                    <span>{isZh ? "合格交易员可获得 50 万 - 200 万美金的分级资金账户。" : "Qualified traders access tiered funding accounts from $500k to $2M."}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-indigo-500" />
                    <span>{isZh ? "提供策略风控团队共创机制，实时校准策略表现。" : "Strategy and risk teams co-create to calibrate performance in real time."}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-amber-500" />
                    <span>{isZh ? "优秀交易员可同步加入浮力复利矩阵，实现收益共享。" : "Top traders can also join the Fuli Compound Matrix to share returns."}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10 rounded-3xl border border-gray-200/70 dark:border-gray-800/60 bg-white/90 dark:bg-gray-900/70 backdrop-blur shadow-2xl px-8 py-12 md:px-14 md:py-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
              {isZh ? "Incubation Modules" : "Incubation Modules"}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {isZh ? "四大模块 · 打造专业交易员成长闭环" : "Four Modules · A Closed-loop Growth System"}
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {isZh
                ? "整合筛选、训练、资金与风控四个模块，确保每位交易员从入选到稳定盈利都有体系化支撑。"
                : "Selection, training, capital, and risk modules form an integrated backbone so every trader is supported from entry to consistent profitability."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                titleZh: "量化筛选",
                titleEn: "Quant Screening",
                bodyZh: "多维度绩效与行为数据评估，结合压力测试，筛出具备潜力的策略型人才。",
                bodyEn: "Multi-factor performance and behavioral profiling with stress testing to surface high-potential strategists.",
                gradient: "from-white via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950/40 dark:to-teal-950/30",
                border: "border-emerald-200/60 dark:border-emerald-800/50",
                glow: "bg-emerald-200/40 dark:bg-emerald-500/10",
              },
              {
                titleZh: "实战训练",
                titleEn: "Live Training",
                bodyZh: "使用浮力与孵化器共建的实盘模拟系统，围绕不同市场情境强化执行力。",
                bodyEn: "Joint live-sim systems expose traders to varied market regimes, sharpening execution discipline.",
                gradient: "from-white via-sky-50 to-blue-50 dark:from-gray-900 dark:via-sky-950/40 dark:to-blue-950/30",
                border: "border-sky-200/60 dark:border-sky-800/50",
                glow: "bg-sky-200/40 dark:bg-sky-500/10",
              },
              {
                titleZh: "资金配置",
                titleEn: "Capital Allocation",
                bodyZh: "通过分段资金池与浮动权益模型，放大稳健表现，同时控制整体风险。",
                bodyEn: "Tiered funding pools and elastic equity models reward stable performance while managing aggregate risk.",
                gradient: "from-white via-amber-50 to-orange-50 dark:from-gray-900 dark:via-amber-950/40 dark:to-orange-950/30",
                border: "border-amber-200/60 dark:border-amber-800/50",
                glow: "bg-amber-200/40 dark:bg-amber-500/10",
              },
              {
                titleZh: "风控共建",
                titleEn: "Risk Co-governance",
                bodyZh: "构建风险仪表盘与回撤预警机制，交易员与风控团队即时联动。",
                bodyEn: "Risk dashboards and drawdown alerts synchronize traders with risk teams in real time.",
                gradient: "from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-slate-950/40 dark:to-slate-900/40",
                border: "border-slate-200/60 dark:border-slate-800/50",
                glow: "bg-slate-200/40 dark:bg-slate-500/10",
              },
            ].map((module, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border ${module.border} bg-gradient-to-br ${module.gradient} p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className={`absolute top-0 right-0 h-28 w-28 translate-x-1/4 -translate-y-1/4 rounded-full ${module.glow} blur-3xl transition-all group-hover:scale-110`} />
                <h3 className="relative text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {isZh ? module.titleZh : module.titleEn}
                </h3>
                <p className="relative text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {isZh ? module.bodyZh : module.bodyEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-gray-200/70 dark:border-gray-800/60 bg-gradient-to-r from-white via-emerald-50 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900/70 backdrop-blur shadow-2xl px-8 py-12 md:px-14 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                {isZh ? "Incubation Flow" : "Incubation Flow"}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                {isZh ? "交易员孵化六大阶段" : "Six Stages of Trader Incubation"}
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {isZh
                  ? "借助浮力的教育资源与孵化器的资金能力，六大阶段无缝衔接，实现从新秀到成熟交易员的跃迁。"
                  : "With Fuli’s educational assets and the incubator’s capital strength, six seamless stages help traders graduate from rising talent to mature professionals."}
              </p>
            </div>
          </div>
          <ol className="grid gap-4 md:grid-cols-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {[
              {
                zh: "在线测评与策略简历筛选，定位潜力方向。",
                en: "Online assessments and strategy CV review to pinpoint potential.",
              },
              {
                zh: "通过现场/远程面试，评估交易认知与风控意识。",
                en: "On-site or remote interviews evaluate trading cognition and risk sense.",
              },
              {
                zh: "进入训练营完成策略打磨、风险演练与执行训练。",
                en: "Bootcamps sharpen strategies, risk drills, and execution routines.",
              },
              {
                zh: "通过考核后领取资金账户，开启监管下的实盘操盘。",
                en: "Upon passing, traders receive funded accounts under monitored conditions.",
              },
              {
                zh: "表现稳定者接入浮力复利矩阵，实现收益共享。",
                en: "Stable performers join the Fuli Compound Matrix to share returns.",
              },
              {
                zh: "年度复盘与晋级考核，拓展更大资金与合作机会。",
                en: "Annual reviews unlock higher capital tiers and expanded opportunities.",
              },
            ].map((step, index) => (
              <li
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-5 shadow-md"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-200 text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3">{isZh ? step.zh : step.en}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}


