export const personModule = {
	state: () => ({
		persons: [],
		whomWho: [],
	}),

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

		checkDebts(state) {
			state.persons.forEach(person => {
				person.debts.forEach((debt, ind) => {

					const debtPerson = state.persons.find(p => p.id === debt.id)
					const index = debtPerson.debts.findIndex(d => d.id === person.id)

					if (index !== -1) {
						const diff =
							(person.debts[ind].amount - debtPerson.debts[index].amount).toFixed(2)
						if (diff < 0) {
							person.debts.splice(ind, 1)
							debtPerson.debts[index].amount = -diff
						} else if (diff > 0) {
							debtPerson.debts.splice(index, 1)
							person.debts[ind].amount = diff
						} else {
							person.debts.splice(ind, 1)
							debtPerson.debts.splice(index, 1)
						}
					}
				})
			})
		},

		getWhoWhom(state) {
			state.persons.forEach(curPerson => {
				const len = state.whomWho.push({ whom: curPerson.id, who: [] })
				state.persons.forEach(person => {
					if (person.id !== curPerson.id) {
						const index = person.debts.findIndex(d => d.id === curPerson.id)
						if (index !== -1) {
							state.whomWho[len - 1].who.push({
								id: person.id,
								amount: person.debts[index].amount,
							})
						}
					}
				})
			})
		},

		clearState(state) {
			state.persons = [],
				state.whomWho = []
		}
	},

	namespaced: true,
}
