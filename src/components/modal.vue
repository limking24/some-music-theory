<template>
	<div class="modal" @click="close">
		<div class="modal-content" @click.stop>
			<div class="modal-header">
				<span class="close" @click="close">&times;</span>
				<h3><slot name="header"></slot></h3>
			</div>
			<div class="modal-body">
				<slot name="body"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Emit } from 'vue-property-decorator';

export default class Modal extends Vue {

	@Emit('close')
	close(): void {}

}
</script>

<style scoped>
.modal {
	background-color: rgba(0, 0, 0, 0.6);
	height: 100%;
	left: 0;
	position: fixed;
	text-align: left;
	top: 0;
	width: 100%;
	z-index: 200;
}

.modal-content {
	background-color: rgb(254, 254, 254);
	border-radius: 2px;
	border: 1px solid #888;
	box-shadow: 3px 3px 13px rgba(30, 30, 30, 0.25);
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 300;
	padding: 20px;
	width: 400px;
}

.modal-header {
	padding: 2px 16px;
}

.modal-header h3 {
	margin: 0;
}

.modal-body {
	padding: 6px 16px;
	font-size: 16px;
	text-align: justify;
}

.close {
	float: right;
	font-size: 22px;
	cursor: pointer;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}
</style>