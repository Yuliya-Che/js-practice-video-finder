import template from "../templates/mainItem.hbs";
import refs from "./refs.js";
const { form, queryResult } = refs;
// console.log(form, queryResult);

import { createClient } from "pexels";
const key = "563492ad6f91700001000001e99e9797f0a74fc89072bdd4088da560";
const client = createClient(key);
console.log(client);
const per_page = 1;

form.addEventListener("submit", (event) => {
  //Отменяем default-ное событие браузера по отправке формы
  event.preventDefault();
  // Получаем значение из input для запроса
  const query = event.target.elements.query.value;
  console.dir(query);
  // Делаем запрос через библиотеку Pexels,
  // передаем в запрос значение из input через переменную query
  client.videos.search({ query, per_page }).then((result) => {
    // console.log(result);
    const videos = result.videos;
    console.log(videos);
    // =================================
    const resultItems = videos.map((el) => {
      // console.log(el);
      const url = el.video_files[0].link;
      const posterImg = el.image;
      const author = el.user.name;
      const pictures = el.video_pictures;
      const items = createItem(url, posterImg, author, pictures);
      return items;
    });
    queryResult.append(...resultItems);
    // ==================================
  });
});

function createItem(urlVideo, posterSrc, authorName, pictureArr) {
  const li = document.createElement("li");
  li.classList.add("videoWrapper");
  console.log(li);
  const video = document.createElement("video");
  video.setAttribute("src", urlVideo);
  video.setAttribute("poster", posterSrc);
  video.setAttribute("controls", null);
  video.classList.add("video");
  const author = document.createElement("h3");
  author.classList.add("author");
  author.textContent = authorName;

  const picturesList = document.createElement("ul");
  picturesList.classList.add("picturesList");
  const pictures = pictureArr.map((elem) => {
    // console.log(elem);
    const wrap = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", elem.picture);
    img.setAttribute("alt", "image");
    wrap.appendChild(img);
    return wrap;
  });
  // console.log(pictures);
  picturesList.append(...pictures);
  li.append(video, author, picturesList);
  return li;
}
