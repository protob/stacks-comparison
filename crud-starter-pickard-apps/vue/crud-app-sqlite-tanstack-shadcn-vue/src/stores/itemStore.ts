import { defineStore } from 'pinia';

export const useItemStore = defineStore('item', () => {
  const clientOnlyState = ref('Ready');

  const setClientOnlyState = (value: string) => {
    clientOnlyState.value = value;
  };

  return {
    clientOnlyState,
    setClientOnlyState,
  };
});