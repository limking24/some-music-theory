import ScaleNotesTableSearch from '@/views/scale-notes-table-search.vue';
import ScaleTriadsSearch from '@/views/scale-triads-search.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		redirect: to => ({ path: '/scale-triads' })
	},
	{
		path: '/scale-notes-table',
		redirect: to => ({ path: '/scale-notes-table/major' })
	},
	{
		path: '/scale-notes-table/:scale',
		name: 'Scale Notes Table',
		component: ScaleNotesTableSearch,
		props: route => ({
			scale: decodeURIComponent(route.params.scale as string),
		})
	},
	{
		path: '/scale-triads',
		redirect: to => ({ path: '/scale-triads/major/ionian/c' })
	},
	{
		path: '/scale-triads/:typeKey/:modeKey/:tonicKey',
		name: 'Scale Triads',
		component: ScaleTriadsSearch,
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
