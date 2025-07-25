import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase - ATUALIZE COM SUAS CREDENCIAIS REAIS
const firebaseConfig = {
  apiKey: "AIzaSyADSW4jCv1LrL8kXt__EM9oD2Ur7JLGEUA",
  authDomain: "sapiensdash.firebaseapp.com",
  projectId: "sapiensdash",
  storageBucket: "sapiensdash.firebasestorage.app",
  messagingSenderId: "74024978856",
  appId: "1:74024978856:web:31a81ee682972f0117759d",
  measurementId: "G-FWCWFVSJBR"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

export default app; 