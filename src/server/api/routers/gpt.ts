import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { type AxiosError } from "axios";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import type { Message } from "~/types/appstate";

export type ChatResponse = {
  id: string;
  created: number;
  model: string;
  choices: [
    {
      finish_reason: string;
      index: number;
      message: Message;
    }
  ];
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
};

export const gptRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        apiKey: z.string(),
        model: z.string(),
        messages: z.array(
          z.object({
            role: z.enum(["user", "system", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const configuration = new Configuration({
        apiKey: input.apiKey,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai
        .createChatCompletion({
          model: input.model,
          messages: input.messages,
        })
        .catch((error: AxiosError) => {
          console.error(error);
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              cause: error.response.data,
              message: error.message,
            });
          } else {
            console.log(error.message);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }
        });
      return response.data as ChatResponse;
    }),
});
