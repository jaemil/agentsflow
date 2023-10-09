import { create } from "zustand";

type Message = {
  message: string;
  role: "user" | "agent";
};

type AgentType = {
  agentId: number;
  messages: Message[];
};

export interface StateType {
  selectedAgent: number;
  setSelectedAgent: (agent: number) => void;
  openChat: boolean;
  setOpenChat: (open: boolean) => void;
  agents: AgentType[];
  addAgent: (agent: AgentType) => void;
  addMessage: (message: Message, agentId: AgentType["agentId"]) => void;
}

const useStore = create<StateType>()((set) => ({
  selectedAgent: 0, // Default selectedAgent value
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  openChat: false,
  setOpenChat: (open) => set({ openChat: open }),
  agents: [
    {
      agentId: 0,
      messages: [{ message: "hi im agent 0", role: "agent" }],
    },
    { agentId: 1, messages: [{ message: "hi im agent 1", role: "agent" }] },
    { agentId: 2, messages: [{ message: "hi im agent 2", role: "user" }] },
  ],
  addAgent: (agent) =>
    set((state) => ({
      agents: [...state.agents, agent],
    })),
  addMessage: (message: Message, agentId: AgentType["agentId"]) =>
    set((state) => ({
      agents: state.agents.map((agent) => {
        if (agent.agentId === agentId) {
          return {
            ...agent,
            messages: [...agent.messages, message],
          };
        }
        return agent;
      }),
    })),
}));

export default useStore;
