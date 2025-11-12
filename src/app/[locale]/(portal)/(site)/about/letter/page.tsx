"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutLetterPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="max-w-5xl mx-auto px-6 py-16">
			<h1 className="text-4xl font-black mb-6">{isZh ? "公开信" : "Open Letter"}</h1>
			<div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 leading-relaxed text-gray-800 dark:text-gray-200">
				<p className="mb-4">
					{isZh
						? "在浮力资本，成为职业交易员并非捷径，而是一条严谨且高标准的成长之路。我们提供系统化训练、纪律与方法论，帮助你建立从认知到执行的完整闭环。"
						: "At Buoyancy Capital, becoming a professional trader is not a shortcut but a rigorous, high-standard journey. We provide structured training, discipline, and methodology to build a complete loop from cognition to execution."}
				</p>
				<p>
					{isZh
						? "若你具备长期主义、强自驱和对风险的敬畏，我们欢迎你与我们同行。"
						: "If you value long-termism, strong self-drive, and a deep respect for risk, we welcome you to walk with us."}
				</p>
			</div>
		</div>
	);
}


