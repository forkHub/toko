class BarangObj implements IBarangDBO {
	private _nama: string;
	private _deskripsi_panjang: string;
	private _harga: string;
	private _gbr: string;
	private _thumb: string;
	private _wa: string;
	private _id: string;
	private _file_id: string;
	private _publish: number;

	public get publish(): number {
		return this._publish;
	}
	public set publish(value: number) {
		this._publish = value;
	}

	public get file_id(): string {
		return this._file_id;
	}
	public set file_id(value: string) {
		this._file_id = value;
	}

	public get id(): string {
		return this._id;
	}
	public set id(value: string) {
		this._id = value;
	}

	public get wa(): string {
		return this._wa;
	}
	public set wa(value: string) {
		this._wa = value;
	}

	public get thumb(): string {
		return this._thumb;
	}
	public set thumb(value: string) {
		this._thumb = value;
	}
	public get gbr(): string {
		return this._gbr;
	}
	public set gbr(value: string) {
		this._gbr = value;
	}

	public get nama(): string {
		return this._nama;
	}
	public set nama(value: string) {
		this._nama = value;
	}

	public get deskripsi_panjang(): string {
		return this._deskripsi_panjang;
	}
	public set deskripsi_panjang(value: string) {
		this._deskripsi_panjang = value;
	}
	public get harga(): string {
		return this._harga;
	}
	public set harga(value: string) {
		this._harga = value;
	}


}

interface IBarangDBO {
	id: string;
	nama: string;
	deskripsi_panjang: string;
	harga: string;
	wa: string;
	file_id: string;
	publish: number;
}

class BarangController {

	static responseToObj(data: BarangObj): BarangObj {
		let postObj: BarangObj = new BarangObj();

		// postObj.deskripsi = data.deskripsi;
		postObj.deskripsi_panjang = data.deskripsi_panjang;
		postObj.file_id = data.file_id;
		postObj.gbr = data.gbr;
		postObj.harga = data.harga;
		postObj.id = data.id;
		postObj.nama = data.nama;
		postObj.thumb = data.thumb;
		postObj.wa = data.wa;
		postObj.publish = data.publish;

		return postObj;
	}

	// static toObj(obj: BarangObj): IBarangDBO {
	// 	return {
	// 		// deskripsi: obj.deskripsi,
	// 		deskripsi_panjang: obj.deskripsi_panjang,
	// 		harga: obj.harga,
	// 		id: obj.id,
	// 		nama: obj.nama,
	// 		wa: obj.wa,
	// 		file_id: obj.file_id
	// 	}
	// }
}