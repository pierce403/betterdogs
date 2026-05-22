'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getClientAuth, getClientDb } from '@/lib/firebaseClient';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const C = createContext<AuthContextValue>({ user: null, loading: true, error: null });

export const useAuth = () => useContext(C);

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = onAuthStateChanged(getClientAuth(), async (u) => {
        setUser(u);

        if (u) {
          try {
            const ref = doc(getClientDb(), 'users', u.uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
              await setDoc(ref, {
                uid: u.uid,
                email: u.email || '',
                displayName: u.displayName || '',
                role: 'owner',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
            }
          } catch (profileError) {
            console.error('Failed to sync user profile in Firestore:', profileError);
            setError(
              `Signed in, but profile sync failed: ${getErrorMessage(profileError)}. ` +
                'You can keep using the app, but some data might not save correctly.',
            );
          }
        }

        setLoading(false);
      });
    } catch (authInitError) {
      console.error('Failed to initialize Firebase auth listener:', authInitError);
      setError(
        `Auth initialization failed: ${getErrorMessage(authInitError)}. ` +
          'Check Firebase env vars and refresh.',
      );
      setLoading(false);
    }

    return () => {
      unsubscribe?.();
    };
  }, []);

  return (
    <C.Provider value={{ user, loading, error }}>
      {error ? (
        <div className='mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-900'>
          <p className='font-semibold'>Debug error</p>
          <p className='mt-1'>{error}</p>
        </div>
      ) : null}
      {children}
    </C.Provider>
  );
}
