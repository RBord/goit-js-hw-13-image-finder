import './styles.css';
import imageCardTpl from './templates/image-card.hbs';
import ImageApiService from './apiService';

const imageApiService = new ImageApiService();

const refs = {
    searchForm: document.getElementById('search-form'),
    imageListRoot: document.querySelector('ul'),
    loadMoreImg: document.querySelector('[data-action="load-more"]'),
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreImg.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    clearImagesList();
    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {
        return alert('Введите ваш запрос на поиск картинки!')
    }

    imageApiService.resetPage();
    imageApiService.fetchImages().then(appendImagesMarkup)
}

function onLoadMore() {
    imageApiService.fetchImages().then(appendImagesMarkup)
}

function appendImagesMarkup(response) {
    const markup = imageCardTpl(response);
    refs.imageListRoot.insertAdjacentHTML('beforeend', markup)
}

function clearImagesList() {
    refs.imageListRoot.innerHTML = '';
}

