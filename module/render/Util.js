"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
