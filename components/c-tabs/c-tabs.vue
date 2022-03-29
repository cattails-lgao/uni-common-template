<template>
	<view class="tab-container">
		<scroll-view 
			class="scroll-container" 
			:scroll-x="!tabConfig.disabledScroll"
			:show-scrollbar="false"
			:scroll-into-view="scrollInto"
			:scroll-with-animation="true"
			:style="{
				width: tabConfig.tabWidth + 'rpx',
				height: tabConfig.tabHeight + 'rpx'
			}"
		>
			<view class="tabs flex flex-a-c flex-w-n" :style="{ height: tabConfig.tabHeight - tabConfig.indicatorLineHeight + 'rpx' }">
				<block v-for="(tab, index) in tabs" :key="index">
					<view 
						:id="'tab_' + index" 
						:data-id="index"
						class="tab-item flex-s flex flex-a-c flex-j-c"
						:class="[
							tabConfig.disabledScroll ? 'flex-1' : ''
						]"
						:style="{
							fontSize: tabIndex === index ? tabConfig.activeSize + 'rpx' : tabConfig.defaultSize + 'rpx',
							color: tabIndex === index ? tabConfig.activeColor : tabConfig.defaultColor
						}"
						@tap="tabChange(index)"
					>
						<text>{{ tab[keyName] }}</text>
					</view>
				</block>
			</view>
			<view 
				class="underline-container" 
				:style="{
					height: tabConfig.indicatorLineHeight + 'rpx'
				}"
			>
				<view 
					class="underline" 
					:style="{
						height: tabConfig.indicatorLineHeight + 'rpx',
						width: tabConfig.indicatorLineWidth + 'rpx',
						borderRadius: tabConfig.indicatorLineHeight + 'rpx',
						backgroundColor: tabConfig.lineColor,
						transform: 'translateX(' + indicatorLineLeft + 'px)'
					}"
				></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	const defaultConfig = {
		disabledScroll: false, // 禁止滚动
		tabWidth: 750, // tab宽度
		tabHeight: 82, // tab高度
		defaultColor: '#333', // 字体默认颜色
		defaultSize: 32, // 字体默认大小
		activeColor: '#333', // 字体选中颜色
		activeSize: 32, // 字体选中大小
		indicatorLineHeight: 6, // underline高度
		indicatorLineWidth: 42, // underline宽度
		lineColor: '#333'
	}
	
	export default {
		props: {
			tabs: {
				type: Array,
				default: () => ([])
			},
			keyName: {
				type: String,
				default: 'name'
			},
			config: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				tabConfig: {},
				scrollInto: '',
				tabIndex: 0,
				indicatorLineLeft: 0,
				indicatorLineWidth: 0
			}
		},
		created() {
			if(Object.keys(this.config).length) {
				this.tabConfig = { ...defaultConfig, ...this.config };
			} else {
				this.tabConfig = { ...defaultConfig };
			}
			
			this.tabListSize = {};
		},
		mounted() {
			this.getTabbarItemsSize();
		},
		methods: {
			tabChange(index) {
				this.tabIndex = index;
				
				this.scrollInto = 'tab_' + index;
				this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
			},
			getTabbarItemsSize() {
				const query = uni.createSelectorQuery().in(this);
			    // #ifdef APP-NVUE
			    // 因 nvue 暂不支持 class 查询
			    for (var i = 0; i < this.tabList.length; i++) {
			        query.select('#tab_' + i).boundingClientRect();
			    }
			    query.exec(rects => {
			        console.log(JSON.stringify(rects));
			        rects.forEach((rect) => {
			            this.tabListSize[rect.dataset.id] = rect;
			        })
			    });
			    // #endif
			
			    // #ifdef MP-WEIXIN || H5 || MP-QQ
			    query.selectAll('.tab-item').boundingClientRect((rects) => {
			        rects.forEach((rect) => {
			            this.tabListSize[rect.dataset.id] = rect;
			        })
			    }).exec();
			    // #endif
				
			    // #ifdef APP-NVUE || H5 || MP-WEIXIN || MP-QQ
			    setTimeout(() => {
			        this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
			    }, 100)
			    // #endif
			},
			updateIndicator(left, width) {
			    this.indicatorLineLeft = left + width / 2 - uni.upx2px(this.tabConfig.indicatorLineWidth) / 2;
			    this.indicatorLineWidth = width;
			}
		}
	}
</script>

<style lang="scss" scope>
	.tab-container {
		.scroll-container {
			.tabs {
				.tab-item {
					transition: all .3s linear;
					height: inherit;
					padding: 0 22rpx;
				}
			}
		}
		
		.underline-container {
			.underline {
				transition: transform .3s linear;
			}
		}
	}
</style>
