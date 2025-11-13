"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MagicUniversityPartnerPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 dark:from-slate-900 dark:via-gray-950 dark:to-indigo-950">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        <section className="relative overflow-hidden rounded-3xl border border-indigo-200/70 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-indigo-900/40 dark:via-slate-900/70 dark:to-blue-950/40 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />
          <div className="relative px-8 py-12 md:px-16 md:py-18 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-900/50 px-4 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-300 shadow-sm">
                {isZh ? "战略合作 · 学术共建" : "Strategic Alliance · Academic Co-build"}
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white">
                {isZh ? "魔界大学 × 浮力资本" : "Magic University × Fuli Capital"}
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {isZh
                  ? "双方以学术研究、人才培养与创新实践为核心，共建交易员教育闭环，让金融科技与行为金融研究成果直达课堂与实战场景。"
                  : "Together we anchor on academic research, talent cultivation, and practical innovation, building a closed-loop education pipeline that brings fintech and behavioral finance insights directly into classrooms and trading floors."}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="inline-block size-2 rounded-full bg-indigo-500" />
                  {isZh ? "科研联结 · 教学共研 · 实战融合" : "Research Link · Joint Curriculum · Practical Integration"}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="inline-block size-2 rounded-full bg-sky-500" />
                  {isZh ? "为新生代交易员打造系统化成长路径" : "Crafting structured growth paths for next-gen traders"}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-96">
              <div className="rounded-2xl border border-white/70 dark:border-white/10 bg-white/85 dark:bg-gray-900/70 p-6 shadow-xl backdrop-blur">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {isZh ? "合作亮点速览" : "Highlights at a Glance"}
                </h2>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-indigo-500" />
                    <span>{isZh ? "共建实盘模拟实验室，提供真实流动性环境训练。" : "Co-developed live simulation labs offering realistic liquidity environments."}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-emerald-500" />
                    <span>{isZh ? "联手打造多语言课程体系，覆盖交易、风控、量化与财务心理学。" : "Joint multi-language curriculum covering trading, risk, quant, and financial psychology."}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-amber-500" />
                    <span>{isZh ? "围绕职业发展提供导师辅导、赛道对接与实习机会。" : "Career pathways with mentorship, industry connectors, and internships."}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10 rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/70 backdrop-blur shadow-2xl px-8 py-12 md:px-14 md:py-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
              {isZh ? "Collaboration Pillars" : "Collaboration Pillars"}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {isZh ? "三大协同引擎 · 承接学术与实战" : "Three Synergy Engines · Bridging Academia & Practice"}
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "通过联合课程、科研实验与人才体系三大引擎，双方让知识转化为行动，把学生的潜能转化为稳定输出的职业能力。"
                : "Joint curricula, research initiatives, and talent ecosystems work in concert to translate knowledge into action and student potential into sustainable professional capability."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/60 dark:border-indigo-800/50 bg-gradient-to-br from-white via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-blue-950/30 p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/4 -translate-y-1/4 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-3xl transition-all group-hover:scale-110" />
              <h3 className="relative text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {isZh ? "联合课程体系" : "Joint Curriculum"}
              </h3>
              <p className="relative text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isZh
                  ? "围绕宏观研判、量化策略、算法交易与交易心理搭建多层次课程群，覆盖本研博全阶段。"
                  : "Multi-layered courses spanning macro, quant strategies, algorithmic trading, and trading psychology across undergraduate to doctoral levels."}
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/60 dark:border-emerald-800/50 bg-gradient-to-br from-white via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-emerald-950/40 dark:to-teal-950/30 p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/4 -translate-y-1/4 rounded-full bg-emerald-200/40 dark:bg-emerald-500/10 blur-3xl transition-all group-hover:scale-110" />
              <h3 className="relative text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {isZh ? "科研实验平台" : "Research Lab"}
              </h3>
              <p className="relative text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isZh
                  ? "共建行为金融实验室和高频交易沙盒，支持数据驱动研究与策略回测。"
                  : "Co-developed behavioral finance labs and high-frequency sandboxes enable data-driven research and strategy backtests."}
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-amber-200/60 dark:border-amber-800/50 bg-gradient-to-br from-white via-amber-50 to-yellow-100 dark:from-slate-900 dark:via-amber-950/40 dark:to-yellow-950/30 p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/4 -translate-y-1/4 rounded-full bg-amber-200/50 dark:bg-amber-500/10 blur-3xl transition-all group-hover:scale-110" />
              <h3 className="relative text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {isZh ? "人才培养旅程" : "Talent Journey"}
              </h3>
              <p className="relative text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isZh
                  ? "提供导师制、校企混编实训与全球竞赛通道，将优秀学生输送至浮力生态。"
                  : "Mentorship, co-op practicums, and global competition pipelines surface top students into the Fuli ecosystem."}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-gray-900 dark:to-slate-900/60 backdrop-blur shadow-2xl px-8 py-12 md:px-14 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                {isZh ? "Collaboration Roadmap" : "Collaboration Roadmap"}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                {isZh ? "学术到实战的五步协同流程" : "Five-step Flow from Academia to Practice"}
              </h2>
              <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {isZh
                  ? "通过五个环节持续推进合作闭环，确保课程设计、实训落地与人才输送相互验证、持续迭代。"
                  : "Five continuous stages close the loop between curriculum design, practical delivery, and talent placement, ensuring validation and iteration."}
              </p>
            </div>
          </div>
          <ol className="grid gap-4 md:grid-cols-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {([
              {
                zh: "共拟年度研究与课程主题，确定重点赛道。",
                en: "Co-define annual research and curriculum themes, aligning on focus tracks.",
              },
              {
                zh: "联合开发课程模块与实验项目，打造可落地教材。",
                en: "Co-create course modules and lab projects with applied teaching materials.",
              },
              {
                zh: "在魔界大学上线试点班级，滚动评估学习效果。",
                en: "Launch pilot cohorts at Magic University and continuously evaluate outcomes.",
              },
              {
                zh: "优秀学员进入浮力实践基地，完成实盘演练。",
                en: "High performers enter Fuli practice bases to complete live simulations.",
              },
              {
                zh: "出具联合评估报告，优化下一年度合作计划。",
                en: "Publish joint assessment reports to refine next-year collaboration plans.",
              },
            ] as const).map((item, index) => (
              <li
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-5 shadow-md"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3">{isZh ? item.zh : item.en}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}


