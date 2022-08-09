import React from 'react';

function Categories({ value, onClickCategory }) {
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
								className={ index === value ? 'active' : '' }
								onClick={ () => onClickCategory(index) }
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