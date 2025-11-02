'use server';

/**
 * @fileOverview Generates mock interview questions for a specific role and scores the answers.
 *
 * - generateMockInterviewQuestions - A function that generates mock interview questions and scores the answers.
 * - GenerateMockInterviewQuestionsInput - The input type for the generateMockInterviewQuestions function.
 * - GenerateMockInterviewQuestionsOutput - The return type for the generateMockInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMockInterviewQuestionsInputSchema = z.object({
  role: z.string().describe('The job role to generate interview questions for.'),
  userAnswer: z.string().optional().describe('The user\'s answer to the question.'),
  question: z.string().optional().describe('The current question in the interview.'),
  askedQuestions: z.array(z.string()).optional().describe('A list of questions that have already been asked.'),
});

export type GenerateMockInterviewQuestionsInput = z.infer<
  typeof GenerateMockInterviewQuestionsInputSchema
>;

const GenerateMockInterviewQuestionsOutputSchema = z.object({
  question: z.string().describe('The generated interview question.'),
  score: z.number().optional().describe('The score for the user\'s answer (out of 10).'),
  feedback: z
    .string()
    .optional()
    .describe('Feedback on the user\'s answer, including areas for improvement.'),
});

export type GenerateMockInterviewQuestionsOutput = z.infer<
  typeof GenerateMockInterviewQuestionsOutputSchema
>;

export async function generateMockInterviewQuestions(
  input: GenerateMockInterviewQuestionsInput
): Promise<GenerateMockInterviewQuestionsOutput> {
  return generateMockInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMockInterviewQuestionsPrompt',
  input: {schema: GenerateMockInterviewQuestionsInputSchema},
  output: {schema: GenerateMockInterviewQuestionsOutputSchema},
  prompt: `You are an AI interview simulator. Your job is to act as an interviewer for the specified role.

Role: {{{role}}}

The interview should cover a range of topics relevant to the role, including technical skills, behavioral questions, and problem-solving scenarios.
Do not ask any questions about "PathFinders AI".

{{#if userAnswer}}
The user has answered the following question:
Previous Question: "{{{question}}}"
User's Answer: "{{{userAnswer}}}"

Your task is to:
1. Score the user's answer on a scale of 1 to 10.
2. Provide constructive feedback on the answer, highlighting strengths and suggesting areas for improvement.
3. Generate the *next* interview question. This new question MUST NOT be one of the questions that has already been asked.

Do not repeat any of the following questions that have already been asked:
{{#each askedQuestions}}
- {{{this}}}
{{/each}}

{{else}}
This is the beginning of the interview.

Your task is to:
1. Generate the *first* interview question for the specified role.

{{/if}}

Your entire response MUST be in the specified JSON format.
`,
});

const generateMockInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateMockInterviewQuestionsFlow',
    inputSchema: GenerateMockInterviewQuestionsInputSchema,
    outputSchema: GenerateMockInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
