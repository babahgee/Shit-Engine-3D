"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomBetween = exports.GenerateUniqueID = exports.FormatTimeStamp = exports.CalculateAngle = exports.GetDistance = exports.GetAverageValueFromArray = exports.PolarDirection = exports.ParseMinMaxRandomizer = void 0;
function ParseMinMaxRandomizer(val) {
    if (typeof val === "number") {
        return val;
    }
    else {
        return Math.floor(Math.random() * (val.min - val.max + 1) + val.min);
    }
}
exports.ParseMinMaxRandomizer = ParseMinMaxRandomizer;
function PolarDirection(x1, y1, x2, y2) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const c = {
        main: a,
        directionX: Math.cos(a),
        directionY: Math.sin(a),
        normalize: function () {
            return {
                directionX: parseFloat(this.directionX.toFixed(2)),
                directionY: parseFloat(this.directionY.toFixed(2)),
            };
        },
        complete: function () {
            return {
                directionX: parseInt(this.directionX.toFixed(0)),
                directionY: parseInt(this.directionY.toFixed(0))
            };
        },
        addLength: function (len) {
            if (typeof len == "number") {
                return {
                    directionX: this.directionX * len,
                    directionY: this.directionY * len
                };
            }
            else {
                return this;
            }
        }
    };
    return c;
}
exports.PolarDirection = PolarDirection;
function GetAverageValueFromArray(array) {
    let sum = 0, i = 0;
    while (i < array.length) {
        sum += parseInt(array[i].toString(), 10);
        i += 1;
    }
    const avg = sum / array.length;
    return avg;
}
exports.GetAverageValueFromArray = GetAverageValueFromArray;
function GetDistance(x1, y1, x2, y2) {
    if (typeof x1 == "number" && typeof x2 == "number" && typeof y1 == "number" && typeof y2 == "number") {
        const d1 = x1 - x2;
        const d2 = y1 - y2;
        const distance = Math.sqrt(d1 * d1 + d2 * d2);
        return distance;
    }
    else {
        return 0;
    }
}
exports.GetDistance = GetDistance;
function CalculateAngle(cx, cy, ex, ey) {
    let dy = ey - cy, dx = ex - cx, theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0)
        theta = 360 + theta;
    return theta;
}
exports.CalculateAngle = CalculateAngle;
function FormatTimeStamp(time) {
    const hrs = ~~(time / 3600), mins = ~~((time % 3600) / 60), secs = ~~time % 60;
    let ret = "";
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
exports.FormatTimeStamp = FormatTimeStamp;
function GenerateUniqueID(len) {
    len = typeof len == "number" ? len : 12;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", generatedID = "";
    for (let i = 0; i < len; i++) {
        generatedID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return {
        id: generatedID,
        timestamp: Date.now(),
        length: len,
        filter: function (filterName) {
            let tempID = "";
            switch (filterName) {
                case "numbers":
                    tempID = "";
                    for (let i = 0; i < this.id.length; i++) {
                        const char = this.id.charAt(i);
                        // Try parsing the char into a number;
                        const num = parseFloat(char);
                        if (!isNaN(num))
                            tempID += num;
                    }
                    return tempID;
                    break;
                case "letters":
                    tempID = "";
                    for (let i = 0; i < this.id.length; i++) {
                        const char = this.id.charAt(i);
                        // Try parsing the char into a number;
                        const num = parseFloat(char);
                        if (isNaN(num))
                            tempID += char;
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
                        }
                        ;
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
                        }
                        ;
                    }
                    return tempID;
                    break;
                default:
                    throw new Error(`The given parameter '${filterName}' is not a recognized filter name for this method.`);
                    break;
            }
        }
    };
}
exports.GenerateUniqueID = GenerateUniqueID;
function RandomBetween(number1, number2) {
    if (typeof number1 == "number" && typeof number2 == "number") {
        let randomNumber = Math.floor(Math.random() * (number2 - number1 + 1) + number1);
        return randomNumber;
    }
    throw new Error("Cannot get a random number between two integers since arguments are not correct.");
}
exports.RandomBetween = RandomBetween;
