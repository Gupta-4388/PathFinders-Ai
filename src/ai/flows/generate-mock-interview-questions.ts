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
  prompt: `You are an AI interview simulator. Your job is to ask the candidate interview questions for the
    role {{{role}}}. After the candidate answers, you will score their answer out of 10, and give them feedback
    on their answer, including areas for improvement.

    Do not repeat any of the following questions:
    {{#if askedQuestions}}
    {{#each askedQuestions}}
    - {{{this}}}
    {{/each}}
    {{/if}}

    If the user has not provided an answer, ask them a question for the role {{{role}}}.

    If the user has provided an answer, score their answer and give them feedback.

    Previous Question: {{{question}}}
    User Answer: {{{userAnswer}}}
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
