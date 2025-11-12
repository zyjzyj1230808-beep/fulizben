"use client";

import React from "react";
import { motion } from "motion/react";
import LocaleLink from "@/components/navigation/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";

const narrativeContent = (language: string) =>
	language === "zh"
		? "浮力资本，一个专注于金融交易的精英生态圈。我们为两大群体提供精准服务。对于有志于金融交易的精英，我们提供体系化的职业培训，并以无风险资金，助力其实现从理论到实战的跨越。对于寻求资产增值的投资者，我们筛选顶级的回报机会。投资是价值观的共鸣。因此，我们仅接纳深度认同我们文化、理念并经过双向考察的合伙人。在这里，资本与才华在共同的价值观下相互成就。"
		: "Buoyancy Capital is an elite ecosystem dedicated to financial trading. We serve two primary communities with precision. For ambitious traders, we provide systematic professional training and risk-free capital to bridge the gap from theory to live execution. For investors pursuing asset growth, we curate top-tier opportunities, partnering only with those who share our values and have undergone mutual assessment. Here, capital and talent succeed together under shared convictions.";

const heroTitle = (language: string) =>
	language === "zh"
		? "浮力资本"
		: "Buoyancy Capital";

const heroBody = (language: string) =>
	language === "zh"
		? "浮力资本是一个专注于金融交易的精英生态圈。我们为两大群体提供精准服务。对于有志于金融交易的精英，我们提供体系化的职业培训，并以无风险资金，助力其实现从理论到实战的跨越。对于寻求资产增值的投资者，我们筛选顶级的回报机会。投资是价值观的共鸣。因此，我们仅接纳深度认同我们文化、理念并经过双向考察的合伙人。在这里，资本与才华在共同的价值观下相互成就。"
		: "Buoyancy Capital is an elite ecosystem dedicated to financial trading. We serve two primary communities with precision. For ambitious traders, we provide systematic professional training and risk-free capital to bridge the gap from theory to live execution. For investors pursuing asset growth, we curate top-tier opportunities and partner only with those who share our values and have undergone mutual assessment. Here, capital and talent succeed together under shared convictions.";

export default function AboutOverviewPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";
	const narrative = narrativeContent(language);

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div
				className="relative overflow-hidden border-b-2 border-gray-800 bg-cover bg-center bg-no-repeat"
				style={
					{
						backgroundImage:
							"linear-gradient(120deg, rgba(2,6,23,0.85) 0%, rgba(10,18,41,0.78) 40%, rgba(18,47,99,0.75) 100%), url('https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1920&q=80')",
					}
				}
			>
				<div className="relative max-w-6xl mx-auto px-6 py-32 lg:py-40 min-h-[85vh] flex items-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-4xl md:ml-0 text-left space-y-8"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug tracking-tight">
							{heroTitle(language)}
						</h1>
						<p className="text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed space-y-6">
							<span className="block">{isZh ? "浮力资本，一个专注于金融交易的精英生态圈。我们为两大群体提供精准服务。" : "Buoyancy Capital, an elite ecosystem dedicated to financial trading. We serve two primary communities with precision."}</span>
							<span className="block">{isZh
								? "对于有志于金融交易的精英，我们提供体系化的职业培训，并以无风险资金，助力其实现从理论到实战的跨越。"
								: "For ambitious traders, we provide systematic professional training and risk-free capital to bridge the gap from theory to live execution."}</span>
							<span className="block">{isZh
								? "对于寻求资产增值的投资者，我们筛选顶级的回报机会。投资是价值观的共鸣。因此，我们仅接纳深度认同我们文化、理念并经过双向考察的合伙人。"
								: "For investors pursuing asset growth, we curate top-tier opportunities. Investment reflects shared values, so we partner only with those who align deeply with our ethos and pass mutual assessment."}</span>
							<span className="block">{isZh ? "在这里，资本与才华在共同的价值观下相互成就。" : "Here, capital and talent succeed together under shared convictions."}</span>
						</p>
					</motion.div>
				</div>
			</div>

			<motion.section
				id="open-letter"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.45 }}
				className="mb-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-10 rounded-lg shadow-lg"
			>
				<h2 className="text-3xl font-bold mb-6 text-[#0b1f4a] dark:text-white">
					{isZh ? "公开信" : "Open Letter"}
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
					{isZh
						? "在浮力资本，成为职业交易员并非捷径，而是一条严谨且高标准的成长之路。我们提供系统化训练、纪律与方法论，帮助你建立从认知到执行的完整闭环。"
						: "At Buoyancy Capital, becoming a professional trader is not a shortcut but a rigorous, high-standard journey. We provide structured training, discipline, and methodology to build a complete loop from cognition to execution."}
				</p>
				<p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
					{isZh
						? "若你具备长期主义、强自驱和对风险的敬畏，我们欢迎你与我们同行。"
						: "If you value long-termism, strong self-drive, and a deep respect for risk, we welcome you to walk with us."}
				</p>
			</motion.section>

			<motion.section
				id="wealth-growth"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.55 }}
				className="mb-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 rounded-lg shadow-lg"
			>
				<h2 className="text-3xl font-bold mb-6 text-[#0b1f4a] dark:text-white">
					{isZh ? "财富自增" : "Wealth Growth"}
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
					{isZh
						? "我们为严肃的长期投资者甄选优质回报机会，只与价值观一致、互相审视后的合伙人同行。"
						: "We curate quality opportunities for serious long-term investors, partnering only with those aligned in values after mutual diligence."}
				</p>
				<div className="flex flex-wrap gap-4">
					<LocaleLink
						href="/products"
						className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-gray-200 dark:hover:text-black transition-colors"
					>
						{isZh ? "查看产品与服务" : "View Products and Services"}
					</LocaleLink>
					<LocaleLink
						href="/splan/faq"
						className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold"
					>
						{isZh ? "了解常见问题" : "Read FAQ"}
					</LocaleLink>
				</div>
			</motion.section>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.65 }}
				className="flex flex-wrap justify-center gap-6"
			>
				<LocaleLink
					href="#open-letter"
					className="px-8 py-4 border-2 border-[#0b1f4a] dark:border-white text-[#0b1f4a] dark:text-white hover:bg-[#0b1f4a] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-bold text-lg shadow-lg hover:shadow-xl"
				>
					{isZh ? "阅读公开信" : "Read Open Letter"}
				</LocaleLink>
				<LocaleLink
					href="#wealth-growth"
					className="px-8 py-4 border-2 border-[#0b1f4a] dark:border-white text-[#0b1f4a] dark:text-white hover:bg-[#0b1f4a] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-bold text-lg shadow-lg hover:shadow-xl"
				>
					{isZh ? "了解财富自增" : "Explore Wealth Growth"}
				</LocaleLink>
				<LocaleLink
					href="/about/contact"
					className="px-8 py-4 bg-[#0b1f4a] dark:bg-white text-white dark:text-black font-bold border-2 border-[#0b1f4a] dark:border-white hover:bg-[#122f63] dark:hover:bg-gray-200 transition-all text-lg shadow-lg hover:shadow-xl"
				>
					{isZh ? "联系我们" : "Contact Us"}
				</LocaleLink>
			</motion.div>
		</div>
	);
}
