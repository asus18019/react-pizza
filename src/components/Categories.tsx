import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilters, setCategoryId } from '../redux/slices/filterSlice';

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые'
];

const Categories: FC = () => {
	const dispatch = useDispatch();
	const { categoryId } = useSelector(selectFilters);

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