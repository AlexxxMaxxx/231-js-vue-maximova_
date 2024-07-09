<script>
import TheWhoWhomList from '@/components/TheWhoWhomList.vue'
import TheWhomWhoList from '@/components/TheWhomWhoList.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		TheWhoWhomList,
		TheWhomWhoList,
	},

	data: () => ({
		whoWhomList: true,
	}),

	computed: {
		...mapState('person', {
			persons: state => state.persons,
			whomWho: state => state.whomWho,
		}),

		...mapState('product', {
			products: state => state.products,
		})
	},

	created() {
		this.getDebts()
		this.checkDebts()
		this.getWhoWhom()
	},

	methods: {
		...mapMutations({
			checkDebts: 'person/checkDebts',
			getWhoWhom: 'person/getWhoWhom',
			clearStatePerson: 'person/clearState',
			clearStateProduct: 'product/clearState'
		}),

		getDebts() {
			this.products.forEach(product => {
				const chosenPeople = product.chosenPeople
				const pricePerson = (product.total / chosenPeople.length).toFixed(2)

				chosenPeople.forEach(chosenPerson => {
					const person = this.persons.find(p => p.id === chosenPerson.id)
					const payer = product.payer.id

					if (payer !== person.id) {
						const debt = person.debts.find(item => item.id == payer)
						if (debt) {
							debt.amount = (parseFloat(debt.amount) + parseFloat(pricePerson)).toFixed(2)
						}
						else {
							person.debts.push({ id: payer, amount: pricePerson })
						}
					}

				})
			})
		},

		restart() {
			this.clearStatePerson()
			this.clearStateProduct()
			this.$router.push({ name: 'Main' })
		}
	}
}
</script>

<template>
	<div class="results">
		<div class="results__body">
			<div class="results__header header">
				<h1>
					Результаты
				</h1>
			</div>
			<div class="results__content content">
				<v-btn-toggle 
					class="d-flex .align-sm-end justify-end flex-row pa-6" 
					rounded="1" 
					color="white" 
					group
				>
					<AppButton 
						@click="whoWhomList = true" 
						:class="{ selected: whoWhomList }"
					>
						Кто-кому
					</AppButton>

					<AppButton 
						@click="whoWhomList = false" 
						:class="{ selected: !whoWhomList }"
					>
						Кому-кто
					</AppButton>
				</v-btn-toggle>

				<TheWhoWhomList 
					v-if="whoWhomList" 
					:persons="persons" 
				/>
				<TheWhomWhoList 
					v-else :persons="persons" 
					:whomWho="whomWho" 
				/>
			</div>
			<div class="results__footer footer">
				<AppButton 
					block 
					class="next-btn" 
					@click="restart"
				>
					Заново
				</AppButton>
			</div>
		</div>
	</div>
</template>