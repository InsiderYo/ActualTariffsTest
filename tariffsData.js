import Discount from './src/assets/pic/discount.svg';
import Messages from './src/assets/pic/messages.svg';
import Thunder from './src/assets/pic/thunder.svg';

import Banks from './src/assets/pic/banks.svg';

import CardBlue from './src/assets/pic/card_blue.svg';
import CardGold from './src/assets/pic/card_gold.svg';

import CoverGold from './src/assets/pic/cover_gold.svg';

import SubCoverGold from './src/assets/pic/subcover_gold.svg';
import SubCoverBlue from './src/assets/pic/subcover_blue.svg';

export const tariffs = [
  {
    id: 1,
    title: 'Консультация',
    pic: Messages,
    description: 'Основные вопросы и направления',
    price: 'Бесплатно',
    priceDescription: 'В любое время',
    features: [
      'В любое удобное время',
      'Расскажем о всех нюансах процедуры',
      'Предложим варианты решения вашей проблемы',
      'Подготовим рекомендации',
    ],
    highlighted: false,
  },
  {
    id: 2,
    title: 'Базовый тариф',
    pic: Thunder,
    cover: CoverGold,
    subcover: SubCoverGold,
    card: CardGold,
    description: 'От любого банка без процентов и переплат',
    price: '65 000 ₽',
    priceDescription: 'Единоразовый платеж',
    features: [
      'Сбор всех необходимых документов',
      'Взаимодействие с финансовым управляющим',
      'Контроль процедуры реализации имущества',
      'Поддержка и сопровождение клиента на всех этапах банкротства',
    ],
    highlighted: true,
    bestseller: true,
    tooltip:
      'Для Вашего спокойствия мы гарантируем возврат оплаты в случае отсутствия списания долгов после процедуры.',
  },
  {
    id: 3,
    title: 'Рассрочка',
    pic: Discount,
    subcover: SubCoverBlue,
    card: CardBlue,
    description: 'От любого банка без процентов и переплат',
    price: '3880 ₽ / мес.',
    priceDescription: 'На 24 месяца',
    features: [
      'Варианты рассрочки',
      'Комфортные условия оплаты',
      'Фиксированная сумма',
      'Гарантия возврата средств',
      'Остальное, что и в базовом тарифе',
    ],
    banks: Banks,
    highlighted: false,
    timer: true,
    tooltip:
      'Для Вашего спокойствия мы гарантируем возврат оплаты в случае отсутствия списания долгов после процедуры.',
  },
];
