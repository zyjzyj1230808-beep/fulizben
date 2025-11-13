"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MagicUniversityPartnerPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-6 text-black dark:text-white">
          {isZh ? "战略合作伙伴 · 魔界大学" : "Strategic Partner · Magic University"}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          {isZh
            ? "魔界大学与浮力资本在教育内容、人才培养与科研协作层面建立长期合作，共同推动职业交易员的系统化成长。"
            : "Magic University collaborates with Fuli Capital on education, talent development, and research to accelerate systematic growth for professional traders."}
        </p>
      </div>
    </div>
  );
}


