import { SUCCESS_CODE } from './http/config.js';
import Utils from './utils/index.js';
import Login from './model/Login.js';
import App from './model/App.js';

export default function createCommon(vm) {
	vm.prototype.SUCCESS_CODE = SUCCESS_CODE;
	vm.prototype.$Utils = Utils;
	vm.prototype.$Login = Login;
	vm.prototype.$App = App;
}