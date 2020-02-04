import {createStore,compose, combineReducers} from 'redux';
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore,firestoreReducer} from  'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
//Para la autenticacion
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyApbLmZSK0HDexieUmNxjf-Iqbg3l6kUb4",
    authDomain: "biblioteca-68a2f.firebaseapp.com",
    databaseURL: "https://biblioteca-68a2f.firebaseio.com",
    projectId: "biblioteca-68a2f",
    storageBucket: "biblioteca-68a2f.appspot.com",
    messagingSenderId: "67141547211",
    appId: "1:67141547211:web:32ba2f07b11ae67ca0d74e",
    measurementId: "G-N3FKSCWDYB"
  };

  
// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
     useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  }

  //crear el enhacer con compose de redux y firestore

  const createStoreWithfirebase = compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
      
  )(createStore);

  const rootReducer = combineReducers({
      firebase: firebaseReducer,
      firestore: firestoreReducer
  })

  const initialState = {};
  const store = createStoreWithfirebase(rootReducer,initialState,compose(
      reactReduxFirebase(firebase),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

  export default store;