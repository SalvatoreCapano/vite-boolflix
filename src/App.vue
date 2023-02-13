<script>

import axios from 'axios';
import { store } from './store';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppTrendingMovie from './components/AppTrendingMovie.vue';

export default {
  name: "App",
  components: {
    AppHeader,
    AppMain,
    AppTrendingMovie
  },
  data() {
    return {
      store,
      moviesGenresOK: false,
      showsGenresOK: false
    }
  },
  methods: {
    getData(action, mediaType) {
      // Ottiene i dati relativi al film/serie cercato
      // action -> search | discover
      //mediatype -> movie | tv

      store.loading = true;
      // Reset
      store.resultMovies = null;
      store.resultTVShows = null;

      window.scrollTo ({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      // Cambia il valore di "firstSearchDone", che indica se la ricerca attuale e'
      //quella fatta all'avvio del programma o quella avviata dall'utente
      if (action != "discover") store.firstSearchDone = true;
      else store.firstSearchDone = false;

      // Richiesta
      axios.get(`${store.baseUrl}${action}/${mediaType}?api_key=${store.apiKey}&query=${store.searchQuery}`)
        .then((response) => {
          if (mediaType == "movie") store.resultMovies = response.data.results;
          if (mediaType == "tv") store.resultTVShows = response.data.results;
          setTimeout(() => {
            store.loading = false;
          }, 1500)
        })
    },
    getGenres(mediaType) {
      // Ottiene i generi disponibili per movie / serie tv
      axios.get(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${store.apiKey}&language=en-US`)
        .then((response) => {
          if (mediaType == "movie") {
            store.genresMovies = response.data.genres;
          }
          else if (mediaType == "tv") {
            store.genresShows = response.data.genres;
          }
          this.mergeGenresArrays();
        })
    },
    mergeGenresArrays() {
      // Unisce gli array che contengono i generi in un unico array

      // Controlla se sono arrivati dati dei generi sia dei film che delle serie tv
      if (store.genresMovies != null && store.genresShows != null) {

        let ids = new Set(store.genresMovies.map(d => d.id));
        store.allGenres = [...store.genresMovies, ...store.genresShows.filter(d => !ids.has(d.id))];

        // Svuota gli array che contengono i generi separati, ora inutili
        delete store.genresMovies;
        delete store.genresShows;
      }
    }
  },
  created() {
    // Richiesta dei generi
    this.getGenres("movie");
    this.getGenres("tv");

    // Richiesta dei film e le serie Trending
    this.getData('discover', 'movie');
    this.getData('discover', 'tv');
  }
};
</script>


<template>

  <AppHeader @searchEvent="(getData('search', 'movie'), getData('search', 'tv'), store.isMenuOpen = false)" />

  <main>

    <AppTrendingMovie v-if="store.resultMovies != null"/>

    <div class="container">

      <AppMain />

    </div> <!-- /container-->

  </main>

</template>


<style lang="scss">
@use "src/style/partials/variables.scss" as *;
@import "./style/partials/reset.scss";

main {
  min-height: 100vh;
  background-color: $dark-color;

  overflow-x: hidden;
  overflow-y: auto;
}

</style>