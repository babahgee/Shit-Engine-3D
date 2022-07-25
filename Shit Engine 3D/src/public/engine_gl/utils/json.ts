// ========= Interfaces =========


// ========= Functions =========
export async function LoadJSON(filePath: string) {

    return new Promise(function (resolve, reject) {

        const xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function (event: Event) {

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                    resolve(JSON.parse(xhr.responseText));

                } else {
                    reject("bruh");
                }
            }
        });

        xhr.open("GET", filePath);
        xhr.send(null);
    });

}