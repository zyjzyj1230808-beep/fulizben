"use client";

import React from "react";
import LocaleLink from "@/components/navigation/LocaleLink";

const applicationTiers = [
	{
		id: "public",
		label: { zh: "公益名额", en: "Public Benefit Tier" },
		badge: { zh: "免费", en: "Free" },
		fee: { zh: "报名费：免费（99 元押金）", en: "Application Fee: Free (¥99 deposit)" },
		requirements: {
			zh: ["国内 985 或海外 TOP50 本科及以上学历", "35 岁以下人士"],
			en: ["Domestic 985 or overseas TOP50 bachelor degree and above", "Applicants under 35"],
		},
		rules: {
			zh: [
				"需先缴纳 99 元押金，领取课程资料后提交不少于 800 字学习报告，可申请退还押金",
				"通过小额实盘考核后，获得「梦想启航」资格：10万-100万无风险资金账户",
				"训练期间不遵守要求、无故缺勤 2 次以上或未提交交易总结，视为自动退出",
				"每人仅 1 次免费申请机会，放弃或未通过者需以挑战名额方式重新申请",
			],
			en: [
				"Pay ¥99 deposit first; submit ≥800-word study report after receiving materials to request a refund",
				"Pass the micro live test to unlock “Dream Launch” funding: ¥100k-1m risk-free capital",
				"Non-compliance, two unexcused absences, or missing journals leads to automatic withdrawal",
				"Only one free attempt; quitting or failing requires reapplying via the Challenge Tier",
			],
		},
		tip: {
			zh: "提示：请提前准备学习报告与模拟账户成绩，提高押金退还成功率。",
			en: "Tip: Prepare study reports and sim results in advance to secure your deposit refund.",
		},
	},
	{
		id: "challenge",
		label: { zh: "挑战名额", en: "Challenge Tier" },
		badge: { zh: "¥999", en: "¥999" },
		fee: { zh: "报名费：999 元", en: "Application Fee: ¥999" },
		requirements: {
			zh: ["大专及以上学历", "40 岁以下人士"],
			en: ["Associate degree or above", "Applicants under 40"],
		},
		rules: {
			zh: [
				"通过模拟考核（连续 10 个交易日不亏损）可申请退还报名费",
				"通过小额实盘考核后，获得「梦想启航」资格：10万-100万无风险资金账户",
				"训练期间不遵守要求、无故缺勤 2 次以上或未提交交易总结，视为自动退出且不退报名费",
			],
			en: [
				"Pass the simulation test (10 consecutive non-losing trading days) to request a refund",
				"Pass the micro live test to unlock “Dream Launch” funding: ¥100k-1m risk-free capital",
				"Non-compliance, two unexcused absences, or missing journals leads to automatic withdrawal without refund",
			],
		},
		tip: {
			zh: "建议：提前完成模拟训练，提高一次性通过率并节省成本。",
			en: "Advice: Complete simulation drills early to boost pass rate and save on costs.",
		},
	},
	{
		id: "commercial",
		label: { zh: "商业名额", en: "Commercial Tier" },
		badge: { zh: "¥1999", en: "¥1999" },
		fee: { zh: "报名费：1999 元", en: "Application Fee: ¥1999" },
		requirements: {
			zh: ["申请资格无限制"],
			en: ["Open to all applicants"],
		},
		rules: {
			zh: [
				"通过模拟考核（连续 10 个交易日不亏损）可申请退还报名费",
				"通过小额实盘考核后，获得「梦想启航」资格：10万-100万无风险资金账户",
				"训练期间不遵守要求、无故缺勤 2 次以上或未提交交易总结，视为自动退出且不退报名费",
			],
			en: [
				"Pass the simulation test (10 consecutive non-losing trading days) to request a refund",
				"Pass the micro live test to unlock “Dream Launch” funding: ¥100k-1m risk-free capital",
				"Non-compliance, two unexcused absences, or missing journals leads to automatic withdrawal without refund",
			],
		},
		tip: {
			zh: "适合希望直接进入密集训练流程的交易者，请提前规划训练时间。",
			en: "Ideal for traders who want fast-track intensive training; plan your schedule early.",
		},
	},
];

const hiddenTierTips = new Set([
	"提示：请提前准备学习报告与模拟账户成绩，提高押金退还成功率。",
	"建议：提前完成模拟训练，提高一次性通过率并节省成本。",
]);

export default function FuliSupportPage() {
	return (
		<div className="min-h-screen bg-white text-slate-900">
			<section className="relative overflow-hidden text-white">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -left-40 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
					<div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
					<div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020b27] to-[#030817]" />
				</div>

				<div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 lg:pt-24 lg:pb-20">
					<div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-center">
						<div className="max-w-2xl space-y-8">
							<div className="space-y-6">
								<span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold tracking-[0.3em] text-emerald-100 uppercase shadow-[0_18px_45px_rgba(16,185,129,0.55)]">
									FULI SUPPORT · 梦想启航项目
								</span>
								<h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
									梦想启航项目
								</h1>
								<p className="text-lg text-slate-100/80 leading-relaxed">
									30 个工作日精准筛选，直接接入 10万-100万 无风险资金，并以 ≥60% 战利品分成启动你的职业交易旅程。
								</p>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="rounded-2xl border border-white/20 bg-white/5 px-5 py-4 backdrop-blur-lg shadow-[0_18px_45px_rgba(16,185,129,0.45)]">
										<p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/90 mb-1">
											无风险资金账户
										</p>
										<p className="text-xl font-black text-white">
											10万 - 100万 人民币挑战账号
										</p>
										<p className="text-xs text-slate-100/70 mt-1">
											通过小额实盘考核当日即可领取，亏损由项目承保。
										</p>
									</div>
									<div className="rounded-2xl border border-white/20 bg-white/5 px-5 py-4 backdrop-blur-lg shadow-[0_18px_45px_rgba(56,189,248,0.45)]">
										<p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/90 mb-1">
											战利品分成
										</p>
										<p className="text-xl font-black text-white">
											收益分成 ≥ 60%
										</p>
										<p className="text-xs text-slate-100/70 mt-1">
											独立交易，盈利六成以上归你，表现优异可升至 90%。
										</p>
									</div>
								</div>
							</div>

							<div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-100/75">
								<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-xs font-semibold text-emerald-200 uppercase tracking-[0.2em]">
										01
									</span>
									<div>
										<p className="font-semibold text-white">30 天双重考核</p>
										<p className="text-xs text-slate-100/60">规则 + 模拟 + 心理测评一次完成</p>
									</div>
								</div>
								<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/20 text-xs font-semibold text-sky-100 uppercase tracking-[0.2em]">
										02
									</span>
									<div>
										<p className="font-semibold text-white">通过即刻上阵</p>
										<p className="text-xs text-slate-100/60">直接配对无风险资金与专属教练</p>
									</div>
								</div>
							</div>

							<div className="flex flex-wrap gap-4">
								<LocaleLink
									href="/splan/join-us"
									className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_rgba(16,185,129,0.65)] hover:shadow-[0_22px_60px_rgba(56,189,248,0.75)] transition-all"
								>
									立即申请
								</LocaleLink>
								<LocaleLink
									href="/splan/faq"
									className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/15 hover:border-white/40 transition-all"
								>
									查看常见问题
								</LocaleLink>
							</div>
						</div>

						<div className="w-full max-w-md lg:max-w-sm">
							<div className="relative rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
								<div className="space-y-3">
									<div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/40 hover:bg-white/10 transition-colors">
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.45)]">
											A
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-semibold text-white">考核节奏</h3>
											<p className="mt-1 text-xs text-white/70">规则 → 盈利 → 小额实盘三段式完成于 30 个工作日内。</p>
										</div>
									</div>
									<div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/40 hover:bg-white/10 transition-colors">
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-400 text-sm font-black text-slate-950 shadow-[0_10px_30px_rgba(56,189,248,0.45)]">
											B
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-semibold text-white">资金矩阵</h3>
											<p className="mt-1 text-xs text-white/70">通过考核即接入 10万 - 100万 人民币无风险资金，按能力升级额度。</p>
										</div>
									</div>
									<div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/40 hover:bg-white/10 transition-colors">
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-slate-950 shadow-[0_10px_30px_rgba(251,191,36,0.45)]">
											C
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-semibold text-white">收益分配</h3>
											<p className="mt-1 text-xs text-white/70">基础战利品分成 60%，持续稳定可获更高等级。</p>
										</div>
									</div>
									<div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/40 hover:bg-white/10 transition-colors">
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-400 text-sm font-black text-slate-950 shadow-[0_10px_30px_rgba(244,114,182,0.45)]">
											D
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-semibold text-white">风险兜底</h3>
											<p className="mt-1 text-xs text-white/70">挑战阶段亏损由项目承保，专注执行即可。</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</section>

			<main className="max-w-6xl mx-auto px-6 pb-20 space-y-16 lg:space-y-20">
				<section
					id="apply"
					className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-white px-6 py-10 md:px-10 md:py-12 shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
				>
					<div className="pointer-events-none absolute inset-0 opacity-40">
						<div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-sky-500/30 blur-3xl" />
					</div>
					<div className="relative space-y-8">
						<div className="text-center md:text-left space-y-3">
							<div className="inline-flex items-center rounded-full border border-emerald-200/70 bg-emerald-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-700">
								APPLICATION FLOW
							</div>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900">提交申请 · 双重甄选流程</h2>
							<p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
								我们更看重态度与动机，而非空洞的承诺。认真填写报名表，是对训练的敬畏；深度动机面试，则确保你不是来「赌一把」，而是愿意把交易当成终身事业。
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6">
								<div className="mb-4 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] text-emerald-700">
									STEP 01
								</div>
								<h3 className="text-xl font-semibold mb-3">提交申请 · 填写申请表</h3>
								<p className="text-sm text-slate-700 leading-relaxed">
									态度测试：我们会从字里行间判断你是否认真对待报名表。越具体的经历、越真实的交易复盘，越能看出你的投入度与自驱力。敷衍填表会被直接淘汰。
								</p>
								<ul className="mt-5 space-y-2 text-xs md:text-sm text-slate-700">
									<li className="flex gap-2">
										<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
										<span>详细描述过往交易经验与最大的学习挫折。</span>
									</li>
									<li className="flex gap-2">
										<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
										<span>上传近期交易日志或成绩截图，证明你已投入实践。</span>
									</li>
									<li className="flex gap-2">
										<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
										<span>明确可投入的时间与资源，避免盲目承诺。</span>
									</li>
								</ul>
								<div className="mt-6">
									<LocaleLink
										href="/splan/join-us"
										className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300 px-5 py-2 text-xs md:text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(16,185,129,0.7)] hover:shadow-[0_20px_60px_rgba(56,189,248,0.75)] transition-all"
									>
										填写申请表
									</LocaleLink>
								</div>
							</div>

							<div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6">
								<div className="mb-4 inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] text-sky-700">
									STEP 02
								</div>
								<h3 className="text-xl font-semibold mb-3">面试 · 动机深度访谈</h3>
								<p className="text-sm text-slate-700 leading-relaxed">
									我们会深入了解你为何想成为交易员：是为了短期暴富，还是把它视为值得深耕的终身职业？只有内在驱动力强、具备职业敬畏心的人，才能进入下一阶段。
								</p>
								<ul className="mt-5 space-y-2 text-xs md:text-sm text-slate-700">
									<li className="flex gap-2">
										<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
										<span>动机访谈：拆解你对交易的理解、目标与长期计划。</span>
									</li>
									<li className="flex gap-2">
										<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
										<span>风险观测试：评估你是否具备敬畏市场的心态。</span>
									</li>
									<li className="flex gap-2">
										<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
										<span>职业化评估：确认你愿意遵守训练纪律并持续复盘。</span>
									</li>
								</ul>
								<p className="mt-6 text-[11px] md:text-xs text-slate-500 leading-relaxed">
									提示：无需夸大成绩，坦诚分享真实经历与反思，远比包装出来的精彩故事更重要。
								</p>
							</div>
						</div>
					</div>
				</section>

				<section
					id="tiers"
					className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-white px-6 py-10 md:px-10 md:py-12 shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
				>
					<div className="pointer-events-none absolute inset-0 opacity-40">
						<div className="absolute -bottom-24 left-0 h-52 w-52 rounded-full bg-emerald-500/30 blur-3xl" />
					</div>
					<div className="relative space-y-8">
						<div className="text-center space-y-3">
							<div className="inline-flex items-center rounded-full border border-sky-200/80 bg-sky-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-sky-700">
								APPLY CONDITIONS
							</div>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900">申请条件与资格路径</h2>
							<p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
								根据背景与目标选择合适的名额类型，完成对应考核即可逐步解锁「梦想启航」资金支持。
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-3">
							{applicationTiers.map((tier) => (
								<div
									key={tier.id}
									className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
								>
									<div>
										<div className="mb-2 flex items-center justify-between gap-3">
											<h3 className="text-xl font-semibold text-slate-900">{tier.label.zh}</h3>
											<span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
												{tier.badge.zh}
											</span>
										</div>
										<p className="text-xs md:text-sm text-slate-500">{tier.fee.zh}</p>
									</div>

									<div>
										<h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">申请资格</h4>
										<ul className="space-y-2 text-xs md:text-sm text-slate-700">
											{tier.requirements.zh.map((req) => (
												<li key={req} className="flex items-start gap-2">
													<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-300" />
													<span>{req}</span>
												</li>
											))}
										</ul>
									</div>

									<div>
										<h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">规则</h4>
										<ol className="space-y-2 text-xs md:text-sm text-slate-700 list-decimal list-inside">
											{tier.rules.zh.map((rule) => (
												<li key={rule}>{rule}</li>
											))}
										</ol>
									</div>

									<div className="border-t border-slate-100 pt-4">
										{!hiddenTierTips.has(tier.tip.zh) && (
											<p className="text-[11px] md:text-xs text-slate-500 leading-relaxed">{tier.tip.zh}</p>
										)}
										{tier.id === "public" && (
											<div className="mt-4">
												<LocaleLink
													href="/splan/join-us"
													className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300 px-4 py-2 text-xs md:text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(16,185,129,0.7)] hover:shadow-[0_20px_60px_rgba(56,189,248,0.75)] transition-all"
												>
													前往免费培训
												</LocaleLink>
											</div>
										)}
										{tier.id === "commercial" && (
											<div className="mt-4">
												<LocaleLink
													href="/splan/donate"
													className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs md:text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition-all"
												>
													捐赠支持
												</LocaleLink>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section
					id="psychology"
					className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-white px-6 py-10 md:px-10 md:py-12 shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
				>
					<div className="pointer-events-none absolute inset-0 opacity-40">
						<div className="absolute top-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-3xl" />
					</div>
					<div className="relative space-y-8">
						<div className="text-center space-y-3">
							<div className="inline-flex items-center rounded-full border border-fuchsia-200/80 bg-fuchsia-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-700">
								PSY TEST &amp; BASIC REQUIREMENTS
							</div>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900">心理测评与申请基本要求</h2>
						</div>

						<div className="grid gap-8 lg:grid-cols-2">
							<div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
								<div className="inline-flex items-center rounded-full border border-fuchsia-100 bg-fuchsia-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] mb-4 text-fuchsia-700">
									PSY TEST
								</div>
								<h3 className="text-2xl font-semibold mb-3 text-slate-900">心理测评：风险与心态审查</h3>
								<p className="text-sm text-slate-700 leading-relaxed mb-5">
									我们拒绝赌徒心态与极端风险厌恶者，确保参训者具备理性、沉着的心理素质。心理测评覆盖以下维度：
								</p>
								<ul className="space-y-2 text-xs md:text-sm text-slate-700">
									{["风险偏好", "纪律性", "情绪稳定性", "抗压能力"].map((item) => (
										<li key={item} className="flex items-start gap-3">
											<span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
											<span>{item}</span>
										</li>
									))}
								</ul>
								<p className="mt-5 text-[11px] md:text-xs text-slate-500 leading-relaxed">
									说明：完成心理测评是进入训练营的必要步骤，测评不合格将无法参与后续阶段。
								</p>
								<div className="mt-6">
									<LocaleLink
										href="/splan/psychology-test"
										className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300 px-5 py-2 text-xs md:text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(244,114,182,0.75)] hover:shadow-[0_22px_60px_rgba(251,191,36,0.8)] transition-all"
									>
										立即进行心理测评
									</LocaleLink>
								</div>
							</div>

							<div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] space-y-5">
								<div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-[11px] font-semibold tracking-[0.25em] text-slate-700">
									BASIC REQUIREMENTS
								</div>
								<h3 className="text-2xl font-semibold text-slate-900">申请基本要求</h3>
								<div className="space-y-4 text-xs md:text-sm text-slate-700">
									<div>
										<p className="mb-1 font-semibold text-slate-900">时间要求</p>
										<p>北京时间 7:00 - 次日 6:00 之间，需保证至少连续 8 小时固定在线时间段。推荐交易时间为 13:00 - 23:00。</p>
									</div>
									<div>
										<p className="mb-1 font-semibold text-slate-900">设备要求</p>
										<p>自有 Windows 电脑；若使用 macOS，需自行购买云电脑。确保稳定网络与专业交易软件。</p>
									</div>
									<div>
										<p className="mb-1 font-semibold text-slate-900">环境要求</p>
										<p>安静、独立、不受打扰的交易环境，避免外界干扰。</p>
									</div>
									<div>
										<p className="mb-1 font-semibold text-slate-900">经济与心态</p>
										<p>经济生活无压力，能承受至少 3-6 个月的学习与实训周期。如果希望短期暴富或一夜暴富，请绕道而行。</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}


