
const btnLeft = document.querySelector('#lev'),
  btnRight = document.querySelector('#prav');

let pointY = [-105, 0, 105, 210, 315],
  slides = document.querySelectorAll('.slide-single'),
  temporary ,//временный массив
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
  massivItems;

//фун-я создания и инициализации элемента
function bornItem(step, offset) {
  let img = document.createElement('img');
  img.src = slider[step];
  img.classList.add('slide-single');
  img.style.left = pointY[offset] + 'px';
  document.querySelector('#slide').appendChild(img);
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
  temporary = document.querySelectorAll('.slide-single');
  massivItems = Array.from(massivItems);
  if (flag == 0) {
    massivItems.shift();//1-й элемент удаляем
    temporary[0].remove();
    for (let i = 1; i < massivItems.length; i++) {
      massivItems[i].style.left = pointY[i - 1] + 'px';
    }
    bornItem(indexR, 4);
    massivItems.push(temporary[temporary.length - 1]);    
    console.log(massivItems);
  }

  if (flag == 1) {
    temporary.pop();//последний элемент удаляем
    massivItems[4].remove();
    for (let k = massivItems.length - 1; k > 0; k--) {
      massivItems[k - 1].style.left = pointY[k] + 'px';
    }
    bornItem(indexL, 0);
    temporary.unshift(slider[indexL]);
    console.log(temporary);
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