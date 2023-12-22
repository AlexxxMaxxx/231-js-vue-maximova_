export const productModule = {
	state: () => ({
		products: [],
	}),
	getters: {
		getProducts(state) {
			return state.products
		},
		getProductsLength(_, getters) {
			return getters.getProducts.length
		},
	},
	mutations: {
		setProducts(state, products) {
			// удалить?
			state.products = products
		},
		addProduct(state, newProduct) {
			state.products.push(newProduct)
		},
		removeProduct(state, product) {
			state.products = state.products.filter(p => p.id !== product.id)
		},
	},
	namespaced: true,
}
