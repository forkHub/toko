//SHARE
//toko
export var Page2;
(function (Page2) {
    Page2.toko = {
        beranda: {
            daftarLapak: `div.nav-cont a[href="/daftar_lapak"]`,
            login: `div.nav-cont a[href="/auth/login"]`,
            barangPertama: `div.daftar-barang-cont div.item:nth-child(1)`
        },
        daftarLapak: {
            beranda: `div.nav-cont a[href="/"]`,
            itemPertama: `div.daftar-lapak-cont div.item-lapak:nth-child(1) a`,
            itemMobil: 'div.daftar-lapak-cont div.item-lapak.mobilio a',
            itemTest: 'div.daftar-lapak-cont div.item-lapak.test a',
            login: `div.nav-cont a[href="/auth/login"]`,
        },
        lapak: {
            beranda: 'div.nav-cont a[href="/"]',
            login: `div.nav-cont a[href="/auth/login"]`
        },
        barang: {
            beranda: 'div.nav-cont a[href="/"]',
            lapak: 'div.nav-cont a.lapak',
            login: `div.nav-cont a[href="/auth/login"]`
        }
    };
})(Page2 || (Page2 = {}));
//auth
(function (Page2) {
    Page2.auth = {
        daftar: {
            form: 'form',
            userId: 'input.user_id',
            lapak: 'input.lapak',
            deskripsi: 'input.deskripsi',
            alamat: 'input.alamat',
            email: 'input.email',
            wa: 'input.wa',
            password1: 'input.password1',
            password2: 'input.password2'
        },
        gantiPassword: {
            form: 'form',
            pass1: 'form input.password1',
            pass2: 'form input.password2'
        },
        login: {
            form: 'form',
            userName: 'input.user-name',
            password: 'input.password',
            lupa: 'button.lupa',
            submit: 'button.submit',
            daftar: 'button.daftar'
        },
        lupa: {
            email: 'input.email',
            form: 'form'
        }
    };
})(Page2 || (Page2 = {}));
//penjual
(function (Page2) {
    Page2.Penjual = {
        barangBaru: {
            form: 'form',
            namaInput: 'form input#nama-barang',
            deskripsiInput: 'form input#deskripsi-barang',
            deskripsiPanjangInput: 'form textarea#deskripsi-barang-panjang',
            publishStatus: 'form input.publish',
            wa: 'form input#wa',
            submitTbl: 'button.submit',
            draftTbl: 'button.draft',
            fotoCont: 'div.foto-cont',
            editFotoTbl: 'button.edit-foto',
            gambarHtml: 'img.foto',
            tutupTbl: 'button.tutup',
            hargaBarangInput: 'form input#harga-barang',
        },
        editBarang: {
            form: 'form',
            namaInput: 'form input#nama-barang',
            deskripsiInput: 'form input#deskripsi-barang',
            deskripsiPanjangInput: 'form textarea#deskripsi-barang-panjang',
            publishStatus: 'form input.publish',
            wa: 'form input#wa',
            submitTbl: 'button.submit',
            draftTbl: 'button.draft',
            fotoCont: 'div.foto-cont',
            editFotoTbl: 'button.edit-foto',
            hapusFotoTbl: 'button.hapus-foto',
            gambarHtml: 'img.foto',
            tutupTbl: 'button.tutup',
            hargaBarangInput: 'form input#harga-barang',
            id: 'form input.id',
            fileId: 'form input.file_id'
        },
        editProfile: {
            form: 'form',
            lapak: 'input.lapak',
            deskripsi: 'input.deskripsi',
            wa: 'input.wa',
            alamat: 'input.alamat',
            email: 'input.email',
            nav: {
                berandaLink: 'nav.menu a.beranda',
                profileLink: 'nav.menu a.profile'
            },
            kirimTbl: 'form btn.submit',
            tutupTbl: 'form btn.batal'
        },
        beranda: {
            menuTbl: 'button.menu',
            tambahTbl: 'button.tambah',
            cont: 'div.cont',
            lihatTbl: 'button.lihat',
            barangPertama: {
                id: 'div.item-barang:nth-child(1) div.id',
                editTbl: 'div.item-barang:nth-child(1) button.edit',
                hapusTbl: 'div.item-barang:nth-child(1) button.hapus',
                shareTbl: 'div.item-barang:nth-child(1) a.share',
                gbr: 'div.item-barang:nth-child(1) img',
                namaP: 'div.item-barang:nth-child1) div.deskripsi p.nama'
            },
            menu: {
                profile: 'menu-popup btn.profile',
                logout: 'menu-popup btn.logout',
                share: 'menu-popup btn.share-lapak'
            }
        },
        profile: {
            editTbl: 'button.edit',
            tutupTbl: 'button.tutup',
            berandaLink: 'nav.menu a.beranda'
        },
        upload: {
            listCont: 'div.foto-page div.list-cont',
            form: 'div.foto-page form',
            input: 'div.foto-page input',
            uploadTbl: 'div.foto-page input.upload',
            canvasBesar: 'div.foto-page canvas#gbr_besar',
            canvasThumb: 'div.foto-page canvas#thumb',
            tutupTbl: 'div.foto-page button.tutup',
            fotoCont: 'div.foto-page div.foto-cont',
            thumbCont: 'div.foto-page div.thumb-cont'
        },
        foto: {
            tutup: 'button.tutup'
        }
    };
})(Page2 || (Page2 = {}));
