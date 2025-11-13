"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function AboutWealthPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
			<section id="compound-matrix" className="space-y-6">
				<div>
					<h2 className="text-3xl font-extrabold mb-4">{isZh ? "复利矩阵" : "Compound Matrix"}</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
						{isZh
							? "复利矩阵专为已经具备稳定盈利能力的交易员而设，为他们提供共享收益、放大资本效能的平台。"
							: "The Compound Matrix is designed for traders who already demonstrate stable profitability, providing a platform to share returns and amplify capital efficiency."}
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					<div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur">
						<h3 className="text-xl font-semibold mb-3">{isZh ? "加入资格" : "Eligibility"}</h3>
						<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "通过“梦想启航计划”赚到第一桶金的交易员，即可获得进入复利矩阵的优先邀请。"
								: "Traders who secure their first meaningful profits through the Dream Launch Program receive priority invitations to join the Compound Matrix."}
						</p>
					</div>
					<div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur">
						<h3 className="text-xl font-semibold mb-3">{isZh ? "矩阵福利" : "Matrix Benefits"}</h3>
						<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "加入矩阵的交易员，将共享矩阵内所有成员的收益，实现收益总和共享、共创式增长。"
								: "Members share the combined returns of every trader in the matrix, transforming individual performance into collaborative growth."}
						</p>
					</div>
					<div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur">
						<h3 className="text-xl font-semibold mb-3">{isZh ? "持续资格要求" : "Ongoing Requirements"}</h3>
						<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "以周为单位保持不亏损，并将回撤控制在 10% 以内，即可持续留在矩阵中，共享复利效应。"
								: "Maintain non-negative weekly results and keep drawdowns within 10% to remain in the matrix and continue enjoying compounded gains."}
						</p>
					</div>
				</div>
			</section>

			<section id="partners" className="space-y-6">
				<div>
					<h2 className="text-3xl font-extrabold mb-4">{isZh ? "合伙人" : "Partners"}</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
						{isZh
							? "浮力合伙人计划面向价值观高度契合、愿意共同建设生态的长期伙伴。"
							: "The Fuli Partnership Program invites long-term collaborators who deeply align with our values and want to grow the ecosystem together."}
					</p>
				</div>
				<ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
					<li>
						{isZh
							? "通过合伙人理性认知测试，确保交易与风险认知的成熟度。"
							: "Complete the partner rational cognition assessment to confirm maturity in trading and risk awareness."}
					</li>
					<li>
						{isZh
							? "提交合伙人申请表，分享你的背景、优势与合作诉求。"
							: "Submit the partner application form, outlining your background, strengths, and cooperation goals."}
					</li>
					<li>
						{isZh
							? "确认你对浮力价值观与理念的认同与承诺。"
							: "Demonstrate clear alignment with Fuli’s values and philosophy."}
					</li>
					<li>
						{isZh
							? "参与合伙人面谈，与核心团队深入交流。"
							: "Join a partner interview to connect in depth with the core team."}
					</li>
					<li>
						{isZh
							? "签署合作协议，正式开启合伙旅程。"
							: "Sign the cooperation agreement to officially start the partnership journey."}
					</li>
				</ol>
			</section>
		</div>
	);
}
