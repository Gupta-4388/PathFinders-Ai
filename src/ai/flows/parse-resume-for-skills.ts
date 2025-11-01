'use server';
/**
 * @fileOverview This file defines a Genkit flow for parsing a resume and extracting skills and experience.
 *
 * The flow takes a resume file (PDF or DOCX) as input and returns a list of skills and a summary of experience.
 *
 * @interface ParseResumeInput - Defines the input schema for the flow.
 * @interface ParseResumeOutput - Defines the output schema for the flow.
 * @function parseResumeForSkills - The main function to parse the resume.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume file (PDF or DOCX) as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ParseResumeOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  experienceSummary: z
    .string()
    .describe('A summary of the work experience extracted from the resume.'),
});
export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResumeForSkills(input: ParseResumeInput): Promise<ParseResumeOutput> {
  return parseResumeForSkillsFlow(input);
}

const parseResumePrompt = ai.definePrompt({
  name: 'parseResumePrompt',
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParseResumeOutputSchema},
  prompt: `You are an expert HR assistant whose job is to extract skills and experience from resumes.

  Please analyze the following resume and extract all relevant skills and create a summary of the experience.
  Resume: {{media url=resumeDataUri}}

  Skills: Return a list of skills.
  Experience Summary: Return a summary of the experience.`,
});

const parseResumeForSkillsFlow = ai.defineFlow(
  {
    name: 'parseResumeForSkillsFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParseResumeOutputSchema,
  },
  async input => {
    const {output} = await parseResumePrompt(input);
    return output!;
  }
);
