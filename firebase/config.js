// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from '@firebase/firestore';
import { getStorage} from '@firebase/storage';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDK6Sr0G3vroF5Kd8df5fE05o6VKCWI2Ng",
    authDomain: "twitterclone-b784a.firebaseapp.com",
    projectId: "twitterclone-b784a",
    storageBucket: "twitterclone-b784a.appspot.com",
    messagingSenderId: "1069476761131",
    appId: "1:1069476761131:web:90f0aeb78a7e1188b5a46e",
    measurementId: "G-FNXFGWY6H2"
}
// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);
export const storage = getStorage(firebase_app);