'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export type ResumeData = {
  skills: string[];
  experienceSummary: string;
  rawText: string;
};

interface ResumeContextType {
  resumeData: ResumeData | null;
  setResumeData: Dispatch<SetStateAction<ResumeData | null>>;
  isParsing: boolean;
  setIsParsing: Dispatch<SetStateAction<boolean>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, isParsing, setIsParsing }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
