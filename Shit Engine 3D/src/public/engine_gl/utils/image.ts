export async function LoadImage(src: string): Promise<HTMLImageElement> {

    return new Promise(function (resolve, reject) {

        const img = new Image();

        img.src = src;

        img.addEventListener("load", function () {
            resolve(img);
        });

        img.addEventListener("error", function (event: ErrorEvent) {
            reject(event); 
        });
    });

}