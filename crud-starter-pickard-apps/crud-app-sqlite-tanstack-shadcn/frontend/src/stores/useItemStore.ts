import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ItemState {
  // This store is now a placeholder.
  // You can add client-side state here if needed in the future,
  // such as complex filter states that don't belong in the URL.
  clientOnlyState: string;
  setClientOnlyState: (value: string) => void;
}

export const useItemStore = create<ItemState>()(
  devtools(
    (set) => ({
      clientOnlyState: 'Ready',
      setClientOnlyState: (value: string) => set({ clientOnlyState: value }),
    }),
    { name: 'item-store' }
  )
);