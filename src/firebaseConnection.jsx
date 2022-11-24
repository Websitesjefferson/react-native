import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA6WH40Q8b1FfIeteimrAW8szloiv8lAHk",
  authDomain: "appnative-b6870.firebaseapp.com",
  databaseURL: "https://appnative-b6870-default-rtdb.firebaseio.com",
  projectId: "appnative-b6870",
  storageBucket: "appnative-b6870.appspot.com",
  messagingSenderId: "529213241429",
  appId: "1:529213241429:web:6bd00c9693085d19bfbcdc",
  measurementId: "G-H30QTCBJMC"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
export default firebase