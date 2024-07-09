<script>
export default {
	name: 'AppButton',
}
</script>

<template>
	<v-btn 
		variant="tonal" 
		density="comfortable" 
		rounded="lg"
		size="large"
	>
		<slot/>
	</v-btn>
</template>
