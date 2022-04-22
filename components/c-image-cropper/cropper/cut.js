import { getDevice } from './tools.js';

export default function Cut(cid, cWidth, cHeight) {
	const ctx = uni.createCanvasContext(cid);
	const { windowHeight, windowWidth } = getDevice();
	// 画背景
	ctx.beginPath();
	ctx.rect(0, 0, windowWidth, windowHeight);
	ctx.setFillStyle('rgba(0,0,0, .5)')
	ctx.fill();
	ctx.closePath();
	
	// 画裁剪框
	ctx.beginPath();
	ctx.clearRect(windowWidth / 2 - cWidth / 2, windowHeight / 2  - cHeight / 2, cWidth, cHeight);
	ctx.fill();
	ctx.closePath();
	
	// 完成
	ctx.draw();
}