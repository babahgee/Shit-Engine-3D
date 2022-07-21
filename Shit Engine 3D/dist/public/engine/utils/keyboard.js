"use strict";
// =============== Interfaces and types ===============
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = exports.EventListeners = exports.QWERTYControlKeys = void 0;
// =============== Exportable variables ===============
exports.QWERTYControlKeys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    setState(bool) {
        this.w = bool;
        this.a = bool;
        this.s = bool;
        this.d = bool;
        this.space = bool;
    }
};
exports.EventListeners = {
    keyDown: [],
    keyUp: [],
    keyPress: []
};
// =============== Main namespace ===============
var Keyboard;
(function (Keyboard) {
    function On(event, callback) {
        exports.EventListeners[event].push(callback);
        return true;
    }
    Keyboard.On = On;
})(Keyboard = exports.Keyboard || (exports.Keyboard = {}));
// =============== Private functions ===============
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 87:
            exports.QWERTYControlKeys.w = true;
            break;
        case 65:
            exports.QWERTYControlKeys.a = true;
            break;
        case 83:
            exports.QWERTYControlKeys.s = true;
            break;
        case 68:
            exports.QWERTYControlKeys.d = true;
            break;
        case 32:
            exports.QWERTYControlKeys.space = true;
            break;
    }
    exports.EventListeners.keyDown.forEach(cb => cb(event));
});
window.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 87:
            exports.QWERTYControlKeys.w = false;
            break;
        case 65:
            exports.QWERTYControlKeys.a = false;
            break;
        case 83:
            exports.QWERTYControlKeys.s = false;
            break;
        case 68:
            exports.QWERTYControlKeys.d = false;
            break;
        case 32:
            exports.QWERTYControlKeys.space = false;
            break;
    }
    exports.EventListeners.keyUp.forEach(cb => cb(event));
});
window.addEventListener("blur", function (event) {
    exports.QWERTYControlKeys.setState(false);
});
