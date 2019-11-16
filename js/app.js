const btnGet = document.querySelector(".btn-get");
const container = document.querySelector(".container");

function getPosts(cb) {
  // функция будет возвращать ответ от сервера
  const xhr = new XMLHttpRequest(); // 1.создали экземпляр и получили методы
  xhr.open("get", "https://jsonplaceholder.typicode.com/posts"); // 2.открытие запроса
  xhr.addEventListener("load", () => {
    // 3. нужно подписаться на события получения данных от сервера.
    // Бывают разные события(load, error) 'load' получили успешно данные с сервера.
    // Только настраивает, но не получает
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    // обработка ошибок при подписке на событие error
    console.log("error");
  });

  xhr.send(); // принемает тело запроса
}

// xhr.responseText - хранится ответ от сервера, в специальном свойстве в объекте xhr,
// JSON массив объектов
//Функция после её вызова будет возвращать ответ от сервера. Функция ассинхронная,
// и мы незаем когда она вернёт ответ от сервера, для того чтобы она это сделала мы ,
// т.к у нас действия ассинхронные, мы не знаем когда это произойдет
// мы получим в событии load, для этого мы должны в нашу функцию передать какой-нибудь коллбак,
// который мы вызовем и передадим в него ответ от сервера
// когда запрос пройдет успешно, т.е мы вызовем коллбак и передадим наш ответ от сервера внутри
// события лоад, но предварительно, т.к нам сервер возвращаетJSON , мы этот ответпереведем
// в обычный массив
//Теперь нам остаётся в getPosts передать нашу функцию каллбак, которая и получит наш ответ от сервера,
// чтобы вне нашей функции
//получить ответ от сервера
// Для того чтобы её получить нам нужно передать нашу функцию, которая примет response

function renderPosts(response) {
  const fragment = document.createDocumentFragment();
  response.forEach(post => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = post.title;
    const article = document.createElement("p");
    article.classList.add("card-text");
    article.textContent = post.body;
    cardBody.appendChild(title);
    cardBody.appendChild(article);
    card.appendChild(cardBody);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}

btnGet.addEventListener("click", e => {
  getPosts(renderPosts);
});
