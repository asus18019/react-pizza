import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { PizzaBlock, PizzaSkeleton } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const { searchValue } = useContext(SearchContext);
	const { categoryID, sort } = useSelector(state => state.filterSlice);

	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setIsLoading(true);

		const category = categoryID ? `category=${ categoryID }` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `?search=${ searchValue }` : '';

		fetch(`https://62ef9e3157311485d124edf8.mockapi.io/items?page=${currentPage}&limit=4${ category }&sortBy=${ sortBy }&order=${ order }${ search }`)
			.then(res => res.json())
			.then(data => {
				setPizzas(data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryID, sort, searchValue, currentPage]);

	const items = pizzas
		.filter(pizza => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map(pizza => <PizzaBlock key={ pizza.id } { ...pizza } />);
	const skeletons = [...Array(8)].map((_, index) => <PizzaSkeleton key={ index }/>);

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
			<Pagination onChangePage={ setCurrentPage }/>
		</div>
	);
};

export default Home;