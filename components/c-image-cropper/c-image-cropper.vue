<template>
	<view class="cropper">
		<canvas class="origin-canvas" id="origin-canvas" canvas-id="origin-canvas"></canvas>
		<canvas class="cut-canvas" id="cut-canvas" canvas-id="cut-canvas" @touchstart.stop="imageCropper.touchstart" @touchmove.stop="imageCropper.touchmove" @touchend.stop="imageCropper.touchend"></canvas>
	</view>
</template>

<script >
import ImageCropper from './cropper/index.js';

export default {
	data() {
		return {
			cropper: null
		};
	},
	created(e) {
		ImageCropper({
			cid: 'cut-canvas',
			oid: 'origin-canvas',
			src: 'https://w.wallhaven.cc/full/6o/wallhaven-6ozkzl.jpg'
		}).then(Cropper => {
			this.cropper = Cropper;
		});
	},
	watch: {
		cropper: function() {
			this.cropper.init();
		}
	}
};
</script>
<script module="imageCropper" lang="renderjs">
	export default {
		mounted() {
			this.$nextTick(function() {
				if(this.cropper) this.cropper.init();
			});
		},
		methods: {
			touchstart(e) {
				this.cropper.onTouchstart(e);
			},
			touchmove(e) {
				this.cropper.onTouchmove(e);
			},
			touchend(e) {
				this.cropper.onTouchend(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cropper {
		position: relative;
		
		.origin-canvas,.cut-canvas {
			width: 750rpx;
			height: 100vh;
		}
		
		.cut-canvas {
			position: absolute;
			top: 0;
		}
	}
</style>
