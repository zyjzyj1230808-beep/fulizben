"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";

export default function MarketBarometerPage() {
	const { language } = useLanguage();
	const isZh = language === "zh";

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0b1f4a] to-[#122f63] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b-2 border-gray-800">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
					<div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
				</div>
				<div className="relative max-w-6xl mx-auto px-6 py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
							<span className="text-sm font-semibold tracking-wider text-white">
								{isZh ? "市场分析" : "Market Analysis"}
							</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
							{isZh ? "浮力市场晴雨表" : "Market Barometer"}
						</h1>
						<div className="w-24 h-1 bg-white mx-auto mb-8" />
						<p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
							{isZh
								? "实时监测市场情绪，洞察交易机会"
								: "Real-time market sentiment monitoring and trading opportunity insights"}
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-5xl mx-auto px-6 py-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="space-y-8"
				>
					<div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg">
						<h2 className="text-3xl font-bold mb-6 text-[#0b1f4a] dark:text-white">
							{isZh ? "市场晴雨表简介" : "About Market Barometer"}
						</h2>
						<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
							{isZh
								? "浮力市场晴雨表是我们为交易者提供的专业市场分析工具，通过综合多个维度的市场数据，实时反映当前市场的整体情绪和趋势。"
								: "The Market Barometer is our professional market analysis tool for traders, reflecting real-time overall market sentiment and trends through comprehensive multi-dimensional market data."}
						</p>
						<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
							{isZh
								? "我们整合了技术指标、资金流向、波动率、市场情绪等多个关键因素，为交易者提供清晰的市场状态评估，帮助做出更明智的交易决策。"
								: "We integrate key factors including technical indicators, capital flows, volatility, and market sentiment to provide traders with clear market state assessments, helping them make more informed trading decisions."}
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg"
						>
							<h3 className="text-2xl font-bold mb-4 text-[#0b1f4a] dark:text-white">
								{isZh ? "核心功能" : "Core Features"}
							</h3>
							<ul className="space-y-3 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "实时市场情绪指数监测"
											: "Real-time market sentiment index monitoring"}
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "多维度技术指标综合分析"
											: "Comprehensive multi-dimensional technical indicator analysis"}
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "资金流向与持仓数据追踪"
											: "Capital flow and position data tracking"}
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "市场波动率风险评估"
											: "Market volatility risk assessment"}
									</span>
								</li>
							</ul>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg"
						>
							<h3 className="text-2xl font-bold mb-4 text-[#0b1f4a] dark:text-white">
								{isZh ? "使用价值" : "Value Proposition"}
							</h3>
							<ul className="space-y-3 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "快速把握市场整体趋势方向"
											: "Quickly grasp overall market trend direction"}
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "识别潜在交易机会与风险点"
											: "Identify potential trading opportunities and risk points"}
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "优化交易时机选择与仓位管理"
											: "Optimize trade timing and position management"}
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-[#0b1f4a] dark:text-white mr-2">•</span>
									<span>
										{isZh
											? "提升交易决策的科学性与准确性"
											: "Enhance the scientific accuracy of trading decisions"}
									</span>
								</li>
							</ul>
						</motion.div>
					</div>

					<div className="bg-gradient-to-r from-[#0b1f4a] to-[#122f63] dark:from-gray-800 dark:to-gray-700 text-white p-10 rounded-lg shadow-xl text-center">
						<p className="text-xl md:text-2xl font-semibold leading-relaxed">
							{isZh
								? "通过数据驱动，让市场洞察更清晰，交易决策更精准。"
								: "Data-driven insights for clearer market understanding and more precise trading decisions."}
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

