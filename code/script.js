
//получаем кнопки
const btnLeft = document.querySelector('#lev'),
  btnRight = document.querySelector('#prav'),
  dots = document.querySelectorAll('.dot'),
  span1 = document.querySelector('#sp1'),
  span2 = document.querySelector('#sp2'),
  span3 = document.querySelector('#sp3');

let position = [],//координаты вывода картинок
  conteinerImages = document.querySelector('#slide'),//контейнер для картинок
  slides = document.querySelectorAll('.slide-single'),//коллекция картинок nodeList
  firChild,
  cycleDots,
  widthImage = 90,//ширина картинки в 'px'
  gap = 15,//расстояние между картинками в 'px'
  visibleImg = 3,//кол-во видимых элементов
  invisibleImg = 0,//невидимые кртинки , расчитывает js ;)
  sliderArray = [];//массив с картинками

  let indexL = 4,//левая позиция скрытого элемента из массива картинок
  indexR = 7,//правая позиция скрытого элемента
  flag = 0,//для прокрутки слайдера в определенную сторону
  temporary = 0,//вспомогательная
  miniFlag,//еще один флаг
  massivItems;//коллекция видимых картинок + сколько то невидимых


  //предварительные расчеты и заполнение массива позиций
  invisibleImg = visibleImg * 2 - 1;
  widthImage += gap;
  for(let i = invisibleImg; i> 0; i--){
    position[temporary] = -(widthImage * i);
    temporary++;
  }
  for(let k = 0; k < invisibleImg + visibleImg; k++){
    position[temporary] = widthImage * k;
    temporary++;
  }
 

//скопировали в массив картинки и удалили из html
for (let i = 0; i < slides.length; i++) {
  sliderArray[i] = slides[i].src;
  slides[i].remove();
}



//фун-я создания и инициализации элемента
//в зависимости от флага после или перед nodelist
function bornItem(step, offset, miniFlag = 0) {
  let img = document.createElement('img');

  img.src = sliderArray[step];
  img.classList.add('slide-single');
  img.style.left = position[offset] + 'px';
  document.querySelector('#slide').appendChild(img);
  if (miniFlag == 1) {
    firChild = conteinerImages.firstChild;
    conteinerImages.insertBefore(img, firChild);
  }
}

//начальная установка элементов
//делается разово при запуске
temporary = 0;
while (temporary < invisibleImg) {
  bornItem(sliderArray.length - temporary - 1, invisibleImg - temporary - 1, 1);
  temporary++;
}
for (let i = 0; i < (invisibleImg + visibleImg); i++) {
  bornItem(i, i + invisibleImg);
}
//прокрутка слайдера в обе стороны
// в зависимости от флага
function effectSlide(flag) {
  massivItems = document.querySelectorAll('.slide-single');

  if (flag == 0) {
    massivItems[0].remove();//1-й элемент удаляем
    for (let i = 1; i < massivItems.length; i++) {
      massivItems[i].style.left = position[i - 1] + 'px';
    }
    bornItem(indexR, massivItems.length - 1);
  }

  if (flag == 1) {
    //последний элемент удаляем
    massivItems[massivItems.length - 1].remove();
    for (let k = massivItems.length - 1; k > 0; k--) {
      massivItems[k - 1].style.left = position[k] + 'px';
    }
    bornItem(indexL, 0, 1);
  }
}

//левая кнопка
//и расчет первой и последней позиции
function leftButton() {
  indexL--;
  if (indexL < 6 & indexL >= 0) {
    indexR = indexL + 3;
  }
  else {
    switch (indexL) {
      case 6:
        indexR = 0;
        break;
      case 7:
        indexR = 1;
        break;
      case -1:
        indexL = 8;
        indexR = 2;
        break;
    }
  }
  effectSlide(1);
  spanActive();
}
btnLeft.addEventListener('click', leftButton);

//правая кнопка
//и расчет первой и последней позиции
function rightButton() {
  indexR++;
  if (indexR > 2 & indexR < 9) {
    indexL = indexR - 3;
  }
  else {
    switch (indexR) {
      case 9:
        indexR = 0;
        indexL = 6;
        break;
      case 1:
        indexL = 7;
        break;
      case 2:
        indexL = 8;
        break;
    }
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
  let cikl = positionSpan(1);
  if (cikl == undefined) {
    spanActive();
    return;
  }
  for (let i = 0; i < cikl; i++) {
    if (flag == 1) {
      leftButton();
    }
    else {
      rightButton();
    }
  }

})

span2.addEventListener('click', () => {

  let cikl = positionSpan(2);
  if (cikl == undefined) {
    spanActive();
    return;
  }
  for (let i = 0; i < cikl; i++) {
    if (flag == 1) {
      leftButton();
    }
    else {
      rightButton();
    }
  }
})

span3.addEventListener('click', () => {

  let cikl = positionSpan(3);
  if (cikl == undefined) {
    spanActive();
    return;
  }
  for (let i = 0; i < cikl; i++) {
    if (flag == 1) {
      leftButton();
    }
    else {
      rightButton();
    }
  }
})

function spanActive() {
  if (indexL == 4) {
    spanClear();
    span1.classList.add('on');
  }
  if (indexL == 7) {
    spanClear();
    span2.classList.add('on');
  }
  if (indexL == 1) {
    spanClear();
    span3.classList.add('on');
  }
}

function positionSpan(n) {
  let x = indexL,
    cycleDots = 0;

  if (n == 1) {
    if (x == 4) return;
  }

  if (n == 2) {
    if (x == 7) return;

    if (x > 2 & x < 9) {
      x -= 3;
    }
    else {
      switch (x) {
        case 0:
          x = 6;
          break;
        case 1:
          x = 7;
          break;
        case 2:
          x = 8;
          break;
      }
    }
  }

  if (n == 3) {
    if (x == 1) return;
    if (x < 6) {
      x += 3;
    }
    else {
      switch (x) {
        case 6:
          x = 0;
          break;
        case 7:
          x = 1;
          break;
        case 8:
          x = 2;
          break;
      }
    }
  }

  if (x < 4) {
    for (let i = x; i < 4; i++) {
      cycleDots++;
    }
    flag = 0;
  }
  if (x > 4) {
    for (let i = x; i > 4; i--) {
      cycleDots++;
    }
    flag = 1;
  }
  return cycleDots;
}