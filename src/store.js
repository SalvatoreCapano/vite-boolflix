import { reactive } from 'vue';

export const store = reactive({
    searchQuery: "",
    searchGenre: "",
    resultMovies: null,
    resultTVShows: null,
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "c5eed5002b0aa99da4cba9755d0e6251",
    genresMovies: null,
    genresShows: null,
    allGenres: [],
    loading: false,
    isMenuOpen: false,
    firstSearchDone: false
});