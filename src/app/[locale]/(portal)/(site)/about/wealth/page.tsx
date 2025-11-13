"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function AboutWealthPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
			<section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-rose-900/30 border border-amber-200/60 dark:border-amber-800/40 shadow-xl">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.55),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_45%)] pointer-events-none" />
				<div className="relative px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
					<div className="space-y-6 max-w-2xl">
						<span className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-900/40 px-4 py-1 text-sm font-semibold text-amber-600 dark:text-amber-300 shadow-sm">
							{isZh ? "财富协同 · 共赢成长" : "Collaborative Wealth Growth"}
						</span>
						<h1 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 dark:text-white">
							{isZh ? "浮力财富 · 让优秀交易员共享复利红利" : "Fuli Wealth · Unlock Collective Compounding for Elite Traders"}
						</h1>
						<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "我们围绕稳健复利与长期合作打造专属生态，帮助具备成熟策略与风险控制的交易员持续放大优势、与志同道合的伙伴共同成长。"
								: "We build a dedicated ecosystem around stable compounding and long-term collaboration, enabling disciplined traders with proven strategies to amplify their strengths alongside aligned partners."}
						</p>
						<div className="flex flex-wrap items-center gap-4">
							<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
								<span className="inline-block size-2 rounded-full bg-emerald-500" />
								{isZh ? "稳健 · 共创 · 长期主义" : "Stability · Co-creation · Long-Term"}
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
								<span className="inline-block size-2 rounded-full bg-amber-500" />
								{isZh ? "专属服务支持交易员成长" : "Dedicated support for trader growth"}
							</div>
						</div>
					</div>
					<div className="w-full md:w-80 lg:w-96">
						<div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 p-6 shadow-lg backdrop-blur">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
								{isZh ? "核心优势速览" : "Key Advantages"}
							</h2>
							<ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
								<li className="flex items-start gap-3">
									<span className="mt-1 size-2 rounded-full bg-emerald-500" />
									<span>{isZh ? "严格甄选与持续跟踪，确保矩阵质量稳步升级。" : "Rigorous selection with ongoing monitoring keeps the matrix consistently high-quality."}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1 size-2 rounded-full bg-sky-500" />
									<span>{isZh ? "共享收益模型，兼顾个体努力与团队协同。" : "Shared return model balances individual excellence with team synergy."}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1 size-2 rounded-full bg-amber-500" />
									<span>{isZh ? "合伙人体系提供资源、资金、策略全面赋能。" : "Partnership framework delivers capital, resources, and strategic empowerment."}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section
				id="compound-matrix"
				className="space-y-8 rounded-3xl border border-gray-200/70 dark:border-gray-800/60 bg-white/90 dark:bg-gray-900/70 backdrop-blur shadow-2xl px-8 py-12 md:px-14 md:py-16"
			>
				<div>
					<span className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-300">
						{isZh ? "Structure 01" : "Structure 01"}
					</span>
					<h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
						{isZh ? "复利矩阵 · 精英交易员共振平台" : "Compound Matrix · Platform for Elite Traders"}
					</h2>
					<p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
						{isZh
							? "复利矩阵专为已经具备稳定盈利能力的交易员而设，为他们提供共享收益、放大资本效能的平台。"
							: "The Compound Matrix is tailored to traders with established profitability, offering a structure to share returns and amplify capital efficiency."}
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					<div className="group relative overflow-hidden rounded-2xl border border-amber-200/60 dark:border-amber-800/40 bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-gray-900 dark:via-amber-950/30 dark:to-orange-950/20 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
						<div className="absolute top-0 right-0 h-32 w-32 translate-x-1/4 -translate-y-1/4 rounded-full bg-amber-200/50 dark:bg-amber-500/10 blur-3xl transition-all group-hover:scale-110" />
						<h3 className="relative text-xl font-semibold text-gray-900 dark:text-white mb-3">{isZh ? "加入资格" : "Eligibility"}</h3>
						<p className="relative text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "通过“梦想启航计划”赚到第一桶金的交易员，即可获得进入复利矩阵的优先邀请。"
								: "Traders who secure their first meaningful profits through the Dream Launch Program receive priority invitations to join the Compound Matrix."}
						</p>
					</div>
					<div className="group relative overflow-hidden rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 dark:from-gray-900 dark:via-emerald-950/30 dark:to-emerald-900/30 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
						<div className="absolute top-0 right-0 h-32 w-32 translate-x-1/4 -translate-y-1/4 rounded-full bg-emerald-200/50 dark:bg-emerald-500/10 blur-3xl transition-all group-hover:scale-110" />
						<h3 className="relative text-xl font-semibold text-gray-900 dark:text-white mb-3">{isZh ? "矩阵福利" : "Matrix Benefits"}</h3>
						<p className="relative text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "加入矩阵的交易员，将共享矩阵内所有成员的收益，实现收益总和共享、共创式增长。"
								: "Members share the combined returns of every trader in the matrix, transforming individual performance into collaborative growth."}
						</p>
					</div>
					<div className="group relative overflow-hidden rounded-2xl border border-sky-200/60 dark:border-sky-800/40 bg-gradient-to-br from-white via-sky-50 to-sky-100 dark:from-gray-900 dark:via-sky-950/30 dark:to-sky-900/30 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
						<div className="absolute top-0 right-0 h-32 w-32 translate-x-1/4 -translate-y-1/4 rounded-full bg-sky-200/50 dark:bg-sky-500/10 blur-3xl transition-all group-hover:scale-110" />
						<h3 className="relative text-xl font-semibold text-gray-900 dark:text-white mb-3">{isZh ? "持续资格要求" : "Ongoing Requirements"}</h3>
						<p className="relative text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "以周为单位保持不亏损，并将回撤控制在 10% 以内，即可持续留在矩阵中，共享复利效应。"
								: "Maintain non-negative weekly results and keep drawdowns within 10% to remain in the matrix and continue enjoying compounded gains."}
						</p>
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
							{isZh ? "绩效追踪面板" : "Performance Dashboard"}
						</h3>
						<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "矩阵提供透明的绩效面板，成员随时掌握整体收益情况与风险分布，确保每位交易员都能清晰了解自身贡献。"
								: "A transparent dashboard keeps members informed of aggregate performance and risk distribution, ensuring each trader understands their contribution."}
						</p>
					</div>
					<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
							{isZh ? "成长导师支持" : "Mentor Support"}
						</h3>
						<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "核心导师团队定期复盘与策略研讨，帮助交易员打磨策略、强化风控，实现稳定复利增长。"
								: "Core mentors host regular reviews and strategy sessions to help traders refine approaches, strengthen risk controls, and sustain compounded growth."}
						</p>
					</div>
				</div>
			</section>

			<section
				id="partners"
				className="space-y-10 rounded-3xl border border-gray-200/70 dark:border-gray-800/60 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900/40 backdrop-blur shadow-2xl px-8 py-12 md:px-14 md:py-16"
			>
				<div>
					<span className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
						{isZh ? "Structure 02" : "Structure 02"}
					</span>
					<h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
						{isZh ? "合伙人计划 · 共建浮力生态" : "Partner Program · Co-build the Fuli Ecosystem"}
					</h2>
					<p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
						{isZh
							? "浮力合伙人计划面向价值观高度契合、愿意共同建设生态的长期伙伴。"
							: "The Fuli Partnership Program invites long-term collaborators who deeply align with our values and want to grow the ecosystem together."}
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					<div className="rounded-2xl border border-sky-200/60 dark:border-sky-800/40 bg-white/85 dark:bg-gray-900/70 p-6 shadow-lg">
						<h3 className="text-base font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
							{isZh ? "合作定位" : "Positioning"}
						</h3>
						<p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "面向认同行业内长期主义价值的伙伴，强调理性判断、协同决策与共赢目标。"
								: "Focused on partners who champion long-term value, rational judgment, collaborative decision-making, and mutual success."}
						</p>
					</div>
					<div className="rounded-2xl border border-sky-200/60 dark:border-sky-800/40 bg-white/85 dark:bg-gray-900/70 p-6 shadow-lg">
						<h3 className="text-base font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
							{isZh ? "资源赋能" : "Enablement"}
						</h3>
						<p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "提供策略资源、资金支持、媒体曝光与线下沙龙，共建高密度价值网络。"
								: "Offers strategic resources, capital support, media exposure, and offline salons to co-create a high-value network."}
						</p>
					</div>
					<div className="rounded-2xl border border-sky-200/60 dark:border-sky-800/40 bg-white/85 dark:bg-gray-900/70 p-6 shadow-lg">
						<h3 className="text-base font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
							{isZh ? "长期运营" : "Operations"}
						</h3>
						<p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "以季度目标共建、年度复盘与定制化支持推动合伙人持续成长。"
								: "Quarterly goal co-creation, annual reviews, and tailored support drive sustained partner growth."}
						</p>
					</div>
				</div>

				<div className="space-y-6">
					<h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
						{isZh ? "合伙人流程 · 五个关键步骤" : "Partner Journey · Five Key Steps"}
					</h3>
					<ol className="grid gap-4 md:grid-cols-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
						<li className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/70 p-5 shadow-md">
							<span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-200 text-sm font-semibold">
								01
							</span>
							<p className="mt-3">
								{isZh
									? "通过合伙人理性认知测试，验证认知框架与风险判断。"
									: "Complete the partner rational cognition assessment to validate risk frameworks."}
							</p>
						</li>
						<li className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/70 p-5 shadow-md">
							<span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-200 text-sm font-semibold">
								02
							</span>
							<p className="mt-3">
								{isZh
									? "提交合伙人申请表，展示能力、资源与合作愿景。"
									: "Submit the partner application form outlining capabilities, resources, and vision."}
							</p>
						</li>
						<li className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/70 p-5 shadow-md">
							<span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-200 text-sm font-semibold">
								03
							</span>
							<p className="mt-3">
								{isZh
									? "开展价值观访谈，确认对浮力理念的信任与共鸣。"
									: "Participate in a values interview to confirm alignment with Fuli’s philosophy."}
							</p>
						</li>
						<li className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/70 p-5 shadow-md">
							<span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-200 text-sm font-semibold">
								04
							</span>
							<p className="mt-3">
								{isZh
									? "参加合伙人深度面谈，明确合作模式与阶段目标。"
									: "Join an in-depth partner interview to clarify collaboration modes and phased goals."}
							</p>
						</li>
						<li className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/70 p-5 shadow-md">
							<span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-200 text-sm font-semibold">
								05
							</span>
							<p className="mt-3">
								{isZh
									? "签署合作协议，获得定制化赋能与长期支持。"
									: "Sign the cooperation agreement and unlock tailored enablement with continuous support."}
							</p>
						</li>
					</ol>
				</div>
			</section>
		</div>
	);
}
