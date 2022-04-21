export default function methods(cropper) {
	// 初始化完成
	function onInit() {}
	// 裁剪完成
	function onComplete() {}
	// 更新画布
	function updateCanvas() {}
	
	function onTouchstart(e)  {
		// console.log('onTouchstar', e);
	}
	
	function onTouchmove(e) {
		// console.log('onTouchmove', e);
	}
	
	function onTouchend(e) {
		// console.log('onTouchend', e);
	}
	
	return {
		onInit,
		onComplete,
		updateCanvas,
		onTouchstart,
		onTouchmove,
		onTouchend
	}
}