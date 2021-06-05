<template>
  <div class="container min-h-screen overflow-auto">
    <div class="chats-container flex">
      <!-- テキスト -->
      <div class="text-blue-800  message-container mt-9 ml-5">
        <Message v-for="message in messages" :key="message.id" :message="message" />
        <!-- <div class="user-name text-blue-800 text-sm font-extrabold">{{ displayName }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
export default {
  components: {
    Message
  },
  props: ['messages'],
  computed: {
    displayName() {
      return `@${this.message.user.name}`
    }
  },

}
</script>
