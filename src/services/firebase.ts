// src/services/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function saveRecording(audioUrl: string): Promise<string> {
  const id = nanoid(8)
  await setDoc(doc(db, 'recordings', id), {
    audioUrl,
    createdAt: Date.now(),
  })
  return id
}

export async function getRecording(id: string) {
  const snapshot = await getDoc(doc(db, 'recordings', id))
  if (!snapshot.exists()) return null
  return snapshot.data()
}
