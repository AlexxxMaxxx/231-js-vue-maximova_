<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
	props: {
		persons: {
			type: Array,
			required: true,
		},
	},

	setup() {
		return { v$: useVuelidate() }
	},

	data: () => ({
		name: '',
		buttonContent: 'Добавить',
		hasError: false,
	}),

	validations() {
		return {
			name: {
				required,
				minLength: minLength(3),
			},
		}
	},

	methods: {
		inputValidation() {
			this.v$.$touch()
			
			if (!this.v$.$error) {
				if (!this.persons.find(p => p.name === this.name)) {
					this.hasError = false
					this.buttonContent = 'Добавить'
					this.addPerson()
				} else {
					this.hasError = true
					this.buttonContent = 'Это имя уже используется!'
				}
			} else if (this.v$.name.$dirty) {
				this.hasError = true
				if (this.v$.name.required.$invalid) {
					this.buttonContent = 'Обязательное поле!'
				} else if (this.v$.name.minLength.$invalid) {
					this.buttonContent = 'Слишком короткое имя!'
				}
			}
		},

		addPerson() {
			this.$emit('add', {
				id: Date.now(),
				name:
					this.name.charAt(0).toUpperCase() + this.name.toLowerCase().slice(1),
				debts: [],
			})

			this.name = ''
		},

	},
}
</script>

<template>
	<form 
		class="person-form" 
		@submit.prevent
	>
		<AppInput 
			class="person-form__input input"
			:class="{ invalid: hasError }"
			v-model.trim="name"
		/>
		<AppButton
			class="person-form__add-btn add-btn"
			:class="{ disabled: hasError }"
			@click="inputValidation"
		>
			{{ buttonContent }}
		</AppButton>
	</form>
</template>