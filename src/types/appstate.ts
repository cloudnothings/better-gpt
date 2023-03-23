// appstate.ts

export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export type Usage = {
  total_tokens: number;
  completion_tokens: number;
  prompt_tokens: number;
};

export type Profile = {
  id: string;
  key: string;
  name: string;
  organization?: string;
  usage: {
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens: number;
  };
  cost: number;
  budget: number;
  threadIds: string[];
};

export interface Model {
  id: string;
  maxTokens: number;
  name: string;
  description: string;
  trainingData: string;
  promptCost?: number;
  completionCost?: number;
  usageCost?: number;
  note?: string;
}

export type Thread = {
  id: string;
  profileId: string;
  messages: Message[];
  model: Model;
  initialSystemInstruction: string;
  title: string;
  description: string;
  starred: boolean;
  cost: number;
  budget: number;
};
