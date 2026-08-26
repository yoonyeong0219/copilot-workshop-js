import { TRIMS, OPTIONS, PACKAGES } from './catalog.js';

/**
 * 주문 정보를 받아 최종 견적을 계산합니다.
 *
 * order = {
 *   trim: 'standard' | 'premium' | 'signature',
 *   options: string[],        // 개별 선택 옵션 코드
 *   packages: string[],       // 선택한 패키지 코드
 *   region: string,           // 탁송 지역
 *   customerType: 'individual' | 'corporate',
 *   tradeInValue: number,     // 보상 판매 차감액
 * }
 */
export function calculateQuote(order) {
  if (!order || !order.trim) {
    throw new Error('트림이 지정되지 않았습니다');
  }

  const trim = TRIMS[order.trim];
  if (!trim) {
    throw new Error('알 수 없는 트림입니다: ' + order.trim);
  }

  let total = trim.basePrice;
  const lines = [];
  lines.push({ label: trim.name, amount: trim.basePrice });

  // 개별 옵션
  const selectedOptions = order.options || [];
  for (let i = 0; i < selectedOptions.length; i++) {
    const code = selectedOptions[i];
    const opt = OPTIONS[code];
    if (opt) {
      total = total + opt.price;
      lines.push({ label: opt.name, amount: opt.price });
    }
  }

  // 패키지
  const selectedPackages = order.packages || [];
  for (let i = 0; i < selectedPackages.length; i++) {
    const code = selectedPackages[i];
    const pkg = PACKAGES[code];
    if (pkg) {
      let sum = 0;
      for (let j = 0; j < pkg.includes.length; j++) {
        const inner = OPTIONS[pkg.includes[j]];
        if (inner) {
          sum = sum + inner.price;
        }
      }
      const discounted = Math.round(sum * (1 - pkg.discountRate));
      total = total + discounted;
      lines.push({ label: pkg.name + ' 패키지', amount: discounted });
    }
  }

  // 세금
  const individualTax = Math.round(total * 0.05);
  const educationTax = Math.round(individualTax * 0.3);
  const vat = Math.round((total + individualTax + educationTax) * 0.1);
  total = total + individualTax + educationTax + vat;
  lines.push({ label: '개별소비세', amount: individualTax });
  lines.push({ label: '교육세', amount: educationTax });
  lines.push({ label: '부가가치세', amount: vat });

  // 탁송료
  let delivery = 0;
  if (order.region === 'seoul') {
    delivery = 180000;
  } else {
    if (order.region === 'gyeonggi') {
      delivery = 210000;
    } else {
      if (order.region === 'jeju') {
        delivery = 520000;
      } else {
        delivery = 300000;
      }
    }
  }
  total = total + delivery;
  lines.push({ label: '탁송료', amount: delivery });

  // 법인 할인
  if (order.customerType === 'corporate') {
    if (total > 50000000) {
      const corporateDiscount = Math.round(total * 0.03);
      total = total - corporateDiscount;
      lines.push({ label: '법인 할인', amount: -corporateDiscount });
    } else {
      const corporateDiscount = Math.round(total * 0.015);
      total = total - corporateDiscount;
      lines.push({ label: '법인 할인', amount: -corporateDiscount });
    }
  }

  // 보상 판매
  const tradeIn = order.tradeInValue || 0;
  if (tradeIn > 0) {
    total = total - tradeIn;
    lines.push({ label: '보상 판매', amount: -tradeIn });
  }

  if (total < 0) {
    total = 0;
  }

  return { total, lines };
}
