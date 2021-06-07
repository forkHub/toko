import { Util } from "../Util.js";
let Page = {
    edit: () => {
        return Util.getEl('button.edit');
    }
};
window.onload = () => {
    Page.edit().onclick = () => {
        window.top.location.href = Util.getUrl(Util.urlPenjualGetEditProfile, [window.sessionStorage.getItem(Util.sLapakId)]);
    };
};
