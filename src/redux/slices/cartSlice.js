import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
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
		removeItem(state, action) {
			state.items = state.items.filter(obj => obj.id !== action.payload);
			state.totalPrice = state.items.reduce((acc, obj) => {
				return acc + (obj.price * obj.quantity);
			}, 0);},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
		changeQuantity(state, action) {
			const foundItem = state.items.find(item => item.id === action.payload.id);
			if(foundItem) {
				if(action.payload.change === 'increase') {
					foundItem.quantity++;
				} else if(action.payload.change === 'decrease' && foundItem.quantity > 1) {
					foundItem.quantity--;
				}
			}

			state.totalPrice = state.items.reduce((acc, obj) => {
				return acc + (obj.price * obj.quantity);
			}, 0);
		}
	}
});

export const { addItem, removeItem, changeQuantity, clearItems } = cartSlice.actions;

export default cartSlice.reducer;