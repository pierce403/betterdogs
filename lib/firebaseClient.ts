import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;
let cachedDb: Firestore | null = null;
let cachedGoogleProvider: GoogleAuthProvider | null = null;

function getOrInitApp(): FirebaseApp {
  if (cachedApp) return cachedApp;
  cachedApp = getApps().length ? getApps()[0]! : initializeApp(config);
  return cachedApp;
}

export function getClientAuth(): Auth {
  if (!cachedAuth) cachedAuth = getAuth(getOrInitApp());
  return cachedAuth;
}

export function getClientDb(): Firestore {
  if (!cachedDb) cachedDb = getFirestore(getOrInitApp());
  return cachedDb;
}

export function getGoogleProvider(): GoogleAuthProvider {
  if (!cachedGoogleProvider) cachedGoogleProvider = new GoogleAuthProvider();
  return cachedGoogleProvider;
}
