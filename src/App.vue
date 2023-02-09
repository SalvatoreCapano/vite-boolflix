<script>

import axios from 'axios';
import { store } from './store';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
// import AppMovieSection from './components/AppMovieSection.vue';

  export default {
  name: "App",
  components: {
    AppHeader,
    AppMain
  },
  data () {
    return {
      store
    }
  },
  computed: {
    searchMovies() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${store.searchQuery}`)
          .then((response) => {
            store.resultMovies = response.data.results;
          });
    },
    searchTVShows() {
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${store.searchQuery}`)
          .then((response) => {
            store.resultTVShows = response.data.results;
          });
    }
  }
};
</script>


<template>

  <AppHeader @searchEvent="searchMovies, searchTVShows"/>

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