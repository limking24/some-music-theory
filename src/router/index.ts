import Home from '@/views/Home.vue';
import ScaleTriadsFinder from '@/views/scale-triads-finder.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
