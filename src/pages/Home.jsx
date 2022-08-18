import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import { PizzaBlock, PizzaSkeleton } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { selectFilters, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchItems, selectPizzasData } from '../redux/slices/pizzasSlice';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilters);
	const { items, status } = useSelector(selectPizzasData);

	const getPizzas = async () => {
		const category = categoryId ? `&category=${ categoryId }` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${ searchValue }` : '';

		dispatch(fetchItems({
			category,
			sortBy,
			order,
			search,
			currentPage
		}));
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
			getPizzas();
		}

		isSearch.current = false;

		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items
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
				{
					status === 'error'
						? (
							<div className="content__error-info">
								<h2>Произошла ошибка 😕</h2>
								<p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
							</div>
						)
						: (status === 'loading' ? skeletons : pizzas)
				}
			</div>
			<Pagination currentPage={ currentPage } onChangePage={ onChangePage }/>
		</div>
	);
};

export default Home;