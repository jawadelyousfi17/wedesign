'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export type ReviewResult = {
  pass: boolean;
  feedback: string;
};

export async function reviewCode(data: {
  moduleName: string;
  challengeName: string;
  description: string;
  html?: string;
  css?: string;
  js?: string;
}): Promise<ReviewResult> {
  try {
    const { moduleName, challengeName, description, html, css, js } = data;

    const prompt = `
You are an expert web development instructor reviewing a student's code submission.

Challenge Context:
- Module: ${moduleName}
- Challenge: ${challengeName}
- Description/Objective: ${description}

Student's Code:
--- HTML ---
${html || 'No HTML provided'}

--- CSS ---
${css || 'No CSS provided'}

--- JavaScript ---
${js || 'No JavaScript provided'}

Task:
Evaluate the student's code against the challenge description and objective.
Determine if the code successfully completes the challenge requirements.
If it passes, provide a brief encouraging message.
If it fails, explain exactly what went wrong and give a hint on how to fix it without giving away the exact solution.
Format your feedback using Markdown for better readability (e.g., use bold text, code blocks, bullet points).
`;

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        pass: z.boolean().describe('Whether the student successfully completed the challenge'),
        feedback: z.string().describe('Feedback explaining what went wrong or an encouraging message if passed, formatted in Markdown'),
      }),
      prompt: prompt,
    });

    return object;
  } catch (error) {
    console.error('Error during AI review:', error);
    return {
      pass: false,
      feedback: 'An error occurred while reviewing your code. Please try again later.',
    };
  }
}
