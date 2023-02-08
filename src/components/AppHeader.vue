<script>

    import { store } from '../store';

    export default {
        name: "AppHeader",
        data () {
            return {
                store
            }
        }
    }

</script>


<template>

    <header>

        <div class="container">

            <a href="#">
                <div class="logo">
                <img src="../assets/logo.png" alt="Boolflix Logo">
                </div> <!-- /logo-->
            </a>

            <div class="searchbar">
                <input type="text" placeholder="Search movies, TV Shows..." v-model="store.searchQuery" @keyup.enter="$emit('searchEvent')">
                <button @click="$emit('searchEvent')">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
            </div>

        </div> <!-- /container-->

    </header>

</template>


<style lang="scss" scoped>
@import "../style/partials/variables.scss";

header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 20;

    padding: 18px 26px;
    background-color: $darker-color;
  .container {
    @include flexRowSpaced;
  }
}

.logo {
  img {
    height: 50px;
    display: block;
  }
}
.searchbar {
    border-radius: 12px;
    border: 1px solid gray;
    background-color: $darkest-color;

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
        font-size: 1rem;
        background: none;
        border: none;
        color: currentColor
    }

    &:focus-within {
        border-color: $brand-color;
    }
}

</style>