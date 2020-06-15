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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	// to perform CRUD methods, DocumentReference object should be used.
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
			console.log("error creating user", error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
