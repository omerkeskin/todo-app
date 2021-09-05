// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw4oEdCCAOKeeZjJokiEA50E3Mvqdkf_I",
  authDomain: "todo-list-14a09.firebaseapp.com",
  projectId: "todo-list-14a09",
  storageBucket: "todo-list-14a09.appspot.com",
  messagingSenderId: "853167596175",
  appId: "1:853167596175:web:9c4625b504fab7ea1d06fa",
  measurementId: "G-X2WSQRK2FQ"
};

const fetchFirestore = async function(){
  var db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "todo-items"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.data().text} => ${doc.data().status}`);
  });
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
fetchFirestore();

const addItem = function(event){
  event.preventDefault();
  let text = document.getElementById("todo-input");
  console.log(`${text.value}`);
}

