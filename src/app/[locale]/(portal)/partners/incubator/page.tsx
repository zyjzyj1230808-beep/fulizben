"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IncubatorPartnerPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-6 text-black dark:text-white">
          {isZh ? "战略合作伙伴 · 稳准狠自营交易孵化器" : "Strategic Partner · WZH Prop Trading Incubator"}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          {isZh
            ? "稳准狠自营交易孵化器专注于交易员遴选、实战训练与资金合作，为通过考核的交易员提供从模拟到实盘的全链路支持。"
            : "The WZH Prop Trading Incubator focuses on trader selection, practical training, and funding partnerships, offering end-to-end support from demo to live trading."}
        </p>
      </div>
    </div>
  );
}


