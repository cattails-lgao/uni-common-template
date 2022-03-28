<template>
	<view>
		<c-button :width="300" :loading="btnLoading" @cTap="login">登录</c-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnLoading: false
			}
		},
		onLoad() {

		},
		methods: {
			login() {
				
			}
		}
	}
</script>

<style lang="scss" scope>
	
</style>
