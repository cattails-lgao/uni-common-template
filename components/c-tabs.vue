<template>
	<view class="tab-container">
		<scroll-view class="scroll-container" scroll-x="true" >
			<view class="tabs">
				<block v-for="(tab, index) in tabs" :key="index">
					<view class="tab-item">
						<text>{{ tabs[keyName] }}</text>
					</view>
				</block>
			</view>
			<view class="line-container">
				<view class="line"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default: () => ([])
			},
			keyName: {
				type: String,
				default: 'name'
			}
		}
	}
</script>

<style lang="scss" scope>
</style>
