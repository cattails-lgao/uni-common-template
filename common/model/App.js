function App() {

	// 小程序更新
	function updateMiniProgram() {
		if (uni.canIUse('getUpdateManager')) {
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});

					updateManager.onUpdateFailed(function(res) {
						// 新的版本下载失败
						console.error('新的版本下载失败', res);
					});
				}
			});
		} else {
			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			uni.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	}


	return Object.freeze({
		updateMiniProgram
	})
}

export default App();
