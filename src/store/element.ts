import { create } from "zustand";
import { nanoid } from "nanoid"; // Import nanoid for unique ID

const useElementStore = create((set) => ({
  Elements: [], // Corrected state key

  addItem: (item:any) =>
    set((state:any) => ({
      Elements: [...state.Elements, { ...item, id: nanoid() }], // Ensure unique ID
    })),

  removeItem: (id:string) =>
    set((state:any) => ({
      Elements: state.Elements.filter((item:any) => item.id !== id), // Corrected state key
    })),
}));

export default useElementStore;
