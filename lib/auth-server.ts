import { headers } from 'next/headers';
import { adminAuth, adminDb } from './firebaseAdmin';
export async function getCurrentUserToken(){const h=headers().get('authorization'); return h?.startsWith('Bearer ')?h.slice(7):null;}
export async function requireAuth(){const t=await getCurrentUserToken(); if(!t) throw new Error('Unauthorized'); return adminAuth.verifyIdToken(t);}
export async function getUserRole(uid:string){const d=await adminDb.collection('users').doc(uid).get(); return d.data()?.role||'owner';}
export async function requireCaseAccess(uid:string,caseId:string){const c=(await adminDb.collection('cases').doc(caseId).get()).data(); if(!c) throw new Error('Case not found'); const role=await getUserRole(uid); if(role==='admin'||c.ownerId===uid||c.trainerId===uid) return c; throw new Error('Forbidden');}
