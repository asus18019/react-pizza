import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((acc, obj) => {
		return acc + (obj.price * obj.quantity);
	}, 0);
};