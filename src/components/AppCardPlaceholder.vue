<script>

export default {
  name: "AppCardPlaceholder"
}

</script>


<template>

  <div class="card">
  </div> <!-- /card-->

</template>


<style lang="scss" scoped>
@use "src/style/partials/variables.scss" as *;

.card {
  width: $card-width;
  height: $card-height;
  background-color: $notSoDark-color;

  flex-shrink: 0;

  overflow: hidden;
  position: relative;

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    will-change: left;

    width: 100%;
    height: 100%;

    animation: placeholderFade 0.8s linear infinite;

    background: rgb(255, 255, 255);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 22%, rgba(64, 64, 64, 1) 50%, rgba(255, 255, 255, 0) 78%);
  }

}

@keyframes placeholderFade {
  from {
    left: -100%;
  }

  to {
    left: 100%;
  }
}
</style>