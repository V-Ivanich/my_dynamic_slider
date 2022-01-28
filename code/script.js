
const btnLeft = document.querySelector('#lev'),
  btnRight = document.querySelector('#prav');

let pointY = [-105, 0, 105, 210, 315],
  conteiner = document.querySelector('#slide'),
  slides = document.querySelectorAll('.slide-single'),
  firChild,
  slider = [];

//скопировали в массив и удалили из html
for (let i = 0; i < slides.length; i++) {
  slider[i] = slides[i].src;
  slides[i].remove();
}

let indexL = 0,
  indexR = 4,
  flag = 0,
  raschet,
  check,
  massivItems;

//фун-я создания и инициализации элемента
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
btnLeft.addEventListener('click', () => {
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
})

//правая кнопка
//и расчет первой и последней позиции
btnRight.addEventListener('click', () => {
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
})