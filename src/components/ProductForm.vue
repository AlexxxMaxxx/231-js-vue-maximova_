<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, minValue } from '@vuelidate/validators'

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

	data() {
		return {
			name: '',
			price: 0,
			amount: 0,
			payer: this.persons[0],
			chosenPeople: this.persons,

			allChosen: true,

			buttonContent: 'Добавить',
			hasError: false,
		}
	},

	computed: {
		allChosenMessage() {
			return this.allChosen ? 'Снять выбор' : 'Выбрать всех'
		}
	},

	watch: {
		chosenPeople(newValue) {
			if (newValue.length === 0) {
				this.allChosen = false
			} else if (newValue.length === this.persons.length) {
				this.allChosen = true
			} else {
				this.allChosen = false
			}
		},
	},

	validations() {
		return {
			name: {
				required,
				minLength: minLength(3),
			},

			price: {
				required,
				minValue: minValue(1),
			},
			
			amount: {
				required,
				minValue: minValue(1),
			},
		}
	},

	methods: {
		toggleAll() {
			this.chosenPeople = this.allChosen ? this.persons.slice() : []
		},

		inputValidation() {
			this.v$.$touch()

			if (!this.v$.$error) {
				this.hasError = false
				this.buttonContent = 'Добавить'
				this.addProduct()
			} else if (this.v$.$errors.length >= 3) {
				this.hasError = true
				this.buttonContent = 'Заполните все поля!'
			} else if (this.v$.name.$dirty) {
				this.hasError = true

				if (this.v$.price.minValue.$invalid) {
					this.buttonContent =
						'Бесплатный сыр только в мышеловке! Укажите стоимость.'
				} else if (this.v$.amount.minValue.$invalid) {
					this.buttonContent = 'Количество не может быть нулевым!'
				} else if (this.v$.name.minLength.$invalid) {
					this.buttonContent = 'Слишком короткое название!'
				} else {
					this.buttonContent = 'Обязательное поле!'
				}

			}
		},

		addProduct() {
			this.$emit('add', {
				id: Date.now(),
				name:
					this.name.charAt(0).toUpperCase() + this.name.toLowerCase().slice(1),
				price: this.price,
				amount: this.amount,
				payer: this.payer,
				chosenPeople: this.chosenPeople,
				total: this.price * this.amount,
			})

			this.name = ''
			this.price = this.amount = 0
			this.payer = this.persons[0]
			this.chosenPeople = []
		},
	}
}
</script>

<template>
	<form 
		class="product-form" 
		@submit.prevent>
		<div class="product-form__fields">
			<div class="product-form__list-input">
				<AppInput
					class="product-form__input input"
					:class="{ invalid: v$.name.$error }"
					v-model.trim="name"
				>
					Название
				</AppInput>
				<AppInput
					class="product-form__input input"
					:class="{ invalid: v$.price.$error }"
					v-model="price"
				>
					Стоимость
				</AppInput>
				<AppInput
					class="product-form__input input"
					:class="{ invalid: v$.amount.$error }"
					v-model="amount"
				>
					Количество
				</AppInput>
			</div>

			<div class="product-form__select-form">
				<div class="product-form__title">
					Кто оплачивал?
				</div>
				<select 
					class="product-form__select" 
					v-model="payer"
				>
					<option
						class="product-form__option"
						v-for="person in persons"
						:value="person"
					>
						{{ person.name }}
					</option>
				</select>
			</div>

			<form class="product-form__checkbox-form">
				<div class="product-form__title">
					Кто использовал?
				</div>
				<div class="product-form__content">
					<label class="product-form__checkbox">
						<input
							class="check-box"
							type="checkbox"
							@change="toggleAll"			
							v-model="allChosen"
						/>
						<span class="check-style"/>
						{{ allChosenMessage }}
						
						<label 
							class="product-form__checkbox" 
							v-for="person in persons"
						>
							<input
								class="check-box"
								type="checkbox"
								:value="person"
								v-model="chosenPeople"
							/>
							<span class="check-style"/>
							{{ person.name }}
						</label>
					</label>
				</div>
			</form>
		</div>
		<AppButton
			class="product-form__add-btn add-btn"
			:class="{ disabled: hasError }"
			@click="inputValidation"
			>
				{{ buttonContent }}
			</AppButton>
	</form>
</template>