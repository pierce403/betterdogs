import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
const pk=process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,'\n');
if(!getApps().length && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && pk){initializeApp({credential:cert({projectId:process.env.FIREBASE_PROJECT_ID,clientEmail:process.env.FIREBASE_CLIENT_EMAIL,privateKey:pk})});}

function requireFirebaseAdminApp(){
  if(!getApps().length){
    throw new Error('Firebase Admin is not initialized. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
  }
}

export function getAdminAuth(){
  requireFirebaseAdminApp();
  return getAuth();
}

export function getAdminDb(){
  requireFirebaseAdminApp();
  return getFirestore();
}
