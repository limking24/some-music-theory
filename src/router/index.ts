import { MajorMinorScale } from '@/models/major-minor-scale';
import Home from '@/views/home.vue';
import MajorMinorScaleTriadsSearch from '@/views/major-minor-scale-triads-search.vue';
import NotFound from '@/views/not-found.vue';
import ScaleFinderInterface from '@/views/scale-finder-interface.vue';
import ScaleNotesTableSearch from '@/views/scale-notes-table-search.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/scale-finder',
		component: ScaleFinderInterface
	},
	{
		path: '/scale-notes-table',
		component: ScaleNotesTableSearch,
		props: route => ({
			scaleType: route.params.scaleType as string,
		}),
		children: [
			{
				path: '',
				redirect: '/scale-notes-table/major'
			},
			{
				path: ':scaleType',
				component: ScaleNotesTableSearch
			}
		]
	},
	{
		path: '/scale-triads',
		component: MajorMinorScaleTriadsSearch,
		props: route => ({
			scale: {
				type: (route.params.type as string).toLowerCase(),
				subtype: (route.params.subtype as string).toLowerCase(),
				tonic: (route.params.tonic as string).toLowerCase()
			} as MajorMinorScale
		}),
		children: [
			{
				path: '',
				redirect: '/scale-triads/major/ionian/c'
			},
			{
				path: ':type/:subtype/:tonic',
				component: ScaleNotesTableSearch
			}
		]
	},
	{
		path: "/:catchAll(.*)",
		component: NotFound
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
});

export default router;