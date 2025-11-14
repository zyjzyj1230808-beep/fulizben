"use client";

import React from "react";
import LocaleLink from "@/components/navigation/LocaleLink";

type TrainingModule = {
  title: string;
  description: string;
  highlight?: string;
};

type TrainingTrack = {
  id: string;
  label: string;
  tagline: string;
  theme: string;
  modules: TrainingModule[];
  action?: {
    label: string;
    href: string;
  };
};

const trainingTracks: TrainingTrack[] = [
  {
    id: "junior",
    label: "初级交易员",
    tagline: "打好底层功 · 建立风控脑回路",
    theme: "from-[#020617] via-[#0f172a] to-[#1e293b]",
    modules: [
      {
        title: "理论学习",
        description: "掌握宏观框架、交易方法论与风控体系，完成不少于 40 小时的系统课程。",
      },
      {
        title: "模拟交易",
        description: "在统一仿真环境执行策略，记录每笔交易理由，形成标准化复盘模板。",
      },
      {
        title: "模拟考核",
        description: "连续 20 个交易日控制最大回撤 < 5%，保持正向收益，以稳定性为核心指标。",
      },
      {
        title: "小额实盘考核",
        description: "以 1-3 万资金的微实盘账户检验执行力，需严格遵守团队风控指令。",
      },
      {
        title: "获得梦想启航项目资格",
        description: "完成前置考核后，进入 10 万 - 100 万资金账号，进入赞助与奖金激励通道。",
      },
      {
        title: "持续进化（职业生命周期管理）",
        description: "通过导师制与 OKR 复盘，形成长期职业发展计划，确保认知与策略同步升级。",
        highlight: "职业化必修 · 长周期跟踪",
      },
    ],
    action: {
      label: "开启基础训练",
      href: "/splan/join-us",
    },
  },
  {
    id: "intermediate",
    label: "中级交易员",
    tagline: "深入策略研发 · 掌握多品种交易节奏",
    theme: "from-[#f97316] via-[#f97316] to-[#ea580c]",
    modules: [
      {
        title: "策略拆解",
        description: "掌握多周期共振、事件驱动与跨品种对冲策略，提升策略组合思维。",
      },
      {
        title: "资金曲线管理",
        description: "强化净值曲线控制与分阶段调仓，确保收益/回撤比始终优于 2:1。",
      },
      {
        title: "团队协作",
        description: "进入战情室协同，学习从独立交易者转型为策略团队一员。",
      },
    ],
    action: {
      label: "预约能力评估",
      href: "/splan/support#apply",
    },
  },
  {
    id: "senior",
    label: "高级交易员",
    tagline: "多账户矩阵 · 机构级风控标准",
    theme: "from-[#0ea5e9] via-[#0284c7] to-[#0369a1]",
    modules: [
      {
        title: "多策略调度",
        description: "管理 3-5 个账户集群，执行 Beta/Alpha 组合，追求收益的稳定放大。",
      },
      {
        title: "机构级风控",
        description: "与风控官共同制定日度/周度限额，涵盖熔断、阶梯止损与事件黑名单。",
      },
      {
        title: "收益分配机制",
        description: "根据资金规模与风险承担分层分成，最高可达 70%+ 现金奖励。",
      },
    ],
    action: {
      label: "申请资金放大",
      href: "/splan/support#interview",
    },
  },
  {
    id: "fund-manager",
    label: "基金经理",
    tagline: "从优秀交易员到资产管理人",
    theme: "from-[#a21caf] via-[#86198f] to-[#701a75]",
    modules: [
      {
        title: "产品设计",
        description: "学习封闭式/开放式产品搭建与 LP 沟通，理解合规与募资 SOP。",
      },
      {
        title: "团队搭建",
        description: "构建研究、交易、风控三线协作体系，培养可复制的投研流程。",
      },
      {
        title: "投资者关系",
        description: "建立透明披露与异常情况通报机制，获得长期资金信任。",
      },
    ],
    action: {
      label: "进入资产管理通道",
      href: "/about/wealth",
    },
  },
];

export default function TrainingSystemPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="border-b-2 border-black dark:border-white bg-gradient-to-r from-[#020617] via-[#0b1f4a] to-[#020617] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">
          <span className="inline-block px-4 py-1 text-xs font-bold tracking-[0.3em] border border-white">
            FULI TRAINING SYSTEM
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            浮力助梦 · 培训体系
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
            以职业生命周期为核心，从初级交易员到基金经理，构建可复制、可评估、可持续的成长路径。
            每个阶段都匹配明确的考核指标、导师反馈机制与资金放大通道。
          </p>
          <div className="flex flex-wrap gap-3">
            <LocaleLink
              href="/splan/support"
              className="px-5 py-2 text-sm font-bold border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              返回项目介绍
            </LocaleLink>
            <LocaleLink
              href="/splan/join-us"
              className="px-5 py-2 text-sm font-bold border-2 border-white bg-white text-black hover:bg-transparent hover:text-white transition-colors"
            >
              立即申请训练营
            </LocaleLink>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          {trainingTracks.map((track) => (
            <div
              key={track.id}
              className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]"
            >
              <div className={`px-6 md:px-10 py-6 border-b-2 border-black dark:border-white bg-gradient-to-r ${track.theme}`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80 mb-2">
                      TRAINING TRACK
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black">{track.label}</h2>
                    <p className="text-sm md:text-base text-white/90 mt-2">{track.tagline}</p>
                  </div>
                  {track.action && (
                    <LocaleLink
                      href={track.action.href}
                      className="inline-flex items-center justify-center px-4 py-2 border-2 border-white text-sm font-bold text-white hover:bg-white hover:text-black transition-colors"
                    >
                      {track.action.label}
                    </LocaleLink>
                  )}
                </div>
              </div>
              <div className="p-6 md:p-10 grid md:grid-cols-2 gap-6">
                {track.modules.map((module, index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900/60">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-black dark:text-white">{module.title}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">STEP {index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {module.description}
                    </p>
                    {module.highlight && (
                      <div className="mt-3 inline-flex items-center px-3 py-1 text-xs font-bold border border-black dark:border-white text-black dark:text-white">
                        {module.highlight}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

