/**
 * 워밍업 예제 — 코드 완성과 NES(Next edit suggestions)를 눈으로 확인하는 파일입니다.
 *
 * 이 파일은 견적 계산과 아무 관계가 없습니다. 마음껏 고치셔도 됩니다.
 * 실습이 끝나면 Ctrl+Z 로 되돌리십시오.
 *
 * 테스트가 걸려 있지 않으므로 이 파일을 고쳐도 npm test 결과는 달라지지 않습니다.
 */

/** 부가세율입니다. 공급가에 곱해 세액을 구합니다. */
export const VAT_RATE = 0.1;

/** 지역별 탁송료입니다. 코드 완성이 참고할 기준 데이터입니다. */
export const DELIVERY_FEE = {
  seoul: 100_000,
  busan: 180_000,
  jeju: 350_000,
};

/**
 * 실습 1 — 코드 완성
 *
 * 아래 함수 본문(return 한 줄)을 통째로 지우고, 빈 줄에서 잠깐 기다려 보십시오.
 * 흐린 회색 글자로 제안이 붙습니다. Tab 을 누르면 들어갑니다.
 * 한 단어씩 받고 싶으면 Ctrl + → 를 쓰십시오.
 */
export function addVat(supply) {
  return Math.round(supply + supply * VAT_RATE);
}

/**
 * 실습 2 — NES
 *
 * 아래 함수의 매개변수 이름 supply 를 amount 로 바꿔 보십시오.
 * 본문에서 supply 를 다섯 번 쓰고 있으므로, 첫 자리를 고치면
 * 편집기 왼쪽 줄 번호 옆에 화살표가 뜨고 나머지 자리를 따라옵니다.
 * Tab 으로 그 자리로 가고, 한 번 더 Tab 으로 받습니다.
 */
export function describeSupply(supply) {
  if (typeof supply !== 'number' || Number.isNaN(supply)) {
    throw new TypeError('공급가는 숫자여야 합니다');
  }
  if (supply <= 0) {
    return '공급가가 0원 이하입니다';
  }
  const vat = Math.round(supply * VAT_RATE);
  const total = supply + vat;
  return `공급가 ${supply}원, 부가세 ${vat}원, 합계 ${total}원`;
}

/**
 * 실습 3 — 주석으로 함수 만들기
 *
 * 아래 주석 다음 줄에서 Enter 를 누르고 잠깐 기다리십시오.
 * 함수 하나가 통째로 제안됩니다.
 */
// 공급가 배열을 받아 부가세를 포함한 합계 금액을 돌려줍니다
