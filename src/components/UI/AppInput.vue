<script>
export default {
	name: 'AppInput',

	props: {
		modelValue: [String, Number],
	},

	methods: {
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value)
		},
	},

}
</script>

<template>
	<div class="text-field">
		<label 
			for="text"
			class="text-field__label label" 
		>
			<slot/>
		</label>
		<input
			name="text"
			:value="modelValue"
			class="text-field__input input"
			@input="updateInput"
		/>
	</div>
</template>
