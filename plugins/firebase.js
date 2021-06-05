import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
const config = {
  apiKey: "AIzaSyD4NRWBbc3OzFVxIdR_ceh97c1ivgSmXIg",
  authDomain: "slack-clone-app-59c5f.firebaseapp.com",
  projectId: "slack-clone-app-59c5f",
  storageBucket: "slack-clone-app-59c5f.appspot.com",
  messagingSenderId: "553067968728",
  appId: "1:553067968728:web:ba7ce809404938166dffad",
  measurementId: "G-T68790XZ8F"

  // apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  // authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  // databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  // projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  // storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  // messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
firebase,
db
}
