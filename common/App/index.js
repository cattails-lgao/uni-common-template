import Axios from '../http/index.js';

import * as Interface from '../http/constant/index.js';

function App() {
	function Test() {
		Axios.request({
			path: Interface.Test
		})
	}
	
	return Object.freeze({
		Test
	})
}


export default App();