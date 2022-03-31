import Axios from '../http/index.js';
import * as Interface from '../http/constant/index.js';
import AppApi from './App.js';

function Api() {
	const Outward = {};
	let $App;
		
	function inject(injects) {
		for(let key in injects) {
			Object.defineProperty(Outward, key, {
				get: function get() {
					return injects[key];
				},
				set: function set() {
					throw new Error('禁止修改' + key);
				}
			})
		}
		
		$App = AppApi(Outward);
	}
	
	
	
	function Test() {
		Axios.request({
			path: Interface.Test
		})
	}
	
	return Object.freeze({
		inject,
		Test,
		$App
	})
}


export default Api();