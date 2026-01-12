// src/firebase/firestore.ts
import { db } from './config';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  CollectionReference,
  QuerySnapshot,
} from 'firebase/firestore';

import type { DocumentData } from 'firebase/firestore';

export const addDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  try {
    const colRef: CollectionReference<T> = collection(db, collectionName) as CollectionReference<T>;
    const docRef = await addDoc(colRef, data);
    console.log(`Document added with ID: ${docRef.id}`);
    return docRef;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      console.warn(`Document ${docId} not found in ${collectionName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

export const getAllDocuments = async <T extends DocumentData>(
  collectionName: string
): Promise<(T & { id: string })[]> => {
  try {
    const colRef = collection(db, collectionName) as CollectionReference<T>;
    const snapshot: QuerySnapshot<T> = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T & { id: string }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async <T extends Partial<DocumentData>>(
  collectionName: string,
  docId: string,
  data: T
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    console.log(`Document ${docId} updated in ${collectionName}`);
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log(`Document ${docId} deleted from ${collectionName}`);
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};
