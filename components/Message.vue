<template>
  <div class="chat-container">
    <div class="thumbnail">
      <img :src="message.user.thumbnail">
    </div>
    <div class="username">
      {{ displayName }}
    </div>
    <div>{{ message.text }}</div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  computed: {
    displayName() {
      return `@${this.message.user.name}`
    }
  },
}
</script>
