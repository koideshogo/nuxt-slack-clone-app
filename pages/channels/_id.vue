<template>
<div class="container">
  <Messages :messages="messages" />
  <ChatForm />
</div>
</template>

<script>
  import Messages from '@/components/Messages.vue'
  import ChatForm from '@/components/ChatForm.vue'
  import {db} from '~/plugins/firebase'
export default {
  data() {
    return {
      messages: []
    }
  },
  components: {
    Messages,
    ChatForm
  },
  mounted() {
    const channelId = this.$route.params.id

    db.collection('channels').doc(channelId).collection('messages').orderBy('createdAt')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc
        if(change.type === 'added') {
          this.messages.push({id: doc.id, ...doc.data()})
        }
      })
    })
  }
}
</script>
