<script>

import axios from 'axios';
import { store } from '../store';

export default {
  name: "AppCard",
  props: {
    title: String,
    ogTitle: String,
    vote: Number,
    lang: String,
    flagUrl: String,
    imgUrl: String,
    id: Number,
    type: String,
    genreIds: Array
  },
  data() {
    return {
      store,
      cast: [],
      genres: [],
      posterBaseUrl: "https://image.tmdb.org/t/p/",
      postCoverSize: "w500/"
    }
  },
  methods: {
    getCast() {
      // Richiesta API del cast del film/serie
      axios.get(`${store.baseUrl}${this.type}/${this.id}/credits?api_key=${store.apiKey}`)
        .then((response) => {
          response.data.cast.forEach((actor, index) => {
            if (index <= 4) {
              // Inserisce i primi 4 nomi del cast nell'array
              this.cast.push(actor.name);
            }
          });
        })
    },
    getGenre() {
      this.genreIds.forEach(id => {
        store.allGenres.forEach(genre => {
          // Controlla i generi a cui e' associato il film e inserisce i loro nomi in un array
          if (this.genres.length < 3) {
            if (genre.id == id) this.genres.push(genre.name);
          }
        });
      });
    }
  },
  created() {
    this.getCast();
    this.getGenre();
  },
  computed: {
    filterByGenre() {
      // Restituisce un valore true/false che sara' usato per valutare se l'elemento deve essere mostrato o meno
      if (this.genreIds.includes(store.searchGenre) || store.searchGenre == "") return true
      else return false;
    }
  }
}

</script>


<template>

  <div class="card" v-show="this.filterByGenre">
    <div class="cardInner">

      <div class="front">

        <img :src="posterBaseUrl + postCoverSize + imgUrl" :alt="ogTitle" class="poster" v-if="imgUrl">
        <div v-else class="posterPlaceholder">
          <span>Poster not available</span>
        </div>

      </div> <!-- /front-->

      <div class="back">

        <h3 class="title">{{ title }}</h3>

        <p class="ogTitle" v-if="(title != ogTitle)">Original Title: {{ ogTitle }}</p>

        <div class="langGroup">
          <!-- <span>Lang.: {{ lang }}</span> -->
          <!-- <span>{{ lang }}</span> -->
          <img :src="flagUrl" :alt="lang">
        </div>

        <div class="castGroup">
          <!-- <span>Cast</span> -->
          <ul>
            <li v-for="actor in cast">{{ actor }}</li>
          </ul>
        </div>

        <div class="genreGroup">
          <!-- <span>Genre</span> -->
          <ul>
            <li v-for="genre in this.genres">{{ genre }}</li>
          </ul>

        </div>

        <font-awesome-icon icon="fa-solid fa-star" v-for="n in vote" />
        <font-awesome-icon icon="fa-regular fa-star" v-for="n in (5 - vote)" />

      </div> <!-- /back-->

    </div> <!-- /cardInner-->
  </div> <!-- /card-->

</template>


<style lang="scss" scoped>
@use "src/style/partials/variables.scss" as *;

.card {
  width: $card-width;
  height: $card-height;

  color: white;

  flex-shrink: 0;
  border-radius: 3px;
  cursor: pointer;
  perspective: 1000px;

  .cardInner {
    width: 100%;
    height: 100%;

    position: relative;
    background-color: $darkest-color;
    border-radius: inherit;

    transition: transform 0.8s;
    transform-style: preserve-3d;

    .front,
    .back {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      z-index: 5;

      border-radius: inherit;
      background-color: $darkest-color;

      -webkit-backface-visibility: hidden;
      /* Per Safari */
      backface-visibility: hidden;
    }

    .back {
      transform: rotateY(180deg);
      padding: 5px;

      overflow-y: auto;
    }

    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: 0px;
      bottom: -3px;
      right: calc(100% + 3px);
      z-index: 4;

      border-radius: inherit;
      transition: all 0.5s;
      background-color: $brand-color;
    }

    &:hover::before {
      right: 0px;
    }
  }

  &:hover .cardInner {
    transform: rotateY(180deg);
    transition: transform 0.5s 0.5s;
  }
}

.poster {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.posterPlaceholder {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.ogTitle {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.langGroup {
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 12px;

  img {
    width: 30px;
  }
}

div[class$="Group"] {
  margin-bottom: 8px;

  ul {
    list-style: none;
    font-size: 0.7rem;
    display: flex;
    flex-wrap: wrap;
  }
}

.castGroup {
  li:not(:last-child):after {
      content: ", ";
  }
}

.genreGroup ul {
  justify-content: space-between;
  font-size: 0.6rem;
}
</style>