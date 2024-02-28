import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfkKtn0OvR8FgEcEIjNdhS6iqhtth_Gj4",
  authDomain: "bookshelf-2-0-64088.firebaseapp.com",
  projectId: "bookshelf-2-0-64088",
  storageBucket: "bookshelf-2-0-64088.appspot.com",
  messagingSenderId: "756875155908",
  appId: "1:756875155908:web:297152fcc064efcb0dac91",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Initialize Auth
export const auth = getAuth(app);
//Initialize Storage
export const db = getFirestore(app);
//Initialize Storage
export const storage = getStorage(app);
