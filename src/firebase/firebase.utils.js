import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBNQ7cxUG7hGpW-Ue8WpSth_V2DHcCeU_o',
  authDomain: 'hoc-clothing-store.firebaseapp.com',
  databaseURL: 'https://hoc-clothing-store.firebaseio.com',
  projectId: 'hoc-clothing-store',
  storageBucket: 'hoc-clothing-store.appspot.com',
  messagingSenderId: '341087581268',
  appId: '1:341087581268:web:3041836edd253b789f69c1',
  measurementId: 'G-RWD13TPQJE',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
