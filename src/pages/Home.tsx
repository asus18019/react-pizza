import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import { PizzaBlock, PizzaSkeleton } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { selectFilters, setCurrentPage, setFilters, SortPropertyEnum } from '../redux/slices/filterSlice';
import { fetchItems, Pizza, selectPizzasData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef<boolean>(false);
	const isMounted = useRef<boolean>(false);

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
			currentPage: currentPage.toString() || '1'
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
				categoryId: Number(params.categoryId || 0),
				currentPage: Number(params.currentPage || 0),
				sort: sort || sortList[0],
				searchValue
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
		.filter((pizza: Pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((pizza: Pizza) => <PizzaBlock key={ pizza.id } { ...pizza } />);
	const skeletons = [...Array(8)].map((_, index) => <PizzaSkeleton key={ index }/>);

	const onChangePage = (page: number) => {
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