import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
	'pizza/fetchPizzas',
	async (params) => {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get(`https://62ef9e3157311485d124edf8.mockapi.io/items?page=${ currentPage }&limit=4${ category }&sortBy=${ sortBy }&order=${ order }${ search }`);
		return data;
	}
);

const initialState = {
	items: [],
	status: 'loading' // loading | success | error
};

export const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		}
	},
	extraReducers: {
		[fetchItems.pending]: (state) => {
			state.items = [];
			state.status = 'loading';
		},
		[fetchItems.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchItems.rejected]: (state) => {
			state.items = [];
			state.status = 'success';
		}
	}
});

export const selectPizzasData = (state) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;