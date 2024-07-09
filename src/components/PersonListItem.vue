<script>
export default {
	props: {
		person: {
			type: Object,
			required: true,
		},
	}
}
</script>

<template>
	<div class="person-item">
		<v-avatar color="red-lighten-2">
			<span class="text-h5">
				{{ person.name.slice(0, 1) }}
			</span>
		</v-avatar>
		<div class="person-item__name name">
			{{ person.name }}
		</div>
		<AppButton
			class="person-item__rmv-btn rmv-btn"
			@click="$emit('remove', person)"
		>
			Удалить
		</AppButton>
	</div>
</template>
