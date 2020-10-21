'use strict';

const collectionsBook = document.querySelectorAll('.book');


collectionsBook[2].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>') ;

collectionsBook[0].before(collectionsBook[1]);
collectionsBook[5].after(collectionsBook[2]);
collectionsBook[4].after(collectionsBook[3]);

document.body.style.backgroundImage = 'url(./image/newBG.jpg';


const headerBook = document.querySelectorAll('a');
headerBook[2].textContent = 'Книга 3. this и Прототипы Объектов';

const removeAdv = document.querySelector('.adv');
removeAdv.remove();

const titleBook = document.querySelectorAll('li');


titleBook[9].after(titleBook[12]);
titleBook[12].after(titleBook[14]);
titleBook[37].after(titleBook[45]);
titleBook[40].after(titleBook[38]);
titleBook[43].after(titleBook[41]);
titleBook[55].after(titleBook[57]);



