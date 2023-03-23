import { create } from "zustand";
import type { Model, Profile, Thread } from "~/types/appstate";

const models = [
  {
    name: "GPT-3.5-TURBO",
    id: "gpt-3.5-turbo",
    description:
      "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration.",
    maxTokens: 4096,
    usageCost: 0.002,
    trainingData: "Up to Sep 2021",
  },
  {
    name: "GPT-3.5-TURBO-0301",
    id: "gpt-3.5-turbo-0301",
    description:
      "Snapshot of gpt-3.5-turbo from March 1st 2023. Unlike gpt-3.5-turbo, this model will not receive updates, and will only be supported for a three month period ending on June 1st 2023.",
    maxTokens: 4096,
    usageCost: 0.002,
    trainingData: "Up to Sep 2021",
  },
  {
    name: "GPT-4 (Limited Beta)",
    id: "gpt-4",
    description:
      "More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration.",
    maxTokens: 8192,
    promptCost: 0.03,
    completionCost: 0.06,
    trainingData: "Up to Sep 2021",
    note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
  },
  {
    name: "GPT-4-0314 (Limited Beta)",
    id: "gpt-4-0314",
    description:
      "Snapshot of gpt-4 from March 14th 2023. Unlike gpt-4, this model will not receive updates, and will only be supported for a three month period ending on June 14th 2023.",
    maxTokens: 8192,
    promptCost: 0.03,
    completionCost: 0.06,
    trainingData: "Up to Sep 2021",
    note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
  },
  {
    name: "GPT-4-32K (Limited Beta)",
    id: "gpt-4-32k",
    description:
      "Same capabilities as GPT-4, but with 4x the context length. Will be updated with our latest model iteration.",
    trainingData: "Up to Sep 2021",
    promptCost: 0.06,
    completionCost: 0.12,
    maxTokens: 32768,
    note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
  },
  {
    name: "GPT-4-32K-0314 (Limited Beta)",
    id: "gpt-4-32k-0314",
    description:
      "Snapshot of gpt-4-32k from March 14th 2023. Unlike gpt-4-32k, this model will not receive updates, and will only be supported for a three month period ending on June 14th 2023.",
    trainingData: "Up to Sep 2021",
    promptCost: 0.06,
    completionCost: 0.12,
    maxTokens: 32768,
    note: "you need API Access to GPT-4 to use this model. If you haven't already, join the waitlist here: https://openai.com/waitlist/gpt-4-api",
  },
] as Model[];

const initialThread = {
  id: "",
  name: "",
  profileId: "",
  budget: 0,
  cost: 0,
  description: "",
  initialSystemInstruction: "",
  messages: [],
  model: models[0] as Model,
  starred: false,
  title: "",
} as Thread;

export const initialValues = {
  profile: {
    id: "",
    name: "",
    model: models[0] as Model,
    budget: 0,
    cost: 0,
    usage: {
      completion_tokens: 0,
      prompt_tokens: 0,
      total_tokens: 0,
    },
    key: "",
    threadIds: [],
    organization: "",
  } as Profile,
  profiles: [] as Profile[],
  selectedProfile: "",
  thread: initialThread,
  threads: [] as Thread[],
  selectedApiKey: 0,
  apiKeyModal: false,
  apiKeyError: false,
  modelModal: false,
  models,
  width: 0,
};

const getLocalProfileList = () => {
  const raw = localStorage.getItem("Profiles");
  if (!raw) {
    return null;
  }
  return JSON.parse(raw) as string[];
};
const getSelectedProfile = () => {
  const raw = localStorage.getItem("SelectedProfile");
  if (!raw) {
    return null;
  }
  return JSON.parse(raw) as string;
};
export const getProfile = (id: string) => {
  const raw = localStorage.getItem("Profile_" + id);
  if (!raw) {
    return;
  }
  return JSON.parse(raw) as Profile;
};
const loadProfiles = () => {
  const profileList = getLocalProfileList();
  if (!profileList) {
    return null;
  }
  const selectedProfile = getSelectedProfile();
  if (!selectedProfile) {
    return null;
  }
  const profiles: Profile[] = [];
  for (const id of profileList) {
    const profile = getProfile(id);
    if (!profile) {
      continue;
    }
    profiles.push(profile);
  }
  if (profiles.length === 0) {
    return null;
  }
  const profile = profiles.find((p) => p.id === selectedProfile);
  if (!profile) {
    const profile = profiles[0] as Profile;
    return { profiles, profile, selectedProfile: profile.id };
  }
  return { profiles, profile, selectedProfile };
};
export const getThread = (id: string) => {
  const raw = localStorage.getItem("Thread_" + id);
  if (raw) {
    return JSON.parse(raw) as Thread;
  }
};
export const loadData = () => {
  const profileData = loadProfiles();
  if (!profileData) {
    return null;
  }
  const { profiles, profile, selectedProfile } = profileData;
  const threads = profile.threadIds
    .map((id) => getThread(id))
    .filter((t) => t !== undefined) as Thread[];
  return { profiles, profile, selectedProfile, threads };
};

interface Store {
  profile: Profile;
  setProfile: (value: Profile) => void;
  addProfile: (value: Profile) => void;
  deleteProfile: (value: Profile) => void;
  selectedProfile: string;
  setSelectedProfile: (value: string) => void;
  profiles: Profile[];
  setProfiles: (value: Profile[]) => void;
  thread: Thread;
  setThread: (value: Thread) => void;
  addThread: (value: Thread) => void;
  deleteThread: (value: Thread) => void;
  threads: Thread[];
  setThreads: (value: Thread[]) => void;
  apiKeyModal: boolean;
  setApiKeyModal: (value: boolean) => void;
  apiKeyError: boolean;
  setApiKeyError: (value: boolean) => void;
  models: Model[];
  setModels: (value: Model[]) => void;
  modelModal: boolean;
  setModelModal: (value: boolean) => void;
  selectedApiKey: number;
  setSelectedApiKey: (value: number) => void;
  width: number;
  setWidth: (value: number) => void;
  resetValues: () => void;
  resetThread: () => void;
  load: () => void;
}

const updateSelectedProfile = (id: string) => {
  localStorage.setItem("SelectedProfile", JSON.stringify(id));
};
const updateProfile = (profile: Profile) => {
  localStorage.setItem("Profile_" + profile.id, JSON.stringify(profile));
};
const addProfile = (profile: Profile) => {
  localStorage.setItem("Profile_" + profile.id, JSON.stringify(profile));
  const profileList = getLocalProfileList();
  if (profileList) {
    localStorage.setItem(
      "Profiles",
      JSON.stringify([...profileList, profile.id])
    );
  } else {
    localStorage.setItem("Profiles", JSON.stringify([profile.id]));
  }
};
const deleteProfile = (profile: Profile) => {
  profile.threadIds.forEach((id) => deleteThread(id));
  localStorage.removeItem("Profile_" + profile.id);
  const profileList = getLocalProfileList();
  if (profileList) {
    const newProfileList = profileList.filter((p) => p !== profile.id);
    localStorage.setItem("Profiles", JSON.stringify(newProfileList));
    const selectedProfile = getSelectedProfile();
    if (selectedProfile === profile.id) {
      localStorage.removeItem("SelectedProfile");
    }
    if (newProfileList.length === 0) {
      localStorage.removeItem("Profiles");
    } else {
      const newSelectedProfile = newProfileList[0];
      localStorage.setItem(
        "SelectedProfile",
        JSON.stringify(newSelectedProfile)
      );
    }
  }
};
const updateThread = (thread: Thread) => {
  localStorage.setItem("Thread_" + thread.id, JSON.stringify(thread));
};
const deleteThread = (id: string) => {
  localStorage.removeItem("Thread_" + id);
};
const useStore = create<Store>((set) => ({
  ...initialValues,
  setProfiles: (value: Profile[]) => set({ profiles: value }),
  setProfile: (value: Profile) => {
    updateProfile(value);
    set({ profile: value });
  },
  addProfile: (value: Profile) => {
    addProfile(value);
    set((state) => ({ profiles: [...state.profiles, value] }));
  },
  deleteProfile: (value: Profile) => {
    deleteProfile(value);
    set((state) => ({
      profiles: state.profiles.filter((p) => p.id !== value.id),
    }));
  },
  addThread: (value: Thread) => {
    updateThread(value);
    set((state) => ({
      threads: [...state.threads, value],
    }));
  },
  deleteThread: (value: Thread) => {
    deleteThread(value.id);
    set((state) => ({
      threads: state.threads.filter((t) => t.id !== value.id),
    }));
  },
  setSelectedProfile: (value: string) => {
    updateSelectedProfile(value);
    set({ selectedProfile: value });
  },
  setThread: (value: Thread) => {
    updateThread(value);
    set((state) => ({ thread: value, threads: [...state.threads, value] }));
  },
  setThreads: (value: Thread[]) => {
    set({ threads: value });
  },
  setApiKeyModal: (value: boolean) => set({ apiKeyModal: value }),
  setApiKeyError: (value: boolean) => set({ apiKeyError: value }),
  setModels: (value: Model[]) => set({ models: value }),
  setModelModal: (value: boolean) => set({ modelModal: value }),
  setWidth: (value: number) => set({ width: value }),
  setSelectedApiKey: (value: number) => set({ selectedApiKey: value }),
  load: () => set({ ...initialValues, ...loadData() }),
  resetThread: () => set({ thread: initialValues.thread }),
  resetValues: () => set(initialValues),
}));

export default useStore;
