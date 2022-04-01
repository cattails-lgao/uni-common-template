import Axios from '../http/index.js';
import * as Interface from '../http/constant/index.js';

function App() {
	const Outward = {};

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
	}
	
	
	
	function Test() {
		Axios.request({
			path: Interface.Test
		})
	}
	
	return Object.freeze({
		inject,
		Test
	})
}


export default App();