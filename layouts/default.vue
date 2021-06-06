<template>
<div class="min-h-screen w-full flex max-w-6xl">
  <!-- side bar -->
  <div class="bg-blue-400 text-back-400 w-72">
  <!-- nav -->
    <p class="text-center">チャンネル一覧</p>
    <nav v-for="channel in channels" :key="channel.id">
      <nuxt-link :to="`/channels/${channel.id}`">{{ channel.name }}</nuxt-link>
    </nav>
    <p v-if="isAuthenticated" @click="logout" class="w-full">ログアウト</p>
  </div>

  <div class="hero-content w-full overflow-auto">
    <Nuxt />
  </div>
</div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      channels: [],
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setUser(user)
        db.collection('profiles').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    })
    db.collection('channels').get()
      .then((querySnapShot) => {
        querySnapShot.forEach(item => {
          this.channels.push({id: item.id, ...item.data()})
        })
      })
  },
  methods: {
    ...mapActions(['setUser']),
    logout() {
      firebase.auth().signOut()
        .then(() =>  {
          this.setUser(null)
          window.alert('ログアウトしました')
        })
        .catch((e) => {
          window.alert('ログアウトに失敗しました')
          console.log(e)
        })
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }

}
</script>
