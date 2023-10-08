import { create } from "zustand";

type AgentType = {
  agentId: string;
  messages: string[];
};

export interface StateType {
  //   selectedAgent: number;
  //   selectAgent: (agent: number) => void;
  openChat: boolean;
  setOpenChat: (open: boolean) => void;
  agents: AgentType[];
  addAgent: (agent: AgentType) => void;
}

const useStore = create<StateType>()((set) => ({
  openChat: false,
  setOpenChat: (open) => set({ openChat: open }),
  agents: [],
  addAgent: (agent) =>
    set((state) => ({
      agents: [...state.agents, agent],
    })),
}));

export default useStore;
