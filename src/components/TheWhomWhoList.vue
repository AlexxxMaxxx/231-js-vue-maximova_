<script>
export default {
	props: {
		persons: {
			type: Array,
			required: true,
		},
		
		whomWho: {
			type: Array,
			required: true,
		},
	},

	methods: {
		whomStr(person) {
			return person.name.slice(0, -1) + 'е' + ' должны'
		},
		
		whoStr(who) {
			return this.persons.find(p => p.id === who.id).name +
				' - ' + who.amount + ' рублей'
		}
	}
}
</script>

<template>
	<div class="whom-who-list list">
		<div class="whom-who-list__content-list content-list">
			<div 
				class="whom-who-list__item list__item" 
				v-for="person in persons">
				<h3 class="whom-who-list__name name">
					{{ whomStr(person) }}
				</h3>
				<div v-for="who in whomWho.find(w => w.whom === person.id).who">
					<p>
						{{ whoStr(who) }}
					</p>
				</div>
				<div v-if="whomWho.find(w => w.whom === person.id).who.length === 0">
					<p>
						Никто ничего не должен, к сожалению.
					</p>
					<div class="d-flex justify-space-around">
						<v-icon
							icon="mdi-thumb-down"
							color="red-lighten-2"
							size="x-large"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>