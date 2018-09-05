import Firebase from '@firebase/app'
// eslint-disable-next-line no-unused-vars
import FirebaseDatabase from '@firebase/database'

export default Firebase.initializeApp({
  apiKey: "AIzaSyBIaj6PnxqwhhOqHP6VF3ql4_CbNF9mOSw",
  authDomain: "kalkulation-vue.firebaseapp.com",
  databaseURL: "https://kalkulation-vue.firebaseio.com",
  projectId: "kalkulation-vue",
  storageBucket: "kalkulation-vue.appspot.com",
  messagingSenderId: "411750576448"
}).database()
