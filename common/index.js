import Utils from './utils/index.js';
import Api from './api/index.js';

export default function createCommon(vm) {
	vm.prototype.$Utils = Utils;
	vm.prototype.$Api = Api;
	
	Api.init();
}