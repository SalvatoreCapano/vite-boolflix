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
        data () {
            return {
                store,
                cast: [],
                genres: [],
                posterBaseUrl: "https://image.tmdb.org/t/p/w500/"
            }
        },
        methods: {
          getCast() {
            axios.get(`${store.baseUrl}${this.type}/${this.id}/credits?api_key=${store.apiKey}`)
              .then((response) => {
                response.data.cast.forEach((actor, index) => {
                  if (index <= 4) {
                    this.cast.push(actor.name);
                  }
                });
              })
          },
          getGenre() {
            // console.log("Genre Ids", this.genreIds);
            this.genreIds.forEach(id => {
              store.allGenres.forEach(genre => {
                if (genre.id == id) this.genres.push(genre.name);
              });
            });
          }
        },
        created() {
          this.getCast();
          this.getGenre();
        }
    }

</script>


<template>

  <div class="card">
    <div class="cardInner">

      <div class="front">

        <img :src="posterBaseUrl + imgUrl" :alt="ogTitle" class="poster">

      </div> <!-- /front-->
      
      <div class="back">

        <h3 class="title">{{ title }}</h3>

        <p class="ogTitle">Original Title: {{ ogTitle }}</p>

        <div class="langGroup">
          <span>Lang.: {{ lang }}</span>
          <img :src="flagUrl" :alt="lang">
        </div>

        <div class="castGroup">
          <span>Cast</span>
          <ul>
            <li v-for="actor in cast">{{ actor }}</li>
          </ul>
        </div>

        <div class="genreGroup">
          <span>Genre</span>
          <ul>
            <li v-for="genre in this.genres">{{ genre }}</li>
          </ul>

        </div>

        <font-awesome-icon icon="fa-solid fa-star" v-for="n in vote"/>

      </div> <!-- /back-->

    </div> <!-- /cardInner-->
  </div> <!-- /card-->

</template>


<style lang="scss" scoped>
@import "../style/partials/variables.scss";
.card {
  width: 200px;
  height: 300px;

  color: white;

  cursor: pointer;

  perspective: 1000px;
    
  .cardInner {
    width: 100%;
    height: 100%;
      
    position: relative;
    background-color: $darkest-color;
      
    transition: transform 0.8s;
    transform-style: preserve-3d;
      
    .front, .back {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background-color: $darkest-color;
      -webkit-backface-visibility: hidden; /* Per Safari */
      backface-visibility: hidden;
      }

    .back {
      transform: rotateY(180deg);
      padding: 5px;

      overflow-y: auto;
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
}

.title {
  margin-bottom: 8px;
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
    font-size: 0.8rem;
  }
}

</style>