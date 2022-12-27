import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

(function createGalleryMarkup() {
  const elementCreateGallery = galleryItems
    .map(({ original, preview, description }) => {
      return `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    `;
    })
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", elementCreateGallery);
})();

new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});
