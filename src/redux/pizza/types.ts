export type Pizza = {
	id: number,
	title: string,
	price: number,
	imageUrl: string,
	sizes: number[],
	types: number[]
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export type PizzasSliceState = {
	items: Pizza[],
	status: Status
}