import { SUCCESS_CODE } from './http/config.js';
import Utils from './utils/index.js';
import AppApi from './api/App.js';
import UserApi from './api/User.js';
import Login from './model/Login.js';
import App from './model/App.js';

export default function createCommon(vm) {
	vm.prototype.SUCCESS_CODE = SUCCESS_CODE;
	vm.prototype.$Utils = Utils;
	vm.prototype.$AppApi = AppApi;
	vm.prototype.$UserApi = UserApi;
	vm.prototype.$Login = Login;
	vm.prototype.$App = App;
	
	Login.inject({ User })
}