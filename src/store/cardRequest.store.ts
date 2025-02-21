import { CardRequestdataProps } from "@/type";
import { create } from "zustand";

interface States {
  currentCardRequest: CardRequestdataProps | null;
}

interface Actions {
  setCurrentCardRequest: (cardRequest: CardRequestdataProps) => void;
}

const useCardRequestStore = create<States & Actions>((set) => ({
  currentCardRequest: null,

  setCurrentCardRequest: (cardRequest: CardRequestdataProps) =>
    set({ currentCardRequest: cardRequest }),
}));

export default useCardRequestStore;
