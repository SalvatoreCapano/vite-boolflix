<script>

    import { store } from '../store';
    import AppCard from '../components/AppCard.vue';

    export default {
        name: "AppMovie",
        components: {
            AppCard
        },
        data () {
            return {
                store
            }
        },
    methods: {
        getFlag (lang) {
            // Lingue piu' comuni [Inglese, italiano, giapponese]
            if (lang == "en") {
                return new URL("../assets/commonFlags/flag_US.png", import.meta.url).href;
            }
            else if (lang == "it") {
                return new URL("../assets/commonFlags/flag_IT.png", import.meta.url).href;
            }
            else if (lang == "ja") {
                return new URL("../assets/commonFlags/flag_JA.png", import.meta.url).href;
            }
            // Tutte le altre lingue
            else {
                return `https://flagsapi.com/${lang.toUpperCase()}/flat/64.png`;
            }
        },
        convertRating(vote) {
            let newVote = Math.ceil(vote/2);
            console.log("Convert Rating")
            return newVote;
        }
    }
    }

</script>


<template>

    <!-- Movies Section -->
    <section>
        <h2>Movies</h2>

        <AppCard v-for="movie in store.resultMovies"
            :title="movie.title"
            :ogTitle="movie.original_title"
            :vote="convertRating(movie.vote_average)"
            :lang="movie.original_language"
            :flagUrl="getFlag(movie.original_language)"
            :imgUrl="movie.poster_path"
        />

    </section>
    
    <!-- TV Shows Section -->
    <section>
        <h2>TV Shows</h2>

        <AppCard v-for="show in store.resultTVShows"
            :title="show.name"
            :ogTitle="show.original_name"
            :vote="convertRating(show.vote_average)"
            :lang="show.original_language"
            :flagUrl="getFlag(show.original_language)"
            :imgUrl="show.poster_path"
        />

    </section>

</template>


<style lang="scss" scoped>
// @import "../style/partials/variables.scss";
main {
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

</style>