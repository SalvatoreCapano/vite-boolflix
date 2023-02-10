<script>

import { store } from '../store';
import AppCard from '../components/AppCard.vue';
import AppCardPlaceholder from '../components/AppCardPlaceholder.vue';
import AppCardGenerator from '../components/AppCardGenerator.vue';

export default {
    name: "AppMovie",
    components: {
        AppCard,
        AppCardPlaceholder,
        AppCardGenerator
    },
    data() {
        return {
            store
        }
    },
    methods: {
        // getFlag(lang) {
        //     // Genera l'url dell'img di una bandiera a seconda della lingua
        //     // Lingue piu' comuni [Inglese, italiano, giapponese]
        //     if (lang == "en") {
        //         return new URL("../assets/commonFlags/flag_US.png", import.meta.url).href;
        //     }
        //     else if (lang == "it") {
        //         return new URL("../assets/commonFlags/flag_IT.png", import.meta.url).href;
        //     }
        //     else if (lang == "ja") {
        //         return new URL("../assets/commonFlags/flag_JA.png", import.meta.url).href;
        //     }
        //     // Tutte le altre lingue
        //     else {
        //         return `https://flagsapi.com/${lang.toUpperCase()}/flat/64.png`;
        //     }
        // },
        // convertRating(vote) {
        //     // Converte il voto da [1-10] a [1-5]
        //     let newVote = Math.ceil(vote / 2);
        //     return newVote;
        // }
    }
}

</script>


<template>

    <!-- Gruppo Risultati -->
    <div class="resultsGroup">

        <!-- Movies -->
        <section class="mainSection">

            <h2 class="sectionTitle" v-if="store.firstSearchDone == false">Trending Movies</h2>
            <h2 class="sectionTitle" v-else>Movies</h2>

            <div class="cardsContainer">

                <AppCardGenerator :type="'movie'" v-if="store.loading == false"/>

                <AppCardPlaceholder v-for="n in 8" v-else/>

            </div> <!-- /cardsContainer-->

        </section> <!-- /mainSection-->


        <!-- TV Shows -->
        <section class="mainSection">

            <h2 class="sectionTitle" v-if="store.firstSearchDone == false">Trending TV Shows</h2>
            <h2 class="sectionTitle" v-else>Movies</h2>

            <div class="cardsContainer">

                <AppCardGenerator :type="'tv'" v-if="store.loading == false"/>

                <AppCardPlaceholder v-for="n in 8" v-else/>

            </div> <!-- /cardsContainer-->

        </section> <!-- /mainSection-->

    </div> <!-- /resultsGroup-->

</template>


<style lang="scss" scoped>
@use "src/style/partials/variables.scss" as *;

section {
    margin: 6rem 0 3rem;
    position: relative;
    
    .sectionTitle {
        margin-bottom: 10px;
        color: aliceblue;
    }
    .cardsContainer {
        display: flex;
        align-items: center;
        gap: 1rem;

        overflow-x: auto;
        overflow-y: hidden;
    }

    // Gradient ai lati delle section dove sono contenuti i poster. Da completare
    // &::before,
    // &::after {
    //     content: '';
    //     position: absolute;
    //     bottom: 0;
    //     width: 50px;
    //     height: $card-height;
    //     background-color: lightblue;
    //     z-index: 5;
    // }

    // &::before {
    //     left: 0;
    //     background: rgb(0, 0, 0);
    //     background: linear-gradient(90deg, rgba(0, 0, 0, 0.8981793400954132) 0%, rgba(255, 255, 255, 0) 65%);
    // }

    // &::after {
    //     right: 0;
    //     background: rgb(0, 0, 0);
    //     background: linear-gradient(270deg, rgba(0, 0, 0, 0.8981793400954132) 0%, rgba(255, 255, 255, 0) 65%);
    // }
}
</style>