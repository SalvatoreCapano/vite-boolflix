<script>

import axios from 'axios';
import { store } from './store';
import AppHeader from './components/AppHeader.vue';

  export default {
  name: "App",
  components: {
    AppHeader
  },
  data () {
    return {
      store,
      
      posterBaseUrl: "https://image.tmdb.org/t/p/"
    }
  },
  methods: {
    getFlag (lang) {
      if (lang == "en") {
        return new URL("./assets/commonFlags/flag_US.png", import.meta.url).href;
      }
      else if (lang == "it") {
        return new URL("./assets/commonFlags/flag_IT.png", import.meta.url).href;
      }
      else if (lang == "ja") {
        return new URL("./assets/commonFlags/flag_JA.png", import.meta.url).href;
      }
      else {
        return `https://flagsapi.com/${lang.toUpperCase()}/flat/64.png`;
      }
    },
    convertRating(vote) {
      let newVote = Math.ceil(vote/2);
      return newVote;
    }
  },
  computed: {
    searchMovies() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${store.searchQuery}`)
          .then((response) => {
            store.resultMovies = response.data.results;
            // console.log("Result Movies", this.resultMovies);
          });
    },
    searchTVShows() {
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${store.searchQuery}`)
          .then((response) => {
            store.resultTVShows = response.data.results;
            // console.log("Result TV Shows", this.resultTVShows);
          });
    }
  }
};
</script>


<template>

  <AppHeader @searchEvent="searchMovies, searchTVShows"/>

  <main>
    <div class="container">
      <!-- Movies -->
      <section>
        <h2>Movies</h2>
        <div class="elem" v-for="movie in store.resultMovies">
          <p>Titolo: {{ movie.title }}</p>
          <p>Titolo Originale: {{ movie.original_title }}</p>
          <p>Voto: {{ movie.vote_average }}</p>
          <font-awesome-icon icon="fa-solid fa-star" v-for="n in this.convertRating(movie.vote_average)"/>
          <p>Linuga: {{ movie.original_language }}</p>
          <img :src="getFlag(movie.original_language)" :alt="`lang: ${movie.original_language}`">
          <img :src="`${this.posterBaseUrl}/w500/${movie.poster_path}`" :alt="`${movie.original_title}`">
        </div>
      </section>

      <!-- TV Shows -->
      <section>
        <h2>TV Shows</h2>
        <div class="elem" v-for="show in store.resultTVShows">
          <p>Titolo: {{ show.name }}</p>
          <p>Titolo Originale: {{ show.original_name }}</p>
          <p>Voto: {{ show.vote_average }}</p>
          <font-awesome-icon icon="fa-solid fa-star" v-for="n in this.convertRating(show.vote_average)"/>
          <p>Lingua Originale: {{ show.original_language }}</p>
          <img :src="getFlag(show.original_language)" :alt="`lang: ${show.original_language}`">
          <img :src="`${this.posterBaseUrl}/w500/${show.poster_path}`" :alt="`${show.original_title}`">
        </div>
      </section>
    </div>
  </main>


</template>

<style lang="scss">
@import "./style/partials/reset.scss";




main {
  // display: flex;
  background-color: #141414;
  section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;

    h2 {
      flex-basis: 100%;
    }
  }
}
  .elem {
    border: 2px solid red;
    width: 240px;
    // margin-bottom: 1rem;
    // margin-right: 2rem;
  }

  .elem img {
    width: 50px;
  }
</style>