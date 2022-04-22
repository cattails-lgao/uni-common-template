export default function methods(cropper) {
	// 初始化完成
	function onInit() {}
	// 裁剪完成
	function onComplete() {}
	
	function onTouchstart(e)  {
		console.log('onTouchstar', e);
		const touches = e.touches;
		// 一指
		const x = touches[0].x;
		const y = touches[0].y;
		
		// 两指
		let x1 = 0;
		let y1 = 0;
		if(touches.length > 1) {
			x1 = touches[1].x;
			y1 = touches[1].y;			
		}
		
		this.paper.setStartTouchPostion(x, y, x1, y1);
	}
	
	function onTouchmove(e) {
		// console.log('onTouchmove', e);
		this.paper.setMoveTouchPostion();
	}
	
	function onTouchend(e) {
		// console.log('onTouchend', e);
		this.paper.setMoveTouchPostion();
	}
	
	return {
		onInit,
		onComplete,
		onTouchstart,
		onTouchmove,
		onTouchend
	}
}