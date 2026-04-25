import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.find(
                (i) => i.id === action.payload.id && i.size === action.payload.size
            );
            if (existing) {
                return state.map((i) =>
                    i.id === action.payload.id && i.size === action.payload.size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_FROM_CART':
            return state.filter(
                (i) => !(i.id === action.payload.id && i.size === action.payload.size)
            );
        case 'UPDATE_QUANTITY':
            return state.map((i) =>
                i.id === action.payload.id && i.size === action.payload.size
                    ? { ...i, quantity: action.payload.quantity }
                    : i
            );
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, dispatch, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}