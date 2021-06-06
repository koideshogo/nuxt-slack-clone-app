<template>
  <div class="w-full flex">
    <img v-if="isAuthenticated" :src="user.photoURL" >
    <textarea v-if="isAuthenticated" class="border w-full border-indigo-600" v-model="text" @keydown.enter="submitForm"></textarea>
    <textarea v-model="text" v-else @click="openLoginModal" class="border w-full border-indigo-600"></textarea>
    <el-dialog title="Tips" width="30%" :visible.sync="dialogVisible">
      <span @click="login">this is a message</span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {mapActions} from 'vuex'
Vue.use(ElementUI)
import {db, firebase} from '@/plugins/firebase.js'

export default {
  data() {
    return {
      text: '',
      dialogVisible: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    ...mapActions(['setUser']),
    submitForm(event) {
      if(this.keyDownForJPConversion(event)){return}
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('messages').add({
        text: this.text,
        createdAt: new Date().getTime(),
        user: {
          name: this.user.displayName,
          thumbnail: this.user.photoURL
        }
      })
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
    },
    openLoginModal() {
      this.dialogVisible = true
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const user = result.user
          this.setUser(user)
          console.log(this.$store.state.user)
          console.log(user)
          this.dialogVisible = false
        })
        .catch((error) => {
          window.alert(error)
        })
    }
  }
}
</script>
