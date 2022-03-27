import Utils from './utils/index.ts';
import App from './App/index.ts';

export default function createCommon(vm) {
	vm.prototype.$Utils = Utils;
	vm.prototype.$App = App;
}