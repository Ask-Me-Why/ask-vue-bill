let config = {
	isLocal: true,
	el: document.getElementsByTagName('body')[0],
	getBaseUrl() {
		let _r = this.el.getAttribute('data-api');
		if (this.isLocal) {
			_r = 'http://localhost:3033/api';
			// _r = 'http://box.bocaihd.com/page/web-app/api';
			/*{
				13540270352,
				123456
			}*/
		}
		return _r;
	},
	getAuthToken() {
		let _r = this.el.getAttribute('data-token');
		if (this.isLocal) {
			// _r = '1a6d0c9bf64054e48cfdf3b28cb62bb8';
			_r = '26a04d884129f75b44276676b6b7e4ef';
		}
		return _r;
	},
	getWId() {
		let _r = this.el.getAttribute('data-wid');
		if (this.isLocal) {
			// _r = 1;
			_r = 164;
		}
		return _r;
	},
	mapKey(){
		return 'b2a77f35f8b6d8690bb6988a626d4f17';
	},
	mapCenter(){
		return [104.065837, 30.657349];
	}
}

export const MAPKEY = config.mapKey();
export const MAPCENTER = config.mapCenter();
export const BASE_URL = config.getBaseUrl();
export const AUTH_TOKEN = config.getAuthToken();
export const W_ID = config.getWId();