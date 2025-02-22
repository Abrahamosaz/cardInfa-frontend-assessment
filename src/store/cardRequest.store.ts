import { cardRequestData } from "@/contants";
import { CardRequestdataProps } from "@/type";
import { create } from "zustand";

interface States {
  cardRequestData: CardRequestdataProps[];
  currentCardRequest: CardRequestdataProps | null;
}

interface Actions {
  setCurrentCardRequest: (cardRequest: CardRequestdataProps) => void;
  editCardRequestData: (cardRequest: CardRequestdataProps) => void;
}

const useCardRequestStore = create<States & Actions>((set) => ({
  cardRequestData: cardRequestData,
  currentCardRequest: null,

  setCurrentCardRequest: (cardRequest: CardRequestdataProps) =>
    set({ currentCardRequest: cardRequest }),

  editCardRequestData: (cardRequest: CardRequestdataProps) => {
    set((state) => ({
      cardRequestData: state.cardRequestData.map((p) =>
        p.id === cardRequest.id ? cardRequest : p
      ),
    }));
  },
}));

export default useCardRequestStore;
