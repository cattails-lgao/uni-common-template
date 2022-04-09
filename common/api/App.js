import Axios from '../http/index.js';
import * as Interface from './constant/App.js';
import $Utils from '../utils/index.js';

function App() {
	function Test() {
		retrun Axios.request({
			path: Interface.Test
		})
	}
	
	return Object.freeze({
		Test
	})
}


export default App();