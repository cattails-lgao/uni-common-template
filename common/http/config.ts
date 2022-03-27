export const GET = 'GET';
export const POST = 'POST';

export const SUCCESS_CODE = 1;
export const ERROR_CODE = 0;

const urlConfig = {
	// dev: 'http://192.168.9.213:7777',
	dev: '',
	test: 'http://e.cdjcqc.com', 
	pro: 'https://d.cdjcqc.com'
}

let baseURL;

if (process.env.NODE_ENV === 'development') {
	baseURL = urlConfig.dev;
} else {
	baseURL = urlConfig.pro;
}

export default baseURL;