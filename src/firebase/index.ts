
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from './config';

// Provides a single instance of the Firebase app that can be used throughout the app.
export function initializeFirebase(): FirebaseApp {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0] as FirebaseApp;
}

export {
  FirebaseProvider,
  useFirebaseApp,
  useAuth,
  useFirestore,
} from './provider';

export { FirebaseClientProvider } from './client-provider';

export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
