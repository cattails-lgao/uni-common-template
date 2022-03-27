<template>
	<button 
		class="mx-n py-n"
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
		
		:hover-class="hoverClass"
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
	><slot></slot></button>
</template>

<script>
	export default {
		props: {
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
			},
			disabled: {
				type: Boolean,
				default: false
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
		methods: {
			_getphonenumber(e) {
				this.$emit('getphonenumber', e.detail)
			},
			_getuserinfo(e) {
				this.$emit('getuserinfo', e.detail)
			},
			_error(e) {
				console.error('open-type', e.detail.errMsg)
			},
			_opensetting(e) {
				this.$emit('opensetting', e.detail.authSetting)
			},
			_launchapp() {
				this.$emit('launchapp');
			}
		}
	}
</script>

<style lang="scss" scope>
</style>
