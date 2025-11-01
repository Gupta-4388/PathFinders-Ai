
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface UseCollectionOptions<T> {
  where?: [string, '==', any][];
  orderBy?: [string, 'asc' | 'desc'];
  limit?: number;
  startAfter?: any;
  endBefore?: any;
  limitToLast?: number;
}

export function useCollection<T>(
  collectionPath: string,
  options: UseCollectionOptions<T> = {}
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const memoizedQuery = useMemo(() => {
    if (!firestore) return null;
    let q: Query<DocumentData> = collection(firestore, collectionPath);
    if (options.where) {
      options.where.forEach((w) => (q = query(q, where(w[0], w[1], w[2]))));
    }
    if (options.orderBy) {
      q = query(q, orderBy(options.orderBy[0], options.orderBy[1]));
    }
    if (options.startAfter) {
      q = query(q, startAfter(options.startAfter));
    }
    if (options.endBefore) {
      q = query(q, endBefore(options.endBefore));
    }
    if (options.limit) {
      q = query(q, limit(options.limit));
    }
    if (options.limitToLast) {
      q = query(q, limitToLast(options.limitToLast));
    }
    return q;
  }, [
    firestore,
    collectionPath,
    JSON.stringify(options.where),
    JSON.stringify(options.orderBy),
    options.limit,
    options.startAfter,
    options.endBefore,
    options.limitToLast,
  ]);

  useEffect(() => {
    if (!memoizedQuery) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      memoizedQuery,
      (snapshot) => {
        const data: T[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [memoizedQuery]);

  return { data, loading };
}
