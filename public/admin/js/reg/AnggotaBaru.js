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
				<h1>Anggota Baru</h1>
				<form action="">
					<div class="form-group">
						<label for="user_name">User Name:</label>
						<input type="text" class="form-control user_name" name="user_name" id="user_name" required />
					</div>

					<div class="form-group">
						<label for="user_name">Lapak:</label>
						<input type="text" class="form-control lapak" name="lapak" id="lapak" required />
					</div>

					<div class="form-group">
						<label for="deskripsi">Deskripsi:</label>
						<textarea type="text" class="form-control deskripsi" name="dekripsi" id="dekripsi" required maxlength=100/></textarea>
					</div>

					<div class="form-group">
						<label for="password_anggota">Password 1:</label>
						<input type="password" class="form-control password_anggota" name="password_anggota" id="password_anggota" required />
					</div>

					<div class="form-group">
						<label for="password_anggota2">Password 2:</label>
						<input type="password" class="form-control password_anggota2" name="password_anggota2" id="password_anggota2" required />
					</div>

					<button type="submit" class="btn btn-primary submit">Simpan</button>
					<button type="button" class="btn btn-danger tutup">Tutup</button>
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
                    this.kotakGalat.innerHTML += "<p>Password tidak sama</p>";
                    return false;
                }
                this.daftar().then(() => {
                    dialog.tampil2('Terima kasih. Silahkan konfirmasi di group agar pendaftaran disetujui');
                    dialog.okTbl.onclick = () => {
                        // this._selesai();
                        window.top.location.href = '/';
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
            deskripsi: Util.escape(this.deskripsi.value)
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
