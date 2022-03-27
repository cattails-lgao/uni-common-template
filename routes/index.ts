import $Utils from '@/common/utils/index.ts';
import AllRouter from './constant/index.ts';

const RouterFuncType = {
	NavigateTo: 'navigateTo',
	RedirectTo: 'redirectTo',
	ReLaunch: 'reLaunch',
	SwitchTab: 'switchTab',
	NavigateBack: 'navigateBack'
}

function Router() {
	// 拦截器
	const interceptors = {
		entry: null,
		leave: null
	}
	
	/**
	 * 路由列表
	 */
	function getRoutes() {
		return getCurrentPages();
	}
	
	/**
	 * 进入路由
	 * @param {Object} callback
	 */
	function entry(callback) {
		if (!$Utils.isFunc(callback)) return;
		interceptors.entry = callback;
	}
	/**
	 * 离开路由
	 * @param {Object} callback
	 */
	function leave(callback) {
		if (!$Utils.isFunc(callback)) return;
		interceptors.leave = callback
	}
	
	/**
	 * 跳转到应用内的某个页面
	 * @param {Object} _config
	 * 	@property {object} path
	 * 	@property {object} params
	 * 	@property {func} success
	 * 	@property {func} fail
	 * 	@property {func} complete
	 */
	function navigateTo(_config) {
		uni.navigateTo();
	}

	function redirectTo(_config) {
		uni.redirectTo()
	}

	function reLaunch(_config) {
		uni.reLaunch()
	}

	function switchTab(_config) {
		uni.switchTab()
	}

	function navigateBack(delta = 1) {
		uni.navigateBack(delta)
	}
	
	return Object.freeze({
		entry,
		leave
	})
}

const router = Router();

router.entry(_config => {
	return _config
});
router.leave(() => {
	
})

export default function createRouter(vm) {
	vm.prototype.$Router = router;
	vm.prototype.$RouterPath = AllRouter;
}