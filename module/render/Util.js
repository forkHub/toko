"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
class RenderUtil {
    renderNavTokoUtama(lapakId) {
        if (lapakId != '') {
            return `<a href="/">HAL DEPAN </a> | `;
        }
        else {
            return '';
        }
    }
    renderNavBeranda(lapakId) {
        let url = "/";
        if (lapakId != '') {
            url = '/lapak/' + lapakId;
        }
        else {
            url = '/';
        }
        return `<a href="${url}">BERANDA</a> `;
    }
    renderNavDaftarLapak(lapakId) {
        let lapakUrl = "/lapak/daftar";
        if (lapakId != '') {
            lapakUrl = `/lapak/${lapakId}/daftar`;
        }
        return `<a href="${lapakUrl}">DAFTAR LAPAK</a> `;
    }
    async renderInfoLapak(index, lapakNama, lapakDeskripsi) {
        let infoLapak = await Util_1.util.getFile('view/info_lapak_comp.html');
        infoLapak = infoLapak.replace('{{nama-lapak}}', lapakNama);
        infoLapak = infoLapak.replace('{{deskripsi-lapak}}', lapakDeskripsi);
        index = index.replace("{{info-lapak}}", infoLapak);
        return index;
    }
    cache(index, rand) {
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        index = index.replace("{{cache}}", rand);
        return index;
    }
}
exports.RenderUtil = RenderUtil;
