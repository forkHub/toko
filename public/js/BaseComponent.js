"use strict";
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        this._template = '';
        this._elHtml = document.createElement('div');
    }
    BaseComponent.prototype.onRender = function () {
    };
    BaseComponent.prototype.onAttach = function () {
    };
    BaseComponent.prototype.onBuild = function () {
    };
    BaseComponent.prototype.onDetach = function () {
    };
    BaseComponent.prototype.mulai = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        params;
    };
    BaseComponent.prototype.selesai = function () {
    };
    BaseComponent.prototype.destroy = function () {
    };
    BaseComponent.prototype.attach = function (parent) {
        parent.appendChild(this._elHtml);
        this._parent = parent;
        this.onAttach();
    };
    BaseComponent.prototype.detach = function () {
        if (this._elHtml.parentElement) {
            this._elHtml.parentElement.removeChild(this._elHtml);
            this.onDetach();
            return true;
        }
        this.onDetach();
        return false;
    };
    BaseComponent.prototype.show = function (el) {
        if (!el) {
            el = this._elHtml;
        }
        el.style.display = 'block';
    };
    BaseComponent.prototype.hide = function (el) {
        if (!el) {
            el = this._elHtml;
        }
        el.style.display = 'none';
    };
    BaseComponent.prototype.getEl = function (query) {
        var el;
        el = this._elHtml.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(this._elHtml);
            console.log(query);
            throw new Error('query not found ');
        }
    };
    BaseComponent.prototype.build = function () {
        var div = document.createElement('div');
        var el;
        div.innerHTML = this._template;
        el = div.firstElementChild;
        this._elHtml = el;
        if (!this._elHtml)
            throw new Error('');
        this.onBuild();
    };
    BaseComponent.prototype.getTemplate = function (query) {
        var template = document.body.querySelector('template').content;
        return template.querySelector(query).cloneNode(true);
    };
    BaseComponent.prototype.getElFromDoc = function (query) {
        var el;
        el = document.querySelector(query);
        if (!el)
            throw new Error();
        return el;
    };
    Object.defineProperty(BaseComponent.prototype, "elHtml", {
        get: function () {
            return this._elHtml;
        },
        enumerable: true,
        configurable: true
    });
    return BaseComponent;
}());
