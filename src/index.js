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

async function onLoadMore() {
    try {
       await imageApiService.fetchImages().then(appendImagesMarkup)
    } catch {
        console.error();
    }

    onScroll();
}

function appendImagesMarkup(response) {
    const markup = imageCardTpl(response);
    refs.imageListRoot.insertAdjacentHTML('beforeend', markup)
}

function clearImagesList() {
    refs.imageListRoot.innerHTML = '';
}

function onScroll() {
    // refs.loadMoreImg.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    // });

    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    })
}



