import galleryItem from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.lightbox'),
  btnCloseModal: document.querySelector('button[data-action="close-lightbox"]'),
  modalImg: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  //modalContent: document.querySelector('.lightbox__content'),
};

let index = 0;

// Создание и рендер разметки по массиву данных и предоставленному шаблонy

function createGalleryItem(item, i) {
  let newLi = document.createElement('li');
  let newA = document.createElement('a');
  let newImg = document.createElement('img');

  newLi.classList.add('gallery__item');

  newA.classList.add('gallery__link');
  newA.setAttribute('href', item.original);

  newImg.classList.add('gallery__image');
  newImg.setAttribute('src', item.preview);
  newImg.dataset.source = `${item.original}`;
  newImg.setAttribute('alt', item.description);
  newImg.dataset.index = `${i}`;

  newA.appendChild(newImg);
  newLi.appendChild(newA);

  return newLi;
}

function createGallery(array) {
  let i = -1;
  array.forEach(element => {
    i += 1;
    refs.galleryList.insertAdjacentElement(
      'beforeend',
      createGalleryItem(element, i),
    );
  });
}

createGallery(galleryItem);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения

refs.galleryList.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imgRef = event.target;
  const largeImgURL = imgRef.dataset.source;

  index = Number(event.target.dataset.index);

  openModal();
  setModalImgSrc(largeImgURL);
}

//Открытие модального окна по клику на элементе галереи

function openModal() {
  window.addEventListener('keydown', onPressESC);
  window.addEventListener('keydown', onPressArrowLeft);
  window.addEventListener('keydown', onPressArrowRight);
  refs.modal.classList.add('is-open');
}

//Подмена значения атрибута src элемента img.lightbox__image

function setModalImgSrc(url) {
  refs.modalImg.src = url;
}

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]

refs.btnCloseModal.addEventListener('click', closeModal);

function closeModal(event) {
  window.removeEventListener('keydown', onPressESC);
  window.removeEventListener('keydown', onPressArrowLeft);
  window.removeEventListener('keydown', onPressArrowRight);
  refs.modal.classList.remove('is-open');
  cleanModalImgSrc();
}

//Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
//чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее

function cleanModalImgSrc() {
  refs.modalImg.src = '';
}

// Закрытие модального окна по клику на div.lightbox__overlay

refs.modalOverlay.addEventListener('click', closeModal);

// Закрытие модального окна по нажатию клавиши ESC

function onPressESC(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"

function onPressArrowLeft(event) {
  if (event.code === 'ArrowLeft' && index > 0) {
    refs.modalImg.src = galleryItem[(index -= 1)].original;
  }
}
function onPressArrowRight(event) {
  if (event.code === 'ArrowRight' && index < galleryItem.length - 1) {
    refs.modalImg.src = galleryItem[(index += 1)].original;
  }
}
