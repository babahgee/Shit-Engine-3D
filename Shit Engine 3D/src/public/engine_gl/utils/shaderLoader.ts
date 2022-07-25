import fs from "fs";
import path from "path";
import url from "url";

export function LoadShader(_path: string): string {

	const rootPath = path.join(__dirname, "../../../../", _path);

	if (!fs.existsSync(rootPath)) throw new Error(`Failed to load shader '${_path}' since it does not exist.`);

	if (fs.lstatSync(rootPath).isDirectory()) throw new Error(`The given path has been detected as a directory.`);

	return fs.readFileSync(rootPath, { encoding: "utf-8" });
}