"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function ProductsPage() {
	const { language, t } = useLanguage();
	const isZh = language === "zh";

	const cards = [
		{
			title: isZh ? "职业交易员培训" : "Trader Training",
			desc: isZh ? "30天系统化训练，从规则到盈利，提供实盘与资金支持路径。" : "30-day structured training from rules to profitability, with live trading and funding pathway.",
			link: "/splan/join-us",
			accent: "border-blue-700 dark:border-blue-300",
		},
		{
			title: isZh ? "课程体系" : "Courses",
			desc: isZh ? "从基础到进阶的完整培养流程，循序渐进，实战导向。" : "Comprehensive program from basics to advanced, step-by-step and practice-oriented.",
			link: "/splan/courses",
			accent: "border-indigo-700 dark:border-indigo-300",
		},
		{
			title: isZh ? "量化交易控制台" : "Trading Dashboard",
			desc: isZh ? "策略回测、实时监控、交易绩效分析，一体化工具。" : "Backtesting, realtime monitoring, and performance analytics in one place.",
			link: "/dashboard",
			accent: "border-slate-700 dark:border-slate-300",
		},
		{
			title: isZh ? "心理测评" : "Psychology Test",
			desc: isZh ? "评估交易心理画像，识别优势与盲点，为训练提供依据。" : "Assess trading psychology to identify strengths and blind spots for targeted training.",
			link: "/splan/psychology-test",
			accent: "border-emerald-700 dark:border-emerald-300",
		},
		{
			title: isZh ? "交易工具" : "Trading Tools",
			desc: isZh ? "仓位、风险回报、点值等常用工具集合，提升执行效率。" : "Position, risk/reward, pip calculators and more to improve execution efficiency.",
			link: "/tools/position-calculator",
			accent: "border-cyan-700 dark:border-cyan-300",
		},
		{
			title: isZh ? "常见问题" : "FAQ",
			desc: isZh ? "培训是否收费、分成机制、纪律要求等高频问题解答。" : "Answers to common questions on fees, splits, discipline, and more.",
			link: "/splan/faq",
			accent: "border-zinc-700 dark:border-zinc-300",
		},
	];

	return (
		<div className="max-w-6xl mx-auto px-6 py-16">
			<h1 className="text-4xl font-black mb-4">{isZh ? "产品与服务" : "Products and Services"}</h1>
			<p className="text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
				{isZh
					? "我们以结果为导向，提供体系化培养、完整工具与清晰路径，帮助合适的人高效成长。"
					: "We are outcome-driven, offering structured training, a complete toolkit, and a clear pathway to help the right people grow efficiently."}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{cards.map((card, idx) => (
					<div key={idx} className={`bg-white dark:bg-gray-900 border-2 ${card.accent} p-6`}>
						<h2 className="text-2xl font-bold mb-3">{card.title}</h2>
						<p className="text-gray-700 dark:text-gray-300 mb-6">{card.desc}</p>
						<LocaleLink
							href={card.link}
							className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
						>
							{isZh ? "了解更多" : "Learn More"}
						</LocaleLink>
					</div>
				))}
			</div>
		</div>
	);
}


