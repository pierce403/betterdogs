import { NextResponse } from 'next/server'; import { requireAuth, getUserRole } from '@/lib/auth-server';
export async function POST(){try{const decoded=await requireAuth();return NextResponse.json({uid:decoded.uid,email:decoded.email,role:await getUserRole(decoded.uid)});}catch{return NextResponse.json({error:'Unauthorized'},{status:401});}}
