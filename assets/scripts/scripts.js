function startCountdown() {
  const targetDate = new Date("2025-01-13T12:00:00Z").getTime();
  const countdownItems = document.querySelectorAll('.countdown__item .flip');

  function padZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
      clearInterval(interval);
      return;
    }

    // Calculate time components with leading zeros
    const days = padZero(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    const hours = padZero(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = padZero(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = padZero(Math.floor((timeLeft % (1000 * 60)) / 1000));

    const values = [days, hours, minutes, seconds];

    countdownItems.forEach((flip, index) => {
      const top = flip.querySelector('.flip__top');
      const bottom = flip.querySelector('.flip__bottom');
      const newValue = values[index];

      if (top.textContent !== String(newValue)) {
        bottom.textContent = newValue;
        flip.classList.add('animate');

        flip.addEventListener(
          'animationend',
          () => {
            top.textContent = newValue;
            flip.classList.remove('animate');
          },
          { once: true }
        );
      }
    });
  }

  // Update every second
  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

startCountdown();
