import fs from "fs";
import { barangSql } from "../BarangSql";
import { BarangObj } from "../BarangObj";

export class Renderer {
	static getFile(file: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.readFile(file, (err: NodeJS.ErrnoException, content) => {
				if (err) {
					reject(err.message);
				}
				else {
					resolve(content.toString());
				}
			})

		});
	}

	static replaceAll(teksSumber: string, kataKunci: string, pengganti: string): string {
		let hasil: string;

		while (true) {
			hasil = teksSumber.replace(kataKunci, pengganti);

			if (hasil == teksSumber) {
				return hasil;
			}
			else {
				teksSumber = hasil;
			}
		}
	}

	static async renderItem(): Promise<string> {
		let view: string = await Renderer.getFile("view/item.html");
		let barangData: any[] = await barangSql.bacaPublish();
		let hasil: string = '';

		barangData.forEach((item: BarangObj) => {
			console.log(item.thumb);
			console.log(item.gbr);

			let hasil2: string = '';
			hasil2 = (view.replace("{{nama}}", item.nama));
			hasil2 = (hasil2.replace("{{deskripsi}}", item.deskripsi));
			hasil2 = (hasil2.replace("{{deskripsiPanjang}}", item.deskripsi_panjang));
			hasil2 = (hasil2.replace("{{harga}}", item.harga + ''));
			hasil2 = hasil2.replace("{{wa}}", item.wa)
			hasil2 = hasil2.replace("{{wa-link}}", 'https://wa.me/' + item.wa + "?text=Assalamualaikum")
			hasil2 = hasil2.replace("{{gbrThumb}}", item.thumb);
			hasil2 = hasil2.replace("{{gbrBesar}}", item.gbr);
			hasil += hasil2;
		});

		return hasil;
	}

	static async renderHtml(): Promise<string> {
		let view: string = await Renderer.getFile("view/index.html");
		let hasil: string = await Renderer.renderItem();

		hasil = view.replace("{{content}}", hasil);
		return hasil;
	}

	static async writeHtml(path: string, data: string): Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, (err) => {
				if (err) {
					reject(err.message);
				}
				else {
					resolve();
				}
			})
		});
	}
}