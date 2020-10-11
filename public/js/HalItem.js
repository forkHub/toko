"use strict";
window.onload = () => {
    let img = document.body.querySelector("div.item-fokus img.besar");
    img.onerror = () => {
        console.log('error');
        img.src = "/gambar/kosong.png";
        img.onerror = null;
        img.style.minHeight = '500px';
    };
    img.src = img.getAttribute('gbr');
    document.body.querySelector('div.daftar-barang-cont').style.visibility = 'visible';
};
