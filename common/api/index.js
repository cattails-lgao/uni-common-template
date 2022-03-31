import Axios from '../http/index.js';

import * as Interface from '../http/constant/index.js';

function Api() {
	const outward = {};
	function inject(injects) {
		for(let key in injects) {
			Object.defineProperty(outward, key, {
				value: injects[key],
				enumerable: false,
				configurable: false,
				writable: false
			})
		}
	}
	
	
	function Test() {
		Axios.request({
			path: Interface.Test
		})
	}
	
	return Object.freeze({
		init,
		Test
	})
}


export default Api();