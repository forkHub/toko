"use strict";
window.onload = () => {
    let img = document.body.querySelector("div.item-fokus img.besar");
    img.onerror = () => {
        console.log('error');
        img.src = "/gambar/kosong.png";
        img.onerror = null;
        img.onload = null;
        img.style.height = '512px';
        img.style.minHeight = '512px';
    };
    img.onload = () => {
        img.style.minHeight = 'initial';
        img.style.height = 'initial';
    };
    img.src = img.getAttribute('gbr');
};
