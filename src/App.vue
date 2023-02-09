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