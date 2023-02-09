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
                return newVote;
            }
        }
    }

</script>


<template>

    <!-- Movies Section -->
    <section v-if="(store.resultMovies != null)">
        <h2 class="sectionTitle">Movies</h2>

        <AppCard v-for="movie in store.resultMovies"
            :title="movie.title"
            :ogTitle="movie.original_title"
            :vote="convertRating(movie.vote_average)"
            :lang="movie.original_language"
            :flagUrl="getFlag(movie.original_language)"
            :imgUrl="movie.poster_path"
            :id="movie.id"
            :type="'movie'"
            :genreIds="movie.genre_ids"
            />

            
    </section>
    
    <!-- TV Shows Section -->
    <section v-if="(store.resultTVShows != null)">
        <h2 class="sectionTitle">TV Shows</h2>

        <AppCard v-for="show in store.resultTVShows"
            :title="show.name"
            :ogTitle="show.original_name"
            :vote="convertRating(show.vote_average)"
            :lang="show.original_language"
            :flagUrl="getFlag(show.original_language)"
            :imgUrl="show.poster_path"
            :id="show.id"
            :type="'tv'"
            :genreIds="show.genre_ids"
            />

    </section>

</template>


<style lang="scss" scoped>

    section {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;

        padding: 1.75rem 0;

        .sectionTitle {
            flex-basis: 100%;
            color: aliceblue;
        }
  }

</style>