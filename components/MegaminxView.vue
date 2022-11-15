<template>
  <div class="columns is-mobile is-vcentered is-marginless">
    <div class="column is-1-tablet is-2-mobile has-text-centered">
      <img :src="imagePath()" height="80" width="80" :alt="image" />
    </div>
    <div class="column is-11-tablet is-10-mobile p-0">
      {{ algorithm }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    algorithm: {
      type: String,
      required: true,
    },
  },
  methods: {
    imagePath() {
      return require(`@/assets/images/megaminx/${this.image}.png`)
    },
  },
}
</script>
