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
        })
    },
    getGenres(mediaType) {
      axios.get(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${store.apiKey}&language=en-US`)
        .then((response) => {
          if (mediaType == "movie") {
            store.genresMovies = response.data.genres;
            // this.moviesGenresOK = true;
          }
          else if (mediaType == "tv") {
            store.genresShows = response.data.genres;
            // this.showsGenresOK = true;
          }
          this.mergeGenresArrays();
          console.log("Tutti i generi", store.allGenres);
        })
    },
    mergeGenresArrays () {
      // Controlla se sono arrivati dati dei generi sia dei film che delle serie tv
      // if (this.moviesGenresOK && this.showsGenresOK) {
      if (store.genresMovies != null && store.genresShows != null) {

        let ids = new Set(store.genresMovies.map(d => d.id));
        store.allGenres = [...store.genresMovies, ...store.genresShows.filter(d => !ids.has(d.id))];

        // console.log("All Genres", store.allGenres);
      }
    }
  },
  created() {
    this.getGenres ("movie");
    this.getGenres ("tv");
  }
};
</script>

<!-- 
  Milestone 6 
  Applicare un filtro alla ricerca
  Il filtro deve essere applicato:
  Ad ogni ricerca si controlla se un genere e' stato scelto e si filtra l'array dei risultati, NASCONDENDO gli elementi non voluti
  Al cambio del filtro, cambiano i risultati mostrati (senza dover cercare di nuovo)
-->


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
main {
  min-height: 100vh;
  min-height: calc(100vh - 50px - 36px); // viewport - logo - paddingHeader
  background-color: #141414;
}
</style>