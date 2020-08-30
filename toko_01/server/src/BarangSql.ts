import { Connection } from "./db/Connection";
import { rejects } from "assert";

class BarangSql {

	private bacaBarangPulish: string = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id
											WHERE BARANG.publish = 1;`;

	private bacaBarangSemua: string = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id`;

	private query(query: string, resolve: any, reject: any): void {
		Connection.connection.query(
			query, (_err, _rows) => {
				if (_err) {
					reject(_err.message);
				}
				else {
					resolve(_rows);
				}
			});
	}

	private async queryBaca(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.query(query, resolve, reject);
			} catch (err) {
				rejects(err.message)
			}
		})
	}

	async bacaSemua(): Promise<any> {
		return this.queryBaca(this.bacaBarangSemua);
	}

	async bacaPublish(): Promise<any> {
		return this.queryBaca(this.bacaBarangPulish);
	}

}

export var barangSql: BarangSql = new BarangSql();