import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADSW4jCv1LrL8kXt__EM9oD2Ur7JLGEUA",
  authDomain: "sapiensdash.firebaseapp.com",
  projectId: "sapiensdash",
  storageBucket: "sapiensdash.firebasestorage.app",
  messagingSenderId: "74024978856",
  appId: "1:74024978856:web:31a81ee682972f0117759d",
  measurementId: "G-FWCWFVSJBR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
