import { NextRequest, NextResponse } from 'next/server';
import { BacktestEngine } from '@/lib/trading/backtest/engine';
import type { TradingConfig, Candle } from '@/lib/trading/types';

/**
 * Fetch historical candles from Binance public API (no authentication needed)
 */
async function fetchBinancePublicCandles(
  symbol: string,
  interval: string,
  startTime: number,
  endTime: number
): Promise<Candle[]> {
  // Binance public API for futures historical data
  const baseUrl = 'https://fapi.binance.com';

  // Binance limits to 1500 candles per request
  const limit = 1500;
  const allCandles: Candle[] = [];

  let currentStart = startTime;

  // Fetch in batches of 1500 candles until we reach endTime
  while (currentStart < endTime) {
    try {
      const url = `${baseUrl}/fapi/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${currentStart}&endTime=${endTime}&limit=${limit}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Binance API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        break; // No more data available
      }

      // Convert Binance format to our Candle format
      const candles: Candle[] = data.map((k: any[]) => ({
        openTime: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5]),
        closeTime: k[6],
      }));

      allCandles.push(...candles);

      // Move to next batch
      if (candles.length < limit) {
        break; // Got less than limit, means we reached the end
      }

      // Start from the last candle's closeTime + 1ms
      currentStart = candles[candles.length - 1].closeTime + 1;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error('Error fetching from Binance public API:', error);
      throw error;
    }
  }

  return allCandles;
}

/**
 * POST /api/trading/backtest
 *
 * Run backtest on historical data from Binance public API
 *
 * Request body:
 * {
 *   startDate: number (timestamp)
 *   endDate: number (timestamp)
 *   initialCapital: number
 *   tradingConfig: TradingConfig
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
    } = body;

    // Validate required fields
    if (!startDate || !endDate || !initialCapital || !tradingConfig) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let candles: Candle[] = [];

    // Fetch historical data from Binance public API (no authentication required)
    try {
      console.log(`Fetching historical data from Binance for ${tradingConfig.symbol}...`);
      console.log(`Date range: ${new Date(startDate).toISOString()} to ${new Date(endDate).toISOString()}`);

      candles = await fetchBinancePublicCandles(
        tradingConfig.symbol,
        tradingConfig.interval,
        startDate,
        endDate
      );

      console.log(`Fetched ${candles.length} candles from Binance`);
      if (candles.length > 0) {
        console.log(`First candle: ${new Date(candles[0].openTime).toISOString()}`);
        console.log(`Last candle: ${new Date(candles[candles.length - 1].closeTime).toISOString()}`);
      }
    } catch (error) {
      console.error('Error fetching from Binance:', error);
      return NextResponse.json(
        { error: `Failed to fetch historical data from Binance: ${error instanceof Error ? error.message : 'Unknown error'}` },
        { status: 500 }
      );
    }

    if (candles.length === 0) {
      return NextResponse.json(
        { error: 'No candles found for specified date range' },
        { status: 404 }
      );
    }

    // Run backtest
    const engine = new BacktestEngine({
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
    });

    console.log('Running backtest...');
    const results = await engine.runBacktest(candles);
    console.log('Backtest complete');

    return NextResponse.json({
      ...results,
      candles: candles.slice(-500), // Return last 500 candles for charting
      dataSource: 'binance-public', // Using Binance public API
      totalCandles: candles.length,
    });
  } catch (error) {
    console.error('Backtest error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
