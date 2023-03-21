import { TRPCError } from "@trpc/server";
import axios, { type AxiosError } from "axios";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
interface ErrorMessages {
  [statusCode: number]: string;
}
interface ErrorResponseData {
  message?: string;
}
const openAIErrorMessages: ErrorMessages = {
  401: "Unauthorized request.",
  429: "Rate limit reached or quota exceeded.",
  500: "Internal server error.",
};

function isErrorResponseData(data: any): data is ErrorResponseData {
  return (
    typeof data === "object" &&
    (data.message === undefined || typeof data.message === "string")
  );
}
function handleApiError(error: AxiosError, errorMessages: ErrorMessages) {
  let errorMessage = "An error occurred while making the request.";

  if (!error.response) {
    errorMessage = "A network error occurred.";
  } else {
    const defaultErrorMessage =
      errorMessages[error.response.status] || "An unexpected error occurred.";
    errorMessage =
      (isErrorResponseData(error.response.data) &&
        error.response.data.message) ||
      defaultErrorMessage;
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: errorMessage,
  });
}
export const gptRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        apiKey: z.string(),
        model: z.string(),
        messages: z.array(
          z.object({
            role: z.string(),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      return await axios({
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${input.apiKey}`,
        },
        data: {
          model: input.model,
          messages: input.messages,
        },
      }).catch((error: AxiosError) => {
        handleApiError(error, openAIErrorMessages);
      });
    }),
});
