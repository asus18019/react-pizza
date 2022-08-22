import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId } from '../redux/filter/slice';
import { selectFilters } from '../redux/filter/selectors';

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые'
];

const Categories: FC = React.memo(
	() => {
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
);

export default Categories;