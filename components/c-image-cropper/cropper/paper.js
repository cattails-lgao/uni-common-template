import { getDevice, getImageInfo } from './tools.js';

export default async function Paper(oid, src, cWidth, cHeight, cX, cY) {
	const ctx = uni.createCanvasContext(oid);
	if(!src) {
		console.error('缺少裁剪图片');
		return;
	}
	// 获取设备信息
	const { windowHeight, windowWidth } = getDevice();
	// 获取图片信息
	const { width, height, path } = await getImageInfo(src);
	
	// 等比例缩小图片
	let scale;
	let scaleHeight; // 缩小后的高度
	let scaleWidth; // 已屏幕宽度为准
	
	if(width > height) {
		scale = windowWidth / width;
		scaleWidth = windowWidth;
		scaleHeight = height * scale;
	} else {
		scale = windowHeight / height;
		scaleWidth = width * scale;
		scaleHeight = windowHeight;
	}
	
	// 存储移动的最后一个位置
	const storeChangeXY = {
		X: 0,
		Y: windowHeight / 2 - scaleHeight / 2
	}
	// 可移动范围
	/*
	 裁剪框坐标x - 图片坐标x 
	 y同理
	 [上，下，左，右]
	 */
	const allowMoveRange = [
		cY - storeChangeXY.Y - 1, 
		(cY + cHeight) - (storeChangeXY.Y + scaleHeight) + 1,
		cX - storeChangeXY.X - 1,
		(cX + cWidth) - (storeChangeXY.X + scaleWidth) + 1,
	];
	
	// 开始坐标记录
	let sTouchX = 0;
	let sTouchY = 0;
	let sTouchX1;
	let sTouchY1;
	// 结束坐标记录
	let eTouchX = 0;
	let eTouchY = 0;
	let eTouchX1;
	let eTouchY1;
	
	function drawBg() {
		ctx.beginPath();
		ctx.setFillStyle('#333')
		ctx.fillRect(0, 0, windowWidth, windowHeight);
		ctx.closePath();
	}
	
	function drawPaper(x = storeChangeXY.X, y = storeChangeXY.Y, scale = 1) {
		// src x y w h x1 y1 w1 h1
		// 画在正中间
		drawBg();
		ctx.beginPath();
		ctx.scale(scale, scale)
		ctx.drawImage(path, x, y, scaleWidth, scaleHeight)
		ctx.draw();
		ctx.closePath();
	}
	
	// 更新paper
	function updatePaper(x, y) {
		requestAnimationFrame(function() {
			drawPaper(x, y);
		})
	}
	
	// 存储第一次的位置
	function setStartTouchPostion(x = 0, y = 0, x1, y1) {
		sTouchX = x
		sTouchY = y;
		// 二指
		if(x1 != undefined && y1 != undefined) {
			sTouchX1 = x1;
			sTouchY1 = y1;			
		}
	}
	
	// 存储移动中的位置
	function setMoveTouchPostion(x = 0, y = 0, x1, y1) {
		eTouchX = x;
		eTouchY = y;
		
		// 二指
		if(x1 != undefined && y1 != undefined) {
			eTouchX1 = x1;
			eTouchY1 = y1;
			
			scalePaper();
			return;
		}
		
		movePaper();
	}
	
	function movePaper() {
		// 差值
		const diffX = eTouchX - sTouchX;
		const diffY = eTouchY - sTouchY;
		// 移动距离
		let moveDX = storeChangeXY.X + diffX;
		let moveDY = storeChangeXY.Y + diffY;
		
		// 上边界
		if(moveDY > allowMoveRange[0]) {
			moveDY = allowMoveRange[0];
		}
		// 下边界
		if(moveDY < allowMoveRange[1]) {
			moveDY = allowMoveRange[1];
		}
		// 左边界
		if(moveDX > allowMoveRange[2]) {
			moveDX = allowMoveRange[2];
		}
		// 右边界
		if(moveDX < allowMoveRange[3]) {
			moveDX = allowMoveRange[3];
		}
		
		updatePaper(moveDX, moveDY);
	}
	
	function scalePaper() {}
	
	function setEndTouchPostion(x = 0, y = 0, x1, y1) {
		// 差值
		const diffX = x - sTouchX;
		const diffY = y - sTouchY;
		
		// 移动距离
		const moveDX = storeChangeXY.X + diffX;
		const moveDY = storeChangeXY.Y + diffY;
		// 存储最后一个坐标
		storeChangeXY.X = moveDX;
		storeChangeXY.Y = moveDY;
		console.log(storeChangeXY);
	}
	
	return {
		drawPaper,
		setStartTouchPostion,
		setMoveTouchPostion,
		setEndTouchPostion
	}
}