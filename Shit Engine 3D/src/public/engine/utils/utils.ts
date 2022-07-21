export interface PolarDirectionalValues {
    readonly directionX: number;
    readonly directionY: number
}

export interface IPolarDirection {
    readonly main: number;
    readonly directionX: number;
    readonly directionY: number;

    normalize: () => PolarDirectionalValues;
    complete: () => PolarDirectionalValues;
    addLength: (len: number) => PolarDirectionalValues;
}

export interface MinMaxRandomizer {
    min: number;
    max: number;
    ideal?: number;
}

export interface Vector2 {
    x: number;
    y: number;
}


export function ParseMinMaxRandomizer(val: MinMaxRandomizer | number): number {

    if (typeof val === "number") {

        return val;

    } else {

        return Math.floor(Math.random() * (val.min - val.max + 1) + val.min);

    }

}

export function PolarDirection(x1: number, y1: number, x2: number, y2: number): IPolarDirection {

    const a = Math.atan2(y2 - y1, x2 - x1);

    const c: IPolarDirection = {
        main: a,
        directionX: Math.cos(a),
        directionY: Math.sin(a),
        normalize: function () {
            return {
                directionX: parseFloat(this.directionX.toFixed(2)),
                directionY: parseFloat(this.directionY.toFixed(2)),
            }
        },
        complete: function () {
            return {
                directionX: parseInt(this.directionX.toFixed(0)),
                directionY: parseInt(this.directionY.toFixed(0))
            }
        },
        addLength: function (len: number) {

            if (typeof len == "number") {
                return {
                    directionX: this.directionX * len,
                    directionY: this.directionY * len
                }
            } else {
                return this;
            }

        }
    }


    return c;
}

export function GetAverageValueFromArray(array: Array<number>): number {

    let sum = 0,
        i = 0;

    while (i < array.length) {

        sum += parseInt(array[i].toString(), 10);

        i += 1;
    }

    const avg: number = sum / array.length;

    return avg;
}

export function GetDistance(x1: number, y1: number, x2: number, y2: number): number {
    if (typeof x1 == "number" && typeof x2 == "number" && typeof y1 == "number" && typeof y2 == "number") {


        const d1: number = x1 - x2;
        const d2: number = y1 - y2;

        const distance: number = Math.sqrt(d1 * d1 + d2 * d2);


        return distance;

    } else {
        return 0;
    }
}

export function CalculateAngle(cx: number, cy: number, ex: number, ey: number): number {

    let dy: number = ey - cy,
        dx: number = ex - cx,
        theta: number = Math.atan2(dy, dx);

    theta *= 180 / Math.PI;

    if (theta < 0) theta = 360 + theta;

    return theta;
}

export function FormatTimeStamp(time: number) {

    const hrs = ~~(time / 3600),
        mins = ~~((time % 3600) / 60),
        secs = ~~time % 60;

    let ret: string = "";


    if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}

export function GenerateUniqueID(len: number) {

    len = typeof len == "number" ? len : 12;

    let chars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        generatedID: string = "";

    for (let i = 0; i < len; i++) {

        generatedID += chars.charAt(Math.floor(Math.random() * chars.length));

    }

    return {
        id: generatedID,
        timestamp: Date.now(),
        length: len,
        filter: function (filterName: ("numbers" | "letters" | "lettersUpperCase" | "lettersLowerCase")): string {

            let tempID: string = "";

            switch (filterName) {
                case "numbers":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char: string = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (!isNaN(num)) tempID += num;

                    }

                    return tempID;

                    break;
                case "letters":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (isNaN(num)) tempID += char;

                    }

                    return tempID;

                    break;
                case "lettersLowerCase":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (isNaN(num) && char == char.toLowerCase()) {
                            tempID += char;
                        };

                    }

                    return tempID;

                    break;
                case "lettersUpperCase":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (isNaN(num) && char == char.toUpperCase()) {
                            tempID += char;
                        };

                    }

                    return tempID;

                    break;
                default:

                    throw new Error(`The given parameter '${filterName}' is not a recognized filter name for this method.`);

                    break;
            }

        }
    }
}

export function RandomBetween(number1: number, number2: number): number {

    if (typeof number1 == "number" && typeof number2 == "number") {
        let randomNumber: number = Math.floor(Math.random() * (number2 - number1 + 1) + number1);

        return randomNumber;
    }

    throw new Error("Cannot get a random number between two integers since arguments are not correct.");
}