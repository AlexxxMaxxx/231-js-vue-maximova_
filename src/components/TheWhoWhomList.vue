<script>
export default {
	props: {
		persons: {
			type: Array,
			required: true,
		},
	},

	methods: {
		whoStr(person) {
			return person.name + ' должен'
		},
		
		whomStr(person) {
			return this.persons.find(p => p.id === person.id).name.slice(0, -1) +
				'е' + ' - ' + person.amount + ' рублей'
		}
	}
}
</script>

<template>
	<div class="who-whom-list list">
		<div class="whom-who-list__content-list content-list">
			<div 
				class="who-whom-list__item list__item" 
				v-for="person in persons"
			>
				<h3 class="who-whom-name name">
					{{ whoStr(person) }}
				</h3>
				<div 
					v-if="person.debts.length" 
					v-for="person in person.debts"
				>
					<p>
						{{ whomStr(person) }}
					</p>
				</div>
				<div v-else>
					<p>
						Никому ничего не должен! Живет как хочет!
					</p>
					<div class="d-flex justify-space-around">
						<v-icon
							icon="mdi-thumb-up"
							color="yellow-darken-2"
							size="x-large"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>