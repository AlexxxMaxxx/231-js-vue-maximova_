<script>
import PersonList from '@/components/PersonList.vue'
import PersonForm from '@/components/PersonForm.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		PersonList,
		PersonForm,
	},

	data() {
		return {
			buttonContent: 'Добавить продукты',
			hasError: true,
		}
	},

	computed: {
		...mapState('person', {
			persons: state => state.persons
		})
	},

	methods: {
		...mapMutations({
			addPerson: 'person/addPerson',
			removePerson: 'person/removePerson',
		}),

		add(newPerson) {
			this.addPerson(newPerson)
		},

		remove(person) {
			this.removePerson(person)
		},

		allowTransition() {
			const len = this.persons.length
			this.hasError = true

			if (len === 0) {
				this.buttonContent = 'Нет тела, нет дела! Добавьте кого-нибудь!'
			} else if (len === 1) {
				this.buttonContent =
					'Добавьте кого-нибудь еще!'
			} else {
				this.buttonContent = 'Добавить продукты'
				this.$router.push({ name: 'Product' })
				this.hasError = false
			}
		},
	},
}
</script>

<template>
	<div class="persons">
		<div class="persons__body">
			<div class="persons__header header">
				<PersonForm 
					:persons="persons" 
					@add="add" 
				/>
			</div>
			<div class="persons__content content">
				<PersonList
					:persons="persons" 
					@remove="remove" 
				/>
			</div>
			<div class="persons__footer footer">
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