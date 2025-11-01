
'use client';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { createContext, useContext, useMemo } from 'react';

// The context for the Firebase app, auth, and firestore instances.
const FirebaseContext = createContext<{
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
} | null>(null);

/**
 * A hook to get the Firebase app instance.
 *
 * @example
 * ```tsx
 * import { useFirebaseApp } from '@/firebase';
 *
 * function MyComponent() {
 *  const firebaseApp = useFirebaseApp();
 * // ...
 * }
 * ```
 */
export const useFirebaseApp = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }
  return context.firebaseApp;
};

/**
 * A hook to get the Firebase auth instance.
 * @example
 * ```tsx
 * import { useAuth } from '@/firebase';
 *
 * function MyComponent() {
 * const auth = useAuth();
 * // ...
 * }
 * ```
 */
export const useAuth = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }
  return context.auth;
};

/**
 * A hook to get the Firebase firestore instance.
 * @example
 * ```tsx
 * import { useFirestore } from '@/firebase';
 *
 * function MyComponent() {
 * const firestore = useFirestore();
 * // ...
 * }
 * ```
 */
export const useFirestore = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirestore must be used within a FirebaseProvider');
  }
  return context.firestore;
};

/**
 * A provider for the Firebase app, auth, and firestore instances.
 * @example
 * ```tsx
 * import { FirebaseProvider } from '@/firebase';
 * import { initializeFirebase } from '@/firebase';
 *
 * function App() {
 *  const { firebaseApp, auth, firestore } = initializeFirebase();
 *  return (
 *   <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
 *    <MyComponent />
 *  </FirebaseProvider>
 * );
 * }
 * ```
 */
export const FirebaseProvider = ({
  children,
  firebaseApp,
  auth,
  firestore,
}: {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) => {
  const value = useMemo(
    () => ({ firebaseApp, auth, firestore }),
    [firebaseApp, auth, firestore]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
