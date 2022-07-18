<template>
	<view :data-theme="theme" class="page-index">
		<c-button :width="300" :loading="btnLoading" @cTap="login">登录</c-button>
		<c-gap />
		<c-tabs 
			:tabs="tabsList"  
			:config="{
				defaultSize: 28
			}"
		/>
		
		<!-- <c-image-croppez></c-image-cropper> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnLoading: false,
				tabsList: Array.from(new Array(10), (item, index) => {
					return {
						name: 'tab' + index
					}
				}),
				theme: 'theme1'
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
