'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { getClientDb } from '@/lib/firebaseClient';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const calc = (issue: string, bite: boolean) =>
  bite || /aggression|child/i.test(issue)
    ? 'red'
    : /separation|severe/i.test(issue)
      ? 'orange'
      : /barking|leash|reactivity/i.test(issue)
        ? 'yellow'
        : 'green';

function NewCaseForm() {
  const dogId = useSearchParams().get('dogId');
  const { user } = useAuth();
  const r = useRouter();
  const [issue, setIssue] = useState('');
  const [severity, setSeverity] = useState('');
  const [bite, setBite] = useState(false);

  if (!dogId || !user) return <p>Missing data</p>;

  return (
    <form
      className='space-y-2'
      onSubmit={async (e) => {
        e.preventDefault();
        const c = await addDoc(collection(getClientDb(), 'cases'), {
          ownerId: user.uid,
          dogId,
          trainerId: '',
          status: 'intake',
          primaryIssue: issue,
          severity,
          biteHistory: bite,
          homeEnvironment: '',
          goals: '',
          notes: '',
          safetyLevel: calc(issue, bite),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        r.push(`/cases/${c.id}`);
      }}
    >
      <input className='border p-2 w-full' placeholder='Primary issue' onChange={(e) => setIssue(e.target.value)} />
      <input className='border p-2 w-full' placeholder='Severity' onChange={(e) => setSeverity(e.target.value)} />
      <label>
        <input type='checkbox' onChange={(e) => setBite(e.target.checked)} /> Bite history
      </label>
      <button className='bg-black text-white px-4 py-2'>Create case</button>
    </form>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <NewCaseForm />
    </Suspense>
  );
}
