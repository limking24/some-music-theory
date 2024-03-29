<template>
	<div id="nav-button" v-if="!atHome" @click="navButtonClicked = !navButtonClicked" :class="{active: navButtonClicked}">
		<div/>
		<div/>
	</div>
	<div id="nav" :class="{'visible': toShowNav}">
		<h1>some-music-theory</h1>
		<router-link to="/scale-finder">Scale Finder</router-link>
		<router-link to="/scale-notes-table">Scale Notes Table</router-link>
		<router-link to="/scale-triads">Major & Minor Scale Triads</router-link>
	</div>
	<router-view id="view" :class="{'visible': !toShowNav}"/>
	<transition name="modal">
		<modal v-if="firstTimer" @close="closeFirstTimerMessage">
			<template v-slot:header>
				Hello!
			</template>
			<template v-slot:body>
				I've built this website for myself to facilitate songwriting.
				I've only tested it on Chrome (desktop) currently, and plan to 
				ensure cross-browser compatibility and make it mobile-friendly 
				in the future.
			</template>
		</modal>
	</transition>
</template>

<script lang="ts">
import Modal from '@/components/modal.vue';
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { RouteLocation } from 'vue-router';

@Options({
	components: {
		Modal
	}
})
export default class App extends Vue {

	atHome = false;

	navButtonClicked = false;

	firstTimer = false;

	get toShowNav(): boolean {
		return this.atHome || this.navButtonClicked;
	}

	mounted(): void {
		this.firstTimer = localStorage.getItem('firstTimer') == null;
	}

	@Watch('$route', {immediate: true})
	onRouteChanged(to: RouteLocation, from: RouteLocation): void {
		this.navButtonClicked = false;
		this.atHome = to.name === 'home';
	}

	closeFirstTimerMessage(): void {
		localStorage.setItem('firstTimer', 'false');
		this.firstTimer = false;
	}

}
</script>

<style>
@font-face {
	font-family: 'Catamaran';
	src: url('./fonts/Catamaran-VariableFont_wght.ttf');
}

body {
	padding: 30px 0;
	background: linear-gradient(
		340deg, 
		rgb(240, 240, 240) 0%, 
		rgb(250, 250, 250) 10%, 
		rgb(255, 255, 255) 20%, 
		rgb(255, 255, 255) 85%, 
		rgb(253, 253, 253) 92%, 
		rgb(242, 242, 242) 100%
	) fixed;
}

#app {
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	color: rgb(44, 62, 80);
	text-align: center;
}

#app, option, p {
	font-family: 'Catamaran', sans-serif;
}

h1, h2, h3 {
	text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.08);
}

h1 {
	font-size: 50px;
	font-weight: 700;
	margin: 20px;
}

h2 {
	font-size: 30px;
}

h3 {
	font-size: 24px;
}

option {
	font-size: 14.5px;
	padding-bottom: 0;
}

#nav-button {
	background: rgba(255, 255, 255, 0.98);
	border-bottom-right-radius: 22px;
	box-shadow: 2px 2px 6px rgba(100, 100, 100, 0.1);
	cursor: pointer;
	left: 0;
	padding: 7px 15px 10px 10px;
	position: fixed;
	top: 0;
	z-index: 200;
}

#nav-button:hover {
	background: rgba(250, 250, 250, 0.98);
	box-shadow: 2px 2px 6px rgba(100, 100, 100, 0.2);
}

#nav-button.active {
	background: rgb(246, 246, 246);
	box-shadow: 2px 2px 8px rgba(100, 100, 100, 0.25);
}

#nav-button div {
	background: rgb(54, 77, 99);
	border-radius: 5px;
	height: 4px;
	margin: 5px 0;
	width: 30px;
}

#nav-button div:last-child {
	width: 26px;
}

#nav-button.active div {
	background: rgb(38, 53, 68);
}

#nav {
	max-width: 800px;
	position: fixed;
	text-align: left;
	visibility: hidden;
	width: auto;
	z-index: 100;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -60%);
}

#nav h1 {
	font-size: clamp(57px, 9vw, 95px);
	margin: 0;
	text-shadow: 7px 7px 15px rgba(0, 0, 0, 0.12);
	white-space: nowrap;
}

#nav a {
	color: rgb(44, 62, 80);
	display: block;
	font-size: clamp(17px, 2.5vw, 25px);
	font-weight: 100;
	margin: 0;
	padding: 2px 6px;
	text-decoration: none;
}

#nav a:hover {
	background: linear-gradient(
		90deg, 
		rgb(243, 243, 243) 0%, 
		rgb(249, 249, 249) 1%, 
		rgba(255,255,255,0) 100%
	);
}

#nav .router-link-active {
	background: linear-gradient(
		90deg, 
		rgb(238, 238, 238) 0%, 
		rgb(243, 243, 243) 1%, 
		rgba(255,255,255,0) 90%
	);
	cursor: default;
	pointer-events: none;
}

#view {
	display: inline-block;
}

#nav.visible,
#view.visible {
	visibility: visible;
}

#nav:not(.visible),
#view:not(.visible), 
#view:not(.visible) .help::after {
	visibility: hidden;
}

.help .help-content,
.tooltip .tooltip-text {
	background: rgba(90, 90, 90, 0.97);
	border-radius: 3px;
	box-shadow: 3px 3px 13px rgba(30, 30, 30, 0.25);
	color: rgb(255, 255, 255);
	position: absolute;
	text-align: left;
	top: -5px;
	visibility: hidden;
	z-index: 5;
}

.tooltip {
	border-bottom: 1px dotted rgb(150, 150, 150);
	display: inline-block;
	position: relative;
}

.tooltip .tooltip-text {
	left: 105%;
	padding: 5px 10px;
}

.tooltip:hover .tooltip-text {
	visibility: visible;
}

.help::after {
	content: '?';
	cursor: help;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-size: 95%;
	visibility: visible;
}

.help .help-content {
	padding: 10px 0;
	right: 150%;
}

.help:hover .help-content {
	visibility: visible;
}

.striped-table tbody tr:nth-child(even) {
	background: rgb(245, 245, 245);
}

.striped-table tbody tr.highlight-hover,
.striped-table tbody tr:hover {
	background: rgb(190, 190, 190);
}

.striped-table tbody .highlight-click,
.striped-table tbody .highlight-hover,
.striped-table tbody tr:hover {
	transition: background-color 200ms ease-out;
}

.striped-table tbody .highlight-click:nth-child(odd) {
	background: rgb(195, 245, 195);
}

.striped-table tbody .highlight-click:nth-child(even) {
	background: rgb(170, 235, 170);
}
.striped-table tbody .highlight-click:nth-child(odd).highlight-hover,
.striped-table tbody .highlight-click:nth-child(odd):hover {
	background: rgb(160, 225, 160);
}

.striped-table tbody .highlight-click:nth-child(even).highlight-hover,
.striped-table tbody .highlight-click:nth-child(even):hover {
	background: rgb(155, 225, 155);
}
</style>
