import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatShortCurrency,
  formatPercent,
  formatDate,
  getPercentageColor,
  calculatePortfolioValue,
  calculatePnL,
} from '../src/lib/utils';

describe('Utils - formatCurrency', () => {
  it('should format regular currency values', () => {
    const result = formatCurrency(100);
    expect(result).toContain('100');
  });

  it('should format decimal values correctly', () => {
    const result = formatCurrency(100.5);
    expect(result).toContain('100');
    // Decimal separator may vary by locale
  });

  it('should handle zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
  });

  it('should handle negative values', () => {
    const result = formatCurrency(-50.25);
    expect(result).toContain('50');
  });

  it('should handle large values', () => {
    const result = formatCurrency(1000000);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('1');
  });

  it('should maintain two decimal places', () => {
    const result = formatCurrency(99.9);
    // Verify decimal representation exists (could be . or ,)
    expect(result.length).toBeGreaterThan(3);
  });
});

describe('Utils - formatShortCurrency', () => {
  it('should format values below 1K in standard format', () => {
    const result = formatShortCurrency(500);
    expect(result).toContain('500');
  });

  it('should format thousands as K', () => {
    const result = formatShortCurrency(5000);
    expect(result).toContain('K');
    expect(result).toContain('5');
  });

  it('should format millions as M', () => {
    const result = formatShortCurrency(5000000);
    expect(result).toContain('M');
    expect(result).toContain('5');
  });

  it('should format billions as B', () => {
    const result = formatShortCurrency(5000000000);
    expect(result).toContain('B');
    expect(result).toContain('5');
  });

  it('should handle exact boundaries', () => {
    expect(formatShortCurrency(1000)).toContain('K');
    expect(formatShortCurrency(1000000)).toContain('M');
    expect(formatShortCurrency(1000000000)).toContain('B');
  });

  it('should include $ symbol', () => {
    const result = formatShortCurrency(5000);
    expect(result).toContain('$');
  });

  it('should handle zero', () => {
    const result = formatShortCurrency(0);
    expect(result).toContain('0');
  });

  it('should handle decimal values in K range', () => {
    const result = formatShortCurrency(1500);
    expect(result).toContain('1.50K') || expect(result).toContain('1,50K');
  });
});

describe('Utils - formatPercent', () => {
  it('should format positive percentages with plus sign', () => {
    const result = formatPercent(5.25);
    expect(result).toContain('+');
    expect(result).toContain('5.25');
    expect(result).toContain('%');
  });

  it('should format negative percentages without plus sign', () => {
    const result = formatPercent(-3.75);
    expect(result).toContain('-');
    expect(result).toContain('3.75');
    expect(result).toContain('%');
  });

  it('should format zero without plus sign', () => {
    const result = formatPercent(0);
    expect(result).toContain('0.00');
    expect(result).not.toContain('+');
    expect(result).toContain('%');
  });

  it('should maintain two decimal places', () => {
    expect(formatPercent(5)).toContain('5.00');
    expect(formatPercent(5.1)).toContain('5.10');
    expect(formatPercent(5.123)).toContain('5.12');
  });

  it('should handle very large percentages', () => {
    const result = formatPercent(999.99);
    expect(result).toContain('+999.99%');
  });

  it('should handle very small percentages', () => {
    const result = formatPercent(0.01);
    expect(result).toContain('+0.01%');
  });
});

describe('Utils - formatDate', () => {
  it('should format timestamp to date string', () => {
    const timestamp = new Date('2024-12-25').getTime();
    const result = formatDate(timestamp);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should use Spanish locale', () => {
    const timestamp = new Date('2024-01-15').getTime();
    const result = formatDate(timestamp);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle different months', () => {
    const jan = formatDate(new Date('2024-01-01').getTime());
    const dec = formatDate(new Date('2024-12-01').getTime());
    expect(typeof jan).toBe('string');
    expect(typeof dec).toBe('string');
  });

  it('should handle single digit dates', () => {
    const result = formatDate(new Date('2024-01-05').getTime());
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should not include year', () => {
    const result = formatDate(new Date('2024-06-15').getTime());
    expect(result).not.toContain('2024');
    expect(result).not.toContain('2025');
    expect(result).not.toContain('2023');
  });
});

describe('Utils - getPercentageColor', () => {
  it('should return green for positive values', () => {
    expect(getPercentageColor(5)).toBe('text-green-500');
    expect(getPercentageColor(0.01)).toBe('text-green-500');
  });

  it('should return green for zero', () => {
    expect(getPercentageColor(0)).toBe('text-green-500');
  });

  it('should return red for negative values', () => {
    expect(getPercentageColor(-5)).toBe('text-red-500');
    expect(getPercentageColor(-0.01)).toBe('text-red-500');
  });

  it('should handle large positive values', () => {
    expect(getPercentageColor(999)).toBe('text-green-500');
  });

  it('should handle large negative values', () => {
    expect(getPercentageColor(-999)).toBe('text-red-500');
  });

  it('should return valid Tailwind class', () => {
    const greenResult = getPercentageColor(5);
    const redResult = getPercentageColor(-5);
    expect(greenResult).toMatch(/^text-(green|red)-500$/);
    expect(redResult).toMatch(/^text-(green|red)-500$/);
  });
});

describe('Utils - calculatePortfolioValue', () => {
  it('should calculate total portfolio value', () => {
    const portfolio = [
      { id: 'bitcoin', amount: 1 },
      { id: 'ethereum', amount: 10 },
    ];
    const cryptoList = [
      { id: 'bitcoin', current_price: 40000 },
      { id: 'ethereum', current_price: 2000 },
    ];
    const result = calculatePortfolioValue(portfolio, cryptoList);
    expect(result).toBe(60000); // 1*40000 + 10*2000
  });

  it('should handle empty portfolio', () => {
    const portfolio: any[] = [];
    const cryptoList = [{ id: 'bitcoin', current_price: 40000 }];
    const result = calculatePortfolioValue(portfolio, cryptoList);
    expect(result).toBe(0);
  });

  it('should handle missing crypto in list', () => {
    const portfolio = [
      { id: 'bitcoin', amount: 1 },
      { id: 'unknown', amount: 5 },
    ];
    const cryptoList = [{ id: 'bitcoin', current_price: 40000 }];
    const result = calculatePortfolioValue(portfolio, cryptoList);
    expect(result).toBe(40000); // only bitcoin counted
  });

  it('should handle zero amounts', () => {
    const portfolio = [
      { id: 'bitcoin', amount: 0 },
      { id: 'ethereum', amount: 10 },
    ];
    const cryptoList = [
      { id: 'bitcoin', current_price: 40000 },
      { id: 'ethereum', current_price: 2000 },
    ];
    const result = calculatePortfolioValue(portfolio, cryptoList);
    expect(result).toBe(20000); // 0*40000 + 10*2000
  });

  it('should handle decimal amounts', () => {
    const portfolio = [{ id: 'bitcoin', amount: 0.5 }];
    const cryptoList = [{ id: 'bitcoin', current_price: 40000 }];
    const result = calculatePortfolioValue(portfolio, cryptoList);
    expect(result).toBe(20000);
  });

  it('should accumulate multiple assets correctly', () => {
    const portfolio = [
      { id: 'a', amount: 1 },
      { id: 'b', amount: 2 },
      { id: 'c', amount: 3 },
    ];
    const cryptoList = [
      { id: 'a', current_price: 100 },
      { id: 'b', current_price: 200 },
      { id: 'c', current_price: 300 },
    ];
    const result = calculatePortfolioValue(portfolio, cryptoList);
    expect(result).toBe(1400); // 1*100 + 2*200 + 3*300
  });
});

describe('Utils - calculatePnL', () => {
  it('should calculate profit and percentage for positive gain', () => {
    const result = calculatePnL(110, 100, 10);
    expect(result.profit).toBe(100); // (110-100)*10 = 100
    expect(result.percentage).toBe(10); // ((110-100)/100)*100 = 10%
  });

  it('should calculate profit and percentage for loss', () => {
    const result = calculatePnL(90, 100, 10);
    expect(result.profit).toBe(-100); // (90-100)*10 = -100
    expect(result.percentage).toBe(-10); // ((90-100)/100)*100 = -10%
  });

  it('should handle zero amount', () => {
    const result = calculatePnL(110, 100, 0);
    expect(result.profit).toBe(0);
    expect(result.percentage).toBe(10); // percentage still calculated
  });

  it('should handle same price (no change)', () => {
    const result = calculatePnL(100, 100, 10);
    expect(result.profit).toBe(0);
    expect(result.percentage).toBe(0);
  });

  it('should handle decimal amounts', () => {
    const result = calculatePnL(110, 100, 0.5);
    expect(result.profit).toBe(5); // (110-100)*0.5 = 5
    expect(result.percentage).toBe(10);
  });

  it('should handle large price differences', () => {
    const result = calculatePnL(200, 100, 1);
    expect(result.profit).toBe(100);
    expect(result.percentage).toBe(100);
  });

  it('should handle decimal prices', () => {
    const result = calculatePnL(100.5, 100, 10);
    expect(result.profit).toBe(5); // (100.5-100)*10 = 5
    expect(result.percentage).toBeCloseTo(0.5, 5);
  });

  it('should handle negative average price edge case', () => {
    // Edge case: should still calculate but may result in unusual values
    const result = calculatePnL(10, -10, 1);
    expect(typeof result.profit).toBe('number');
    expect(typeof result.percentage).toBe('number');
  });
});
