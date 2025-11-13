"use client";

import React from "react";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function FuliSupportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative">
        <div className="absolute inset-0">
          <div className="h-40 bg-gradient-to-r from-[#0b1f4a] via-[#122f63] to-[#0b1f4a] opacity-10 dark:opacity-20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-16">
          <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
            <div className="bg-gradient-to-r from-black to-gray-900 dark:from-white dark:to-gray-100 px-6 py-4 border-b-2 border-black dark:border-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-white dark:bg-black text-black dark:text-white font-black text-xl">🚀</span>
                <h1 className="text-2xl md:text-3xl font-black text-white dark:text-black">梦想启航项目</h1>
              </div>
              <span className="px-3 py-1 text-xs md:text-sm font-bold bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white">
                Fuli Support
              </span>
            </div>
            <div className="p-6 md:p-10">
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                通过赞助、奖金激励与严谨的申请机制，帮助通过考核的交易员快速启航，迈向职业化之路。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">A</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">赞助</h3>
                      <p className="text-gray-700 dark:text-gray-300">提供 10万 - 100万 的挑战账号</p>
                    </div>
                  </div>
                </div>
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">B</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">奖金</h3>
                      <p className="text-gray-700 dark:text-gray-300">挑战账户收益的 60% 以上现金奖励</p>
                    </div>
                  </div>
                </div>
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">C</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">申请资格</h3>
                      <p className="text-gray-700 dark:text-gray-300">模拟账户通过考核的交易员</p>
                    </div>
                  </div>
                </div>
                <div className="group border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">D</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">合作机构推荐</h3>
                      <p className="text-gray-700 dark:text-gray-300">交易员孵化器</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <LocaleLink
                  href="/splan/join-us"
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all text-center"
                >
                  立即申请
                </LocaleLink>
                <LocaleLink
                  href="/splan/faq"
                  className="px-6 py-3 bg-transparent text-black dark:text-white font-bold border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-center"
                >
                  查看常见问题
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

