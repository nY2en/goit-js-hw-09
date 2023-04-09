import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  min: document.querySelector('span[data-minutes]'),
  sec: document.querySelector('span[data-seconds]'),
};

let currentDate = Date.now();
let deltaTime = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deltaTime = selectedDates[0] - currentDate;

    if (currentDate >= selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    Notiflix.Notify.success('Nice');
    refs.startBtn.disabled = false;
  },
};

flatpickr('input#datetime-picker', options);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartButtonClick);

refs.input.addEventListener('focus', () => {
  if (intervalId) {
    location.reload();
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function onStartButtonClick() {
  intervalId = setInterval(() => {
    deltaTime -= 1000;

    updateTimerElContent(convertMs(deltaTime));

    if (deltaTime < 0) {
      clearInterval(intervalId);

      updateTimerElContent({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
    }
  }, 1000);
}

function updateTimerElContent({ days, hours, minutes, seconds }) {
  refs.day.textContent = days;
  refs.hour.textContent = hours;
  refs.min.textContent = minutes;
  refs.sec.textContent = seconds;
}
