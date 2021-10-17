<template>
	<div id="nav">
		<router-link to="/scale-notes-table">Scale Notes Table</router-link> |
		<router-link to="/scale-triads">Major & Minor Scale Triads</router-link>
	</div>
	<router-view id="view"/>
</template>

<style>
@font-face {
	font-family: 'Catamaran';
	src: url('./fonts/Catamaran-VariableFont_wght.ttf');
}

#app {
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	color: #2c3e50;
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

#nav {
	margin: 35px;
}

#nav a {
	color: #2c3e50;
	font-weight: bold;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

#view {
	display: inline-block;
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
	color: rgb(100, 100, 100);
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
</style>
