<template>
  <div class="columns is-mobile is-vcentered is-marginless">
    <div class="column is-2-tablet is-3-mobile has-text-centered">
      <div :id="image"></div>
    </div>
    <div class="column is-10-tablet is-9-mobile p-0">
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
}
</script>
