import { create } from "zustand";

interface States {
  isShowFullMenu: boolean;
  isMenuOpen: boolean;
}

interface Actions {
  setIsShowFullMenu: () => void;
  toggleMenu: () => void;
}

const useLayoutStore = create<States & Actions>((set, get) => ({
  isShowFullMenu: false,
  isMenuOpen: false,
  setIsShowFullMenu: () => set({ isShowFullMenu: !get().isShowFullMenu }),
  toggleMenu: () => set({ isMenuOpen: !get().isMenuOpen }),
}));

export default useLayoutStore;
