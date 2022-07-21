import path from "path";
import url from "url";
import fs from "fs";

function loadShader(src: string): string {

	if (!fs.existsSync(src)) throw new Error(`The given file does not exist. Given path: ${src}`);

	const file: string = fs.readFileSync(src, {encoding: "utf-8"}) as string;

	return file;
}

export default { loadShader }