import { headers } from 'next/headers';
import { getAdminAuth, getAdminDb } from './firebaseAdmin';
export async function getCurrentUserToken(){const h=headers().get('authorization'); return h?.startsWith('Bearer ')?h.slice(7):null;}
export async function requireAuth(){const t=await getCurrentUserToken(); if(!t) throw new Error('Unauthorized'); return getAdminAuth().verifyIdToken(t);}
export async function getUserRole(uid:string){const d=await getAdminDb().collection('users').doc(uid).get(); return d.data()?.role||'owner';}
export async function requireCaseAccess(uid:string,caseId:string){const c=(await getAdminDb().collection('cases').doc(caseId).get()).data(); if(!c) throw new Error('Case not found'); const role=await getUserRole(uid); if(role==='admin'||c.ownerId===uid||c.trainerId===uid) return c; throw new Error('Forbidden');}
