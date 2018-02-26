/**
 * 刷新标题
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 */
export const refreshTitle = (title) => {

	let iframe = document.createElement("iframe");
	iframe.style.display = "none";
	document.title = title;

	iframe.setAttribute("src", './static/refresh_title.html');
	iframe.addEventListener('load', function() {
		setTimeout(function() {
			document.body.removeChild(iframe);
		}, 0);
	});
	document.body.appendChild(iframe);
}

/**
 * 将数字格式化为金额显示格式（100,000.00）
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   num 值				例: 250000.01
 * @return   {[type]}   返回金额格式字符串      250,000.01
 */
export const amountFormat = (num) => {
	var num = (num || 0).toString().replace(/\,/g, "").split('\.'),
		result = '';
	while (num[0].length > 3) {
		result = ',' + num[0].slice(-3) + result;
		num[0] = num[0].slice(0, num[0].length - 3);
	}
	if (num[0]) { result = num[0] + result; }
	if (num.length > 1) result += '.' + num[1];
	return result;
}

/**
 * 处理时间差
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   difference [毫秒]的数值
 * @return   {[type]}              返回多少天多少小时多少分多少秒
 */

export const timeConvert = (difference) => {
	let curDay = handlerSingleDigit(parseInt(difference / (1000 * 60 * 60 * 24), 10)),
		curHours = handlerSingleDigit(parseInt(difference / (1000 * 60 * 60) % 24, 10)),
		curMinutes = handlerSingleDigit(parseInt(difference / (1000 * 60) % 60, 10)),
		curSeconds = handlerSingleDigit(parseInt(difference / (1000) % 60, 10));
	return {
		d: curDay,
		h: curHours,
		m: curMinutes,
		s: curSeconds
	}
}

export const calculationTimeDifference = (begin, end) => {

}
/**
 * 为一位数前面加上0
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   num  例:   -1   2    12
 * @return   {[type]}             -01   02   12
 */
export const handlerSingleDigit = (num) => {
	return num >= -10 ? num >= 0 ? num < 10 ? '0' + num : num : '-0' + Math.abs(num) : num;
}


/*
let domTiming = window.performance.timing;
console.log('//浏览器开始解析 HTML 文档第一批收到的字节')
console.log(domTiming.domLoading);
console.log('// 浏览器完成解析并且所有 HTML 和 DOM 构建完毕')
console.log(domTiming.domInteractive);
console.log('//DOM 解析完成后，网页内资源加载开始的时间')
console.log(domTiming.domContentLoadedEventStart);
console.log('// DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）')
console.log(domTiming.domContentLoadedEventEnd);
console.log('//网页上所有资源（图片等）下载完成,且准备就绪的时间')
console.log(domTiming.domComplete);
console.log('总共耗时')
console.log(domTiming.domComplete - domTiming.domLoading)
*/

/* 检测是否存在某个类名 */
export function hasClass(el, cls) {
	if (!el || !cls) return false;
	if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
};

/* 添加类名 */
export function addClass(el, cls) {
	if (!el) return;
	var curClass = el.className;
	var classes = (cls || '').split(' ');

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else {
			if (!hasClass(el, clsName)) {
				curClass += ' ' + clsName;
			}
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
};

/* 删除类名 */
export function removeClass(el, cls) {
	if (!el || !cls) return;
	var classes = cls.split(' ');
	var curClass = ' ' + el.className + ' ';

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else {
			if (hasClass(el, clsName)) {
				curClass = curClass.replace(' ' + clsName + ' ', ' ');
			}
		}
	}
	if (!el.classList) {
		el.className = trim(curClass);
	}
};
//高德地图初始化
export const AMapLoad = (k) => {
	return new Promise(function(resolve, reject) {
		window.initTheMap = function() {
			resolve(AMap);
		}

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initTheMap&key=' + k;
		script.onerror = function(e) {
			reject(e);
		};
		document.head.appendChild(script);
	})
}
//合并对象
export const merge = (...arg) => {
	if (arg.length == 0) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}
	let target = arg[0] || {},
		depath = false,
		length = arg.length,
		i = 1;

	if (Object.prototype.toString.call(target) == '[object Boolean]') {
		depath = target;
		target = arg[i];
		i++
	}

	if (typeof target !== "object") {
		target = {};
	}

	if (i == 2 && length <= 1) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}

	for (; i < length; i++) {
		let source = arg[i] || {};
		if (source != null) {
			for (let key in source) {
				let src = target[key],
					copy = source[key];
				if (target === copy) {
					continue;
				}
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					if (depath && copy && (isObject(copy) || Array.isArray(copy))) {
						let clone;
						if (Array.isArray(copy)) {
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isObject(src) ? src : {};
						}
						target[key] = merge(depath, clone, copy);
					} else if (copy !== void 0) {
						target[key] = copy;
					}
				}
			}
		}
	}
	return target;
}

export const isObject = (target) => {
	return Object.prototype.toString.call(target) === '[object Object]';
}

export const trim = (payload) => {
	let str = payload,
		whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for (let i = 0, len = str.length; i < len; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	for (let i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	// return payload == null ? "" : (payload + "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}
