"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
window.addEventListener("gamepadconnected", function (event) {
    const gamePad = this.navigator.getGamepads()[event.gamepad.index];
    console.log(gamePad);
});
console.log(true);
class Controller {
}
exports.Controller = Controller;
