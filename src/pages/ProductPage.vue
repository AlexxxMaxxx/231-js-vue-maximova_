<script>
import ProductForm from '@/components/ProductForm.vue'
import ProductList from '@/components/ProductList.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		ProductForm,
		ProductList,
	},

	data() {
		return {
			buttonContent: 'Получить результаты',
			hasError: true,
		}
	},

	computed: {
		...mapState('person', {
			persons: state => state.persons,
		}),
		
		...mapState('product', {
			products: state => state.products,
		})
	},

	methods: {
		...mapMutations({
			addProduct: 'product/addProduct',
			removeProduct: 'product/removeProduct',
		}),

		add(product) {
			this.addProduct(product)
		},

		remove(product) {
			this.removeProduct(product)
		},

		allowTransition() {
			const len = this.products.length
			this.hasError = true

			if (len === 0) {
				this.buttonContent = 'А чего считать-то? Добавьте что-нибудь!'
			} else if (len === 1) {
				this.buttonContent = 'А что это мы на диете? Добавьте что-нибудь еще!'
			} else {
				this.buttonContent = 'Получить результаты'
				this.$router.push({ name: 'Result' })
				this.hasError = false
			}
		}
	}
}
</script>

<template>
	<div class="products">
		<div class="products__body">
			<div class="products__header header">
				<ProductForm
					:persons="persons" 
					@add="add"
				/>
			</div>
			<div class="products__content content">
				<ProductList
					:products="products"
					:persons="persons"
					@remove="remove"
				/>
			</div>
			<div class="products__footer footer">
				<AppButton
					block
					class="next-btn"
					:class="{ disabled: hasError }"
					@click="allowTransition"
				>
					{{ buttonContent }}
				</AppButton>
			</div>
		</div>
	</div>
</template>