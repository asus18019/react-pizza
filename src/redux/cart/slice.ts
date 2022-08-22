import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartSliceState, CartItem, ChangeQuantityInfo } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
	totalPrice,
	items
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const foundItem = state.items.find(item => item.id === action.payload.id);
			if(foundItem) {
				foundItem.quantity += 1;
			} else {
				state.items.push({
					...action.payload,
					quantity: 1
				});
			}

			state.totalPrice = state.items.reduce((acc, obj) => {
				return acc + (obj.price * obj.quantity);
			}, 0);
		},
		removeItem(state, action: PayloadAction<number>) {
			state.items = state.items.filter(obj => obj.id !== action.payload);
			state.totalPrice = state.items.reduce((acc, obj) => {
				return acc + (obj.price * obj.quantity);
			}, 0);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
		changeQuantity(state, action: PayloadAction<ChangeQuantityInfo>) {
			const foundItem = state.items.find(item => item.id === action.payload.id);
			if(foundItem) {
				if(action.payload.change === 'increase') {
					foundItem.quantity++;
				} else if(action.payload.change === 'decrease' && foundItem.quantity > 1) {
					foundItem.quantity--;
				}
			}

			state.totalPrice = calcTotalPrice(state.items);
		}
	}
});

export const { addItem, removeItem, changeQuantity, clearItems } = cartSlice.actions;

export default cartSlice.reducer;