import firebase from "firebase"

const firebaseConfig = {
  apiKey: 'AIzaSyARpkXw2UReg7FiCVlupF81bHPmsl49sU8',
  authDomain: 'fir-expotest-6c892.firebaseapp.com',
  projectId: 'fir-expotest-6c892',
  storageBucket: 'fir-expotest-6c892.appspot.com',
  messagingSenderId: '153052043368',
  appId: '1:153052043368:web:a2ba8f417b26cb7e3a03dd',
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export { db };