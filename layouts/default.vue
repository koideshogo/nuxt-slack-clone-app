<template>
<div class="min-h-screen w-full flex max-w-6xl">
  <!-- side bar -->
  <div class="bg-blue-400 text-back-400 w-72">
  <!-- nav -->
    <p class="text-center">チャンネル一覧</p>
    <nav v-for="channel in channels" :key="channel.id">
      <nuxt-link :to="`/channels/${channel.id}`">{{ channel.name }}</nuxt-link>
    </nav>
  </div>

  <div class="hero-content w-full overflow-auto">
    <Nuxt />
  </div>
</div>
</template>

<script>
import {db} from '~/plugins/firebase.js'

export default {
  data() {
    return {
      channels: [],
    }
  },
  mounted() {
    // db.collection('channels').get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((item) => {
    //       this.channels.push(item.doc())
    //     })
    //       console.log(this.channels)
    // })
    db.collection('channels').get()
      .then((querySnapShot) => {
        querySnapShot.forEach(item => {
          this.channels.push({id: item.id, ...item.data()})
        });
        // console.log(this.channels)
      })
  }

}
</script>
