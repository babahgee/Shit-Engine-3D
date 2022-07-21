import { Easings } from "./easings";

export namespace Animations {

    export interface AnimationExecutionEvents {
        readonly end: Array<Function>;
    }

    export interface AnimationFunctionProperties {
        readonly On: Function
    }

    export function AnimateInteger(startPosition: number, endPosition: number, duration: number, animationName: Easings.EasingNames, callback: (easingValue: number) => void): AnimationFunctionProperties {

        // Define the current timestamp.
        const now: number = Date.now();

        // Define every possible events.
        const events: AnimationExecutionEvents = {
            end: [] // On-end events, starting with an empty array.
        };

        // Animation frame tick function.
        function tick() {

            // Calculate the elapsed time.
            const elapsedTime: number = Date.now() - now;

            // Calculate the easing value.
            const easingValue: number = Easings[animationName](elapsedTime, startPosition, endPosition, duration);

            // Call the callback function with the easing value.
            callback(easingValue);

            if (elapsedTime < duration) {

                // If the elapsed time is less than the duration, continue animating.
                window.requestAnimationFrame(tick);
            } else {

                // Process when the animation has ended.
                events.end.forEach(function (cb: Function) {
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
            On: function (event: keyof AnimationExecutionEvents, callback: (easingValue: number) => void): AnimationFunctionProperties {

                events[event].push(callback);

                return this;

            }
        }
    }

}