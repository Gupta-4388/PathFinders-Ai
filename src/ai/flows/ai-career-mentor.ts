'use server';

/**
 * @fileOverview This file defines the AI career mentor flow.
 *
 * The flow allows users to chat with an AI mentor that can provide personalized advice,
 * analyze skill gaps, and recommend learning resources, while understanding their resume.
 *
 * @interface AICareerMentorInput - Defines the input for the AI career mentor flow.
 * @interface AICareerMentorOutput - Defines the output for the AI career mentor flow.
 * @function aiCareerMentor - The main function to interact with the AI career mentor.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICareerMentorInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text extracted from the user\'s resume.'),
  userInput: z
    .string()
    .describe('The user\'s message to the AI career mentor.'),
});
export type AICareerMentorInput = z.infer<typeof AICareerMentorInputSchema>;

const AICareerMentorOutputSchema = z.object({
  response: z.object({
    advice: z.string().describe("General career advice or a direct answer to the user's question."),
    skillGaps: z.array(z.string()).optional().describe("A list of skills the user might be missing for their career goals, based on their resume."),
    learningRecommendations: z.array(z.object({
        resource: z.string().describe("A specific course, book, or resource to learn a new skill."),
        reason: z.string().describe("Why this resource is recommended for the user.")
    })).optional().describe("A list of personalized learning recommendations.")
  }).describe('The AI career mentor\'s response in JSON format.')
});
export type AICareerMentorOutput = z.infer<typeof AICareerMentorOutputSchema>;

export async function aiCareerMentor(input: AICareerMentorInput): Promise<AICareerMentorOutput> {
  return aiCareerMentorFlow(input);
}

const aiCareerMentorPrompt = ai.definePrompt({
  name: 'aiCareerMentorPrompt',
  input: {schema: AICareerMentorInputSchema},
  output: {schema: AICareerMentorOutputSchema},
  prompt: `You are an AI career mentor. You are helping the user with career advice, skill gap analysis, and learning recommendations.
Your response MUST be in JSON format.

You have access to the user's resume text, use it to provide personalized and accurate response.

Resume Text: {{{resumeText}}}

User Input: {{{userInput}}}
`,
});

const aiCareerMentorFlow = ai.defineFlow(
  {
    name: 'aiCareerMentorFlow',
    inputSchema: AICareerMentorInputSchema,
    outputSchema: AICareerMentorOutputSchema,
  },
  async input => {
    const {output} = await aiCareerMentorPrompt(input);
    return output!;
  }
);
