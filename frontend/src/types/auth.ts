export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'user';
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  createUser: (email: string, password: string, displayName: string, role: 'admin' | 'user') => Promise<void>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  displayName: string;
  role: 'admin' | 'user';
} 