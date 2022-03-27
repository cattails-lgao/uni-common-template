import Axios from '../http/index.ts';

import * as Interface from '../http/constant/index.ts';

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