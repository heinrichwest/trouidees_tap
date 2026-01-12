import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import {
  loginUser,
  registerUser,
  logoutUser,
  deleteUser as firebaseDeleteUser,
  reauthenticateUser,
} from '../firebase/auth';
import type { User } from 'firebase/auth';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, displayName?: string) => Promise<User>;
  logout: () => Promise<void>;
  deleteUser: (password?: string) => Promise<void>;
  reauthenticate: (password: string) => Promise<User>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  // Register
  const register = useCallback(async (email: string, password: string, displayName?: string) => {
    const newUser = await registerUser(email, password, displayName);
    setUser(newUser);
    return newUser;
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  // Reauthenticate
  const reauthenticate = useCallback(async (password: string) => {
    if (!user) throw new Error('No user logged in');
    const reauthUser = await reauthenticateUser(password);
    setUser(reauthUser);
    return reauthUser;
  }, [user]);

  // Delete user (with optional reauth)
  const deleteUser = useCallback(async (password?: string) => {
    if (!user) throw new Error('No user logged in');

    if (password) {
      await reauthenticate(password); // reauthenticate first if password provided
    }

    await firebaseDeleteUser();
    setUser(null);
  }, [user, reauthenticate]);

  return { user, loading, login, register, logout, deleteUser, reauthenticate };
};
