import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzasSliceState, Pizza, Status } from './types';
import { fetchItems } from './asyncActions';

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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;