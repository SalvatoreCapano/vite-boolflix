<script>

  import axios from 'axios';

  export default {
  name: "App",
  data () {
    return {
      searchQuery: "",
      result: ""
    }
  },
  computed: {
    search() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c5eed5002b0aa99da4cba9755d0e6251&query=${this.searchQuery}`)
          .then((response) => {
            // this.result.push(response.data.results);
            this.result = response.data.results;
            console.log("Risultati", response.data.results[1].title);
            console.log("Result", this.result);
          });
    }
  }
};
</script>


<template>
  
  <div>
    <input type="text" v-model="searchQuery">
    <button @click="search">cerca</button>
  </div>

  <hr>

  <div>
    <div class="movie" v-for="movie in this.result">
      <p>Titolo: {{ movie.title }}</p>
      <p>Titolo Originale: {{ movie.original_title }}</p>
      <p>Linuga: {{ movie.original_language }}</p>
      <p>Voto: {{ movie.vote_average }}</p>
    </div>
  </div>

</template>

<style >
  .movie {
    border: 1px solid red;
    margin-bottom: 1rem;
  }
</style>