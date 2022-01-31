
const btnLeft = document.querySelector('#lev'),
  btnRight = document.querySelector('#prav'),
  dots = document.querySelectorAll('.dot'),
  span1 = document.querySelector('#sp1'),
  span2 = document.querySelector('#sp2'),
  span3 = document.querySelector('#sp3');

let pointY = [-105, 0, 105, 210, 315],//координаты вывода картинок
  conteiner = document.querySelector('#slide'),
  slides = document.querySelectorAll('.slide-single'),
  firChild,
  minus,
  plus,
  slider = [];

//скопировали в массив и удалили из html
for (let i = 0; i < slides.length; i++) {
  slider[i] = slides[i].src;
  slides[i].remove();
}

let indexL = 0,//левая позиция скрытого элемента из массива картинок
  indexR = 4,//правая позиция скрытого элемента
  flag = 0,//для прокрутки слайдера в определенную сторону
  raschet,//вспомогательная
  check,//еще один флаг
  massivItems;//коллекция видимых картинок + 2 невидимых

//фун-я создания и инициализации элемента
//в зависимости от флага после или перед nodelist
function bornItem(step, offset, check) {
  let img = document.createElement('img');

  img.src = slider[step];
  img.classList.add('slide-single');
  img.style.left = pointY[offset] + 'px';
  document.querySelector('#slide').appendChild(img);

  if (check == 1) {
    firChild = conteiner.firstChild;
    conteiner.insertBefore(img, firChild);
  }
}

//начальная установка элементов
//делается разово при запуске
for (let i = 0; i != 5; i++) {
  bornItem(i, i);
  if (i == 4) {
    break;
  }
}

//прокрутка слайдера в обе стороны
// в зависимости от флага
function effectSlide(flag) {
  massivItems = document.querySelectorAll('.slide-single');

  if (flag == 0) {
    massivItems[0].remove();//1-й элемент удаляем
    for (let i = 1; i < massivItems.length; i++) {
      massivItems[i].style.left = pointY[i - 1] + 'px';
    }
    bornItem(indexR, 4);

  }

  if (flag == 1) {
    //последний элемент удаляем
    massivItems[4].remove();
    for (let k = massivItems.length - 1; k > 0; k--) {
      massivItems[k - 1].style.left = pointY[k] + 'px';
    }
    bornItem(indexL, 0, 1);
  }
}

//левая кнопка
//и расчет первой и последней позиции
function leftButton() {
  indexL--;
  if (indexL < 0) {
    indexL = 8;
  }
  indexR = indexL + 4;
  if (indexR > 8) {
    raschet = indexR - 9;
    indexR = raschet;
  }
  effectSlide(1);
  spanActive();
}
btnLeft.addEventListener('click', leftButton);

//правая кнопка
//и расчет первой и последней позиции
function rightButton() {
  indexR++;
  if (indexR > 8) {
    indexR = 0;
  }
  indexL = indexR - 4;
  if (indexL < 0) {
    raschet = 9 + indexL;
    indexL = raschet;
  }
  effectSlide(0);
  spanActive();
}
btnRight.addEventListener('click', rightButton);

//clear spans all
function spanClear() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('on');
  }
}

//buttons spans
span1.addEventListener('click', () => {
  spanClear();
  let cikl = positionSpan(1)
  for (let i = 0; i < cikl; i++) {
    if (flag == 1) {
      setTimeout(leftButton, 100);
    }
    else {
      setTimeout(rightButton, 100);
    }
  }
})

span2.addEventListener('click', () => {
  spanClear();
  let cikl = positionSpan(2)
  for (let i = 0; i < cikl; i++) {
    if (flag == 1) {
      setTimeout(leftButton, 100);
    }
    else {
      setTimeout(rightButton, 100);
    }
  }
})

span3.addEventListener('click', () => {
  spanClear();
  let cikl = positionSpan(3)
  for (let i = 0; i < cikl; i++) {
    if (flag == 1) {
      setTimeout(leftButton, 100);
    }
    else {
      setTimeout(rightButton, 100);
    }
  }
})

function spanActive() {
  switch (indexL) {
    case 0:
      spanClear();
      span1.classList.add('on');
      break;
    case 3:
      spanClear();
      span2.classList.add('on');
    case 6:
      spanClear();
      span3.classList.add('on');
      break;
  }
}

function positionSpan(n) {
  let inL = indexL,
    x;
  x = inL;
  plus = 0; minus = 0;

  if (n == 1) {
    if (inL == 0) return;
    while (x != 0) {
      x--;
      minus++;
    }
    while (inL != 9) {
      inL++;
      plus++;
    }
    if (minus > plus) {
      flag = 0;
      return plus;
    }
    else {
      flag = 1;
      return minus;
    }
  }

  if (n == 2) {
    if (inL == 3) return;
    while (x > 3 && x < 9) {
      x--;
      minus++;
    }
    if (inL == 8) inL = -1;
    while (inL != 3) {
      inL++;
      plus++;
    }
    if (minus > plus) {
      flag = 0;
      return plus;
    }
    else {
      flag = 1;
      return minus;
    }
  }

  if (n == 3) {
    if (inL == 6) return;
    if (x == 0) x = 9;
    if (x == 1) x = 10;
    if (x > 6) {
      while (x != 6) {
        x--;
        minus++;
      }
    }
    if (inL < 6) {
      while (inL != 6) {
        inL++;
        plus++;
      }
    }
    if (minus > plus) {
      flag = 0;
      return plus;
    }
    else {
      flag = 1;
      return minus;
    }
  }
}