import galleryItem from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблонy

function createGalleryItem(item) {
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

  newA.appendChild(newImg);
  newLi.appendChild(newA);

  return newLi;
}

function createGallery(array) {
  array.forEach(element => {
    refs.galleryList.insertAdjacentElement(
      'beforeend',
      createGalleryItem(element),
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

  console.log(largeImgURL);
}
