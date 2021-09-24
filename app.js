const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const listOfItems = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const overlayModal = document.querySelector(".lightbox__overlay");
const imgModal = document.querySelector(".lightbox__image");
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');

listOfItems.innerHTML = `${createItemElement(galleryItems)}`;

listOfItems.addEventListener("click", handlerClickImage);

function handlerClickImage(event) {
  if (event.target.nodeName !== "IMG") return;

  const originalSource = event.target.dataset.source;

  modal.classList.add("is-open");
  imgModal.src = `${originalSource}`;

  window.addEventListener("keydown", closeModalPressKey);
  overlayModal.addEventListener("click", closeOverlayModalEvent);
  btnCloseModal.addEventListener("click", btnCloseEventClick);
}

function closeModalPressKey(event) {
  if (event.code === "Escape") {
    modal.classList.remove("is-open");
    imgModal.src = "#";

    window.removeEventListener("keydown", closeModalPressKey);
  } else if (event.code === "ArrowLeft") {
    switchImagesModalLeft();
  } else if (event.code === "ArrowRight") {
    switchImagesModalRight();
  } else return;
}

function switchImagesModalLeft() {
  const arrayItemsOriginal = [];

  galleryItems.forEach(({ original }) => {
    arrayItemsOriginal.push(original);
  });

  let activeIndex = arrayItemsOriginal.indexOf(imgModal.src);

  const nextIndex = arrayItemsOriginal[activeIndex - 1];

  if (activeIndex > 0) {
    imgModal.src = nextIndex;
  } else {
    imgModal.src = arrayItemsOriginal[arrayItemsOriginal.length - 1];
  }
}

function switchImagesModalRight() {
  const arrayItemsOriginal = [];

  galleryItems.forEach(({ original }) => {
    arrayItemsOriginal.push(original);
  });

  let activeIndex = arrayItemsOriginal.indexOf(imgModal.src);

  const nextIndex = arrayItemsOriginal[activeIndex + 1];

  if (activeIndex < arrayItemsOriginal.length - 1) {
    imgModal.src = nextIndex;
  } else {
    imgModal.src = arrayItemsOriginal[0];
  }
}

function closeOverlayModalEvent(event) {
  if (event.currentTarget !== event.target) return;

  modal.classList.remove("is-open");
  imgModal.src = "#";

  window.removeEventListener("keydown", closeModalPressKey);
}

function btnCloseEventClick() {
  modal.classList.remove("is-open");
  imgModal.src = "#";

  window.removeEventListener("keydown", closeModalPressKey);
}

function createItemElement(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <img
    class="gallery__image"
    data-observe-source="${preview}"
    data-source="${original}"
    alt="${description}"
    src="#"
    />
    </li>`;
    })
    .join("");
}

const observerImages = new IntersectionObserver(callback, { threshold: 0.1 });

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.src = `${entry.target.dataset.observeSource}`;
  });
}

const img = document.querySelectorAll(".gallery__image");

img.forEach((el) => observerImages.observe(el));
