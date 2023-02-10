<script>

import { store } from '../store';

export default {
    name: "AppMenuSmallScreen",
    data() {
        return {
            store
        }
    }
}

</script>


<template>

    <span class="menuIcon" :class="(store.isMenuOpen) ? ('clicked') : ('')"
        @click="store.isMenuOpen = !store.isMenuOpen">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </span> <!-- /menuIcon-->

    <div class="menu" :class="(store.isMenuOpen) ? ('show') : ('')">

        <h3 class="menuTitle">Filters</h3>
        <select id="" v-model="store.searchGenre" @change="$emit('filterEvent')">
            <option value="" selected>All Genres</option>
            <option :value="genre.id" v-for="genre in store.allGenres">{{ genre.name }}</option>
        </select>

    </div> <!-- /menu-->

</template>


<style lang="scss" scoped>
@use "src/style/partials/variables.scss" as *;

select {
    @include customSelect;
}

.menu {
    position: absolute;
    top: calc(100% + 18px); //18px = padding header
    right: -100%;
    z-index: 10;

    width: 100vw;
    height: calc(100vh - 50px - 36px - 1rem - 49px); //viewport - logo - paddingHeader - gapLogo/searchbar - alt. searchbar

    overflow: hidden;

    text-align: right;

    border-top: 2px solid $border-color;
    padding: 22px;
    transition: right 0.25s;
    background-color: $darker-color !important;

    &.show {
        right: 0;
    }
}

.menuTitle {
    color: aliceblue;
    margin-bottom: 8px;
    user-select: none;
}

.menuIcon {
    display: inline-block;
    width: 24px;
    height: 20px;

    color: aliceblue;
    font-size: 1.2rem;
    cursor: pointer;

    position: relative;

    .bar {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: aliceblue;
        position: absolute;
        left: 0;

        transform-origin: center;

        transition: all 0.15s;

        &:first-child {
            top: 0;
        }

        &:nth-child(2) {
            top: 50%;
            transform: translateY(-50%);
        }

        &:last-child {
            top: calc(100% - 4px);
        }
    }

    &.clicked {
        .bar:first-child {
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
        }
        .bar:last-child {
            top: 50%;
            transform: translateY(-50%) rotate(-45deg);
        }
        .bar:nth-child(2) {
            transform: translateY(-50%) scaleX(0);
        }
    }
}
</style>