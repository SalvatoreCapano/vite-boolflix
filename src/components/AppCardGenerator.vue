<script>

import { store } from '../store';
import AppCard from './AppCard.vue';
import AppCardPlaceholder from './AppCardPlaceholder.vue';

export default {
    name: "AppCardGenerator",
    components: {
        AppCard,
        AppCardPlaceholder
    },
    data() {
        return {
            store,
            // type: this.type
        }
    }
    ,
    props: {
        type: String
    }
    // props: ['type']
    ,
    methods: {
        getFlag(lang) {
            // Genera l'url dell'img di una bandiera a seconda della lingua
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
            // Converte il voto da [1-10] a [1-5]
            let newVote = Math.ceil(vote / 2);
            return newVote;
        },
        getTitle(item) {
            if (this.type == "movie") return item.title;
            if (this.type == "tv") return item.name;
        },
        getOgTitle(item) {
            if (this.type == "movie") return item.original_title;
            if (this.type == "tv") return item.original_name;
        }
    },
    computed: {
        defineArray() {
            if (this.type == "movie") return store.resultMovies;
            if (this.type == "tv") return store.resultTVShows;
        }
    }
}

</script>


<template>

    <AppCard v-for="item in defineArray" v-if="store.loading == false"
    :title="getTitle(item)"
        :ogTitle="getOgTitle(item)" 
        :vote="convertRating(item.vote_average)" 
        :lang="item.original_language"
        :flagUrl="getFlag(item.original_language)" 
        :imgUrl="item.poster_path" 
        :id="item.id" 
        :type="this.type"
        :genreIds="item.genre_ids" 
        />

</template>


<style lang="scss" scoped>
@use "src/style/partials/variables.scss" as *;
</style>