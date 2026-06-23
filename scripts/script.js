import { data } from "https://shoneal.github.io/rollingstone/scripts/data.js";
import {
  listsLinks,
  coversLinks,
} from "https://shoneal.github.io/rollingstone/scripts/links.js";
import {
  changingTheme,
  switchingStickinessHeader,
  textToSlug,
  kebabToCamel,
  showImage,
  getImagePath,
  debounce,
} from "https://shoneal.github.io/rollingstone/scripts/utils.js";
import { renderLastArticlesAndDate } from "https://shoneal.github.io/rollingstone/scripts/last-articles.js";
import {
  initBodyElements,
  getSectionContext,
  createImageBlock,
  initializePageTop,
  renderGallery,
} from "https://shoneal.github.io/rollingstone/scripts/utils-for-cover-stories.js";

const bodyElements = initBodyElements(); // Элементы тела страницы
const personName = bodyElements.person.content; // Имя модели
const section = textToSlug(personName); // О ком сайт
const { basicLink, currentData } = getSectionContext(
  bodyElements.url,
  section,
  data,
  kebabToCamel,
); // Главная ссылка, данные по имени секции и длина объекта

document.addEventListener("DOMContentLoaded", () => {
  changingTheme(); // Смена темы
  bodyElements.authorName.textContent = bodyElements.author.content; // Имя автора в HTML
  switchingStickinessHeader(bodyElements.pageTopMarker, bodyElements.header); // Липкий выезжающий header

  initializePageTop(
    getImagePath,
    showImage,
    basicLink,
    personName,
    currentData,
    bodyElements.pageTop,
  ); // Создание видео/картинки в шапке

  renderGallery(
    getImagePath,
    showImage,
    basicLink,
    personName,
    currentData,
    bodyElements.content,
  ); // Вывод элементов в структуру HTML

  renderLastArticlesAndDate(
    coversLinks,
    listsLinks,
    bodyElements.url,
    4,
    "article-content figure",
    "first",
    bodyElements.time,
    data,
  ); // Добавление последних ссылок автора и времени публикации страницы
}); // Изначальная инициализация
let ticking = false; // Задержка для скролла
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      switchingStickinessHeader(bodyElements.cardMarker, bodyElements.header); // Липкий выезжающий header

      ticking = false;
    });
    ticking = true;
  }
}); // Обработчик скролла
