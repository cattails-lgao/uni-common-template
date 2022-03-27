import Utils from './utils/index.js';
import App from './App/index.js';

export default function createCommon(vm) {
	vm.prototype.$Utils = Utils;
	vm.prototype.$App = App;
}