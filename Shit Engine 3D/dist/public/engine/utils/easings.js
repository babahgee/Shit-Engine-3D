"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Easings = void 0;
var Easings;
(function (Easings) {
    function easeInQuad(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
    }
    Easings.easeInQuad = easeInQuad;
    function easeOutQuad(elapsed, initialValue, amountOfChange, duration) {
        return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
    }
    Easings.easeOutQuad = easeOutQuad;
    function easeInOutQuad(elapsed, initialValue, amountOfChange, duration) {
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed + initialValue;
        }
        return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
    }
    Easings.easeInOutQuad = easeInOutQuad;
    function easeInCubic(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
    }
    Easings.easeInCubic = easeInCubic;
    function easeOutCubic(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
    }
    Easings.easeOutCubic = easeOutCubic;
    function easeInOutCubic(elapsed, initialValue, amountOfChange, duration) {
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
        }
        return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
    }
    Easings.easeInOutCubic = easeInOutCubic;
    function easeInQuart(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
    }
    Easings.easeInQuart = easeInQuart;
    function easeOutQuart(elapsed, initialValue, amountOfChange, duration) {
        return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
    }
    Easings.easeOutQuart = easeOutQuart;
    function easeInOutQuart(elapsed, initialValue, amountOfChange, duration) {
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
        }
        return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
    }
    Easings.easeInOutQuart = easeInOutQuart;
    function easeInQuint(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    Easings.easeInQuint = easeInQuint;
    function easeOutQuint(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
    }
    Easings.easeOutQuint = easeOutQuint;
    function easeInOutQuint(elapsed, initialValue, amountOfChange, duration) {
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
        }
        return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
    }
    Easings.easeInOutQuint = easeInOutQuint;
    function easeInSine(elapsed, initialValue, amountOfChange, duration) {
        return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
    }
    Easings.easeInSine = easeInSine;
    function easeOutSine(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
    }
    Easings.easeOutSine = easeOutSine;
    function easeInOutSine(elapsed, initialValue, amountOfChange, duration) {
        return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
    }
    Easings.easeInOutSine = easeInOutSine;
    function easeInExpo(elapsed, initialValue, amountOfChange, duration) {
        return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
    }
    Easings.easeInExpo = easeInExpo;
    function easeOutExpo(elapsed, initialValue, amountOfChange, duration) {
        return elapsed === duration
            ? initialValue + amountOfChange
            : amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
    }
    Easings.easeOutExpo = easeOutExpo;
    function easeInOutExpo(elapsed, initialValue, amountOfChange, duration) {
        if (elapsed === 0) {
            return initialValue;
        }
        if (elapsed === duration) {
            return initialValue + amountOfChange;
        }
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
        }
        return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
    }
    Easings.easeInOutExpo = easeInOutExpo;
    function easeInCirc(elapsed, initialValue, amountOfChange, duration) {
        return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
    }
    Easings.easeInCirc = easeInCirc;
    function easeOutCirc(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
    }
    Easings.easeOutCirc = easeOutCirc;
    function easeInOutCirc(elapsed, initialValue, amountOfChange, duration) {
        if ((elapsed /= duration / 2) < 1) {
            return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
        }
        return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
    }
    Easings.easeInOutCirc = easeInOutCirc;
    function easeInElastic(elapsed, initialValue, amountOfChange, duration) {
        let s = 1.70158;
        let p = 0;
        let a = amountOfChange;
        if (elapsed === 0) {
            return initialValue;
        }
        if ((elapsed /= duration) === 1) {
            return initialValue + amountOfChange;
        }
        if (!p) {
            p = duration * 0.3;
        }
        if (a < Math.abs(amountOfChange)) {
            a = amountOfChange;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        }
        return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
    }
    Easings.easeInElastic = easeInElastic;
    function easeOutElastic(elapsed, initialValue, amountOfChange, duration) {
        let s = 1.70158;
        let p = 0;
        let a = amountOfChange;
        if (elapsed === 0) {
            return initialValue;
        }
        if ((elapsed /= duration) === 1) {
            return initialValue + amountOfChange;
        }
        if (!p) {
            p = duration * 0.3;
        }
        if (a < Math.abs(amountOfChange)) {
            a = amountOfChange;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        }
        return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
    }
    Easings.easeOutElastic = easeOutElastic;
    function easeInOutElastic(elapsed, initialValue, amountOfChange, duration) {
        let s = 1.70158;
        let p = 0;
        let a = amountOfChange;
        if (elapsed === 0) {
            return initialValue;
        }
        if ((elapsed /= duration / 2) === 2) {
            return initialValue + amountOfChange;
        }
        if (!p) {
            p = duration * (0.3 * 1.5);
        }
        if (a < Math.abs(amountOfChange)) {
            a = amountOfChange;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        }
        if (elapsed < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
        }
        return (a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue);
    }
    Easings.easeInOutElastic = easeInOutElastic;
    function easeInBack(elapsed, initialValue, amountOfChange, duration, s = 1.70158) {
        return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
    }
    Easings.easeInBack = easeInBack;
    function easeOutBack(elapsed, initialValue, amountOfChange, duration, s = 1.70158) {
        return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
    }
    Easings.easeOutBack = easeOutBack;
    function easeInOutBack(elapsed, initialValue, amountOfChange, duration, s = 1.70158) {
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
        }
        return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
    }
    Easings.easeInOutBack = easeInOutBack;
    function easeInBounce(elapsed, initialValue, amountOfChange, duration) {
        return amountOfChange - easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
    }
    Easings.easeInBounce = easeInBounce;
    function easeOutBounce(elapsed, initialValue, amountOfChange, duration) {
        if ((elapsed /= duration) < 1 / 2.75) {
            return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
        }
        else if (elapsed < 2 / 2.75) {
            return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
        }
        else if (elapsed < 2.5 / 2.75) {
            return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
        }
        else {
            return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
        }
    }
    Easings.easeOutBounce = easeOutBounce;
    function easeInOutBounce(elapsed, initialValue, amountOfChange, duration) {
        if (elapsed < duration / 2) {
            return easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 + initialValue;
        }
        return easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 + amountOfChange * 0.5 + initialValue;
    }
    Easings.easeInOutBounce = easeInOutBounce;
})(Easings = exports.Easings || (exports.Easings = {}));
