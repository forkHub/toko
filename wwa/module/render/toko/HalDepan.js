"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Util_1 = require("../../Util");
class HalDepan {
    render(daftarBarang, hal, jmlBarang) {
        return `
            <!DOCTYPE html>
            <html lang="id">
                <head>
                    <title>${Config_1.config.namaToko}</title>

                    <meta property="og:site_name" content="${Config_1.config.namaToko}">
                    <meta property="og:title" content="${Config_1.config.namaToko}" />
                    <meta property="og:description" content="${Config_1.config.deskripsiToko}" />
                    <meta name="description" content="${Config_1.config.deskripsiToko}" />
                    <meta property="og:image" itemprop="image" content="">
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="${Config_1.config.website}">
                    <meta property="og:updated_time" content="1440432930" />

                    <link rel='stylesheet' href="/css/css.css?r=${Util_1.util.randId}" />
                    <link rel='stylesheet' href="/css/item.css?r=${Util_1.util.randId}" />
                    <link rel='stylesheet' href="/css/hal-item.css?r=${Util_1.util.randId}" />
                    <link rel='stylesheet' href="/css/media.css?r=${Util_1.util.randId}" />

                    <script type="module" src="/js${Util_1.Util.revisi}/AppToko.js?r=${Util_1.util.randId}"></script>

                    <script type="nomodule">
                        document.body.querySelector('nomodule').setAttribute('style', 'display:block');
                    </script>

                </head> 
                <body>

                    <nomodule style='display:none'>
                        <h1>Maaf, sepertinya browser Anda tidak didukung oleh applikasi ini. Silahkan upgrade browser Anda.</h1>
                    </nomodule>

                    <div class='header header-cont'>
                        <h1 class='judul-toko'>${Config_1.config.namaToko}</h1>
                    </div>

                    <div class='cari-cont'>
                        <form class='cari'>
                            <input type='text' class='cari' name='cari' required placeholder="cari barang">
                            <input type='submit' value='🔍' placeholder="cari barang">
                        </form>
                    </div>
            
                    <div class='nav-cont flex'>
                        <div class='grow'>
                            <a href="/daftar_lapak"> DAFTAR LAPAK </a>
                        </div>
                        <div>
                            <a href="/auth/login"> LOGIN </a>
                        </div>
                    </div>

                    <hr />

                    <div class="daftar-barang-cont">
                        ${this.content(daftarBarang)}
                    </div>
                
                    <div class='halaman'>
                        <a href='/hal/0'> %lt;%lt; </a> 
                        <a href='/hal/${(hal > 0) ? hal - 1 : 0}'> %lt; </a> 
						<a href=''> ${hal + 1} </a> / 
                        <a href=''> ${jmlBarang} </a> 
						<a href='/hal/${hal < jmlBarang - 1 ? (hal + 1) : jmlBarang - 1}'> &gt; </a>
						<a href='/hal/${jmlBarang - 1}'> &gt;&gt; </a>
                    </div>

                </body>                  
            </html>`;
    }
    content(daftar) {
        if (daftar.length == 0) {
            return '';
        }
        else {
            let hasil = '';
            daftar.forEach((item) => {
                let itemHtml = `
				<div class='item'>
					<img class='kecil' src="/gambar/kosong.png" gbr='${(item.thumb != null) ? item.thumb : '/gambar/kosong.png'}'>
					<p class='nama-barang'><a href="{{url}}">${item.nama}</a></p>
					<p class='harga'>${item.harga}</p>
					<button class='chat' href="${Util_1.util.buatWa(item.wa, item.nama)}">
						<img src='/gambar/walogo3.png'>
					</button>
					<p class='wa'>${item.wa}</p>
					<p class='id'>${item.id}</p>
					<p class='lapak'>${item.lapak_id}</p>
				</div>`;
                hasil += itemHtml;
                // console.log(itemHtml);
            });
            return hasil;
        }
    }
}
exports.HalDepan = HalDepan;
exports.beranda = new HalDepan();
