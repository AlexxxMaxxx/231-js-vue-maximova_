<template>
	<div class="main">
		<h1 class="glow">
			<span>Добро </span>
			<span>пожаловать </span>
			<span>на </span>
			<span>наш </span>
			<span>сайт</span>
		</h1>

		<AppButton
			size="x-large"
			class="next-btn"
			@click="$router.push({name: 'Person'})"
		>
			Дальше
		</AppButton>
	</div>
</template>
