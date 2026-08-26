/**
 * 견적을 한 건 계산해 화면에 출력합니다.
 * 터미널에서 npm start 로 실행합니다.
 *
 * 아래 order 값을 바꿔 가며 결과가 어떻게 달라지는지 확인해 보십시오.
 * 고를 수 있는 값은 src/catalog.js 에 정의되어 있습니다.
 *
 *   trim         'standard' | 'premium' | 'signature'
 *   options      'smart-key' | 'rear-camera' | 'sunroof' | 'hud'
 *                | 'premium-audio' | 'adas'  (여러 개 고를 수 있습니다)
 *   packages     'convenience' | 'tech'      (여러 개 고를 수 있습니다)
 *   region       'seoul' | 'gyeonggi' | 'jeju' | 그 밖의 지역 이름
 *   customerType 'individual' | 'corporate'
 *   tradeInValue 보상 판매 차감액. 없으면 0 입니다
 */
import { calculateQuote } from './quote.js';
import { formatQuote } from './format.js';

const order = {
  trim: 'premium',
  options: ['sunroof'],
  packages: ['tech'],
  region: 'jeju',
  customerType: 'individual',
  tradeInValue: 3_000_000,
};

const quote = calculateQuote(order);

console.log('=== 견적서 ===');
console.log(formatQuote(quote));

// 리스 월 납입금은 여기에 이어 붙입니다.
