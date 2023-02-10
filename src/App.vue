<script>

import axios from 'axios';
import { store } from './store';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

  export default {
  name: "App",
  components: {
    AppHeader,
    AppMain
  },
  data () {
    return {
      store,
      moviesGenresOK: false,
      showsGenresOK: false
    }
  },
  methods: {
    // getData(action, mediaType) {
    getData(mediaType) {
      store.loading = true;
      // Reset
      store.resultMovies = null;
      store.resultTVShows = null;
      // let genreQuery = "";
      // console.log(action);
      // if (action == "discover") {
      //   genreQuery = `&with_genres=${store.searchGenre}`
      // }
      // console.log(`La richiesta e' ${store.baseUrl}${action}/${mediaType}?api_key=${store.apiKey}&query=${store.searchQuery}${genreQuery}`)

      // Richiesta
      // axios.get(`${store.baseUrl}${action}/${mediaType}?api_key=${store.apiKey}&query=${store.searchQuery}${genreQuery}`)
      axios.get(`${store.baseUrl}search/${mediaType}?api_key=${store.apiKey}&query=${store.searchQuery}`)
        .then((response) => {
          if (mediaType == "movie") store.resultMovies = response.data.results;
          if (mediaType == "tv") store.resultTVShows = response.data.results;
          setTimeout(() => {
            store.loading = false;
          }, 1000)
        })
    },
    getGenres(mediaType) {
      axios.get(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${store.apiKey}&language=en-US`)
        .then((response) => {
          if (mediaType == "movie") {
            store.genresMovies = response.data.genres;
          }
          else if (mediaType == "tv") {
            store.genresShows = response.data.genres;
          }
          this.mergeGenresArrays();
          console.log("Tutti i generi", store.allGenres);
        })
    },
    mergeGenresArrays () {
      // Controlla se sono arrivati dati dei generi sia dei film che delle serie tv
      if (store.genresMovies != null && store.genresShows != null) {

        let ids = new Set(store.genresMovies.map(d => d.id));
        store.allGenres = [...store.genresMovies, ...store.genresShows.filter(d => !ids.has(d.id))];

        delete store.genresMovies;
        delete store.genresShows;
      }
    }
  },
  created() {
    this.getGenres ("movie");
    this.getGenres ("tv");
  }
};
</script>


<template>

  <!-- <AppHeader @searchEvent="(action) => (getData(action, 'movie'), getData(action, 'tv'))"/> -->
  <AppHeader @searchEvent="(getData('movie'), getData('tv'))"/>

  <main>
    <div class="container">

      <AppMain />
      
    </div>
  </main>


</template>


<style lang="scss">
@import "./style/partials/reset.scss";
@import "./style/partials/variables.scss";
main {
  min-height: 100vh;
  min-height: calc(100vh - 50px - 36px);  //viewport - logo - paddingHeader
  background-color: $dark-color;
}
</style>