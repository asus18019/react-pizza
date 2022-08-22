export type CartItem = {
	id: number,
	title: string,
	price: number,
	imageUrl: string,
	type: string,
	size: number,
	quantity: number
}

export interface CartSliceState {
	totalPrice: number,
	items: CartItem[]
}

export type ChangeQuantityInfo = {
	id: number,
	change: string
}