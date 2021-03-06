import Methods from './methods.js';
import Cut from './cut.js';
import Paper from './paper.js';

async function ImageCropper(params = {}) {
	const { cid, oid, src, cWidth = 300, cHeight = 300 } = params;
	
	
	
	// 初始化绘制裁剪区域
	const cut = Cut(cid, cWidth, cHeight);
	// 初始化绘制图片
	const paper = await Paper(oid, src, cWidth, cHeight, cut.cutInitX, cut.cutInitY);
	// 初始化对象, 各种事件监听挂载
	const cropper = Object.create(Methods(paper));

	cut.draw();
	paper.drawPaper();

	return cropper;
}

export default ImageCropper;