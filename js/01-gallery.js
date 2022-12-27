// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2.Реалізація делегування на div.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
 
import { galleryItems } from "./gallery-items.js";

const imageGalleryRefs = document.querySelector(".gallery");
imageGalleryRefs.addEventListener("click", onShowBigImage);

(function createGalleryMarkup() {
  const elementCreateGallery = galleryItems
    .map(({ original, preview, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery--original" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`;
    })
    .join("");
  imageGalleryRefs.insertAdjacentHTML("beforeend", elementCreateGallery);
})();

function onShowBigImage(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  let totalImageSrc = e.target.dataset.source;

  const modal = basicLightbox.create(
    `<img src="${totalImageSrc}" width="800" height="600">`,
    {
      onClose: (modal) => {
        window.removeEventListener("keydown", onPressKeyESC);
      },
    }
  );
  modal.show();

  if (modal.visible()) {
    window.addEventListener("keydown", onPressKeyESC);
  }

  function onPressKeyESC(evnt) {
    if (evnt.code === "Escape") {
      modal.close();
      window.removeEventListener("keydown", onPressKeyESC);
    }
  }
}
