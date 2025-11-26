"use client";

import React, { useState } from "react";
import LocaleLink from "@/components/navigation/LocaleLink";

type Lesson = {
  title: string;
  topics: string[];
};

type Course = {
  title: string;
  lessons: Lesson[];
};

type LearningModule = {
  title: string;
  courses: Course[];
};

type TrainingModule = {
  title: string;
  description: string;
  highlight?: string;
  detailedContent?: LearningModule[];
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

const theoryLearningContent: LearningModule[] = [
  {
    title: "模块一：交易世界观——重塑对市场的认知",
    courses: [
      {
        title: "课程1：欢迎来到真实的交易世界",
        lessons: [
          {
            title: "职业交易 VS 业余交易：本质区别是什么？",
            topics: [],
          },
          {
            title: "打破“快速致富”的幻想：交易的残酷性与概率本质",
            topics: [],
          },
          {
            title: "成功的交易员是什么样？成功所需的技能金字塔——心态、风险管理、技术分析",
            topics: [],
          },
        ],
      },
    ],
  },
  {
    title: "模块二：市场语言与武器库——交易基础知识",
    courses: [
      {
        title: "课程2：金融市场概览与武器库",
        lessons: [
          {
            title: "股票、金融、期货、加密货币市场简介",
            topics: ["点差、流动性、交易时间"],
          },
          {
            title: "为什么我们选择金融/CFD作为起点？",
            topics: [],
          },
        ],
      },
      {
        title: "课程3：订单与执行——TICKMILL平台",
        lessons: [
          {
            title: "图标、窗口、基本操作",
            topics: [],
          },
          {
            title: "市价单、限价单、止损单、止盈单",
            topics: [],
          },
          {
            title: "什么是滑点？如何管理滑点",
            topics: [],
          },
        ],
      },
      {
        title: "课程4：风险管理的数学基石",
        lessons: [
          {
            title: "仓位计算：如何根据账户资金和止损距离科学计算下单量",
            topics: [],
          },
          {
            title: "理解“风险回报比”：1:2意味着什么？",
            topics: [],
          },
          {
            title: "最大回撤与生存第一法则",
            topics: [],
          },
          {
            title: "“上帝之手”是否真的存在？",
            topics: [],
          },
        ],
      },
    ],
  },
  {
    title: "模块三：“莫道”技术分析",
    courses: [
      {
        title: "课程5：进场",
        lessons: [
          {
            title: "标准进场",
            topics: [],
          },
          {
            title: "激进进场",
            topics: [],
          },
        ],
      },
      {
        title: "课程6：止损",
        lessons: [
          {
            title: "保守止损",
            topics: [],
          },
          {
            title: "标准止损",
            topics: [],
          },
          {
            title: "硬止损——高压线",
            topics: [],
          },
        ],
      },
      {
        title: "课程7：出场",
        lessons: [
          {
            title: "保守出场",
            topics: [],
          },
          {
            title: "标准出场",
            topics: [],
          },
          {
            title: "激进出场",
            topics: [],
          },
        ],
      },
      {
        title: "课程8：技术分析的重要性和局限性",
        lessons: [],
      },
    ],
  },
  {
    title: "模块四：交易者的内核——心理学与交易计划",
    courses: [
      {
        title: "课程9：交易心理学：与心魔共舞",
        lessons: [
          {
            title: "识别并战胜：贪婪、恐惧、希望、侥幸",
            topics: [],
          },
          {
            title: "常见心理陷阱：贪婪、恐惧、过度自信、报复性交易",
            topics: [],
          },
          {
            title: "应对技巧：正念冥想、交易日志",
            topics: [],
          },
          {
            title: "如何处理亏损？亏损是交易成本",
            topics: [],
          },
          {
            title: "保持纪律：为什么“知易行难”？",
            topics: [],
          },
        ],
      },
      {
        title: "课程10：构建你的交易系统",
        lessons: [
          {
            title: "一个交易系统的必备要素：进场条件、出场条件（止损/止盈）、仓位管理",
            topics: [],
          },
          {
            title: "如何将前面所学的知识组合成一个简单的、可回溯的系统",
            topics: [],
          },
        ],
      },
      {
        title: "课程11：制作你的交易计划书——毕业设计",
        lessons: [
          {
            title: "我的交易品种、时间框架",
            topics: [],
          },
          {
            title: "我的进场规则",
            topics: [],
          },
          {
            title: "我的仓位管理规则",
            topics: [],
          },
          {
            title: "我的每日/周/月复盘流程",
            topics: [],
          },
        ],
      },
    ],
  },
];

const trainingTracks: TrainingTrack[] = [
  {
    id: "junior",
    label: "初级交易员",
    tagline: "打好底层功 · 建立风控脑回路",
    theme: "from-[#020617] via-[#020617] to-[#020617]",
    modules: [
      {
        title: "理论学习",
        description: "掌握宏观框架、交易方法论与风控体系，完成不少于 40 小时的系统课程。",
        detailedContent: theoryLearningContent,
      },
      {
        title: "模拟交易",
        description:
          "使用官方模拟账户对接实时市场数据，15-45 个工作日熟悉我们交易系统并实现日盈利。账户规格：10,000 美元，100 倍杠杆。",
      },
      {
        title: "模拟考核",
        description:
          "通过标准：连续 10 个交易日保持不亏损，盈利金额不设要求，重点考核稳定性与执行纪律。",
      },
      {
        title: "小额实盘考核",
        description: "通过标准：以周为单位，连续 4 周不亏损，回撤控制在 10% 以内。",
      },
      {
        title: "获得梦想启航项目资格",
        description: "完成前置考核后，进入 10 万 - 100 万资金账号，进入赞助与奖金激励通道。",
      },
      {
        title: "持续进化（职业生命周期管理）",
        description:
          "1. 导师制：为每位学员配备资深交易员一对一指导；2. 持续教育：定期举办研讨会分享最新策略与案例；3. 心理支持：提供专业心理辅导，协助度过低谷期。",
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
    theme: "from-[#020617] via-[#020617] to-[#020617]",
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
    theme: "from-[#020617] via-[#020617] to-[#020617]",
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
    theme: "from-[#020617] via-[#020617] to-[#020617]",
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

function TheoryLearningDetail({ content }: { content: LearningModule[] }) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));

  const toggleModule = (index: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className="mt-6 space-y-4">
      {content.map((module, moduleIndex) => (
        <div
          key={moduleIndex}
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggleModule(moduleIndex)}
            className="w-full px-6 py-4 bg-[#020617] dark:bg-gray-800 text-white flex items-center justify-between hover:bg-slate-900 dark:hover:bg-gray-700 transition-colors"
          >
            <h4 className="text-lg font-bold">{module.title}</h4>
            <svg
              className={`w-5 h-5 transition-transform ${expandedModules.has(moduleIndex) ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedModules.has(moduleIndex) && (
            <div className="p-6 space-y-6">
              {module.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="border-l-4 border-slate-300 dark:border-gray-600 pl-4">
                  <h5 className="text-base font-bold text-slate-900 dark:text-white mb-3">{course.title}</h5>
                  {course.lessons && course.lessons.length > 0 ? (
                    <ul className="space-y-2 ml-4">
                      {course.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="text-sm text-gray-700 dark:text-gray-200">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-500 dark:text-gray-400 mt-1">•</span>
                            <div className="flex-1">
                              <span className="font-medium">{lesson.title}</span>
                              {lesson.topics && lesson.topics.length > 0 && (
                                <ul className="mt-1 ml-4 space-y-1 text-gray-500 dark:text-gray-400">
                                  {lesson.topics.map((topic, topicIndex) => (
                                    <li key={topicIndex} className="text-xs">
                                      - {topic}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">课程内容待补充</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

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
                  <div
                    key={index}
                    className={`border-2 border-dashed border-gray-300 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900/60 ${
                      module.detailedContent ? "md:col-span-2" : ""
                    }`}
                  >
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
                    {module.detailedContent && (
                      <TheoryLearningDetail content={module.detailedContent} />
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
