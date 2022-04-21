let deviceInfo = null;

export function	getDevice () {
  if (!deviceInfo) {
    deviceInfo = wx.getSystemInfoSync()
  }
  return deviceInfo;
}

export function getImageInfo(src) {
	return new Promise((resolve, rejectt) => {
		uni.getImageInfo({
			src,
			success(imgRsp) {
				resolve({
					width: imgRsp.width,
					height: imgRsp.height,
					path: imgRsp.path
				})
			},
			fail() {
				consolo.error('获取图片信息失败', src);
				rejectt(-1);
			}
		})
	})
}