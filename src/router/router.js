import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import PersonPage from '@/pages/PersonPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import ResultPage from '@/pages/ResultPage.vue'

const routes = [{ 
	name: 'Main',
	path: '/', 
	component: MainPage 
}, { 
	name: 'Person',
	path: '/persons', 
	component: PersonPage 
}, { 
	name: 'Product',
	path: '/products', 
	component: ProductPage 
}, { 
	name: 'Result',
	path: '/results', 
	component: ResultPage 
}]

export default createRouter({
	history: createWebHistory(),
	routes,
})
