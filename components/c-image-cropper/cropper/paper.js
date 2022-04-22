import { getDevice, getImageInfo } from './tools.js';

export default async function Paper(oid, src, cWidth, cHeight) {
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
	
	function drawPaper() {
		// src x y w h x1 y1 w1 h1
		// 画在正中间
		ctx.drawImage(path, 0, windowHeight / 2 - scaleHeight / 2, scaleWidth, scaleHeight)
		ctx.draw();
	}
	
	// 更新paper
	function updatePaper() {
		
	}
	
	// 存储第一次的位置
	function setStartTouchPostion(x, y, x1, y1) {
		sTouchX = x
		sTouchY = y;
		sTouchX1 = x1;
		sTouchY1 = y1;
	}
	
	// 存储移动中的位置
	function setMoveTouchPostion(x, y, x1, y1) {
		eTouchX = x;
		eTouchY = y;
		eTouchX1 = x1;
		eTouchY1 = y1;
	}
	
	return {
		drawPaper,
		setStartTouchPostion,
		setMoveTouchPostion
	}
}