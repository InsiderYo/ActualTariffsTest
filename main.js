//* main import
import './style.scss';

//* assets import
import SubCoverGold from './src/assets/pic/subcover_gold.svg';
import SubCoverBlue from './src/assets/pic/subcover_blue.svg';
import Correct from './src/assets/pic/correct.svg';
import Info from './src/assets/pic/info.svg';
import Clock from './src/assets/pic/clock.svg';
import Arrow from './src/assets/pic/arrow.svg';

//* data import
import { tariffs } from './tariffsData';

//* Ищем контейнер под карточки
const container = document.querySelector('.pricing__cards');

//* Выбранный по дефолту (Базовый тариф)
let selectedTariff = tariffs[1].title;

//* Определяем время до конца отсчета на основе текущей даты
// let remainingTime = 10; расскоментить переменную для проверки работы блокировки кнопки по окончанию таймера

let now = new Date();

let remainingTime =
  now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

//* Глобальная переменная для интервала
let timerInterval;

//* Флаг, чтобы таймер запускался лишь 1 раз
let timerStarted = false;

//* Глобальная переменная для отключении кнопки только у тарифа "Рассрочка"
const installmentTariffTitle = 'Рассрочка';

//* Функция обновления цифр в контейнере
function updateTimeDisplay(timerElement, timeInSeconds) {
  if (!timerElement) return;
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

//* Основная функция таймера
function startGlobalTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      remainingTime = 0;
      document.querySelectorAll('.card').forEach((card) => {
        const buttonElement = card.querySelector('.card__button');
        const titleElement = card.querySelector('.card__title');

        if (
          titleElement &&
          titleElement.textContent === installmentTariffTitle
        ) {
          buttonElement.classList.add('card__button--disabled');
        }
      });
    } else {
      remainingTime -= 1;
    }

    updateTimers();
  }, 1000);
}

//* Функция обновления таймера
function updateTimers() {
  document
    .querySelectorAll('.card__timer-time')
    .forEach((timerElement) => updateTimeDisplay(timerElement, remainingTime));
}

//* Функция рендера карточки
function createCard(tariff) {
  const isHighlighted = tariff.title === selectedTariff;
  const card = document.createElement('div');
  card.className = `card ${isHighlighted ? 'card--highlighted' : ''}`;

  const priceWrapperStyle = tariff.cover
    ? 'background: linear-gradient(180deg, #E0B330 0%, #FBEE88 51.1%, #E0B330 100%); color: white'
    : '';

  const priceDescriptionClass = tariff.cover ? 'color: white;' : '';

  const borderGradient = tariff.cover
    ? 'background: linear-gradient(to top, #fbee8800, #f5ce5b);'
    : '';

  const coverImage = tariff.cover
    ? `<img class="card__cover" src="${tariff.cover}"/>`
    : '';

  const timerSection = tariff.timer
    ? `<section class="card__timer">
        <img class="card__timer-icon" src="${Clock}"/>
        <div class="card__timer-time"></div>
      </section>`
    : '';

  const bestseller = tariff.bestseller
    ? `<section class="card__bestseller">Лучший тариф</section>`
    : '';

  const tooltip = tariff.tooltip
    ? `<section class="card__tooltip">
          <span class="card__tooltip-text">${tariff.tooltip}</span>
          <img class="card__tooltip-arrow" src="${Arrow}"/>
        </section>`
    : '';

  const subcoverBackground =
    tariff.subcover === SubCoverGold
      ? 'background: linear-gradient(180deg, #e0b330 0%, #fbee88 51.1%, #e0b330 100%);'
      : tariff.subcover === SubCoverBlue
      ? 'background: #2557F6;'
      : '';

  const subcover = tariff.subcover
    ? `<section class="card__subcover-wrapper" style="${subcoverBackground}">
        <img class="card__subcover" src="${tariff.subcover}"/>
        <img class="card__subcover-image" src="${tariff.card}"/>
        <img class="card__subcover-info" src="${Info}"/>
        <h1 class="card__guarantee-text">ГАРАНТИЯ<br>СПИСАНИЯ</h1>
      </section>`
    : '';

  card.innerHTML = `
    ${timerSection}
    ${bestseller}
    ${tooltip}
   <section class="card__mask"></section>

    <section class="card__header">
      <div class="card__icon-wrapper" style="${borderGradient}">  
        <img class="card__icon" src="${tariff.pic}"/>
      </div>
      <div class="card__title-wrapper">     
        <h1 class="card__title">${tariff.title}</h1>
        <h2 class="card__description">${tariff.description}</h2>
      </div>
    </section>

    <section class="card__info">
      <div class="card__price-wrapper" style="${priceWrapperStyle}">
        ${coverImage}
        <h1 class="card__price">${tariff.price}</h1>
        <h2 class="card__price-description" style="${priceDescriptionClass}">
          ${tariff.priceDescription}
        </h2>
        <button class="card__button">Выбрать</button>
      </div>
      ${subcover}
    </section>

<section class="card__features">
  ${tariff.features
    .map(
      (feature, index) =>
        `<div class="card__feature-wrapper">
         <img class="card__feature-icon" src="${Correct}" />
         <span class="card__feature-text">${feature}</span>
         ${
           index === 0 && tariff.banks
             ? `<img class="card__feature-bank-icon" src="${tariff.banks}" />`
             : ''
         }
       </div>`
    )
    .join('')}
</section>
  `;

  //* Выбор карточки
  const buttonElement = card.querySelector('.card__button');
  buttonElement.addEventListener('click', () => {
    selectedTariff = tariff.title;
    console.log(selectedTariff);
    renderCards();
  });

  const timerElement = card.querySelector('.card__timer-time');
  if (tariff.timer && timerElement) {
    updateTimeDisplay(timerElement, remainingTime);
  }

  //* Логика отображения тултипа
  const subcoverInfoElement = card.querySelector('.card__subcover-info');
  const tooltipElement = card.querySelector('.card__tooltip');

  if (subcoverInfoElement && tooltipElement) {
    subcoverInfoElement.addEventListener('mouseenter', () => {
      tooltipElement.style.display = 'block';
    });

    subcoverInfoElement.addEventListener('mouseleave', () => {
      tooltipElement.style.display = 'none';
    });
  }

  return card;
}

//* Глобальные переменные для смены порядка при уменьшении экрана
let isSmallScreen = window.innerWidth <= 1024;
const originalTariffs = [...tariffs];

//* Установка правильного порядка при перезагрузке
function applyTariffsOrder() {
  if (isSmallScreen) {
    tariffs.splice(
      0,
      3,
      originalTariffs[1],
      originalTariffs[2],
      originalTariffs[0]
    );
  } else {
    tariffs.splice(0, tariffs.length, ...originalTariffs);
  }
}

//* Установка правильного порядка при изменения ширины экрана в реальном времени
function adjustTariffsOrder() {
  const currentIsSmallScreen = window.innerWidth <= 1024;

  if (currentIsSmallScreen !== isSmallScreen) {
    isSmallScreen = currentIsSmallScreen;
    applyTariffsOrder();
    renderCards();
  }
}

//* Мап и рендер карточек
function renderCards() {
  applyTariffsOrder();
  container.innerHTML = '';
  tariffs.forEach((tariff) => {
    container.appendChild(createCard(tariff));
  });

  document.querySelectorAll('.card').forEach((card) => {
    const buttonElement = card.querySelector('.card__button');
    const titleElement = card.querySelector('.card__title');

    if (
      titleElement &&
      titleElement.textContent === installmentTariffTitle &&
      remainingTime === 0
    ) {
      buttonElement.classList.add('card__button--disabled');
    }
  });
}

adjustTariffsOrder();
renderCards();
startGlobalTimer();

window.addEventListener('resize', adjustTariffsOrder);
