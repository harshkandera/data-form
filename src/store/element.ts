import { create } from "zustand";
import { nanoid } from "nanoid"; // Import nanoid for unique ID
import { IElement } from "../app/create/(components)/Fields/Text";

interface ElementStore {
  Elements: IElement[];
  addItem: (item: Omit<IElement, 'id'>) => void;
  removeItem: (id: string) => void;
}

const useElementStore = create<ElementStore>((set) => ({
  Elements: [], // Corrected state key

  addItem: (item) =>
    set((state) => ({
      Elements: [...state.Elements, { ...item, id: nanoid() }], // Ensure unique ID
    })),

  removeItem: (id) =>
    set((state) => ({
      Elements: state.Elements.filter((item) => item.id !== id), // Corrected state key
    })),
}));

export default useElementStore;
