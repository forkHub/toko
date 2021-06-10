import { Page2 } from "../Page.js";
import { Util } from "../Util.js";
let Page = {
    edit: () => {
        return Util.getEl(Page2.Penjual.profile.editTbl);
    },
    tutupTbl: () => {
        return Util.getEl(Page2.Penjual.profile.tutupTbl);
    }
};
window.onload = () => {
    Page.edit().onclick = () => {
        window.top.location.href = Util.getUrl(Util.urlPenjualGetEditProfile, [window.sessionStorage.getItem(Util.sLapakId)]);
    };
    Page.tutupTbl().onclick = () => {
        window.top.location.href = Util.getUrl(Util.urlPenjualBeranda, [window.sessionStorage.getItem(Util.sLapakId)]);
    };
};
