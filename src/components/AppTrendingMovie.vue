<script>

import { store } from '../store';

export default {
    name: "AppTrendingMovie",
    components: {
    },
    data() {
        return {
            store,
            index: 0
        }
    },
    methods: {
        trendingMovieIndex () {
            setInterval(() => {
                return this.index++;
            }, 10000)
        }
    },
    computed: {
        trendingPosterPath() {
            return `https://image.tmdb.org/t/p/original/${store.resultMovies[this.index].backdrop_path}`;
        }
    },
    created() {
        this.trendingMovieIndex();
    }
}

</script>


<template>

    <div class="suggestedTrendingMovie" v-if="store.firstSearchDone == false">

        <div class="info">
            <h3>{{ store.resultMovies[this.index].title }}</h3>
            <p>{{ store.resultMovies[this.index].overview }}</p>
        </div>

        <img :src="trendingPosterPath" alt="">

    </div> <!-- /suggestedTrendingMovie-->

</template>


<style lang="scss" scoped>
@use "src/style/partials/variables.scss" as *;

.suggestedTrendingMovie {
    background-color: $dark-color;
    position: relative;

    .info {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 35%;

        padding-left: 2.5rem;
        padding-top: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;

        color: aliceblue;
        background: rgb(0, 0, 0);
        background: linear-gradient(172deg, rgba(0, 0, 0, 0.6712885837928921) 0%, rgba(255, 255, 255, 0) 50%);

        h3 {
            font-size: clamp(1.3rem, 10vw, 2.6rem);
        }
    }

    img {
        width: 65%;
        display: block;
        margin-left: auto;
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        height: 4px;
        background-color: $brand-color;

        animation: barWidth 10s linear infinite;
    }
}

@keyframes barWidth {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
</style>