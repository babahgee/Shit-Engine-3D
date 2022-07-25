export namespace Colors {

	export function RandomRGB() {

		const r: number = Math.floor(Math.random() * 255);
		const g: number = Math.floor(Math.random() * 255);
		const b: number = Math.floor(Math.random() * 255);

		return `rgb(${r}, ${g}, ${b})`;
	}

}