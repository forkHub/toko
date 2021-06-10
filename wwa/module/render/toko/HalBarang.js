"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Util_1 = require("../../Util");
class HalBarang {
    render(barang) {
        return `
            <!DOCTYPE html>
            <html lang="id">
                <head>
                    <title>${Config_1.config.namaToko} - ${barang.nama}</title>
                    <meta property="og:site_name" content="${Config_1.config.namaToko}">
                    <meta property="og:title" content="${barang.nama}" />
                    <meta property="og:description" content="${barang.deskripsi}" />
                    <meta name="description" content="${barang.deskripsi}" />
                    <meta property="og:image" itemprop="image" content="${barang.gbr}">
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="${Config_1.config.website}/barang/baca/id/${barang.id}">
                    <meta property="og:updated_time" content="1440432930" />

                    <link rel='stylesheet' href="/css/css.css?r=${Util_1.util.randId}" />
                    <link rel='stylesheet' href="/css/item.css?r=${Util_1.util.randId}" />
                    <link rel='stylesheet' href="/css/hal-item.css?r=${Util_1.util.randId}" />
                    <link rel='stylesheet' href="/css/media.css?r=${Util_1.util.randId}" />

					<script type="module" src="/js${Util_1.Util.revisi}/HalItem.js?r=${Util_1.util.randId}"></script>

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

                    <div class='nav-cont flex'>
                        <div class='grow'>
                            <a class='beranda' href="/"> BERANDA </a> | 
                            <a class='lapak' href="/lapak/${barang.lapak_id}"> LAPAK  </a> |
							<span>${barang.nama.toUpperCase}</span>
                        </div>

                        <div>
                            <a class='login' href="/auth/login"> LOGIN </a>
                        </div>
                    </div>

                    <hr />

                    <div class="detail-barang-cont">
						<div class='item-fokus'>
							<img class='besar' src="/gambar/kosong.png" gbr='${barang.gbr}'>
							
							<p class='nama-barang'>${barang.nama}</p>
							
							<div class='deskripsi-panjang'>
								${barang.deskripsi_panjang}
							</div>

							<p class='harga'>${barang.harga}</p>

							<a class='chat' href="${barang.wa}">
								BELI
							</a>
							
							<div class='data' id='${barang.id}'></div>
							
							<div class='barang-terkait-cont'></div>
						</div>
					</div>                
                </body>                  
            </html>`;
    }
}
exports.HalBarang = HalBarang;
exports.beranda = new HalBarang();
