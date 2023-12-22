import { createStore } from 'vuex'
import { personModule } from '@/store/modules/personModule'
import { productModule } from '@/store/modules/productModule'

export default createStore({
	modules: {
		person: personModule,
		product: productModule,
	},
})
