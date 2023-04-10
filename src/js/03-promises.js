import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.form'),
};
let delay = 0;
let step = 0;
let amount = 0;
let position = 0;

refs.form.addEventListener('submit', onSubmitBtnClick);
refs.form.addEventListener('input', throttle(onInputChange, 500));

function onInputChange(e) {
  delay = Number(e.currentTarget.delay.value);
  step = Number(e.currentTarget.step.value);
  amount = Number(e.currentTarget.amount.value);
}

function onSubmitBtnClick(e) {
  e.preventDefault();

  onInputChange;

  if (delay && step && amount) {
    for (let i = 1; i <= amount; i += 1) {
      position = i;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });

      delay += step;
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
