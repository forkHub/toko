declare var loadImage: Function;

class PhotoUploadPage extends BaseComponent {

	// private canvasImg2: HTMLCanvasElement = document.createElement('canvas');
	// private canvasThumb2: HTMLCanvasElement = document.createElement('canvas');
	// private rotasi: number = 0;
	private _selesai: Function = null;
	private _insertedId: string = '';
	private _gbrUrl: string = '';

	// resp.status(200).send({
	// 	gbr_url: folderUnggah + gbrBesarNama,
	// 	baris_info: _rows
	// });

	constructor() {
		super();
	}

	createName(prefix: string, pjg: number = 12): string {
		let hasil: string = prefix;
		let karakter: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		let date: Date = new Date();

		for (let i: number = 0; i < pjg; i++) {
			hasil += karakter.charAt(Math.floor(Math.random() * karakter.length));
		}

		hasil += date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();
		hasil += '.png';

		console.log('nama: ' + hasil);

		return hasil;
	}

	init(): void {
		console.group("photo upload");
		this._elHtml = this.getTemplate('div.foto-page');

		console.group('el html');
		console.log(this._elHtml);
		console.groupEnd();

		// this.canvasImg2.width = 800;
		// this.canvasImg2.height = 600;

		// this.canvasThumb2.width = 128;
		// this.canvasThumb2.height = 128;

		// this.uploadTbl.style.display = 'none';
		// this.rotasiTbl.style.display = 'none';

		this.initInput(this.input);

		this.form.onsubmit = () => {
			this.upload();
			return false;
		}

		// this.rotasiTbl.onclick = () => {
		// 	this.rotasi += 90;
		// 	if (this.rotasi > 360) {
		// 		this.rotasi -= 360;
		// 	}
		// 	this.renderImg(this.canvasBesarHtml, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
		// 	this.renderImg(this.canvasThumbHtml, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
		// }

		console.groupEnd();
	}

	async loadImage3(file: HTMLInputElement): Promise<void> {
		await this.loadImage2(file, 800, 800, "gbr_besar", this.fotoCont);
		await this.loadImage2(file, 128, 128, "thumb", this.thumbCont);
	}

	async loadImage2(file: HTMLInputElement, panjang: number, lebar: number, id: string, cont: HTMLDivElement): Promise<void> {
		let canvas: HTMLCanvasElement;
		let img: any = await loadImage(
			file.files[0],
			{
				maxWidth: panjang,
				maxHeight: lebar,
				canvas: true,
				orientation: true,
				imageSmoothingQuality: 'high'
			}
		);

		canvas = img.image;
		canvas.setAttribute("id", id);
		cont.appendChild(canvas);
	}

	populateData(): FormData {
		let formData: FormData = new FormData();
		formData.append("gbr_besar", this.canvasBesar.toDataURL());
		formData.append("gbr_kecil", this.canvasThumb.toDataURL());
		return formData;
	}

	populateJson(): string {
		let obj: any = {
			gbr_besar: this.canvasBesar.toDataURL(),
			gbr_kecil: this.canvasThumb.toDataURL(),
			gbr_besar_nama: this.createName('gbr_besar_', 8),
			gbr_kecil_nama: this.createName('gbr_kecil_', 8)
		}

		return JSON.stringify(obj);
	}

	// renderImg(canvasDest: HTMLCanvasElement, sudut: number, canvasSrc: HTMLCanvasElement, x: number, y: number): void {
	// 	let ctxDest: CanvasRenderingContext2D = canvasDest.getContext('2d');

	// 	sudut = (Math.PI / 180.0) * sudut;
	// 	ctxDest.clearRect(0, 0, canvasDest.width, canvasDest.height);
	// 	ctxDest.save();
	// 	ctxDest.translate(x, y);
	// 	ctxDest.rotate(sudut);
	// 	ctxDest.drawImage(canvasSrc, -x, -y);
	// 	ctxDest.restore();

	// 	console.log(canvasDest.width + '/' + canvasDest.height);
	// }

	initInput(input: HTMLInputElement): void {

		input.onchange = () => {
			this.loadImage3(input).then(() => {
				// this.uploadTbl.style.display = 'block';
			}).catch((e: any) => {
				App.dialog.p.innerHTML = e.message();
				App.dialog.tampil();
			});

			// let file: File = input.files[0];
			// let reader: FileReader = new FileReader();
			// let image: HTMLImageElement = new Image();

			// this.uploadTbl.style.display = 'none';
			// this.rotasiTbl.style.display = 'none';

			// reader.onload = () => {
			// 	image.onload = () => {
			// 		let ratio: number = Math.min(canvasHtml.width / image.naturalWidth, canvasHtml.height / image.naturalHeight);
			// 		let w2: number = image.naturalWidth * ratio;
			// 		let h2: number = image.naturalHeight * ratio;

			// 		let x: number = 0 + (canvasHtml.width - w2) / 2;
			// 		let y: number = 0 + (canvasHtml.height - h2) / 2;

			// 		this.canvasImg2.getContext('2d').clearRect(0, 0, this.canvasImg2.width, this.canvasImg2.height);
			// 		this.canvasImg2.getContext('2d').drawImage(image, x, y, w2, h2);

			// 		this.renderImg(this.canvasBesarHtml, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);

			// 		//gambar thumbnail
			// 		ratio = Math.min(canvasThumbHtml.width / image.naturalWidth, canvasThumbHtml.height / image.naturalHeight);
			// 		w2 = image.naturalWidth * ratio;
			// 		h2 = image.naturalHeight * ratio;

			// 		x = 0 + (canvasThumbHtml.width - w2) / 2;
			// 		y = 0 + (canvasThumbHtml.height - h2) / 2;

			// 		this.canvasThumb2.getContext('2d').clearRect(0, 0, this.canvasThumb2.width, this.canvasThumb2.height);
			// 		this.canvasThumb2.getContext('2d').drawImage(image, x, y, w2, h2);
			// 		this.renderImg(this.canvasThumbHtml, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);

			// 		this.uploadTbl.style.display = 'inline';
			// 		this.rotasiTbl.style.display = 'inline';
			// 	}

			// 	image.src = (reader.result) as string;
			// };

			// if (file) {
			// 	reader.readAsDataURL(file);
			// }
		}
	}

	upload(): void {
		try {
			Util.Ajax('post', '/file/baru', this.populateJson())
				.then((hasil) => {
					console.log(hasil);

					let hasilObj: any = JSON.parse(hasil);
					this._insertedId = hasilObj.baris_info.insertId;
					this._gbrUrl = hasilObj.gbr_url;

					App.dialog.p.innerText = 'Sukses';
					App.dialog.tampil(false);

					App.dialog.okTbl.onclick = () => {
						App.dialog.detach();
						this.selesai();
					}
				})
				.catch((_err) => {
					App.dialog.p.innerHTML = _err;
					App.dialog.tampil();
				});
		}
		catch (e) {
			App.dialog.p.innerHTML = e;
			App.dialog.tampil();
		}
	}

	get listCont(): HTMLDivElement {
		return this.getEl('div.list-cont') as HTMLDivElement;
	}

	get form(): HTMLFormElement {
		return this.getEl('form') as HTMLFormElement;
	}

	get input(): HTMLInputElement {
		return this.getEl('input') as HTMLInputElement;
	}

	get uploadTbl(): HTMLInputElement {
		return this.getEl('input.upload') as HTMLInputElement;
	}

	get canvasBesar(): HTMLCanvasElement {
		return this.getEl('canvas#gbr_besar') as HTMLCanvasElement;
	}

	get canvasThumb(): HTMLCanvasElement {
		return this.getEl('canvas#thumb') as HTMLCanvasElement;
	}

	get tutupTbl(): HTMLButtonElement {
		return this.getEl('button.tutup') as HTMLButtonElement;
	}

	public get selesai(): Function {
		return this._selesai;
	}

	public set selesai(value: Function) {
		this._selesai = value;
	}

	public get insertedId(): string {
		return this._insertedId;
	}

	public get gbrUrl(): string {
		return this._gbrUrl;
	}

	get fotoCont(): HTMLDivElement {
		return this.getEl('div.foto-cont') as HTMLDivElement;
	}

	get thumbCont(): HTMLDivElement {
		return this.getEl('div.thumb-cont') as HTMLDivElement;
	}

}