"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function AboutPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="max-w-5xl mx-auto px-6 py-16">
			<h1 className="text-4xl font-black mb-6">{isZh ? "浮力资本" : "Buoyancy Capital"}</h1>
			<div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
				<p>
					{isZh
						? "浮力资本，一个专注于金融交易的精英生态圈。我们为两大群体提供精准服务。"
						: "Buoyancy Capital, an elite ecosystem focused on financial trading. We provide precise services for two key groups."}
				</p>
				<p>
					{isZh
						? "1. 对于有志于金融交易的精英，我们提供体系化的职业培训，并以无风险资金，助力其实现从理论到实战的跨越。"
						: "1. For elites aspiring to financial trading, we provide systematic professional training and risk-free capital to help them transition from theory to practice."}
				</p>
				<p>
					{isZh
						? "2. 对于寻求资产增值的投资者，我们筛选顶级的回报机会。投资是价值观的共鸣。因此，我们仅接纳深度认同我们文化、理念并经过双向考察的合伙人。"
						: "2. For investors seeking asset appreciation, we curate top-tier return opportunities. Investment is a resonance of values. Therefore, we only accept partners who deeply align with our culture and philosophy and have passed mutual evaluation."}
				</p>
				<p>
					{isZh
						? "在这里，资本与才华在共同的价值观下相互成就。"
						: "Here, capital and talent achieve mutual success under shared values."}
				</p>
			</div>

			<div className="mt-10 flex flex-wrap gap-4">
				<LocaleLink href="/about/letter" className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold">
					{isZh ? "阅读公开信" : "Read Open Letter"}
				</LocaleLink>
				<LocaleLink href="/about/wealth" className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold">
					{isZh ? "了解财富自增" : "Explore Wealth Growth"}
				</LocaleLink>
				<LocaleLink href="/about/contact" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors">
					{isZh ? "联系我们" : "Contact Us"}
				</LocaleLink>
			</div>
		</div>
	);
}


