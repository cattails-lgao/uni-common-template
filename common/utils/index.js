export default ((function Utils {
	/**
	 * 是否为数字
	 * @param {Object} num
	 */
	function isNumber(num) {
		// return Object.prototype.toString.call(num) === "[object Number]";
		return typeof num === 'number';
	},
	/**
	 * 是否为字符串
	 * @param {Object} str
	 */
	function isString(str) {
		// return Object.prototype.toString.call(str) === "[object String]";
		return typeof str === 'string';
	},
	/**
	 * 是否为函数
	 * @param {Object} func
	 */
	function isFunc(func) {
		return Object.prototype.toString.call(func) === "[object Function]";
	},
	/**
	 * 是否为数组
	 * @param {Object} arr
	 */
	function isArray(arr) {
		return Object.prototype.toString.call(arr) === "[object Array]";
	},
	/**
	 * 是否是对象
	 * @param {Object} obj
	 */
	function isObject(obj) {
		return Object.prototype.toString.call(obj) === "[object Object]";
	},
	/**
	 * 是否为布尔值
	 * @param {Object} bool
	 */
	function isBoolean(bool) {
		return typeof bool === 'boolean';
	},
	/**
	 * 是否为时间对象
	 * @param {Object} date
	 */
	function isDate(date) {
		return Object.prototype.toString.call(date) === "[object Date]";
	},
	/**
	 * 判断对象是否为空
	 * @param {Object} Obj
	 */
	function isEmptyObj(Obj) {
		for (let attr in Obj) {
			return false;
		}
		return true
	},
	/**
	 * 小数四舍五入
	 * @param {number} number
	 * @param {number} precision
	 */
	function decimalRound(number, precision = 2) {
		//same as:
		//return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
		return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
	},
	/**
	 * 生成唯一ID
	 */
	function uRandom() {
		//用于生成uuid
		const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
	},
	/**
	 * 从指定的数组里随机获取值
	 * @param {Array} names
	 */
	function createRandomName(names) {
		return names[~~(Math.random() * names.length)];
	},
	/**
	 * 过去了多久
	 * @param {Date} timestamp 时间戳
	 */
	function pastDateFormat(timestamp) {
		if (!timestamp || !this.isNumber(timestamp)) {
			console.error('时间格式错误', timestamp)
			return;
		}

		const second = 1000; // 秒
		const minute = 60 * second; // 分
		const hour = 60 * minute; // 时
		const day = 24 * hour; // 天
		const oneWeek = 7;
		// const oneMonth = 30;

		const nowTimestamp = new Date().getTime();
		const parameterDate = new Date(timestamp);
		const diffTimestamp = Math.abs(nowTimestamp - timestamp);
		if (diffTimestamp >= day) {
			const dayNumber = Math.floor(diffTimestamp / day);
			// if (dayNumber >= oneMonth)
			if (parameterDate.getFullYear() < new Date().getFullYear())
				return parameterDate.getFullYear() + '年' + (parameterDate.getMonth() + 1) + '月' + parameterDate
				.getDate() + '日';
			if (dayNumber >= oneWeek)
				return (parameterDate.getMonth() + 1) + '月' + parameterDate.getDate() + '日';

			return dayNumber + '天前';
		}

		if (diffTimestamp >= hour)
			return Math.floor(diffTimestamp / hour) + '小时前';

		if (diffTimestamp >= minute)
			return Math.floor(diffTimestamp / minute) + '分钟前';

		if (diffTimestamp >= second)
			return Math.floor(diffTimestamp / second) + '秒前';

		return '刚刚'
	},
	/**
	 * 补零
	 * @param {number} num 
	 */
	function fillZeroOfTime(num) {
		if (!this.isNumber(num)) {
			console.error('补零：该参数不是数字', num);
			return num;
		}

		if (num > 9) return num;

		return '0' + num;
	},
	/**
	 * 时间格式化
	 * @param {string} time
	 * @param {string} format 格式
	 */
	function formatTime(time, format = 'YYYY-mm-dd HH:MM:SS') {
		const date = new Date(time);
		if(date.toString() === 'Invalid Date') {
			console.error('请传入正确的时间格式', time);
			return '';
		}

		let ret;
		
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	},
	/**
	 * 扫码进入-参数解析
	 * @param {Object} scene
	 */
	function parseScene(scene) {
		const params = {}; // var params = {};也行        
		const deSceneRsp = decodeURIComponent(scene).split('&');
		for (let i = 0; i < deSceneRsp.length; i++) {
			params[deSceneRsp[i].split('=')[0]] = deSceneRsp[i].split('=')[1];
		}

		return params;
	}
	
	return Object.freeze({
		isNumber,
		isString,,
		isFunc,
		isArray,
		isObject,
		isBoolean,
		isDate,
		isEmptyObj,
		decimalRound,
		uRandom,
		createRandomName,
		pastDateFormat,
		fillZeroOfTime,
		formatTime,
		parseScene
	})
})();
