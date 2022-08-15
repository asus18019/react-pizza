import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import { PizzaBlock, PizzaSkeleton } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { searchValue } = useContext(SearchContext);
	const { categoryId, sort, currentPage } = useSelector(state => state.filterSlice);

	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchPPizzas = () => {
		setIsLoading(true);

		const category = categoryId ? `&category=${ categoryId }` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${ searchValue }` : '';

		axios.get(`https://62ef9e3157311485d124edf8.mockapi.io/items?page=${ currentPage }&limit=4${ category }&sortBy=${ sortBy }&order=${ order }${ search }`)
			.then(res => {
				setPizzas(res.data);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if(isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			});
			navigate('?' + queryString);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	useEffect(() => {
		if(window.location.search.substring(1)) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(item => item.sortProperty === params.sortProperty);

			dispatch(setFilters({
				categoryId: params.categoryId,
				currentPage: params.currentPage,
				sort
			}));
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		if(!isSearch.current) {
			fetchPPizzas();
		}

		isSearch.current = false;

		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const items = pizzas
		.filter(pizza => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map(pizza => <PizzaBlock key={ pizza.id } { ...pizza } />);
	const skeletons = [...Array(8)].map((_, index) => <PizzaSkeleton key={ index }/>);

	const onChangePage = (page) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<div className="container">
			<div className="content__top">
				<Categories/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{ isLoading ? skeletons : items }
			</div>
			<Pagination currentPage={ currentPage } onChangePage={ onChangePage }/>
		</div>
	);
};

export default Home;