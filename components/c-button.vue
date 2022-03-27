<template>
	<button :type="type" :size="size"></button>
</template>

<script lang="ts">
	export default {
		prop: {
			size: {
				type: String,
				default: 'default'
			},
			type: {
				type: String,
				default: 'default'
			},
			plain: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scope>
</style>
