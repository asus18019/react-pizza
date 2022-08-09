import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { PizzaBlock, PizzaSkeleton } from '../components/PizzaBlock';

const Home = () => {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryID, setCategoryID] = useState(0);
	const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

	useEffect(() => {
		setIsLoading(true);

		const category = categoryID ? `category=${ categoryID }` : '';
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

		fetch(`https://62ef9e3157311485d124edf8.mockapi.io/items?${ category }&sortBy=${ sortBy }&order=${ order }`)
			.then(res => res.json())
			.then(data => {
				setPizzas(data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryID, sortType]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={ categoryID } onClickCategory={ setCategoryID }/>
				<Sort value={ sortType } onChangeSort={ setSortType }/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading ? [...Array(8)].map((_, index) => <PizzaSkeleton key={ index }/>)
						: pizzas.map(pizza => <PizzaBlock key={ pizza.id } { ...pizza } />)
				}
			</div>
		</div>
	);
};

export default Home;