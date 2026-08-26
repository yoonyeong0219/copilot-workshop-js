/**
 * 견적 결과를 사람이 읽을 수 있는 문자열로 바꿉니다.
 * 이 파일에는 테스트가 이미 있습니다. 테스트를 새로 쓸 때 이 스타일을 따라 주십시오.
 */

/** 숫자를 원화 표기로 바꿉니다. 음수는 앞에 마이너스를 붙입니다. */
export function formatKRW(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('금액은 숫자여야 합니다');
  }
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(Math.round(amount));
  return sign + abs.toLocaleString('ko-KR') + '원';
}

/** 견적 라인들을 "항목  금액" 형태의 문자열 배열로 바꿉니다. */
export function formatQuoteLines(quote) {
  return quote.lines.map((line) => `${line.label} ${formatKRW(line.amount)}`);
}

/** 견적 전체를 여러 줄 문자열로 바꿉니다. */
export function formatQuote(quote) {
  const body = formatQuoteLines(quote).join('\n');
  return `${body}\n합계 ${formatKRW(quote.total)}`;
}
