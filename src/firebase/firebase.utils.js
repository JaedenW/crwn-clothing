import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
	apiKey: "AIzaSyBiDx7K8uKR74mo3B8EBYA4owH64nanvps",
	authDomain: "react-ztm-effca.firebaseapp.com",
	projectId: "react-ztm-effca",
	storageBucket: "react-ztm-effca.appspot.com",
	messagingSenderId: "766577004378",
	appId: "1:766577004378:web:2c552f6bf405f17b98ed63",
	measurementId: "G-XJPHN5KKJ7",
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
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
				...addtionalData,
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
