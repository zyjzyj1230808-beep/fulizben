"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutContactPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="max-w-5xl mx-auto px-6 py-16">
			<h1 className="text-4xl font-black mb-6">{isZh ? "联系我们" : "Contact Us"}</h1>
			<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
				{isZh
					? "你可以通过右下角的“联系我们”浮动按钮快速提交信息，我们会尽快与您取得联系。也欢迎使用以下方式："
					: "Use the bottom-right “Contact Us” floating button to reach us quickly, or choose one of the options below:"}
			</p>
			<ul className="space-y-3 text-gray-800 dark:text-gray-200">
				<li>
					<strong>{isZh ? "邮箱：" : "Email: "}</strong>
					<a className="underline" href="mailto:fennabaskett@gmail.com">fennabaskett@gmail.com</a>
				</li>
				<li>
					<strong>WeChat: </strong> fulizibenfuhuaqi
				</li>
				<li>
					<strong>QQ: </strong> 27439886
				</li>
				<li>
					<strong>{isZh ? "官网：" : "Website: "}</strong>
					<a className="underline" href="https://www.fuliziben.com" target="_blank" rel="noopener noreferrer">www.fuliziben.com</a>
				</li>
			</ul>
		</div>
	);
}


