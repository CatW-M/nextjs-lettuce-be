import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  inventory: { inventoryItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'INVENTORY_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.inventory.inventoryItems.find(
        (item) => item.slug === newItem.slug
      );
      const inventoryItems = existItem
        ? state.inventory.inventoryItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.inventory.inventoryItems, newItem];
      return { ...state, inventory: { ...state.inventory, inventoryItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
