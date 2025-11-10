"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BrandNameProps {
  color?: string; // 允許外部指定顏色（例如白色以適配深色橫幅）
  shadow?: string; // 可覆蓋陰影
}

export default function BrandName({ color, shadow }: BrandNameProps = {}) {
  const { language } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // 标记动画已播放，避免切换语言时重复播放
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const text = language === 'zh' ? '浮力资本' : 'Buoyancy Capital';
  const chars = text.split('');

  const primaryColor = '#0b1f4a';
  const appliedColor = color || primaryColor;
  const appliedShadow = shadow || '0 12px 30px rgba(15, 23, 42, 0.25)';

  return (
    <>
      {chars.map((char, index) => {
        const isSecondPart = language === 'zh' ? index >= 2 : index >= 2;

        return (
          <motion.span
            key={`${language}-${index}`}
            className="font-black tracking-tight"
            style={{
              color: appliedColor,
              textShadow: appliedShadow,
            }}
            initial={hasAnimated ? false : {
              x: (index % 2 === 0 ? -1 : 1) * 150,
              y: (index % 3 === 0 ? -1 : 1) * 80,
              opacity: 0,
              rotate: (index % 2 === 0 ? -1 : 1) * 45,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: hasAnimated ? 0 : index * 0.08,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </>
  );
}
