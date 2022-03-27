import Utils from './utils/index.ts';
export default function createCommon(vm) {
	vm.prototype.$Utils = Utils;
}