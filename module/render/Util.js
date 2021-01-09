"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RenderUtil {
    renderNavBeranda(lapakId) {
        let url = "/";
        if (lapakId != '') {
            url = '/lapak/' + lapakId;
        }
        else {
            url = '/';
        }
        return `<a href="${url}">BERANDA</a>`;
    }
    renderNavDaftarLapak(lapakId) {
        let lapakUrl = "/lapak/daftar";
        if (lapakId != '') {
            lapakUrl = `/lapak/${lapakId}/daftar`;
        }
        return ` | <a href="${lapakUrl}">LAPAK</a>`;
    }
}
exports.RenderUtil = RenderUtil;
