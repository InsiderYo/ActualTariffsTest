document.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.getElementById('time');
  const chooseBtn = document.getElementById('choose-btn');
  let countdown;

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs
      .toString()
      .padStart(
        2,
        '0'
      )}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  let timeLeft = 36000 + 2160 + 10;

  function updateTimer() {
    timerElement.textContent = formatTime(timeLeft);
    timeLeft -= 1;

    if (timeLeft < 0) {
      clearInterval(countdown);
      chooseBtn.disabled = false;
    }
  }

  countdown = setInterval(updateTimer, 1000);

  const cardButtons = document.querySelectorAll('.card-btn');
  cardButtons.forEach((button) => {
    button.addEventListener('click', function () {
      console.log(`Выбран ${this.dataset.plan}`);
    });
  });
});
