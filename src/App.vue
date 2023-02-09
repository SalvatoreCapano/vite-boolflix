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
      baseUrl: "https://api.themoviedb.org/3/",
      apiKey: "c5eed5002b0aa99da4cba9755d0e6251"
    }
  },
  methods: {
    getData(mediaType) {
      axios.get(`https://api.themoviedb.org/3/search/${mediaType}?api_key=${this.apiKey}&query=${store.searchQuery}`)
        .then((response) => {
          if (mediaType == "movie") store.resultMovies = response.data.results;
          if (mediaType == "tv") store.resultTVShows = response.data.results;   
        })
    }
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