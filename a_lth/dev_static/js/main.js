import {
    form, inputElems, updateBtn, clearInputs, changeToAdd,
    changeToUpdate, createPostXhr, getMovie, getData,
    elemstoInput, inputToElems, createMovieElem
} from "./lib.js";


class Movie {
    constructor (movie) {
        this.movie = movie;
        this.id = this.movie.getAttribute('data-id');
        this.title = this.movie.querySelector('.movie-title');
        this.year = this.movie.querySelector('.movie-year');
        this.rate = this.movie.querySelector('.movie-rate');
        this.note = this.movie.querySelector('.movie-note');
        this.edit = this.movie.querySelector('.edit');
        this.remove = this.movie.querySelector('.remove');
        this.addListener();
    }
    removeMovie() {
        let xhr = createPostXhr('remove');
        xhr.onload = () => {
            console.log(xhr.response);
            this.movie.parentNode.removeChild(this.movie);
            delete this.movie;
            clearInputs();
            changeToAdd();
        }
        xhr.send(`id=${this.id}`)
    }
    addListener() {
        this.edit.addEventListener('click', () => {
            changeToUpdate();
            elemstoInput(this.movie);
            inputElems[0].focus();
            updateBtn.setAttribute('data-id', this.id);
        })
        this.remove.addEventListener('click', () => {
            this.removeMovie();
        })
    }
}

let movies = document.querySelectorAll('.movie');
for (let movie of movies) {
    new Movie(movie);
}

// Submit form
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let currentBtn = this.lastElementChild.firstElementChild;
    if (currentBtn.innerText === 'Add') {
        // Add
        let data = getData(null);
        let xhr = createPostXhr('create');
        xhr.onload = function() {
            let movie = createMovieElem(this.response);
            // Update list of movies:
            movies = document.querySelectorAll('.movie');
            new Movie(movie);
            clearInputs();
            inputElems[0].focus();
        };
        xhr.send(data);
    } else {
        // Update
        let id = currentBtn.getAttribute('data-id');
        let data = getData(id);
        let xhr = createPostXhr('update');
        xhr.onload = () => {
            console.log(xhr.response);
            let movie = getMovie(movies, id);
            inputToElems(movie);
            clearInputs();
            changeToAdd();
        }
        xhr.send(data);
    }
});
