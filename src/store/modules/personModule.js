export const personModule = {
	state: () => ({
		persons: [],
	}),
	getters: {
		getPersons(state) {
			return state.persons
		},
		getPersonsLength(_, getters) {
			return getters.getPersons.length
		},
	},
	mutations: {
		setPersons(state, persons) {
			state.persons = persons
		},
		addPerson(state, newPerson) {
			state.persons.push(newPerson)
		},
		removePerson(state, person) {
			state.persons = state.persons.filter(p => p.id !== person.id)
		},
	},
	namespaced: true,
}
