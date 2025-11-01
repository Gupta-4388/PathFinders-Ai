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
    const [name, setName] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('profileName') || '';
        }
        return '';
    });
    const [goals, setGoals] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('profileGoals') || '';
        }
        return '';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('profileName', name);
        }
    }, [name]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('profileGoals', goals);
        }
    }, [goals]);

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
