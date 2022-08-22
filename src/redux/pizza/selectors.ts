import { RootState } from '../store';

export const selectPizzasData = (state: RootState) => state.pizzasSlice;
