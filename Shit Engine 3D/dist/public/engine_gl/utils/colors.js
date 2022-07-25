"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
var Colors;
(function (Colors) {
    function RandomRGB() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }
    Colors.RandomRGB = RandomRGB;
})(Colors = exports.Colors || (exports.Colors = {}));
