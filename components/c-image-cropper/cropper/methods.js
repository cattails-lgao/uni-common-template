export default function methods(paper) {
	// 初始化完成
	const onInit = function onInit() {}
	// 裁剪完成
	const onComplete = function onComplete() {}
	
	const onTouchstart = function onTouchstart(e)  {	
		// console.log('onTouchstar', e);
		const touches = e.touches;
		// 一指
		const x = touches[0].x;
		const y = touches[0].y;
		
		// 两指
		let x1;
		let y1;
		if(touches.length > 1) {
			x1 = touches[1].x;
			y1 = touches[1].y;
		}
		
		paper.setStartTouchPostion(x, y, x1, y1);
	}
	
	const onTouchmove = function onTouchmove(e) {
		// console.log('onTouchmove', e);
		const touches = e.changedTouches;
		// 一指
		const x = touches[0].x;
		const y = touches[0].y;
		
		// 两指
		let x1;
		let y1;
		if(touches.length > 1) {
			x1 = touches[1].x;
			y1 = touches[1].y;			
		}
		
		paper.setMoveTouchPostion(x, y, x1, y1);
	}
	
	const onTouchend = function onTouchend(e) {
		const touches = e.changedTouches;
		// 一指
		const x = touches[0].x;
		const y = touches[0].y;
		// 两指
		let x1;
		let y1;
		if(touches.length > 1) {
			x1 = touches[1].x;
			y1 = touches[1].y;			
		}
		
		paper.setEndTouchPostion(x, y, x1, y1);
	}
	
	return {
		onInit,
		onComplete,
		onTouchstart,
		onTouchmove,
		onTouchend
	}
}