
'use client';
import { FirebaseProvider } from './provider';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { initializeFirebase } from '.';
import type { FirebaseApp } from 'firebase/app';
import { useEffect, useState } from 'react';

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services, setServices] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  useEffect(() => {
    const app = initializeFirebase();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    setServices({ app, auth, firestore });
  }, []);

  if (!services) {
    return null; // Or a loading spinner
  }

  return (
    <FirebaseProvider firebaseApp={services.app} auth={services.auth} firestore={services.firestore}>
      {children}
    </FirebaseProvider>
  );
};
