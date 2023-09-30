"use strict";
/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */



document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll('.promo__adv img'),
        bg = document.querySelector('.promo__bg'),
        genre = bg.querySelector('.promo__genre'),
        parentOfFilms = document.querySelector('.promo__interactive-list'),
        confirme = document.querySelector('form.add'),
        dataInput = confirme.querySelector('.adding__input'),
        checkbox = confirme.querySelector('[type="checkbox"]');
    
    
    const deleteAdv = (adv) => {
        adv.forEach(item => {
            item.remove();
        });
    };
   
        
    genre.textContent = 'Драма';
    bg.style.backgroundImage = "url(../img/bg.jpg)";
    
        
    function getMovies(data, parent) {
        parent.innerHTML = '';
        const films = data.sort();
        films.forEach((item, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${item}
                                        <div class="delete"></div>
                                        </li>`;
        });
        document.querySelectorAll('.delete').forEach((item, i) => {
            item.addEventListener('click', (e) => {
                  e.target.parentElement.remove();
                  data.splice(i, 1);
                  getMovies(data, parent);
            });
          
        });
        
    }
    
    
    confirme.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!dataInput.value) {
            return;
        }
       const addNewFilm = dataInput.value.length > 5 ? `${dataInput.value.slice(0, 5)}...` : dataInput.value;
       movieDB.movies.push(addNewFilm);
        if (checkbox.checked) {
            console.log("Favorite film");
        }
       getMovies(movieDB.movies, parentOfFilms);
        e.target.reset(); /*dataInput.value = '';*/ 
    });


    deleteAdv(adv);
    getMovies(movieDB.movies, parentOfFilms);

});