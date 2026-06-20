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
import {
  initBodyElements,
  getSectionContext,
  createImage,
  createImageBlock,
  renderGallery,
  renderLastArticlesAndDate,
  initApp,
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
  document.body.classList.add(section); // Название сайта как класс в body
  changingTheme(); // Смена темы
  switchingStickinessHeader(bodyElements.cardMarker, bodyElements.header); // Липкий выезжающий header

  createImage(
    getImagePath,
    showImage,
    bodyElements.cardImage,
    basicLink,
    "card",
    personName,
    true,
  ); // Создание картинки в шапке

  renderGallery(
    getImagePath,
    showImage,
    currentData,
    bodyElements.content,
    basicLink,
    personName,
  ); // Вывод элементов в структуру HTML

  initApp(bodyElements, renderLastArticlesAndDate, coversLinks, listsLinks); // Общая для всех инициализация
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
