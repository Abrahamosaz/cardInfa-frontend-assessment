import { create } from "zustand";
import { dataProps as CardProfileProps } from "@/type";
import { CardProfileData } from "@/contants";

interface States {
  cardProfiles: CardProfileProps[];
}

interface Actions {
  addCardProfile: (profile: CardProfileProps) => void;
  editCardProfile: (profile: CardProfileProps) => void;
  deleteCardProfile: (id: number) => void;
}

const useCardProfileStore = create<States & Actions>((set) => ({
  cardProfiles: [...CardProfileData],
  addCardProfile: (profile: CardProfileProps) => {
    set((state) => ({ cardProfiles: [...state.cardProfiles, profile] }));
  },
  editCardProfile: (profile: CardProfileProps) => {
    set((state) => ({
      cardProfiles: state.cardProfiles.map((p) =>
        p.id === profile.id ? profile : p
      ),
    }));
  },
  deleteCardProfile: (id: number) => {
    set((state) => ({
      cardProfiles: state.cardProfiles.filter((p) => p.id !== id),
    }));
  },
}));

export default useCardProfileStore;
