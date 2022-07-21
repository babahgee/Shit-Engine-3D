window.addEventListener("gamepadconnected", function (event: GamepadEvent) {

	const gamePad: Gamepad = this.navigator.getGamepads()[event.gamepad.index] as Gamepad;

	console.log(gamePad);

});

console.log(true);

export class Controller {

}