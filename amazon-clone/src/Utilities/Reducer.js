import { Types } from "./action.types";

export const initialState = {
    basket: []
}

export const reducer = (state, action) => {
    switch (action.type) {
        case Types.ADD_TO_BASKET:
            const itemExists = state.basket.find((item) => item.id === action.item.id);

            if (!itemExists) {
                // Add the item to the basket if it doesn't exist
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, amount: 1 }]
                };
            } else {
                // Update the amount if the item already exists
                const updatedBasket = state.basket.map((item) =>
                    item.id === action.item.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );

                return {
                    ...state,
                    basket: updatedBasket
                };
            }

        case Types.REMOVE_FROM_BASKET:
            const idx = state.basket.findIndex(item => item.id === action.itemId)
            let newBasket = [...state.basket]

            if (idx >= 0) {
                if (newBasket[idx].amount > 1) {
                    newBasket[idx] = { ...newBasket[idx], amount: newBasket[idx].amount - 1 }
                } else {
                    newBasket.splice(idx, 1)
                    // newBasket.splice[idx, 1]
                }
                return {
                    ...state,
                    basket: newBasket
                }
            }

        default:
            return state;
    }
}
