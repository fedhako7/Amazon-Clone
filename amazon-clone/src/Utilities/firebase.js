import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


const API_KEY = import.meta.env.VITE_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "clone-2e637.firebaseapp.com",
  projectId: "clone-2e637",
  storageBucket: "clone-2e637.appspot.com",
  messagingSenderId: "723728324697",
  appId: "1:723728324697:web:5e1d2c3780a6c3aaa33948"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()