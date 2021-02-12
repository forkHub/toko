var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseComponent } from "../BaseComponent.js";
import { data } from "../Data.js";
import { dialog } from "../Dialog.js";
import { Util } from "../Util.js";
class AnggotaBaru extends BaseComponent {
    constructor() {
        console.log('anggota baru');
        super();
        this._template = `
			<div class='anggota-baru'>
				<div class='error'></div>
				<form action="">
					<div class="form-group">
						<label for="user_name">User Name (buat login):</label>
						<input type="text" class="form-control user_name" name="user_name" id="user_name" required />
					</div>

					<div class="form-group">
						<label for="user_name">Nama Lapak:</label>
						<input type="text" class="form-control lapak" name="lapak" id="lapak" required />
					</div>

					<div class="form-group">
						<label for="deskripsi">Deskripsi Lapak:</label>
						<textarea type="text" class="form-control deskripsi" name="dekripsi" id="dekripsi" required maxlength=100/></textarea>
					</div>

					<div class="form-group">
						<label for="alamat">Alamat (Alamat fisik toko/Alamat rumah):</label>
						<input type="text" class="form-control alamat" name="alamat" id="alamat" required maxlength=100/>
					</div>

					<div class="form-group">
						<label for="wa">No WA:</label>
						<input type="text" class="form-control wa" name="wa" id="wa" required maxlength=20 placeholder="62xxx"/>
					</div>


					<div class="form-group">
						<label for="password_anggota">Password 1:</label>
						<input type="password" class="form-control password_anggota" autocomplete name="password_anggota" id="password_anggota" required />
					</div>

					<div class="form-group">
						<label for="password_anggota2">Password 2:</label>
						<input type="password" class="form-control password_anggota2" autocomplete name="password_anggota2" id="password_anggota2" required />
					</div>

					<button type="submit" class="btn btn-primary submit">Simpan</button>
					<button type="button" class="btn btn-danger tutup">Batal</button>
				</form>		
			</div>
		`;
        this.build();
        window.onload = () => {
            console.log('window on load');
            this.init();
        };
    }
    init() {
        this.tutupTbl.onclick = () => {
            // this._batal();
            window.top.location.href = '/';
        };
        this.form.onsubmit = () => {
            this.kotakGalat.innerHTML = '';
            try {
                //validasi
                if (this.password.value != this.password2.value) {
                    //this.kotakGalat.innerHTML += "<p>Password tidak sama</p>";
                    dialog.tampil2('Password tidak sama');
                    return false;
                }
                //validasi wa
                if (this.wa.value.slice(0, 2) != '62') {
                    // this.kotakGalat.innerHTML += "";
                    dialog.tampil2('<p>No WA dimulai dengan 62</p>');
                    return false;
                }
                //validasi wa
                let reg = /[0-9]+/;
                let match = this.wa.value.match(reg);
                if (!match || match[0] != this.wa.value) {
                    // this.kotakGalat.innerHTML += "<p></p>";
                    dialog.tampil2('No WA tidak valid');
                    return false;
                }
                this.daftar().then(() => {
                    dialog.tampil2('Terima kasih. Pendaftaran akan diperiksa. Silahkan konfirmasi di group bila pendaftaran belum disetujui setelah 3 x 24 jam');
                    dialog.okTbl.onclick = () => {
                        window.top.location.reload();
                    };
                }).catch(() => {
                    dialog.tampil2(Util.resp.message);
                });
            }
            catch (e) {
                console.error(e);
                dialog.tampil2(e.message);
            }
            return false;
        };
        data.cont = document.body.querySelector('div.main-cont');
        this.attach(data.cont);
    }
    daftar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Util.Ajax("post", Util.urlAnggotaBaru, this.form2Obj());
        });
    }
    form2Obj() {
        let obj = {
            user_id: Util.escape(this.nama.value),
            password: md5(this.password.value),
            level: 'user',
            lapak: Util.escape(this.lapak.value),
            deskripsi: Util.escape(this.deskripsi.value),
            wa: this.wa.value,
            alamat: Util.escape(this.alamat.value)
        };
        return JSON.stringify(obj);
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get kotakGalat() {
        return this.getEl('div.error');
    }
    get form() {
        return this.getEl('form');
    }
    get nama() {
        return this.getEl('input.user_name');
    }
    get wa() {
        return this.getEl('input.wa');
    }
    get alamat() {
        return this.getEl('input.alamat');
    }
    get password() {
        return this.getEl('input.password_anggota');
    }
    get password2() {
        return this.getEl('input.password_anggota2');
    }
    get lapak() {
        return this.getEl('input.lapak');
    }
    get deskripsi() {
        return this.getEl('textarea.deskripsi');
    }
}
export var anggotaBaru = new AnggotaBaru();
