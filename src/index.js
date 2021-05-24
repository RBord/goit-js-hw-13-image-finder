import './styles.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const YOUR_ACCESS_KEY = '21772018-ea8d686ef9c180e6d9f46e4e4';


axios
    .get(`?image_type=photo&orientation=horizontal&q=dog&page=1&per_page=12&key=${YOUR_ACCESS_KEY}`)
    .then(response => console.log(response))
    .catch(error => console.log(error))