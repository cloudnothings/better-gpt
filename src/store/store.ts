import { create } from "zustand";

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
  modelModal: false,
  model: {
    id: "",
    name: "",
  } as Model,
  models: [] as Model[],
};

interface Store {
  apiKey: string;
  setApiKey: (value: string) => void;
  apiKeyModal: boolean;
  setApiKeyModal: (value: boolean) => void;
  apiKeyError: boolean;
  setApiKeyError: (value: boolean) => void;
  model: Model;
  setModel: (value: Model) => void;
  models: Model[];
  setModels: (value: Model[]) => void;
  modelModal: boolean;
  setModelModal: (value: boolean) => void;
  resetValues: () => void;
}

const useStore = create<Store>((set) => ({
  ...initialValues,
  setApiKey: (value: string) => set({ apiKey: value }),
  setApiKeyModal: (value: boolean) => set({ apiKeyModal: value }),
  setApiKeyError: (value: boolean) => set({ apiKeyError: value }),
  setModel: (value: Model) => set({ model: value }),
  setModels: (value: Model[]) => set({ models: value }),
  setModelModal: (value: boolean) => set({ modelModal: value }),
  resetValues: () => set(initialValues),
}));

export default useStore;
