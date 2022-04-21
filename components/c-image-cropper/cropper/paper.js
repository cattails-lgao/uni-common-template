import { getDevice, getImageInfo } from './tools.js';

export default async function Paper(oid, src) {
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
	
	function drawPaper() {
		ctx.drawImage(path, 0, windowHeight / 2 - imgHeight / 2, windowWidth, imgHeight)
		ctx.draw();		
	}
	
	return () => {
		drawPaper()
	}
}