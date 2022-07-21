"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animations = void 0;
const easings_1 = require("./easings");
var Animations;
(function (Animations) {
    function AnimateInteger(startPosition, endPosition, duration, animationName, callback) {
        // Define the current timestamp.
        const now = Date.now();
        // Define every possible events.
        const events = {
            end: [] // On-end events, starting with an empty array.
        };
        // Animation frame tick function.
        function tick() {
            // Calculate the elapsed time.
            const elapsedTime = Date.now() - now;
            // Calculate the easing value.
            const easingValue = easings_1.Easings[animationName](elapsedTime, startPosition, endPosition, duration);
            // Call the callback function with the easing value.
            callback(easingValue);
            if (elapsedTime < duration) {
                // If the elapsed time is less than the duration, continue animating.
                window.requestAnimationFrame(tick);
            }
            else {
                // Process when the animation has ended.
                events.end.forEach(function (cb) {
                    cb(easingValue);
                });
            }
        }
        // Call the tick function on request for the animation frame.
        window.requestAnimationFrame(tick);
        // Return an object with methods.
        return {
            /**
             * Sets an event listener on the animator.
             * @param event
             * @param callback
             */
            On: function (event, callback) {
                events[event].push(callback);
                return this;
            }
        };
    }
    Animations.AnimateInteger = AnimateInteger;
})(Animations = exports.Animations || (exports.Animations = {}));
