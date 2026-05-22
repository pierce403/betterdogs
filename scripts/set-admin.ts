import { adminDb } from '../lib/firebaseAdmin';
const uid=process.argv[2]; if(!uid) throw new Error('Usage: npm tsx scripts/set-admin.ts <uid>');
adminDb.collection('users').doc(uid).set({role:'admin',updatedAt:new Date()},{merge:true}).then(()=>console.log('granted'));
