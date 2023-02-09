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
    getData(mediaType) {
      // Reset
      store.resultMovies = null;
      store.resultTVShows = null;

      // Richiesta
      axios.get(`${store.baseUrl}search/${mediaType}?api_key=${store.apiKey}&query=${store.searchQuery}`)
        .then((response) => {
          if (mediaType == "movie") store.resultMovies = response.data.results;
          if (mediaType == "tv") store.resultTVShows = response.data.results;   
        })
    },
    getGenres() {
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${store.apiKey}&language=en-US`)
        .then((response) => {
          store.genresMovies = response.data.genres;
          // console.log("Generi Movies", store.genresMovies[1].id);
          this.moviesGenresOK = true;
          this.mergeGenresArrays();
        })

      axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${store.apiKey}&language=en-US`)
      .then((response) => {
        store.genresShows = response.data.genres;
        this.showsGenresOK = true;
        this.mergeGenresArrays();
      })
    },
    mergeGenresArrays () {
      // Controlla se sono arrivati dati dei generi sia dei film che delle serie tv
      if (this.moviesGenresOK && this.showsGenresOK) {

        let ids = new Set(store.genresMovies.map(d => d.id));
        store.allGenres = [...store.genresMovies, ...store.genresShows.filter(d => !ids.has(d.id))];

        // console.log("All Genres", store.allGenres);
      }
    }
  },
  created() {
    this.getGenres ();
  }
};
</script>


<template>

  <AppHeader @searchEvent="getData('movie'), getData('tv')"/>

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