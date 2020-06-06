const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const btn = document.querySelectorAll("[data-time]");

let countDown;

const timer = (seconds) => {
  if (isNaN(seconds)) {
    clearInterval(countDown);
    timerDisplay.textContent = "NOT VALID ";
    endTime.textContent = "";
    document.title = "404 NOT VALID";
  } else {
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);
    countDown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(countDown);
        timerDisplay.textContent = "--:--";
        timerDisplay.style.color = "#122";
        endTime.textContent = "Ended!!";
        document.title = "Done";
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
  }
};

const displayTimeLeft = (s) => {
  const min = Math.floor(s / 60);
  const remainder = s % 60;
  const display = `${min}:${remainder < 10 ? "0" : ""}${remainder}`;
  document.title = display;
  min === 0 && remainder <= 15
    ? (timerDisplay.style.color = "#ff0129")
    : (timerDisplay.style.color = "#111");
  timerDisplay.textContent = display;
};

const displayEndTime = (a) => {
  const end = new Date(a);
  const hour = end.getHours();
  const adjustHour = hour > 12 ? hour - 12 : hour;
  const min = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustHour}:${
    min < 10 ? "0" : ""
  }${min} ${hour > 12 ? "PM" : "AM"}`;
};

btn.forEach((a) => {
  a.addEventListener("click", function () {
    const sec = Number(this.dataset.time);
    timer(sec);
  });
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const min = this.minutes.value;
  timer(Number(min * 60));
  this.reset();
});
