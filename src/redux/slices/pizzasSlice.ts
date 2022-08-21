import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchItems = createAsyncThunk<Pizza[], Record<string, string>>(
	'pizza/fetchPizzas',
	async (params) => {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(`https://62ef9e3157311485d124edf8.mockapi.io/items?page=${ currentPage }&limit=4${ category }&sortBy=${ sortBy }&order=${ order }${ search }`);
		return data;
	}
);

export type Pizza = {
	id: number,
	title: string,
	price: number,
	imageUrl: string,
	sizes: number[],
	types: number[]
}

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

type PizzasSliceState = {
	items: Pizza[],
	status: Status
}

const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING
};

export const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchItems.pending, (state, action) => {
			state.items = [];
			state.status = Status.LOADING;
		});
		builder.addCase(fetchItems.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchItems.rejected, (state, action) => {
			state.items = [];
			state.status = Status.ERROR;
		});
	}
});

export const selectPizzasData = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;