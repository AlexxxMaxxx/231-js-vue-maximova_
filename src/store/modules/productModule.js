export const productModule = {
	state: () => ({
		products: [],
	}),

	mutations: {
		addProduct(state, newProduct) {
			state.products.push(newProduct)
		},

		removeProduct(state, product) {
			state.products = state.products.filter(p => p.id !== product.id)
		},

		clearState(state) {
			state.products = []
		}
	},

	namespaced: true,
}
