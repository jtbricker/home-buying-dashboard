import firebase from "firebase";
var config = {
    apiKey: process.env.HBD_FIREBASE_API_KEY,
    authDomain: process.env.HBD_FIREBASE_DOMAIN,
    databaseURL: process.env.HBD_FIREBASE_URL,
    projectId: process.env.HBD_FIREBASE_PROJECT_ID,
    storageBucket: process.env.HBD_FIREBASE_BUCKET,
    messagingSenderId: process.env.HBD_FIREBASE_SENDER_ID,
    appId: process.env.HBD_FIREBASE_APP_ID,
    measurementId: process.env.HBD_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export default firebase.database();
