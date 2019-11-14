const fieldNames = ['title', 'year', 'rate', 'note'];
const form = document.querySelector('#movie-form');
const token = form.querySelector(
    'input[name=csrfmiddlewaretoken]').value;
const inputElems = fieldNames.map(
    x => document.querySelector(`input[name="${x}"]`));
const addBtn = form.querySelector('#add-btn');
const updateBtn = form.querySelector('#update-btn');
const feedbacks = form.querySelectorAll('.invalid-feedback');
const tableBody = document.querySelector('#table-body');

function clearInputs () {
    inputElems.forEach(elem => {
        elem.value = '';
    });
}
function changeToAdd () {
    addBtn.classList.add('d-block');
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    updateBtn.classList.remove('d-block');
    feedbacks.forEach (elem => {
        elem.style.display = 'none';
    });
    updateBtn.insertAdjacentElement('beforebegin', addBtn);
}
function changeToUpdate () {
    addBtn.classList.remove('d-block');
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    updateBtn.classList.add('d-block');
    feedbacks.forEach (elem => {
        elem.style.display = 'none';
    });
    updateBtn.insertAdjacentElement('afterend', addBtn);
}
function createPostXhr (url) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", token);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    return xhr
}
function getMovie (movies, id) {
    let movie;
    for (let mov of movies) {
        if (mov.getAttribute('data-id') === id) {
            movie = mov;
        }
    }
    return movie;
}


function getData (id) {
    let inputValues = inputElems.map(
        input => input.value.replace('&', '%26')
    );
    let data = `id=${id}&title=${inputValues[0]}&year=${(inputValues[1])}&rate=${inputValues[2]}&note=${(inputValues[3])}`;
    return data;
}
function inputToElems (movie) {
    let inputValues = inputElems.map(
        input => input.value.replace('&', '%26')
    );
    let outputElems = fieldNames.map(
        name => movie.querySelector(`.movie-${name}`)
    );
    for (let x = 0; x < outputElems.length; x++) {
        outputElems[x].innerText = inputValues[x];
    }
}
function elemstoInput (movie) {
    let outputElems = fieldNames.map(
        name => movie.querySelector(`.movie-${name}`)
    );
    for (let x = 0; x < inputElems.length; x++) {
        inputElems[x].value = outputElems[x].innerText;
    }
}
function createMovieElem (response) {
    let newMovie = document.createElement('tbody');
    newMovie.innerHTML = response;
    newMovie = newMovie.firstChild;
    tableBody.insertAdjacentElement('beforeend', newMovie);
    // (It doesn't auto load when using AJAX?):
    // Add feather icons manually (It doesn't load when using AJAX?):
    let edit2Icon = newMovie.querySelector('i[data-feather="edit-2"]');
    edit2Icon.innerHTML = feather.icons['edit-2'].toSvg();
    let trashIcon = newMovie.querySelector('i[data-feather="trash-2"]');
    trashIcon.innerHTML = feather.icons['trash-2'].toSvg();
    return newMovie;
}

export {
    form, inputElems, updateBtn, clearInputs, changeToAdd,
    changeToUpdate, createPostXhr, getMovie, getData,
    elemstoInput, inputToElems, createMovieElem
}