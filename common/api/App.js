import Axios from '../http/index.js';
import * as Interface from '../http/constant/index.js';
import $Utils from '../utils/index.js';

function App() {
	function Test() {
		retrun Axios.request({
			path: Interface.Test
		})
	}
	
	return Object.freeze({
		inject,
		Test
	})
}


export default App();