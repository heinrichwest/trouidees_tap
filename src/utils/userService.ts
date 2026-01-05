import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface UserProfile {
  email: string;
  displayName?: string;
  createdAt: any;
  lastLoginAt: any;
  role?: string;
}

/**
 * Creates or updates a user document in Firestore
 * @param userId - The user's UID from Firebase Auth
 * @param email - The user's email
 * @param displayName - Optional display name
 */
export async function createOrUpdateUserProfile(
  userId: string,
  email: string,
  displayName?: string
): Promise<void> {
  if (!db) {
    console.error('Firestore is not initialized');
    return;
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // User exists, update last login time
      await setDoc(
        userRef,
        {
          lastLoginAt: serverTimestamp(),
          email: email, // Update email in case it changed
          ...(displayName && { displayName }),
        },
        { merge: true }
      );
      console.log('User profile updated:', userId);
    } else {
      // New user, create document
      const userData: UserProfile = {
        email,
        displayName: displayName || email.split('@')[0],
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        role: 'user',
      };

      await setDoc(userRef, userData);
      console.log('New user profile created:', userId);
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    throw error;
  }
}





