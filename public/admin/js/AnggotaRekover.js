export class AnggotaRekover extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='rekover'>
			<div class='error'></div>
			<form action="">
				<div class="form-group">
					<label for="nama_anggota">Email:</label>
					<input type="email" class="form-control email" name="email" id="email" required />
				</div>

				<button type="submit" class="btn btn-primary submit">Simpan</button>
				<button type="button" class="btn btn-danger tutup">Tutup</button>
			</form>		
			</div>
		`;
    }
}
