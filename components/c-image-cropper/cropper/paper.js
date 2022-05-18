import { getDevice, getImageInfo } from './tools.js';

export default async function Paper(oid, src, cWidth, cHeight, cX, cY) {
	const ctx = uni.createCanvasContext(oid);
	if(!src) return;
	// 获取设备信息
	const { windowHeight, windowWidth } = getDevice();
	// 获取图片信息
	const { width, height, path } = await getImageInfo(src);
	// 等比例缩小图片
	let imgHeight = windowHeight;
	const scale = windowWidth / width;
	imgHeight = scale * height;
	
	let scaleHeight = imgHeight;
	let scaleWidth = windowHeight;
	let scaleX = 0;
	let scaleY = 0;
	
	if(cHeight > imgHeight) {
		const scale = cHeight / imgHeight;
		scaleHeight = cHeight;
		scaleWidth = windowWidth * scale;
	}
	
	const initImgY = windowHeight / 2 - scaleHeight / 2;
	const initImgX = 0;
	let changeY = initImgY;
	
	const allowMoveDistance = cY - initImgY;
	// 点击点记录
	// 开始坐标记录
	let sTouchX = 0;
	let sTouchY = 0;
	let sTouchX1 = 0
	let sTouchY1 = 0;
	// 结束坐标记录
	let eTouchX = 0;
	let eTouchY = 0;
	let eTouchX1 = 0
	let eTouchY1 = 0;
	
	function drawPaper(x = initImgX, y = initImgY) {
		// src x y w h x1 y1 w1 h1
		// 画在正中间
		ctx.drawImage(path, x, y, scaleWidth, scaleHeight)
		ctx.draw();
		changeY = y;
	}
	
	// 更新paper
	function updatePaper(x, y) {
		requestAnimationFrame(function() {
			drawPaper(x, y);
		})
	}
	
	// 存储第一次的位置
	function setStartTouchPostion(x = 0, y = 0, x1 = 0, y1 = 0) {
		sTouchX = x
		sTouchY = y;
		sTouchX1 = x1;
		sTouchY1 = y1;
	}
	
	// 存储移动中的位置
	function setMoveTouchPostion(x = 0, y = 0, x1 = 0, y1 = 0) {
		eTouchX = x;
		eTouchY = y;
		eTouchX1 = x1;
		eTouchY1 = y1;
		
		let diffX = eTouchX - sTouchX;
		let diffY = eTouchY - sTouchY;
		
		// 可移动范围外
		// 上边界 || 下边界 || 左边界 || 右边界
		if(eTouchY < cY || eTouchY > cY + scaleHeight || eTouchX < cX || eTouchX > cX + cWidth) {
			return;
		}
		// 可移动范围内
		console.log(diffY, allowMoveDistance)
		// 上移
		if(sTouchY < eTouchY && diffY >= allowMoveDistance) {
			return;
		}
		// 下移
		if(sTouchY > eTouchY && diffY >= allowMoveDistance) {
			return;
		}
		// 左移
		if(sTouchX < eTouchX) {}
		// 右移
		if(sTouchX > eTouchX) {}
		
		updatePaper(diffX, diffY);
	}
	
	return {
		drawPaper,
		setStartTouchPostion,
		setMoveTouchPostion
	}
}