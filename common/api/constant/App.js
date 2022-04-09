/**
 * 例子
 * export const Index = {
		url: '', // 请求地址
		method: POST, // 请求方式
		auth_with: true, // 是否需要token
		isRecord: true // 是否记录请求
	}
 */

import { GET } from '../../http/config.js';

export const Test = {
	url: 'https://mockapi.eolink.com/bHWbjLEb2a3758d940da28ee0d307b1f73c726b086cf905/{{DEV-v1}}auth/register', // 请求地址
	method: GET, // 请求方式
	auth_with: true, // 是否需要token
	isRecord: true // 是否记录请求
}