"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Util_1 = require("../../Util");
class HalDaftarLapak {
    render(daftarLapak) {
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
                </head> 
                <body>
                    <div class='header header-cont'>
                        <h1 class='judul-toko'>${Config_1.config.namaToko}</h1>
                    </div>
            
                    <div class='nav-cont flex'>
                        <div class='grow'>
                            <a href="/"> HAL UTAMA </a>
                            <span> DAFTAR LAPAK </span>
                        </div>
                        <div>
                            <a href="/auth/login"> LOGIN </a>
                        </div>
                    </div>

                    <hr />

                    <div class="daftar-lapak-cont">
                        ${this.content(daftarLapak)}
                    </div>
                
                </body>                  
            </html>`.trimStart().trimEnd();
    }
    content(daftar) {
        if (daftar.length == 0) {
            return '<div>Belum ada data</div>';
        }
        else {
            let hasil = '';
            daftar.forEach((item) => {
                let itemHtml = `
				<div class='item-lapak ${item.lapak}'>
					<a href="/lapak/${item.id}">
						<p class='nama'>${item.lapak}</p>
						<p class='deskripsi'>${item.deskripsi}</p>
					</a>
					<hr/>
				</div>`.trimStart().trimRight();
                hasil += itemHtml;
            });
            return hasil;
        }
    }
}
exports.HalDaftarLapak = HalDaftarLapak;
exports.halLapak = new HalDaftarLapak();
