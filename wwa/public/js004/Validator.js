//TODO: final
class Validator {
    constructor() {
        this.ANGKA = 1;
        this.TEKS = 2;
        this.PASS = 3;
        this.KOSONG = 4;
        this.EMAIL = 5;
        this.ESC = 6;
        this.PANJANG_MAKS = 7;
        this.field_nama = '';
        this.field_panjang_min = '';
        this.field_panjang_max = '';
        this.PASS_ERR = 'Password mengandung karakter yang tidak diperbolehkan';
        this.PANJANG_MIN_ERR = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_min}`;
        this.PANJANG_MAX_ERR = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_max}`;
    }
    filter(data, tipe, nama, min = -1, max = 999999) {
        this.field_panjang_min = min + '';
        this.field_panjang_max = max + '';
        this.field_nama = nama;
        for (let i = 0; i < tipe.length; i++) {
            let n = tipe[i];
            if (this.KOSONG == n) {
                this.field_panjang_min = min + '';
                if (data.length < min)
                    throw Error(this.PANJANG_MIN_ERR);
            }
            if (this.PANJANG_MAKS == n) {
                if (data.length > max)
                    throw Error(this.PANJANG_MAX_ERR);
            }
        }
    }
    sanitize(data, tipe, nama) {
        for (let i = 0; i < tipe.length; i++) {
            let t = tipe[i];
            if (this.ANGKA == t) {
                data;
                nama;
            }
            //IF
        }
    }
}
export var v = new Validator();
