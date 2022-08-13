import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

function Categories() {
	const dispatch = useDispatch();
	const categoryId = useSelector(state => state.filterSlice.categoryId);

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианские',
		'Гриль',
		'Острые',
		'Закрытые'
	];

	return (
		<div className="categories">
			<ul>
				{
					categories.map((category, index) => {
						return (
							<li
								key={ index }
								className={ index === categoryId ? 'active' : '' }
								onClick={ () => dispatch(setCategoryId(index)) }
							>
								{ category }
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

export default Categories;