import { create } from "zustand";
import { CardProfiledataProps } from "@/type";
import { CardProfileData } from "@/contants";

interface States {
  cardProfiles: CardProfiledataProps[];
}

interface Actions {
  addCardProfile: (profile: CardProfiledataProps) => void;
  editCardProfile: (profile: CardProfiledataProps) => void;
  deleteCardProfile: (id: number) => void;
}

const useCardProfileStore = create<States & Actions>((set) => ({
  cardProfiles: [...CardProfileData],
  addCardProfile: (profile: CardProfiledataProps) => {
    set((state) => ({ cardProfiles: [...state.cardProfiles, profile] }));
  },
  editCardProfile: (profile: CardProfiledataProps) => {
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
