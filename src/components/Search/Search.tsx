import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className={ styles.root }>
			<svg className={ styles.icon } fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
				<path
					d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
			</svg>

			<input
				className={ styles.input }
				placeholder="Поиск пиццы..."
				value={ value }
				onChange={ e => onChangeInput(e) }
				ref={ inputRef }
			/>
			{
				value && (
					<svg className={ styles.clearIcon } onClick={ () => onClickClear() } fill="#000000"
					     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/>
					</svg>
				)
			}
		</div>
	);
};

export default Search;