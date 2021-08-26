import ScaleTriadsFinder from '@/views/scale-triads-finder.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		redirect: to => ({ path: '/scale-triads' })
	},
	{
		path: '/scale-triads',
		redirect: to => ({ path: '/scale-triads/major/ionian/c' })
	},
	{
		path: '/scale-triads/:typeKey/:modeKey/:tonicKey',
		name: 'Scale Triads',
		component: ScaleTriadsFinder,
		props: route => ({
			typeKey: route.params.typeKey,
			modeKey: route.params.modeKey,
			tonicKey: route.params.tonicKey
		})
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
