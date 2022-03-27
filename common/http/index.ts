import $Utils from '@/common/utils/index.ts';
import baseURL, { GET, POST, SUCCESS_CODE } from './config.ts';
import checkStatusCode from './constant/statusCode.ts';

const TIMEOUT = 10000;

function Axios() {
	const interceptors = {
		request: null,
		response: null
	}
	
	// 请求队列
	const requestTask = new Map();
	
	function before(callback) {
		if (!$Utils.isFunc(callback)) return;

		interceptors.request = callback;
	}

	function after(callback) {
		if (!$Utils.isFunc(callback)) return;

		interceptors.response = callback;
	}
	
	function abort(key) {
		if(!requestTask.has(key)) {
			console.error('取消失败寻找请求任务key失败', key);
			return;
		}
		
		const task = requestTask.get(key);
		task.abort();
		requestTask.delete(key);
	}
	
	/**
	 * 请求
	 * @param {Object}
	 * 	@property {object} path { url: '', method: POST, auth_with: true, isRecord: true }
	 * 	@property {object} data { a: 1, b: 1 }
	 * 	@property {number} timeout
	 * 	@property {object} header
	 * 	@property {string} dataType
	 */
	function request({ path, data = {}, timeout = TIMEOUT, header = {}, dataType = 'json' } = {}) {
		const abortKey = 'r_' + path.url;
		return new Promise((resolve, reject) => {
			let options = {
				url: baseURL + path.url,
				timeout,
				method: path.method,
				header,
				data,
				dataType,
				success: response => {
					const statusCode = response.statusCode;
					if(!checkStatusCode(statusCode)) {
						reject('');
					} else {
						let rsp;
						
						if(interceptors.response && $Utils.isFunc(interceptors.response)) {
							rsp = interceptors.response(response, path)
						} else {
							rsp = response.data;
						}
						
						if(rsp.code !== SUCCESS_CODE) {
							uni.showToast({ title: rsp.msg, icon: 'none' });
							reject('');
						} else {
							resolve(rsp);						
						}
					}
				},
				fail: fail => {
					reject(fail);
				},
				complete: complete => {
					requestTask.delete(abortKey);
					
					if(path.isRecord) {}
				}
			}
			
			if (options.method === GET)
				options.header = { ...options.header, 'content-type': 'application/x-www-form-urlencoded' };
			
			if (options.method === POST)
				options.header = { ...options.header, 'content-type': 'application/json' };
			
			if(interceptors.request && $Utils.isFunc(interceptors.request))
				options = interceptors.request(options, path);
				
			if (process.env.NODE_ENV === 'development') {
				console.log(options.url + ':' + JSON.stringify(options.data));
			}
			
			const task = uni.request(options);
			
			requestTask.set(abortKey, task);
		})
	}
	
	
	return Object.freeze({
		request,
		before,
		after,
		abort
	})
}

const axios = Axios();

axios.before((_config, path) => {
	if(path.auth_with)
		_config.header['Authorization'] = '';
		
	return _config;
})

axios.after((response, path) => {
	console.log(path.url, response.data);
	const statusCode = response.statusCode;
	if(statusCode === 401) {
		
	} else if(statusCode === 403) {
		
	} else if(statusCode === 500) {
		
	}
	
	return response.data;
})

export default axios;



