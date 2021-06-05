<template>
  <div class="mt-50 w-full">
    <textarea class="border w-full border-indigo-600" v-model="text" @keydown.enter="submitForm"></textarea>
  </div>
</template>

<script>
import {db} from '@/plugins/firebase.js'
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    submitForm(event) {
      if(this.keyDownForJPConversion(event)){return}
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('messages').add({text: this.text, createdAt: new Date().getTime()})
      .then(() => {
        this.text = ''
      })
      .catch(() => {
        alert('メッセージの送信に失敗しました。')
      })
    },
    keyDownForJPConversion(event){
      const codeForConversion = 229
      return event.keyCode === codeForConversion
    }
  }
}
</script>
