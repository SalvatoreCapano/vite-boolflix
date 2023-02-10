<script>

import { store } from '../store';
import AppMenuLargeScreen from '../components/AppMenuLargeScreen.vue';
import AppMenuSmallScreen from '../components/AppMenuSmallScreen.vue';

export default {
    name: "AppHeader",
    components: {
        AppMenuLargeScreen,
        AppMenuSmallScreen
    },
    data() {
        return {
            store
        }
    }
}

</script>


<template>
    <header :class="(store.isMenuOpen) ? ('noTransparecy') : ('')">
        <div class="container">

            <a href="#">
                <div class="logo">
                    <img src="../assets/logo.png" alt="Boolflix Logo">
                </div> <!-- /logo-->
            </a>

            <div id="menuSm">
                <AppMenuSmallScreen @filterEvent="$emit('filterEvent')" />
            </div>

            <div class="box"> <!-- usato solo per scopi estetici-->

                <div id="menuLg">
                    <AppMenuLargeScreen @filterEvent="$emit('filterEvent')" />
                </div>

                <div class="searchbar">
                    <input type="text" placeholder="Search movies, TV Shows..." v-model="store.searchQuery"
                        @keyup.enter="$emit('searchEvent')">
                    <button @click="$emit('searchEvent')">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </div> <!-- /searchbar-->

            </div> <!-- /box-->

        </div> <!-- /container-->
    </header>
</template>


<style lang="scss" scoped>
// @import "../style/partials/variables.scss";
@use "src/style/partials/variables.scss" as *;

header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;

    width: 100%;
    padding: 18px 0;

    opacity: 0.96;
    transition: opacity 0.2s;

    background-color: $darker-color;
    box-shadow: 0px 6px 20px 2px #00000080;

    &.noTransparecy {
        opacity: 1;
    }

    .container {
        @include flexRowSpaced;
        gap: 20px;
    }
}

.logo {
    img {
        height: 50px;
        display: block;
    }
}

#menuSm {
    display: none;
}

.box {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.searchbar {
    border-radius: 12px;
    border: 1px solid $border-color;
    background-color: $darkest-color;

    display: flex;
    align-items: center;

    color: aliceblue;

    input {
        width: 320px;
        padding: 8px 12px;

        border: none;
        background: none;
        color: currentColor;

        &:focus {
            outline: none;
        }
    }

    button {
        padding: 10px 12px;

        color: currentColor;
        font-size: 1.1rem;

        background: none;
        border: none;
        cursor: pointer;

        &:active {
            color: $brand-color;
        }
    }

    &:focus-within {
        border-color: $brand-color;
    }
}
</style>