import { getDevice } from './tools.js';

export default function Cut(cid, cWidth, cHeight) {
	const ctx = uni.createCanvasContext(cid);
	const { windowHeight, windowWidth } = getDevice();
	const cutInitX = windowWidth / 2 - cWidth / 2;
	const cutInitY = windowHeight / 2  - cHeight / 2;
	
	function draw() {
		// 画背景
		ctx.beginPath();
		ctx.rect(0, 0, windowWidth, windowHeight);
		ctx.setFillStyle('rgba(0,0,0, .5)')
		ctx.fill();
		ctx.closePath();
		
		// 画裁剪框
		ctx.beginPath();
		ctx.clearRect(cutInitX, cutInitY, cWidth, cHeight);
		ctx.fill();
		ctx.closePath();
		
		// 完成
		ctx.draw();
	}
	
	return {
		cutInitX, // 裁剪框的x坐标
		cutInitY, // 裁剪框的y坐标
		draw
	}
}