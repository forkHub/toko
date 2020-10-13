"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AnggotaDaftarBaru extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='anggota-baru'>
				<div class='error'></div>
				<form action="">
					<div class="form-group">
						<label for="nama_anggota">Nama:</label>
						<input type="text" class="form-control nama_anggota" name="nama_anggota" id="nama_barang" required />
					</div>

					<div class="form-group">
						<label for="email_anggota">Email:</label>
						<input type="email" class="form-control email_anggota" name="email_anggota" id="email_anggota" required />
					</div>

					<div class="form-group">
						<label for="password_anggota">Password 1:</label>
						<input type="password" class="form-control password_anggota" name="password_anggota" id="password_anggota" required />
					</div>

					<div class="form-group">
						<label for="password_anggota2">Password 2:</label>
						<input type="password" class="form-control password_anggota" name="password_anggota2" id="password_anggota2" required />
					</div>

					<button type="submit" class="btn btn-primary submit">Simpan</button>
					<button type="button" class="btn btn-danger tutup">Tutup</button>
				</form>		
			</div>
		`;
        this.build();
    }
    set selesai(value) {
        this._selesai = value;
    }
    set batal(value) {
        this._batal = value;
    }
    init() {
        this.tutupTbl.onclick = () => {
            this._batal();
        };
        this.form.onsubmit = () => {
            this.kotakGalat.innerHTML = '';
            try {
                //validasi
                if (this.password.value != this.password2.value) {
                    this.kotakGalat.innerHTML += "<p>Password tidak sama</p>";
                    return false;
                }
                //TODO: validasi tambahan
                this.daftar().then(() => {
                    this._selesai();
                }).catch(() => {
                    App.dialog.tampil2(Util.resp.message);
                });
            }
            catch (e) {
                console.error(e);
            }
            return false;
        };
    }
    daftar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Util.Ajax("post", Util.urlAnggotaBaru, this.form2Obj());
            yield Util.Login(this.nama.value, this.password.value);
        });
    }
    form2Obj() {
        let obj = {
            nama: this.nama.value,
            password: this.password.value,
            email: this.email.value
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
        return this.getEl('input.nama_anggota');
    }
    get password() {
        return this.getEl('input.password_anggota');
    }
    get password2() {
        return this.getEl('input.password_anggota2');
    }
    get email() {
        return this.getEl('input.email_anggota');
    }
}
