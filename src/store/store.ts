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
  modelModal: false,
  model: {
    id: "",
    name: "",
  } as Model,
  models: [] as Model[],
};

interface Store {
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
  setModel: (value: Model) => set({ model: value }),
  setModels: (value: Model[]) => set({ models: value }),
  setModelModal: (value: boolean) => set({ modelModal: value }),
  resetValues: () => set(initialValues),
}));

export default useStore;
