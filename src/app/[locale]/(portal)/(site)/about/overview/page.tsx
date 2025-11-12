"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";
import { motion } from "motion/react";

export default function AboutOverviewPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			{/* Hero Section with Background */}
			<div className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0b1f4a] to-[#122f63] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b-2 border-gray-800">
				{/* Decorative Background Elements */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
				</div>

				{/* Grid Pattern Overlay */}
				<div className="absolute inset-0 opacity-5" style={{
					backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
					backgroundSize: '50px 50px'
				}}></div>

				<div className="relative max-w-6xl mx-auto px-6 py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
							<span className="text-sm font-semibold tracking-wider text-white">
								{isZh ? "关于我们" : "About Us"}
							</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
							{isZh ? "浮力资本" : "Buoyancy Capital"}
						</h1>
						<div className="w-24 h-1 bg-white mx-auto mb-8"></div>
						<p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
							{isZh
								? "一个专注于金融交易的精英生态圈"
								: "An elite ecosystem focused on financial trading"}
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content Section */}
			<div className="max-w-5xl mx-auto px-6 py-20">
				{/* Introduction Paragraph */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mb-16"
				>
					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
						{isZh
							? "浮力资本，一个专注于金融交易的精英生态圈。我们为两大群体提供精准服务。"
							: "Buoyancy Capital, an elite ecosystem focused on financial trading. We provide precise services for two key groups."}
					</p>
				</motion.div>

				{/* Two Service Groups */}
				<div className="grid md:grid-cols-2 gap-8 mb-16">
					{/* Service Group 1 */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 hover:border-[#0b1f4a] dark:hover:border-white transition-all shadow-lg hover:shadow-xl"
					>
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 bg-[#0b1f4a] dark:bg-white flex items-center justify-center mr-4">
								<span className="text-2xl text-white dark:text-black font-bold">1</span>
							</div>
							<h3 className="text-2xl font-bold text-[#0b1f4a] dark:text-white">
								{isZh ? "职业交易员培养" : "Professional Trader Training"}
							</h3>
						</div>
						<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
							{isZh
								? "对于有志于金融交易的精英，我们提供体系化的职业培训，并以无风险资金，助力其实现从理论到实战的跨越。"
								: "For elites aspiring to financial trading, we provide systematic professional training and risk-free capital to help them transition from theory to practice."}
						</p>
					</motion.div>

					{/* Service Group 2 */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 hover:border-[#0b1f4a] dark:hover:border-white transition-all shadow-lg hover:shadow-xl"
					>
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 bg-[#0b1f4a] dark:bg-white flex items-center justify-center mr-4">
								<span className="text-2xl text-white dark:text-black font-bold">2</span>
							</div>
							<h3 className="text-2xl font-bold text-[#0b1f4a] dark:text-white">
								{isZh ? "优质投资机会" : "Premium Investment Opportunities"}
							</h3>
						</div>
						<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
							{isZh
								? "对于寻求资产增值的投资者，我们筛选顶级的回报机会。投资是价值观的共鸣。因此，我们仅接纳深度认同我们文化、理念并经过双向考察的合伙人。"
								: "For investors seeking asset appreciation, we curate top-tier return opportunities. Investment is a resonance of values. Therefore, we only accept partners who deeply align with our culture and philosophy and have passed mutual evaluation."}
						</p>
					</motion.div>
				</div>

				{/* Open Letter Section */}
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

				{/* Wealth Growth Section */}
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

				{/* Closing Statement */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="bg-gradient-to-r from-[#0b1f4a] to-[#122f63] dark:from-gray-800 dark:to-gray-700 text-white p-10 text-center mb-16 shadow-xl"
				>
					<p className="text-xl md:text-2xl font-semibold leading-relaxed">
						{isZh
							? "在这里，资本与才华在共同的价值观下相互成就。"
							: "Here, capital and talent achieve mutual success under shared values."}
					</p>
				</motion.div>

				{/* Action Buttons */}
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
		</div>
	);
}
