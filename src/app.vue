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
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#app, option, p {
	font-family: 'Catamaran', sans-serif;
}

h1 {
	text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.080);
	margin: 20px;
	font-size: 50px;
	font-weight: 700;
}

h2 {
	font-size: 30px;
}

option {
	font-size: 14.5px;
	padding-bottom: 0;
}

#nav {
	margin: 35px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

#view {
	display: inline-block;
}
</style>
