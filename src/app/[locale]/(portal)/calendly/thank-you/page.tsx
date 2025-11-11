"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function CalendlyThankYouPage() {
	const { language, t } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="min-h-[70vh] flex items-center justify-center px-6">
			<div className="max-w-2xl w-full text-center">
				<h1 className="text-4xl md:text-5xl font-black mb-6">
					{isZh ? "预约成功" : "Booking Confirmed"}
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
					{isZh
						? "感谢你完成面试时间选择。我们的团队将尽快与你联系。"
						: "Thanks for scheduling your interview. Our team will reach out shortly."}
				</p>

				<div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-6 text-left mb-8">
					<p className="mb-2">
						<span className="font-semibold">
							{isZh ? "品牌名称" : "Brand"}
						</span>
						：{isZh ? "浮力资本" : "Buoyancy Capital"}
					</p>
					<p className="mb-2">
						<span className="font-semibold">
							{isZh ? "英文名称" : "English Name"}
						</span>
						：Buoyancy Capital
					</p>
					<p className="mb-0">
						<span className="font-semibold">
							{isZh ? "官方网站" : "Official Site"}
						</span>
						：<a
							href="https://www.fuliziben.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 dark:text-blue-400 underline"
						>
							www.fuliziben.com
						</a>
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href={`/${isZh ? "zh" : "en"}`}
						className="px-8 py-3 border-2 border-black dark:border-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
					>
						{isZh ? "返回首页" : "Back to Home"}
					</Link>
					<a
						href="https://www.fuliziben.com"
						target="_blank"
						rel="noopener noreferrer"
						className="px-8 py-3 border-2 border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition font-bold"
					>
						{isZh ? "前往官网" : "Visit Website"}
					</a>
				</div>
			</div>
		</div>
	);
}


