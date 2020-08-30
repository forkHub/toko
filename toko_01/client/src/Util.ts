class Util {
	private static _resp: HttpResponse = {
		code: 0,
		message: ''
	};

	static async Ajax(type: string, url: string, data: string): Promise<string> {
		return new Promise((resolve: any, reject: any) => {
			try {
				console.group('send data');
				console.log(data);
				console.groupEnd();

				let xhr: XMLHttpRequest = new XMLHttpRequest();

				xhr.onload = () => {
					if (200 == xhr.status) {
						resolve(xhr.responseText);
					}
					else {
						Util._resp.code = xhr.status;
						Util._resp.message = xhr.statusText;
						reject(new Error('(' + xhr.status + ') ' + xhr.statusText));
					}
				};

				xhr.onerror = () => {
					Util._resp.code = 0;
					Util._resp.message = 'Error';
					reject(new Error('Error'));
				}

				xhr.open(type, url, true);
				xhr.setRequestHeader('Content-type', 'application/json');

				xhr.send(data);
			}
			catch (e) {
				console.log('Util error');
				console.log(e);
				Util._resp.code = 0;
				Util._resp.message = 'Error';
				reject(new Error('Error'));
			}

		});
	}

	public static get resp(): HttpResponse {
		return Util._resp;
	}

}

interface HttpResponse {
	code: number,
	message: string
}