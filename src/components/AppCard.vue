<script>

    import { store } from '../store';

    export default {
        name: "AppCard",
        data () {
            return {
                store,
                posterBaseUrl: "https://image.tmdb.org/t/p/w500/"
            }
        },
        props:{
          title: String,
          ogTitle: String,
          vote: Number,
          lang: String,
          flagUrl: String,
          imgUrl: String,
        }
    }

</script>


<template>

  <div class="card">

    <p>Titolo: {{ title }}</p>
    <p>Titolo Originale: {{ ogTitle }}</p>
    <font-awesome-icon icon="fa-solid fa-star" v-for="n in vote"/>
    <p>Lingua: {{ lang }}</p>
    <img :src="flagUrl" :alt="lang">
    <img :src="posterBaseUrl + imgUrl" :alt="ogTitle">

  </div>

</template>


<style lang="scss" scoped>
// @import "../style/partials/variables.scss";
.card {
    border: 2px solid red;
    width: 240px;
  }

  .card img {
    width: 50px;
  }

</style>