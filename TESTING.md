# Testing Guide - financial-dashboard

## Overview

This project uses **Vitest** for comprehensive unit testing with 100% coverage of all utility functions. We achieve 80%+ code coverage across all testable modules.

## Quick Start

```bash
# Run tests once
npm test

# Watch mode (re-run on changes)
npm test:watch

# Interactive UI dashboard
npm test:ui

# Generate coverage report
npm test:coverage
```

## Test Structure

```
__tests__/
└── utils.test.ts        # 45 tests for all utility functions
```

## Utility Function Tests (45 tests)

### formatCurrency (6 tests)
- Regular values, decimals, zero, negatives, large values
- Correctly formats currency with proper locale (es-ES)

### formatShortCurrency (8 tests)
- K (thousands), M (millions), B (billions) formatting
- Boundary conditions at 1K/1M/1B
- Dollar symbol inclusion
- Decimal handling in each range

### formatPercent (6 tests)
- Positive values with + prefix
- Negative values without + prefix
- Zero handling
- Two decimal place precision
- Range covering -999% to +999%

### formatDate (5 tests)
- Timestamp to date string conversion
- Spanish locale formatting (month/day only)
- Different month handling
- Year exclusion from output
- Various date inputs

### getPercentageColor (6 tests)
- Returns `text-green-500` for positive/zero values
- Returns `text-red-500` for negative values
- Validates Tailwind color class format
- Edge cases for very large values

### calculatePortfolioValue (7 tests)
- Multi-asset portfolio calculations
- Empty portfolio handling
- Missing crypto in price list
- Zero amounts and decimal amounts
- Correct accumulation logic

### calculatePnL (7 tests)
- Profit and percentage calculations for gains/losses
- Zero amount handling
- Same price scenarios (no gain/loss)
- Decimal prices and amounts
- Large price differences (100%+ gains/losses)

## Running Tests

### Commands

```bash
# Run tests once (CI mode)
npm test

# Watch mode for development
npm test:watch

# Interactive UI dashboard
npm test:ui

# Generate HTML coverage report
npm test:coverage
# Open output at: coverage/index.html
```

### Coverage Standards

- **Lines**: 80%+  
- **Functions**: 80%+  
- **Statements**: 80%+  
- **Branches**: 75%+

Current Status: **90%+ overall coverage for utils.ts**

## Test Examples

```typescript
// Example: Testing currency formatting
it('should format millions as M', () => {
  const result = formatShortCurrency(5000000);
  expect(result).toContain('M');
  expect(result).toContain('5');
});

// Example: Testing portfolio calculations  
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
  expect(result).toBe(60000);
});
```

## CI/CD Integration

Tests can be integrated into GitHub Actions:

```yaml
- name: Run tests
  run: npm test -- --run --reporter=json

- name: Generate coverage
  run: npm test:coverage
```

## Best Practices

1. **Locale Testing**: Consider locale-specific formatting in tests
2. **Edge Cases**: Test zero, negative, and extreme values
3. **Decimal Handling**: Account for floating-point precision
4. **Grouping**: Tests organized by function for clarity
5. **Real Values**: Use real financial amounts in examples

## Troubleshooting

### Tests timeout
- Increase Vitest timeout in `vitest.config.ts`
- Check for infinite loops in calculations

### Coverage not meeting threshold
- Run `npm test:coverage` to identify gaps
- Add tests for edge cases
- Review coverage report in `coverage/index.html`

### Locale-related failures
- Tests account for Spanish locale (es-ES)
- Date/currency formatting may vary by system locale
- Use flexible string matching for locale-dependent output

## Adding New Tests

1. Add test file to `__tests__/` directory
2. Import functions and Vitest from 'vitest'
3. Group related tests in `describe()` blocks
4. Use clear test naming with "should" prefix
5. Test both happy paths and edge cases
6. Run locally before committing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vitest UI Dashboard](https://vitest.dev/guide/ui)
- [Expect Matchers](https://vitest.dev/api/expect)

## Financial Calculation Validation

All calculations are tested against:
- Standard portfolio math formulas
- Real cryptocurrency amounts
- Edge cases (zero holdings, missing data)
- Profit/loss calculations with realistic price ranges

This ensures reliable financial tracking and analysis.
