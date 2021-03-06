<template>
	<button
		class="btn mx-0r my-0r py-0r px-0r font-32r flex flex-a-c flex-j-c"
		:class="[
			setClass, 
			disabled || loading ? 'btn-disabled' : ''
		]"
		:style="[setStyle]"
		:type="type"
		:size="size"
		:plain="plain"
		:disabled="disabled"
		:loading="loading"
		:form-type="formType"
		:open-type="openType"
		:session-from="sessionFrom"
		:send-message-title="sendMessageTitle"
		:send-message-path="sendMessagePath"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		hover-class="none"
		:hover-start-time="hoverStartTime"
		:hover-stay-time="hoverStayTime"
		:hover-stop-propagation="hoverStopPropagation"
		:lang="lang"
		:app-parameter="appParameter"
		@getphonenumber="_getphonenumber"
		@getuserinfo="_getuserinfo"
		@error="_error"
		@opensetting="_opensetting"
		@launchapp="_launchapp"
		@tap.stop="_tap"
	>
		<slot></slot>
		
		<view class="btn-click-hover" :style="{
			transform: 'scale(' + (isClick ? Math.ceil(width/height) + 5 : 0) + ')',
			opacity: Number(isClick),
			width: height + 'rpx',
			height: height + 'rpx',
		}"></view>
	</button>
</template>

<script>
let timer;
export default {
	props: {
		setClass: {
			type: String,
			default: 'bg-color-primary color-white'
		},
		width: {
			type: Number,
			default: 750
		},
		height: {
			type: Number,
			default: 80
		},
		color: {
			type: String,
			default: ''
		},
		bgColor: {
			type: String,
			default: ''
		},
		showRadius: {
			type: Boolean,
			default: true
		},
		radiusSize: {
			type: Number,
			default: 0 // s sm base cirlce
		},
		showBorder: {
			type: Boolean,
			default: true
		},
		borderWidth: {
			type: Number,
			default: 1
		},
		borderColor: {
			type: String,
			default: '#f1f1f1'
		},
		showShadow: {
			type: Boolean,
			default: false
		},
		boxShadow: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'default'
		},
		type: {
			type: String,
			default: ''
		},
		plain: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		disabledBgColor: {
			type: String,
			default: ''
		},
		disabledColor: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		},
		formType: {
			type: String,
			default: ''
		},
		openType: {
			type: String,
			default: ''
		},
		hoverClass: {
			type: String,
			default: 'button-hover'
		},
		hoverStartTime: {
			type: Number,
			default: 20
		},
		hoverStayTime: {
			type: Number,
			default: 70
		},
		hoverStopPropagation: {
			type: Boolean,
			default: false
		},
		appParameter: {
			type: String,
			default: ''
		},
		lang: {
			type: String,
			default: 'en'
		},
		sessionFrom: {
			type: String,
			default: ''
		},
		sendMessageTitle: {
			type: String,
			default: ''
		},
		sendMessagePath: {
			type: String,
			default: ''
		},
		sendMessageImg: {
			type: String,
			default: ''
		},
		showMessageCard: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		setStyle() {
			const styles = {
				height: this.height + 'rpx',
				lineHeight: this.height + 'rpx',
				width: this.width + 'rpx'
			};
			
			if(this.disabled) {
				styles.backgroundColor = this.disabledBgColor;
				styles.color = this.disabledColor;
			} else {
				if (this.bgColor) styles.backgroundColor = this.bgColor;
				if (this.color) styles.color = this.color;				
			}

			if (this.showBorder) styles.border = `${this.borderWidth}rpx solid ${this.borderColor}`;
			if (this.showRadius) styles.borderRadius = this.radiusSize + 'rpx';
			if (this.showShadow) styles.boxShadow = '0 0 5rpx 5rp #ccc';
			
			return styles;
		}
	},
	data() {
		return {
			isClick: false
		}
	},
	methods: {
		_tap(e) {
			if(!this.isClick) {
				this.isClick = true;
				
				setTimeout(() => {
					this.isClick = false;
				}, 300)				
			}
			
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);
			
			if(this.disabled || this.loading) return;

			this.$emit('cTap', e);
		},
		_getphonenumber(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);
			this.$emit('getphonenumber', e.detail);
		},
		_getuserinfo(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);

			this.$emit('getuserinfo', e.detail);
		},
		_error(e) {
			console.error('open-type', e.detail.errMsg);
		},
		_opensetting(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);

			this.$emit('opensetting', e.detail.authSetting);
		},
		_launchapp() {
			this.$emit('launchapp');
		}
	}
};
</script>

<style lang="scss" scope>
.btn {
	position: relative;
	
	&::after {
		border: none;
	}
}

.button-hover {
	background-color: rgba(0, 0, 0, 0.1);
	opacity: 0.7;
}

.btn-disabled {
	background-color: rgba($color: #000000, $alpha: $uni-opacity-disabled);
}

.btn-click-hover {
	position: absolute;
	top: 0;
	transition: transform .3s linear;
	border-radius: 50%;
	box-shadow: 0 0 10px 1px rgba(#fff, .5) inset;
}
</style>
