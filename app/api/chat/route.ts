import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";

import { searchFoods } from "@/services/searchFoods";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1-mini"),

    system: `
      You are a helpful restaurant assistant.

      Help users find foods from the restaurant menu.

      Use the searchFoods tool when the user asks
      to find or search for foods.

      Be concise and friendly.
    `,

    messages: await convertToModelMessages(messages),

    tools: {
      searchFoods: tool({
        description:
          "Search foods from the restaurant menu by category.",

        inputSchema: z.object({
          category: z
            .string()
            .optional()
            .describe(
              "Food category such as Seafood, Chicken, Beef, Dessert."
            ),
        }),

        execute: async ({ category }) => {
          return await searchFoods(category);
        },
      }),
    },

    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}