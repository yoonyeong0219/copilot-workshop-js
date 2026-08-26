/**
 * 차량 견적에 쓰이는 기준 데이터.
 * 이 파일은 순수 데이터만 담습니다. 계산 로직은 quote.js에 있습니다.
 */

export const TRIMS = {
  standard: { name: '스탠다드', basePrice: 28_900_000 },
  premium: { name: '프리미엄', basePrice: 34_500_000 },
  signature: { name: '시그니처', basePrice: 41_200_000 },
};

export const OPTIONS = {
  'smart-key': { name: '스마트키', price: 450_000 },
  'rear-camera': { name: '후방 카메라', price: 620_000 },
  sunroof: { name: '파노라마 선루프', price: 1_350_000 },
  hud: { name: '헤드업 디스플레이', price: 980_000 },
  'premium-audio': { name: '프리미엄 오디오', price: 1_180_000 },
  adas: { name: '주행 보조 패키지', price: 2_400_000 },
};

export const PACKAGES = {
  convenience: {
    name: '컨비니언스',
    includes: ['smart-key', 'rear-camera'],
    discountRate: 0.1,
  },
  tech: {
    name: '테크',
    includes: ['hud', 'premium-audio'],
    discountRate: 0.15,
  },
};

/**
 * 지역별 탁송료 표입니다.
 * 2024년 4분기에 제주 요금이 인상되었고, 이 표에는 반영되어 있습니다.
 */
export const DELIVERY_FEE = {
  seoul: 180_000,
  gyeonggi: 210_000,
  jeju: 560_000,
  default: 300_000,
};
