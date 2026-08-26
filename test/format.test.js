import { describe, it, expect } from 'vitest';
import { formatKRW, formatQuoteLines, formatQuote } from '../src/format.js';

describe('formatKRW', () => {
  it('세 자리마다 쉼표를 넣고 원을 붙입니다', () => {
    expect(formatKRW(1234567)).toBe('1,234,567원');
  });

  it('음수는 앞에 마이너스를 붙입니다', () => {
    expect(formatKRW(-450000)).toBe('-450,000원');
  });

  it('숫자가 아니면 예외를 던집니다', () => {
    expect(() => formatKRW('1000')).toThrow(TypeError);
  });
});

describe('formatQuoteLines', () => {
  it('라인마다 항목과 금액을 한 줄로 만듭니다', () => {
    const quote = {
      total: 1_500_000,
      lines: [
        { label: '스탠다드', amount: 1_000_000 },
        { label: '보상 판매', amount: -500_000 },
      ],
    };
    expect(formatQuoteLines(quote)).toEqual([
      '스탠다드 1,000,000원',
      '보상 판매 -500,000원',
    ]);
  });
});

describe('formatQuote', () => {
  it('마지막 줄에 합계를 붙입니다', () => {
    const quote = {
      total: 1_000_000,
      lines: [{ label: '스탠다드', amount: 1_000_000 }],
    };
    expect(formatQuote(quote)).toBe('스탠다드 1,000,000원\n합계 1,000,000원');
  });
});
