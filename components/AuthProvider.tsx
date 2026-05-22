'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getClientAuth, getClientDb } from '@/lib/firebaseClient';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
const C=createContext<{user:User|null,loading:boolean}>({user:null,loading:true});
export const useAuth=()=>useContext(C);
export default function AuthProvider({children}:{children:React.ReactNode}){const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);
useEffect(()=>onAuthStateChanged(getClientAuth(),async(u)=>{setUser(u); if(u){const ref=doc(getClientDb(),'users',u.uid); const snap=await getDoc(ref); if(!snap.exists()) await setDoc(ref,{uid:u.uid,email:u.email||'',displayName:u.displayName||'',role:'owner',createdAt:serverTimestamp(),updatedAt:serverTimestamp()});} setLoading(false);}),[]);
return <C.Provider value={{user,loading}}>{children}</C.Provider>;}
