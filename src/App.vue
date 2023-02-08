<script>

  import axios from 'axios';

  export default {
  name: "App",
  data () {
    return {
      searchQuery: "",
      resultMovies: "",
      resultTVShows: "",
      posterBaseUrl: "https://image.tmdb.org/t/p/"
    }
  },
  methods: {
    getFlag (country) {
      console.log("Sono in getFlag", country);
      if (country == "en") {
        return new URL("./assets/commonFlags/flag_USA.png", import.meta.url).href;
      }
      else {
        return `https://flagsapi.com/${country.toUpperCase()}/flat/64.png`;
      }
    },
    convertRating(vote) {
      let newVote = Math.ceil(vote/2);
      return newVote;
    }
  },
  computed: {
    searchMovies() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${this.searchQuery}`)
          .then((response) => {
            this.resultMovies = response.data.results;
            console.log("Result Movies", this.resultMovies);
          });
    },
    searchTVShows() {
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${this.searchQuery}`)
          .then((response) => {
            this.resultTVShows = response.data.results;
            console.log("Result TV Shows", this.resultTVShows);
          });
    }
  }
};
</script>


<template>
  
  <div>
    <input type="text" v-model="searchQuery">
    <button @click="searchMovies, searchTVShows">cerca</button>
  </div>

  <hr>

  <main>
    <!-- Movies -->
    <section>
      <div class="elem" v-for="movie in this.resultMovies">
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
      <div class="elem" v-for="show in this.resultTVShows">
        <p>Titolo: {{ show.name }}</p>
        <p>Titolo Originale: {{ show.original_name }}</p>
        <p>Voto: {{ show.vote_average }}</p>
        <font-awesome-icon icon="fa-solid fa-star" v-for="n in this.convertRating(show.vote_average)"/>
        <p>Lingua Originale: {{ show.original_language }}</p>
        <img :src="getFlag(show.original_language)" :alt="`lang: ${show.original_language}`">
        <img :src="`${this.posterBaseUrl}/w500/${show.poster_path}`" :alt="`${show.original_title}`">
      </div>
    </section>
  </main>


</template>

<style >
main {
  display: flex;
}
  .elem {
    border: 2px solid red;
    margin-bottom: 1rem;
    margin-right: 2rem;
  }

  img {
    width: 50px;
  }
</style>