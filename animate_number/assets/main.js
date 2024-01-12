'use strict';

function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
  let currentNumber = startNumber;
  function updateNumber() {
    if (currentNumber < finalNumber) {
      let inc = Math.ceil(finalNumber / (duration / 17));
      if (currentNumber + inc > finalNumber) {
        currentNumber = finalNumber;
        callback(currentNumber);
      } else {
        currentNumber += inc;
        callback(currentNumber);
        requestAnimationFrame(updateNumber);
      }
    }
  }
  requestAnimationFrame(updateNumber);
}

document.addEventListener('DOMContentLoaded', function () {
  animateNumber(4000000, 3000, 0, function (number) {
    const formattedNumber = number.toLocaleString();
    document.getElementById('transaction-count').innerText = formattedNumber;
  });

  animateNumber(98, 3000, 0, function (number) {
    const formattedNumber = number.toLocaleString();
    document.getElementById('city-count').innerText = formattedNumber;
  });

  animateNumber(1500, 3000, 0, function (number) {
    const formattedNumber = number.toLocaleString();
    document.getElementById('customer-count').innerText = formattedNumber;
  });
});
