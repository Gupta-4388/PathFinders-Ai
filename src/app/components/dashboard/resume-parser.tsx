
'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { parseResumeForSkills } from '@/ai/flows/parse-resume-for-skills';
import { useResume } from '@/app/contexts/resume-context';

export function ResumeParser() {
  const { toast } = useToast();
  const { resumeData, setResumeData, isParsing, setIsParsing } = useResume();
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
      });
      return;
    }

    setIsParsing(true);
    setFileName(file.name);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64File = reader.result as string;
        
        try {
            const result = await parseResumeForSkills({ resumeDataUri: base64File });
            setResumeData(result);

            toast({
              title: "Resume Parsed Successfully!",
              description: "Your skills and experience have been analyzed.",
              className: "bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600",
            });
        } catch (error: any) {
            console.error(error);
            let description = "There was a problem parsing your resume. Please try again.";
            if (error.message && error.message.includes('503')) {
                description = "The AI service is currently overloaded. Please try again in a few moments.";
            }
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: description,
            });
            setResumeData(null);
        } finally {
            setIsParsing(false);
        }
      };
      reader.onerror = () => {
        throw new Error("Failed to read the file.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem reading your file. Please try again.",
      });
      setResumeData(null);
      setIsParsing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });

  return (
    <Card className="h-full bg-card/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Analyze Your Resume</CardTitle>
        <CardDescription>Upload your resume (PDF, DOCX, or TXT) to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        {isParsing ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center h-64">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="font-semibold text-xl">Analyzing your resume...</p>
            <p className="text-muted-foreground">{fileName}</p>
          </div>
        ) : resumeData ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Extracted Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Experience Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resumeData.experienceSummary}
              </p>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Raw Text</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-h-40 overflow-auto">
                {resumeData.rawText}
              </p>
            </div>
            <Button onClick={() => { setResumeData(null); setFileName(null); }} variant="outline">
              Upload a different resume
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors h-64 ${isDragActive ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-center text-muted-foreground">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here, or click to select'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or TXT (max 5MB)</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
