import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyDauiAuDbHnZ-WZpWsJm8z8fSV7Ydv5Z_s",
	authDomain: "my-clothing-db-ffb62.firebaseapp.com",
	databaseURL: "https://my-clothing-db-ffb62.firebaseio.com",
	projectId: "my-clothing-db-ffb62",
	storageBucket: "my-clothing-db-ffb62.appspot.com",
	messagingSenderId: "170520936851",
	appId: "1:170520936851:web:d063632b1787f024ab6866",
	measurementId: "G-39J7X280GT",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
