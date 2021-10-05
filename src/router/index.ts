import { MajorMinorScale } from '@/models/major-minor-scale';
import ScaleNotesTableSearch from '@/views/scale-notes-table-search.vue';
import MajorMinorScaleTriadsSearch from '@/views/major-minor-scale-triads-search.vue';
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
		path: '/scale-notes-table/:scaleType',
		name: 'Scale Notes Table',
		component: ScaleNotesTableSearch,
		props: route => ({
			scaleType: route.params.scaleType as string,
		})
	},
	{
		path: '/scale-triads',
		redirect: to => ({ path: '/scale-triads/major/ionian/c' })
	},
	{
		path: '/scale-triads/:type/:subtype/:tonic',
		name: 'Major & Minor Scale Triads',
		component: MajorMinorScaleTriadsSearch,
		props: route => ({
			scale: {
				type: (route.params.type as string).toLowerCase(),
				subtype: (route.params.subtype as string).toLowerCase(),
				tonic: (route.params.tonic as string).toLowerCase()
			} as MajorMinorScale
		})
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
