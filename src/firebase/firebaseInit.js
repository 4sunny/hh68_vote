// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPlrQzZYQoritXVe-KJh3643YlsCVLlxQ",
  authDomain: "hhvotes-752da.firebaseapp.com",
  databaseURL: "https://hhvotes-752da-default-rtdb.firebaseio.com",
  projectId: "hhvotes-752da",
  storageBucket: "hhvotes-752da.appspot.com",
  messagingSenderId: "767418088771",
  appId: "1:767418088771:web:1386a0a03c1d699b1c03f6",
  measurementId: "G-EW2EE8523K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();


export { analytics };
export { db };
export default app