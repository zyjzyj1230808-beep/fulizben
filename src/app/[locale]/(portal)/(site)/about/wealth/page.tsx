"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function AboutWealthPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="max-w-5xl mx-auto px-6 py-16">
			<h1 className="text-4xl font-black mb-6">{isZh ? "财富自增" : "Wealth Growth"}</h1>
			<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
				{isZh
					? "我们为严肃的长期投资者甄选优质回报机会，只与价值观一致、互相审视后的合伙人同行。"
					: "We curate quality opportunities for serious long-term investors, partnering only with those aligned in values after mutual diligence."}
			</p>
			<div className="flex flex-wrap gap-4">
				<LocaleLink
					href="/products"
					className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg黑 dark:hover:text白 transition-colors"
				>
					{isZh ? "查看产品与服务" : "View Products and Services"}
				</LocaleLink>
				<LocaleLink
					href="/splan/faq"
					className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg黑 hover:text白 dark:hover:bg白 dark:hover:text黑 transition-colors font-bold"
				>
					{isZh ? "了解常见问题" : "Read FAQ"}
				</LocaleLink>
			</div>
		</div>
	);
}


