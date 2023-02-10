<script>

import { store } from '../store';

export default {
    name: "AppMenuLargeScreen",
    data() {
        return {
            store
        }
    }
}

</script>


<template>

    <div class="menu">

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
</style>