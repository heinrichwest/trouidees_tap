// src/firebase/auth.ts
import { auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser as firebaseDeleteUser,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

import type { User } from 'firebase/auth';

/**
 * Registers a new user with email and password
 * Optionally you can pass a displayName
 */
export const registerUser = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    return userCredential.user;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Logs in a user with email and password
 */
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Logs out the currently authenticated user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error logging out:', error);
    throw error;
  }
};

/**
 * Reauthenticates the current user
 * Required for sensitive operations like delete or update email/password
 */
export const reauthenticateUser = async (password: string): Promise<User> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently logged in');
    if (!user.email) throw new Error('User does not have an email associated');

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    return user;
  } catch (error: any) {
    console.error('Error reauthenticating user:', error);
    throw error;
  }
};

/**
 * Deletes the currently authenticated user
 * User must be recently logged in or reauthenticated
 */
export const deleteUser = async (): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently logged in');

    await firebaseDeleteUser(user);
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
