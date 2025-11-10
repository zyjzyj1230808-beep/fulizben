"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  className?: string;
  loop?: boolean;
  delay?: number;
}

export default function AnimatedText({ className = "", loop = true, delay = 0 }: AnimatedTextProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const brandPrimary = "#0b1f4a";
  const glowColor = isDark ? "rgba(96, 165, 250, 0.4)" : "rgba(15, 23, 42, 0.25)";

  // 字符拆分动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // "刃"字特殊处理 - 分为上下两部分
  const bladeTopVariants = {
    hidden: {
      opacity: 0,
      y: -30,
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
        delay: 0.15,
      },
    },
  };

  const bladeBottomVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  // "X" 字特殊处理 - 两条斜线
  const xLineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className={`${className}`}>
      <motion.div
        className="flex items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={Math.random()} // 强制重新动画（如果 loop 为 true）
      >
        {/* 浮力资本 */}
        <div className="flex items-center gap-1">
          {/* 浮 - 整字动画 */}
          <motion.span
            variants={letterVariants}
            className="text-7xl font-bold"
            style={{
              color: brandPrimary,
              textShadow: `0 10px 28px ${glowColor}`,
              fontFamily: "'Noto Sans SC', sans-serif" 
            }}
          >
            浮
          </motion.span>

          {/* 力 - 整字动画 */}
          <motion.span
            variants={letterVariants}
            className="text-7xl font-bold"
            style={{
              color: brandPrimary,
              textShadow: `0 10px 28px ${glowColor}`,
              fontFamily: "'Noto Sans SC', sans-serif" 
            }}
          >
            力
          </motion.span>

          {/* 资 - 整字动画 */}
          <motion.span
            variants={letterVariants}
            className="text-7xl font-bold"
            style={{
              color: brandPrimary,
              textShadow: `0 10px 28px ${glowColor}`,
              fontFamily: "'Noto Sans SC', sans-serif" 
            }}
          >
            资
          </motion.span>

          {/* 本 - 整字动画 */}
          <motion.span
            variants={letterVariants}
            className="text-7xl font-bold"
            style={{
              color: brandPrimary,
              textShadow: `0 10px 28px ${glowColor}`,
              fontFamily: "'Noto Sans SC', sans-serif" 
            }}
          >
            本
          </motion.span>
        </div>

        {/* Buoyancy Capital */}
        <div className="flex items-center gap-1">
          {/* F */}
          <motion.span
            variants={letterVariants}
            className="text-6xl font-bold"
            style={{
              color: brandPrimary,
              textShadow: `0 10px 28px ${glowColor}`,
              fontFamily: "Inter, sans-serif" 
            }}
          >
            F
          </motion.span>

          {/* x - 特殊的斜线动画 */}
          <div className="relative inline-block" style={{ width: "0.8em", height: "0.8em", fontSize: "3.75rem" }}>
            {/* 左上到右下的斜线 */}
            <motion.div
              variants={xLineVariants}
              className="absolute"
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: brandPrimary,
                top: "50%",
                left: "0",
                transformOrigin: "left center",
                rotate: "45deg",
              }}
            />
            {/* 右上到左下的斜线 */}
            <motion.div
              variants={xLineVariants}
              className="absolute"
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: brandPrimary,
                top: "50%",
                left: "0",
                transformOrigin: "left center",
                rotate: "-45deg",
              }}
            />
          </div>

          {/* Killer - 逐字出现 */}
          {["K", "i", "l", "l", "e", "r"].map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-6xl font-bold"
            style={{
              color: brandPrimary,
              textShadow: `0 10px 28px ${glowColor}`,
                fontFamily: "Inter, sans-serif" 
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
