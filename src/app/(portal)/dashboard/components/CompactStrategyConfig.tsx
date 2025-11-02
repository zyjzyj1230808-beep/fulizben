"use client";

import React, { useState } from 'react';
import type { TradingConfig } from '@/lib/trading/types';

interface CompactStrategyConfigProps {
  config: TradingConfig;
  onConfigChange: (config: TradingConfig) => void;
  showPresets?: boolean;
}

export default function CompactStrategyConfig({
  config,
  onConfigChange,
  showPresets = true
}: CompactStrategyConfigProps) {
  const [expanded, setExpanded] = useState(false);

  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current: any = newConfig;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    onConfigChange(newConfig);
  };

  // 预设配置
  const applyPreset = (preset: 'conservative' | 'moderate' | 'aggressive') => {
    const presets = {
      conservative: {
        aggressiveness: 1 as 1 | 2 | 3,
        trailingActivation: 1.0,
        trailingDistance: 1.2,
        maxDailyLoss: 300,
        maxDrawdown: 0.08,
        positionSize: 0.2,
      },
      moderate: {
        aggressiveness: 2 as 1 | 2 | 3,
        trailingActivation: 0.8,
        trailingDistance: 1.0,
        maxDailyLoss: 500,
        maxDrawdown: 0.10,
        positionSize: 0.3,
      },
      aggressive: {
        aggressiveness: 3 as 1 | 2 | 3,
        trailingActivation: 0.6,
        trailingDistance: 0.8,
        maxDailyLoss: 800,
        maxDrawdown: 0.15,
        positionSize: 0.5,
      },
    };

    const p = presets[preset];
    onConfigChange({
      ...config,
      strategy: {
        ...config.strategy,
        aggressiveness: p.aggressiveness,
        trailingActivation: p.trailingActivation,
        trailingDistance: p.trailingDistance,
      },
      risk: {
        ...config.risk,
        maxDailyLoss: p.maxDailyLoss,
        maxDrawdown: p.maxDrawdown,
        positionSize: p.positionSize,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <h3 className="text-lg font-bold text-black dark:text-white">策略配置</h3>
        <svg
          className={`w-5 h-5 text-black dark:text-white transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-6 pb-6 border-t-2 border-gray-300 dark:border-gray-700">
          {/* Presets */}
          {showPresets && (
            <div className="pt-6 pb-4 mb-4 border-b-2 border-gray-300 dark:border-gray-700">
              <p className="text-sm font-bold text-black dark:text-white mb-3">快速预设</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyPreset('conservative')}
                  className="px-3 py-2 text-sm font-bold bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-black dark:text-white transition-colors"
                >
                  保守
                </button>
                <button
                  onClick={() => applyPreset('moderate')}
                  className="px-3 py-2 text-sm font-bold bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-black dark:text-white transition-colors"
                >
                  适中
                </button>
                <button
                  onClick={() => applyPreset('aggressive')}
                  className="px-3 py-2 text-sm font-bold bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-black dark:text-white transition-colors"
                >
                  激进
                </button>
              </div>
            </div>
          )}

          {/* Basic Settings */}
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-1">交易对</label>
                <select
                  value={config.symbol}
                  onChange={(e) => updateConfig(['symbol'], e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value="XAUUSDT">XAUUSDT (黄金)</option>
                  <option value="BTCUSDT">BTCUSDT (比特币)</option>
                  <option value="ETHUSDT">ETHUSDT (以太坊)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-1">时间周期</label>
                <select
                  value={config.interval}
                  onChange={(e) => updateConfig(['interval'], e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value="1m">1分钟</option>
                  <option value="5m">5分钟</option>
                  <option value="15m">15分钟</option>
                  <option value="1h">1小时</option>
                  <option value="4h">4小时</option>
                  <option value="1d">1天</option>
                </select>
              </div>
            </div>

            {/* Strategy Settings */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-1">激进度</label>
                <select
                  value={config.strategy.aggressiveness}
                  onChange={(e) => updateConfig(['strategy', 'aggressiveness'], Number(e.target.value) as 1 | 2 | 3)}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value={1}>保守</option>
                  <option value={2}>适中</option>
                  <option value={3}>激进</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-1">仓位大小</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.risk.positionSize}
                  onChange={(e) => updateConfig(['risk', 'positionSize'], Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-1">日最大亏损</label>
                <input
                  type="number"
                  value={config.risk.maxDailyLoss}
                  onChange={(e) => updateConfig(['risk', 'maxDailyLoss'], Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
            </div>

            {/* Advanced Settings */}
            <details className="border-t-2 border-gray-300 dark:border-gray-700 pt-4">
              <summary className="text-sm font-bold text-black dark:text-white cursor-pointer mb-3">
                高级设置
              </summary>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1">
                      跟踪止损激活 (R倍数)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={config.strategy.trailingActivation}
                      onChange={(e) => updateConfig(['strategy', 'trailingActivation'], Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1">
                      跟踪止损距离 (ATR)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={config.strategy.trailingDistance}
                      onChange={(e) => updateConfig(['strategy', 'trailingDistance'], Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1">
                      最大回撤 (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={config.risk.maxDrawdown}
                      onChange={(e) => updateConfig(['risk', 'maxDrawdown'], Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1">
                      止损倍数 (ATR)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={config.risk.stopLossMultiple}
                      onChange={(e) => updateConfig(['risk', 'stopLossMultiple'], Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
