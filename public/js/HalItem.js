"use strict";
window.onload = function () {
    var img = document.body.querySelector("div.item-fokus img.besar");
    img.onerror = function () {
        console.log('error');
        img.src = "/gambar/kosong.png";
        img.onerror = null;
        img.style.minHeight = '500px';
    };
    img.src = img.getAttribute('gbr');
};
