import Axios from '../http/index.js';
import * as Interface from './constant/User.js';

// 登录授权
export function WxLogin(AppId, js_code) {
	return Axios.request({
		path: Interface.wxLogin,
		data: {
			AppId,
			js_code
		}
	})
}

// 解密
export function Decrypt(session_key, encryptedData, AesIV, openid) {
	return Axios.request({
		path: Interface.Decrypt,
		data: {
			session_key,
			encryptedData,
			AesIV,
			openid
		}
	})
}