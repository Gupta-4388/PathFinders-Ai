'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

interface ProfileContextType {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  goals: string;
  setGoals: Dispatch<SetStateAction<string>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [name, setName] = useState<string>('');
    const [goals, setGoals] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setName(localStorage.getItem('profileName') || '');
        setGoals(localStorage.getItem('profileGoals') || '');
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('profileName', name);
        }
    }, [name, isMounted]);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('profileGoals', goals);
        }
    }, [goals, isMounted]);

  return (
    <ProfileContext.Provider value={{ name, setName, goals, setGoals }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
