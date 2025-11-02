"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExchangeRates {
  [key: string]: number;
}

export default function PositionCalculatorPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  // Input states
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercentage, setRiskPercentage] = useState<string>('2');
  const [stopLossPips, setStopLossPips] = useState<string>('50');
  const [currencyPair, setCurrencyPair] = useState<string>('EURUSD');
  const [accountCurrency, setAccountCurrency] = useState<string>('USD');
  const [takeProfitPips, setTakeProfitPips] = useState<string>('100');
  const [leverage, setLeverage] = useState<string>('100');

  // Exchange rates state
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [ratesLoading, setRatesLoading] = useState<boolean>(true);
  const [ratesError, setRatesError] = useState<string>('');

  // Calculated results
  const [results, setResults] = useState({
    lotSize: 0,
    riskAmount: 0,
    pipValue: 0,
    potentialProfit: 0,
    riskRewardRatio: 0,
    marginRequired: 0,
    currentPrice: 0,
  });

  // Fetch real-time exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setRatesLoading(true);
        setRatesError('');

        // Using ExchangeRate-API (free tier: 1,500 requests/month)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        setExchangeRates(data.rates);
        setRatesLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setRatesError(isZh ? '无法获取实时汇率，使用默认值' : 'Cannot fetch real-time rates, using defaults');
        setRatesLoading(false);

        // Fallback to approximate rates if API fails
        setExchangeRates({
          EUR: 0.92,
          GBP: 0.79,
          AUD: 1.52,
          NZD: 1.65,
          JPY: 149.50,
          CHF: 0.88,
          CAD: 1.36,
          CNY: 7.24,
        });
      }
    };

    fetchRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isZh]);

  // Get current price for currency pair
  const getCurrentPrice = (pair: string): number => {
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) return 0;

    const base = pair.substring(0, 3);
    const quote = pair.substring(3, 6);

    // Special handling for gold (XAU)
    if (pair === 'XAUUSD') {
      return 2000; // Approximate gold price, you may want to fetch this separately
    }

    // Calculate pair price
    if (base === 'USD') {
      return exchangeRates[quote] || 0;
    } else if (quote === 'USD') {
      return 1 / (exchangeRates[base] || 1);
    } else {
      // Cross pairs
      const baseToUSD = 1 / (exchangeRates[base] || 1);
      const quoteToUSD = 1 / (exchangeRates[quote] || 1);
      return baseToUSD / quoteToUSD;
    }
  };

  // Calculate pip value based on real-time price
  const calculatePipValue = (pair: string, lotSize: number): number => {
    const price = getCurrentPrice(pair);
    if (price === 0) return 10; // Fallback

    const quote = pair.substring(3, 6);
    const contractSize = 100000; // Standard lot size

    // For JPY pairs, pip is 0.01, for others 0.0001
    const pipSize = pair.includes('JPY') ? 0.01 : 0.0001;

    // Pip value in quote currency
    let pipValueInQuote = pipSize * contractSize * lotSize;

    // Convert to account currency if different from quote currency
    if (quote !== accountCurrency) {
      if (quote === 'USD') {
        pipValueInQuote = pipValueInQuote;
      } else if (accountCurrency === 'USD') {
        // Quote currency to USD
        const quoteRate = exchangeRates[quote] || 1;
        pipValueInQuote = pipValueInQuote / quoteRate;
      } else {
        // Convert via USD
        const quoteToUSD = 1 / (exchangeRates[quote] || 1);
        const usdToAccount = exchangeRates[accountCurrency] || 1;
        pipValueInQuote = (pipValueInQuote * quoteToUSD) / usdToAccount;
      }
    }

    return pipValueInQuote;
  };

  // Real-time calculation
  useEffect(() => {
    if (!ratesLoading && Object.keys(exchangeRates).length > 0) {
      calculatePosition();
    }
  }, [accountBalance, riskPercentage, stopLossPips, currencyPair, takeProfitPips, leverage, exchangeRates, ratesLoading]);

  const calculatePosition = () => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercentage) || 0;
    const slPips = parseFloat(stopLossPips) || 0;
    const tpPips = parseFloat(takeProfitPips) || 0;
    const lev = parseFloat(leverage) || 1;

    if (balance <= 0 || risk <= 0 || slPips <= 0 || lev <= 0) {
      setResults({
        lotSize: 0,
        riskAmount: 0,
        pipValue: 0,
        potentialProfit: 0,
        riskRewardRatio: 0,
        marginRequired: 0,
        currentPrice: 0,
      });
      return;
    }

    const riskAmount = balance * (risk / 100);
    const currentPrice = getCurrentPrice(currencyPair);

    // Calculate pip value for 1 standard lot
    const pipValuePerLot = calculatePipValue(currencyPair, 1);

    // Calculate lot size based on risk
    const lotSize = riskAmount / (slPips * pipValuePerLot);

    // Calculate actual pip value for the calculated lot size
    const actualPipValue = calculatePipValue(currencyPair, lotSize);

    // Calculate potential profit
    const potentialProfit = actualPipValue * tpPips;

    // Calculate risk/reward ratio
    const riskRewardRatio = tpPips / slPips;

    // Calculate margin required
    const contractSize = 100000;
    const positionValue = lotSize * contractSize * currentPrice;
    const marginRequired = positionValue / lev;

    setResults({
      lotSize: Math.round(lotSize * 100) / 100,
      riskAmount: Math.round(riskAmount * 100) / 100,
      pipValue: Math.round(actualPipValue * 100) / 100,
      potentialProfit: Math.round(potentialProfit * 100) / 100,
      riskRewardRatio: Math.round(riskRewardRatio * 100) / 100,
      marginRequired: Math.round(marginRequired * 100) / 100,
      currentPrice: Math.round(currentPrice * 100000) / 100000,
    });
  };

  // Check if enough margin
  const hasEnoughMargin = parseFloat(accountBalance) >= results.marginRequired;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            {isZh ? '外汇仓位计算器' : 'Forex Position Size Calculator'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '基于实时汇率，精确计算推荐的交易手数、保证金需求和风险收益比'
              : 'Calculate recommended lot size, margin requirement, and risk/reward ratio based on real-time exchange rates'}
          </p>

          {/* Exchange Rate Status */}
          <div className="mt-4 text-sm">
            {ratesLoading ? (
              <span className="text-gray-500 dark:text-gray-500">
                {isZh ? '正在获取实时汇率...' : 'Fetching real-time rates...'}
              </span>
            ) : ratesError ? (
              <span className="text-yellow-600 dark:text-yellow-500">⚠ {ratesError}</span>
            ) : (
              <span className="text-green-600 dark:text-green-500">
                ✓ {isZh ? '实时汇率已更新' : 'Real-time rates updated'}
              </span>
            )}
          </div>
        </div>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
              {isZh ? '输入参数' : 'Input Parameters'}
            </h2>

            <div className="space-y-6">
              {/* Account Balance */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '账户余额' : 'Account Balance'} ({accountCurrency})
                </label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="10000"
                />
              </div>

              {/* Risk Percentage */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '风险百分比 (%)' : 'Risk Percentage (%)'}
                </label>
                <input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="2"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {isZh ? '推荐：1-2%' : 'Recommended: 1-2%'}
                </p>
              </div>

              {/* Leverage */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '杠杆倍数' : 'Leverage'}
                </label>
                <select
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value="1">1:1</option>
                  <option value="10">1:10</option>
                  <option value="20">1:20</option>
                  <option value="50">1:50</option>
                  <option value="100">1:100</option>
                  <option value="200">1:200</option>
                  <option value="400">1:400</option>
                  <option value="500">1:500</option>
                  <option value="1000">1:1000</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {isZh ? '杠杆越高，所需保证金越低' : 'Higher leverage requires less margin'}
                </p>
              </div>

              {/* Stop Loss Pips */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '止损点数 (Pips)' : 'Stop Loss (Pips)'}
                </label>
                <input
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="50"
                />
              </div>

              {/* Take Profit Pips */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '止盈点数 (Pips)' : 'Take Profit (Pips)'}
                </label>
                <input
                  type="number"
                  value={takeProfitPips}
                  onChange={(e) => setTakeProfitPips(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="100"
                />
              </div>

              {/* Currency Pair */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '货币对' : 'Currency Pair'}
                </label>
                <select
                  value={currencyPair}
                  onChange={(e) => setCurrencyPair(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value="EURUSD">EUR/USD</option>
                  <option value="GBPUSD">GBP/USD</option>
                  <option value="AUDUSD">AUD/USD</option>
                  <option value="NZDUSD">NZD/USD</option>
                  <option value="USDJPY">USD/JPY</option>
                  <option value="USDCHF">USD/CHF</option>
                  <option value="USDCAD">USD/CAD</option>
                  <option value="XAUUSD">XAU/USD (Gold)</option>
                </select>
                {results.currentPrice > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {isZh ? '当前价格' : 'Current Price'}: {results.currentPrice.toFixed(5)}
                  </p>
                )}
              </div>

              {/* Account Currency */}
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  {isZh ? '账户货币' : 'Account Currency'}
                </label>
                <select
                  value={accountCurrency}
                  onChange={(e) => setAccountCurrency(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CNY">CNY</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-black dark:bg-white p-8 border-2 border-black dark:border-white">
            <h2 className="text-2xl font-bold text-white dark:text-black mb-6 pb-3 border-b-2 border-white dark:border-black">
              {isZh ? '计算结果' : 'Calculation Results'}
            </h2>

            <div className="space-y-6">
              {/* Lot Size */}
              <div className="bg-white dark:bg-gray-900 p-4 border-2 border-white dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isZh ? '推荐手数' : 'Recommended Lot Size'}
                </p>
                <p className="text-3xl font-bold text-black dark:text-white">
                  {results.lotSize.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {isZh ? '标准手' : 'Standard Lots'}
                </p>
              </div>

              {/* Margin Required */}
              <div className={`bg-white dark:bg-gray-900 p-4 border-2 ${
                hasEnoughMargin
                  ? 'border-green-500 dark:border-green-500'
                  : 'border-red-500 dark:border-red-500'
              }`}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isZh ? '所需保证金' : 'Margin Required'}
                </p>
                <p className={`text-3xl font-bold ${
                  hasEnoughMargin
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-red-600 dark:text-red-500'
                }`}>
                  ${results.marginRequired.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {hasEnoughMargin
                    ? (isZh ? '✓ 保证金充足' : '✓ Sufficient margin')
                    : (isZh ? '✗ 保证金不足' : '✗ Insufficient margin')
                  }
                </p>
              </div>

              {/* Risk Amount */}
              <div className="bg-white dark:bg-gray-900 p-4 border-2 border-white dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isZh ? '风险金额' : 'Risk Amount'}
                </p>
                <p className="text-3xl font-bold text-black dark:text-white">
                  ${results.riskAmount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {riskPercentage}% {isZh ? '的账户余额' : 'of account balance'}
                </p>
              </div>

              {/* Potential Profit */}
              <div className="bg-white dark:bg-gray-900 p-4 border-2 border-white dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isZh ? '潜在盈利' : 'Potential Profit'}
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                  ${results.potentialProfit.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {isZh ? '如果达到止盈' : 'If take profit is hit'}
                </p>
              </div>

              {/* Risk Reward Ratio */}
              <div className="bg-white dark:bg-gray-900 p-4 border-2 border-white dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isZh ? '盈亏比' : 'Risk/Reward Ratio'}
                </p>
                <p className="text-3xl font-bold text-black dark:text-white">
                  1:{results.riskRewardRatio.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {results.riskRewardRatio >= 2
                    ? (isZh ? '✓ 优秀' : '✓ Excellent')
                    : results.riskRewardRatio >= 1.5
                    ? (isZh ? '⚠ 可接受' : '⚠ Acceptable')
                    : (isZh ? '✗ 过低' : '✗ Too Low')
                  }
                </p>
              </div>

              {/* Pip Value */}
              <div className="bg-white dark:bg-gray-900 p-4 border-2 border-white dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isZh ? '每点价值' : 'Pip Value'}
                </p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  ${results.pipValue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {isZh ? '基于实时汇率' : 'Based on real-time rates'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="bg-gray-50 dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
            {isZh ? '使用说明' : 'How to Use'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                {isZh ? '📝 计算公式' : '📝 Formula'}
              </h3>
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-mono">
                  {isZh
                    ? '手数 = 风险金额 ÷ (止损点数 × 每点价值)'
                    : 'Lot Size = Risk Amount ÷ (SL Pips × Pip Value)'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-mono">
                  {isZh
                    ? '保证金 = (手数 × 100,000 × 价格) ÷ 杠杆'
                    : 'Margin = (Lots × 100,000 × Price) ÷ Leverage'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                  {isZh
                    ? '每点价值基于实时汇率动态计算'
                    : 'Pip value calculated dynamically from real-time rates'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                {isZh ? '⚠️ 重要提示' : '⚠️ Important Notes'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{isZh ? '确保账户有足够保证金' : 'Ensure sufficient margin in account'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{isZh ? '建议单笔风险不超过2%' : 'Recommended risk per trade: max 2%'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{isZh ? '盈亏比建议至少1:2' : 'Risk/Reward ratio: minimum 1:2'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{isZh ? '高杠杆增加风险，谨慎使用' : 'High leverage increases risk, use cautiously'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{isZh ? '汇率每5分钟自动更新' : 'Rates auto-update every 5 minutes'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
            {isZh ? '实战案例' : 'Real Example'}
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="font-bold text-black dark:text-white">
              {isZh ? '场景：' : 'Scenario:'}
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '账户余额：$10,000' : 'Account Balance: $10,000'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '风险百分比：2%' : 'Risk Percentage: 2%'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '杠杆：1:100' : 'Leverage: 1:100'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '止损：50点' : 'Stop Loss: 50 pips'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '止盈：100点' : 'Take Profit: 100 pips'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '货币对：EUR/USD' : 'Currency Pair: EUR/USD'}</span>
              </li>
            </ul>

            <p className="font-bold text-black dark:text-white mt-6">
              {isZh ? '计算结果：' : 'Results:'}
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '风险金额：$200（账户的2%）' : 'Risk Amount: $200 (2% of account)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '推荐手数：约0.4手（基于实时价格）' : 'Recommended Lot Size: ~0.4 lots (based on live price)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '所需保证金：约$440（使用1:100杠杆）' : 'Margin Required: ~$440 (with 1:100 leverage)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '潜在盈利：$400' : 'Potential Profit: $400'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black dark:text-white font-bold">•</span>
                <span>{isZh ? '盈亏比：1:2（优秀）' : 'Risk/Reward: 1:2 (Excellent)'}</span>
              </li>
            </ul>

            <div className="bg-black dark:bg-white text-white dark:text-black p-4 mt-6 border-2 border-black dark:border-white">
              <p className="font-bold mb-2">
                {isZh ? '💡 关键洞察：' : '💡 Key Insight:'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '使用实时汇率计算确保精确性。即使触发止损，你只损失账户的2%（$200），但保证金占用为$440。这意味着你需要确保账户有足够的可用保证金来持有仓位。'
                  : 'Using real-time rates ensures accuracy. Even if stop loss is triggered, you only lose 2% ($200), but margin used is $440. This means you need to ensure sufficient available margin to hold the position.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
