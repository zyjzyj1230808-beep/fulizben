"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { FadeInSlide, ScaleFadeIn } from "@/components/custom/AnimatedSection";

export default function AboutWealthPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";
	const heroImageSrc = "/浮力财富.png";
	const heroTitleLines = isZh
		? ["浮力财富", "优秀交易员共享复利红利"]
		: ["Fuli Wealth", "Unlock Collective Compounding for Elite Traders"];

	const partnerHighlights = [
		{
			title: isZh ? "合作定位" : "Positioning",
			body: isZh
				? "面向认同行业内长期主义价值的伙伴，强调理性判断、协同决策与共赢目标。"
				: "Focused on partners who champion long-term value, rational judgment, collaborative decision-making, and mutual success.",
			icon: "🎯",
		},
		{
			title: isZh ? "资源赋能" : "Enablement",
			body: isZh
				? "提供策略资源、资金支持、媒体曝光与线下沙龙，共建高密度价值网络。"
				: "Offers strategic resources, capital support, media exposure, and offline salons to co-create a high-value network.",
			icon: "🔗",
		},
		{
			title: isZh ? "长期运营" : "Operations",
			body: isZh
				? "以季度目标共建、年度复盘与定制化支持推动合伙人持续成长。"
				: "Quarterly goal co-creation, annual reviews, and tailored support drive sustained partner growth.",
			icon: "📈",
		},
	];

	const partnerSteps = (isZh
		? [
				"通过合伙人理性认知测试，验证认知框架与风险判断。",
				"提交合伙人申请表，展示能力、资源与合作愿景。",
				"开展价值观访谈，确认对浮力理念的信任与共鸣。",
				"参加合伙人深度面谈，明确合作模式与阶段目标。",
				"签署合作协议，获得定制化赋能与长期支持。",
		  ]
		: [
				"Complete the partner rational cognition assessment to validate risk frameworks.",
				"Submit the partner application form outlining capabilities, resources, and vision.",
				"Participate in a values interview to confirm alignment with Fuli’s philosophy.",
				"Join an in-depth partner interview to clarify collaboration modes and phased goals.",
				"Sign the cooperation agreement and unlock tailored enablement with continuous support.",
		  ]
	).map((text, idx) => ({ text, index: idx + 1 }));

	return (
		<>
			<section className="relative isolate overflow-hidden w-full min-h-screen bg-[#020817] text-white py-20 lg:py-28 flex items-center">
				<Image
					src={heroImageSrc}
					alt={isZh ? "财富协同背景图" : "Wealth collaboration background"}
					fill
					priority
					className="object-cover opacity-60"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#071b47]/85 to-transparent" />
				<div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
					<div className="space-y-8 max-w-2xl">
						<ScaleFadeIn>
							<div className="space-y-6">
								<span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
									{isZh ? "财富协同 · 共赢成长" : "Collaborative Wealth Growth"}
								</span>
								<h1 className="text-[2.5rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.08] tracking-tight drop-shadow-[0_35px_70px_rgba(8,30,71,0.55)]">
									{heroTitleLines.map((line, idx) => (
										<span key={line} className="block">
											{line}
										</span>
									))}
								</h1>
								<p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
									{isZh
										? "我们围绕稳健复利与长期合作打造专属生态，帮助具备成熟策略与风险控制的交易员持续放大优势、与志同道合的伙伴共同成长。"
										: "We build a dedicated ecosystem around stable compounding and long-term collaboration, enabling disciplined traders with proven strategies to amplify their strengths alongside aligned partners."}
								</p>
							</div>
						</ScaleFadeIn>
						<FadeInSlide direction="up">
							<div className="flex flex-wrap items-center gap-5 text-sm md:text-base text-white/80">
								<div className="flex items-center gap-3">
									<span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
									{isZh ? "稳健 · 共创 · 长期主义" : "Stability · Co-creation · Long-Term"}
								</div>
								<div className="flex items-center gap-3">
									<span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
									{isZh ? "专属服务支持交易员成长" : "Dedicated support for trader growth"}
								</div>
							</div>
						</FadeInSlide>
					</div>
					<FadeInSlide direction="left" className="w-full md:w-80 lg:w-96">
						<div className="rounded-2xl border border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
							<h2 className="text-lg font-semibold text-white mb-4">
								{isZh ? "核心优势速览" : "Key Advantages"}
							</h2>
							<ul className="space-y-3 text-sm text-white/80 leading-relaxed">
								<li className="flex items-start gap-3">
									<span className="mt-1 size-2 rounded-full bg-emerald-400" />
									<span>{isZh ? "严格甄选与持续跟踪，确保矩阵质量稳步升级。" : "Rigorous selection with ongoing monitoring keeps the matrix consistently high-quality."}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1 size-2 rounded-full bg-sky-400" />
									<span>{isZh ? "共享收益模型，兼顾个体努力与团队协同。" : "Shared return model balances individual excellence with team synergy."}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1 size-2 rounded-full bg-amber-400" />
									<span>{isZh ? "合伙人体系提供资源、资金、策略全面赋能。" : "Partnership framework delivers capital, resources, and strategic empowerment."}</span>
								</li>
							</ul>
						</div>
					</FadeInSlide>
				</div>
			</section>

			<div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
			<section
				id="compound-matrix"
				className="space-y-12 rounded-[36px] border border-white/10 bg-gradient-to-br from-[#040b1e] via-[#071430] to-[#0f224d] px-8 py-14 md:px-16 md:py-18 text-white shadow-[0_40px_120px_rgba(2,8,23,0.45)]"
			>
				<div className="space-y-4">
					<span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-amber-300 uppercase">
						{isZh ? "Structure 01" : "Structure 01"}
					</span>
					<h2 className="text-3xl md:text-4xl font-black">
						{isZh ? "复利矩阵 · 精英交易员共振平台" : "Compound Matrix · Platform for Elite Traders"}
					</h2>
					<p className="text-base md:text-lg text-white/75 leading-relaxed max-w-3xl">
						{isZh
							? "复利矩阵专为已经具备稳定盈利能力的交易员而设，为他们提供共享收益、放大资本效能的平台。"
							: "The Compound Matrix is tailored to traders with established profitability, offering a structure to share returns and amplify capital efficiency."}
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{[
						{
							title: isZh ? "加入资格" : "Eligibility",
							body: isZh
								? "通过“梦想启航计划”赚到第一桶金的交易员，即可获得进入复利矩阵的优先邀请。"
								: "Traders who secure their first meaningful profits through the Dream Launch Program receive priority invitations to join the Compound Matrix.",
							accent: "from-amber-400/20 via-amber-400/5 to-transparent",
						},
						{
							title: isZh ? "矩阵福利" : "Matrix Benefits",
							body: isZh
								? "加入矩阵的交易员，将共享矩阵内所有成员的收益，实现收益总和共享、共创式增长。"
								: "Members share the combined returns of every trader in the matrix, transforming individual performance into collaborative growth.",
							accent: "from-emerald-300/20 via-emerald-300/5 to-transparent",
						},
						{
							title: isZh ? "持续资格要求" : "Ongoing Requirements",
							body: isZh
								? "以周为单位保持不亏损，并将回撤控制在 10% 以内，即可持续留在矩阵中，共享复利效应。"
								: "Maintain non-negative weekly results and keep drawdowns within 10% to remain in the matrix and continue enjoying compounded gains.",
							accent: "from-sky-300/20 via-sky-300/5 to-transparent",
						},
					].map((item) => (
						<div
							key={item.title}
							className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-[0_25px_70px_rgba(2,8,23,0.4)] transition-transform hover:-translate-y-1"
						>
							<div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${item.accent}`} />
							<div className="relative space-y-3">
								<h3 className="text-xl font-semibold">{item.title}</h3>
								<p className="text-sm text-white/80 leading-relaxed">{item.body}</p>
							</div>
						</div>
					))}
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-[0_25px_60px_rgba(2,8,23,0.35)]">
						<h3 className="text-lg font-semibold mb-3">
							{isZh ? "绩效追踪面板" : "Performance Dashboard"}
						</h3>
						<p className="text-sm text-white/75 leading-relaxed">
							{isZh
								? "矩阵提供透明的绩效面板，成员随时掌握整体收益情况与风险分布，确保每位交易员都能清晰了解自身贡献。"
								: "A transparent dashboard keeps members informed of aggregate performance and risk distribution, ensuring each trader understands their contribution."}
						</p>
					</div>
					<div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-[0_25px_60px_rgba(2,8,23,0.35)]">
						<h3 className="text-lg font-semibold mb-3">
							{isZh ? "成长导师支持" : "Mentor Support"}
						</h3>
						<p className="text-sm text-white/75 leading-relaxed">
							{isZh
								? "核心导师团队定期复盘与策略研讨，帮助交易员打磨策略、强化风控，实现稳定复利增长。"
								: "Core mentors host regular reviews and strategy sessions to help traders refine approaches, strengthen risk controls, and sustain compounded growth."}
						</p>
					</div>
				</div>
			</section>

			<section
				id="partners"
				className="space-y-12 rounded-[36px] border border-white/10 bg-gradient-to-br from-[#040b1e] via-[#071430] to-[#0f224d] px-8 py-16 md:px-16 md:py-20 text-white shadow-[0_40px_120px_rgba(2,8,23,0.45)]"
			>
				<div className="space-y-4">
					<span className="text-xs md:text-sm font-semibold tracking-[0.35em] text-sky-200 uppercase">
						{isZh ? "Structure 02" : "Structure 02"}
					</span>
					<h2 className="text-3xl md:text-4xl font-black">
						{isZh ? "合伙人计划 · 共建浮力生态" : "Partner Program · Co-build the Fuli Ecosystem"}
					</h2>
					<p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
						{isZh
							? "浮力合伙人计划面向价值观高度契合、愿意共同建设生态的长期伙伴。"
							: "The Fuli Partnership Program invites long-term collaborators who deeply align with our values and want to grow the ecosystem together."}
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{partnerHighlights.map((item) => (
						<div
							key={item.title}
							className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-[0_25px_70px_rgba(2,8,23,0.4)] transition hover:-translate-y-1"
						>
							<div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
								{item.icon}
							</div>
							<h3 className="text-base font-semibold uppercase tracking-[0.35em] text-sky-200">{item.title}</h3>
							<p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">{item.body}</p>
						</div>
					))}
				</div>

				<div className="space-y-6">
					<h3 className="text-xl md:text-2xl font-bold">
						{isZh ? "合伙人流程 · 五个关键步骤" : "Partner Journey · Five Key Steps"}
					</h3>
					<ol className="grid gap-4 md:grid-cols-5 text-sm text-white/80 leading-relaxed">
						{partnerSteps.map((step) => (
							<li
								key={step.index}
								className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(2,8,23,0.35)]"
							>
								<div className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white text-sm font-semibold">
									{step.index.toString().padStart(2, "0")}
								</div>
								<p>{step.text}</p>
							</li>
						))}
					</ol>
				</div>
			</section>
			</div>
		</>
	);
}
