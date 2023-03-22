import { create } from "zustand";
export interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}
export interface Model {
  id: string;
  maxTokens: number;
  name: string;
  description: string;
  trainingData: string;
  note?: string;
}
export const initialValues = {
  apiKey: "",
  apiKeyModal: false,
  apiKeyError: false,
  initialSystemInstruction:
    "You are ChatGPT, a large language model trained by OpenAI.",
  messages: [] as Message[],
  modelModal: false,
  model: {
    name: "GPT-3.5-TURBO",
    id: "gpt-3.5-turbo",
    description:
      "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration.",
    maxTokens: 4096,
    trainingData: "Up to Sep 2021",
  } as Model,
  models: [
    {
      name: "GPT-3.5-TURBO",
      id: "gpt-3.5-turbo",
      description:
        "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration.",
      maxTokens: 4096,
      trainingData: "Up to Sep 2021",
    },
    {
      name: "GPT-3.5-TURBO-0301",
      id: "gpt-3.5-turbo-0301",
      description:
        "Snapshot of gpt-3.5-turbo from March 1st 2023. Unlike gpt-3.5-turbo, this model will not receive updates, and will only be supported for a three month period ending on June 1st 2023.",
      maxTokens: 4096,
      trainingData: "Up to Sep 2021",
    },
    {
      name: "GPT-4 (Limited Beta)",
      id: "gpt-4",
      description:
        "More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration.",
      maxTokens: 8192,
      trainingData: "Up to Sep 2021",
      note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
    },
    {
      name: "GPT-4-0314 (Limited Beta)",
      id: "gpt-4-0314",
      description:
        "Snapshot of gpt-4 from March 14th 2023. Unlike gpt-4, this model will not receive updates, and will only be supported for a three month period ending on June 14th 2023.",
      maxTokens: 8192,
      trainingData: "Up to Sep 2021",
      note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
    },
    {
      name: "GPT-4-32K (Limited Beta)",
      id: "gpt-4-32k",
      description:
        "Same capabilities as GPT-4, but with 4x the context length. Will be updated with our latest model iteration.",
      trainingData: "Up to Sep 2021",
      maxTokens: 32768,
      note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
    },
    {
      name: "GPT-4-32K-0314 (Limited Beta)",
      id: "gpt-4-32k-0314",
      description:
        "Snapshot of gpt-4-32k from March 14th 2023. Unlike gpt-4-32k, this model will not receive updates, and will only be supported for a three month period ending on June 14th 2023.",
      trainingData: "Up to Sep 2021",
      maxTokens: 32768,
      note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
    },
  ] as Model[],
  width: 0,
};

interface Store {
  apiKey: string;
  setApiKey: (value: string) => void;
  apiKeyModal: boolean;
  setApiKeyModal: (value: boolean) => void;
  apiKeyError: boolean;
  setApiKeyError: (value: boolean) => void;
  initialSystemInstruction: string;
  setInitialSystemInstruction: (value: string) => void;
  messages: Message[];
  setMessages: (value: Message[]) => void;
  model: Model;
  setModel: (value: Model) => void;
  models: Model[];
  setModels: (value: Model[]) => void;
  modelModal: boolean;
  setModelModal: (value: boolean) => void;
  width: number;
  setWidth: (value: number) => void;
  resetValues: () => void;
}

const useStore = create<Store>((set) => ({
  ...initialValues,
  setApiKey: (value: string) => set({ apiKey: value }),
  setApiKeyModal: (value: boolean) => set({ apiKeyModal: value }),
  setApiKeyError: (value: boolean) => set({ apiKeyError: value }),
  setInitialSystemInstruction: (value: string) =>
    set({ initialSystemInstruction: value }),
  setMessages: (value: Message[]) => set({ messages: value }),
  setModel: (value: Model) => set({ model: value }),
  setModels: (value: Model[]) => set({ models: value }),
  setModelModal: (value: boolean) => set({ modelModal: value }),
  setWidth: (value: number) => set({ width: value }),
  resetValues: () => set(initialValues),
}));

export default useStore;
