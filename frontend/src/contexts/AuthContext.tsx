import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lista de administradores (emails autorizados)
const ADMIN_EMAILS = ['adislanconsultoria@gmail.com'];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Converter Firebase User para nosso User
  const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
    const isAdmin = firebaseUser.email ? ADMIN_EMAILS.includes(firebaseUser.email) : false;
    
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      role: isAdmin ? 'admin' : 'user',
      isActive: true
    };
  };

  // Login com Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = convertFirebaseUser(result.user);
      setUser(user);
    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw error;
    }
  };

  // Login com Email/Senha
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = convertFirebaseUser(result.user);
      setUser(user);
    } catch (error) {
      console.error('Erro no login com email:', error);
      throw error;
    }
  };

  // Logout
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  // Criar usuário (apenas admin)
  const createUser = async (email: string, password: string, displayName: string, role: 'admin' | 'user') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = convertFirebaseUser(result.user);
      setUser(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  };

  // Observar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = convertFirebaseUser(firebaseUser);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signOut,
    createUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 