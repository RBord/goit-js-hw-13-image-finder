import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const YOUR_ACCESS_KEY = '21772018-ea8d686ef9c180e6d9f46e4e4';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        return axios
            .get(`?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${YOUR_ACCESS_KEY}`)
            .then(response => {
                this.page += 1;
                return response.data.hits;
            })
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
}