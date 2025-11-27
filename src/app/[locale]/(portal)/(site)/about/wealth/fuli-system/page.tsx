"use client";

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BacktestPanel from '@/app/[locale]/(portal)/dashboard/components/BacktestPanel';
import LiveTradePanel from '@/app/[locale]/(portal)/dashboard/components/LiveTradePanel';
import TiantiPanel from '@/app/[locale]/(portal)/dashboard/components/TiantiPanel';
import BrandName from '@/components/custom/BrandName';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TradingConfig } from '@/lib/trading/types';

const defaultConfig: TradingConfig = {
  symbol: 'XAUUSDT',
  interval: '1m',
  strategy: {
    aggressiveness: 3,
    trailingActivation: 1.5,
    trailingDistance: 1.0,
    indicators: {
      keltner: {
        maPeriod: 20,
        atrPeriod: 14,
        atrMultiple: 1.5,
      },
      bollinger: {
        period: 20,
        deviation: 2.0,
      },
      macd: {
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
      },
      cci: {
        period: 14,
      },
      supertrend: {
        period: 10,
        multiplier: 3.0,
      },
    },
  },
  risk: {
    maxDailyLoss: 90000,
    maxDrawdown: 0.5,
    maxPositions: 1,
    positionSize: 0.01,
    leverage: 20,
    stopLossMultiple: 2.0,
    takeProfitLevels: [3.0, 6.0, 9.0],
  },
};

const AUTH_STORAGE_KEY = 'fuli_system_authenticated';
const CONFIG_STORAGE_KEY = 'fuli_system_config';

export default function FuliSystemPage() {
  const [tradingConfig, setTradingConfig] = useState<TradingConfig>(defaultConfig);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  useEffect(() => {
    const authenticated = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }

    const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (savedConfig) {
      try {
        setTradingConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Failed to load saved config:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(tradingConfig));
  }, [tradingConfig]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <FuliSystemLogin
        isZh={isZh}
        onAuthenticate={() => setIsAuthenticated(true)}
        storageKey={AUTH_STORAGE_KEY}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              <BrandName /> {isZh ? '浮力系统' : 'Fuli System'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isZh
                ? '浮力财富合作伙伴专属的量化控制台，提供策略回测、实时监控与团队绩效洞察。'
                : 'A dedicated quant console for Fuli Wealth partners covering backtests, live monitoring, and cohort insights.'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            {t('dashboard.logout')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="backtest" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="backtest">{t('dashboard.tab.backtest')}</TabsTrigger>
            <TabsTrigger value="live">{t('dashboard.tab.live')}</TabsTrigger>
            <TabsTrigger value="tianti">{t('dashboard.tab.tianti')}</TabsTrigger>
          </TabsList>

          <TabsContent value="backtest" className="space-y-6">
            <BacktestPanel tradingConfig={tradingConfig} onConfigChange={setTradingConfig} />
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <LiveTradePanel tradingConfig={tradingConfig} onConfigChange={setTradingConfig} />
          </TabsContent>

          <TabsContent value="tianti" className="space-y-6">
            <TiantiPanel />
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-white">{t('dashboard.footer.warning')}</p>
          <p className="mt-1">{t('dashboard.footer.copyright')}</p>
        </div>
      </div>
    </div>
  );
}

interface FuliSystemLoginProps {
  isZh: boolean;
  onAuthenticate: () => void;
  storageKey: string;
}

function FuliSystemLogin({ isZh, onAuthenticate, storageKey }: FuliSystemLoginProps) {
  const [identityId, setIdentityId] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '88888';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      if (password === adminPassword) {
        localStorage.setItem(storageKey, 'true');
        onAuthenticate();
        setStatus('idle');
      } else {
        setStatus('error');
        setErrorMessage(isZh ? '内部密码错误，请重试' : 'Invalid internal password.');
        setPassword('');
      }
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#030611] text-white flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a1f] via-[#03060d] to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(18,70,255,0.25),_transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle,_rgba(22,94,255,0.4)_0%,_transparent_60%)] opacity-60" />
      </div>

      <div className="relative w-full max-w-md border border-[#2f4ad6]/35 bg-[#05060c]/85 backdrop-blur-xl p-10 shadow-[0_25px_80px_rgba(0,0,0,0.75)]">
        <div className="text-center space-y-4 mb-10">
          <span className="inline-flex items-center px-8 py-2.5 rounded-full bg-gradient-to-r from-[#2d4bff] to-[#55a8ff] text-sm tracking-[0.4em] font-semibold text-white shadow-[0_15px_35px_rgba(50,110,255,0.45)]">
            {isZh ? '浮力资本 系统登录' : 'Fuli Capital System Login'}
          </span>
          <h1 className="text-4xl font-black tracking-[0.2em] text-white">
            {isZh ? '身份验证' : 'Identity Check'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm tracking-[0.2em] text-white/80">
              {isZh ? '身份 ID' : 'Identity ID'}
            </label>
            <input
              type="text"
              value={identityId}
              onChange={(e) => setIdentityId(e.target.value)}
              placeholder={isZh ? '请输入身份 ID' : 'Enter identity ID'}
              className="w-full border border-[#1d2b45] bg-[#101c35] px-4 py-3 text-sm tracking-[0.1em] text-white placeholder-white/40 focus:outline-none focus:border-[#3e7bff] focus:ring-2 focus:ring-[#3e7bff]/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm tracking-[0.2em] text-white/80">
              {isZh ? '内部密码' : 'Internal Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isZh ? '请输入内部密码' : 'Enter internal password'}
              className="w-full border border-[#1d2b45] bg-[#101c35] px-4 py-3 text-sm tracking-[0.1em] text-white placeholder-white/40 focus:outline-none focus:border-[#3e7bff] focus:ring-2 focus:ring-[#3e7bff]/30"
              required
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-400 tracking-wide">{errorMessage}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:flex-1 flex items-center justify-center gap-3 border border-transparent bg-gradient-to-r from-[#19233f] via-[#243660] to-[#315085] py-3 text-sm font-semibold tracking-[0.4em] text-white uppercase shadow-[0_10px_25px_rgba(19,35,76,0.45)] hover:brightness-110 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                  {isZh ? '登录中...' : 'Signing in...'}
                </>
              ) : (
                <>
                  {isZh ? '登录' : 'Access'}
                </>
              )}
            </button>

            <a
              href="/"
              className="w-full sm:flex-1 inline-flex items-center justify-center text-sm font-semibold tracking-[0.3em] text-white/85 hover:text-white transition-colors border border-[#3e7bff]/40 py-3 uppercase"
            >
              {isZh ? '返回首页' : 'Back to home'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

