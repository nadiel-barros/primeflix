import axios from 'axios';


//base url: https://api.themoviedb.org/3/
//URL da api: /movie/now_playing?api_key=8efcd0c62485903af4df3651d0173a1c&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;