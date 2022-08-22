import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza } from './types';
import axios from 'axios';

export const fetchItems = createAsyncThunk<Pizza[], Record<string, string>>(
	'pizza/fetchPizzas',
	async (params) => {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(`https://62ef9e3157311485d124edf8.mockapi.io/items?page=${ currentPage }&limit=4${ category }&sortBy=${ sortBy }&order=${ order }${ search }`);
		return data;
	}
);