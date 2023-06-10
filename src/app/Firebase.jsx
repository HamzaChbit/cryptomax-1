// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZkIMwLdYZJgFi7toW3lzg_nqAibZtjPE",
  authDomain: "crypto-25736.firebaseapp.com",
  projectId: "crypto-25736",
  storageBucket: "crypto-25736.appspot.com",
  messagingSenderId: "622541138831",
  appId: "1:622541138831:web:9ee8fd7773a81a8af779fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export   const auth = getAuth(app);
export const db = getFirestore(app);

export default app ;