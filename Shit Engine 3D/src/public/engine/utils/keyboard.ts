// =============== Interfaces and types ===============

interface CommonQWERTYControlKeys {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
    space: boolean;
    setState: Function;
}

interface IEventListeners {
    keyDown: Array<Function>;
    keyUp: Array<Function>;
    keyPress: Array<Function>;
}

type KeyboardEventNames = "keyDown" | "keyUp" | "keyPress";

// =============== Exportable variables ===============

export const QWERTYControlKeys: CommonQWERTYControlKeys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    setState(bool: boolean) {

        this.w = bool;
        this.a = bool;
        this.s = bool;
        this.d = bool;
        this.space = bool;

    }
}

export const EventListeners: IEventListeners = {
    keyDown: [],
    keyUp: [],
    keyPress: []
};



// =============== Main namespace ===============
export namespace Keyboard {


    export function On(event: KeyboardEventNames, callback: Function): boolean {

        EventListeners[event].push(callback);

        return true;
    }

}


// =============== Private functions ===============

window.addEventListener("keydown", function (event: KeyboardEvent) {

    switch (event.keyCode) {

        case 87:
            QWERTYControlKeys.w = true;
            break;
        case 65:
            QWERTYControlKeys.a = true;
            break;
        case 83:
            QWERTYControlKeys.s = true;
            break;
        case 68:
            QWERTYControlKeys.d = true;
            break;
        case 32:
            QWERTYControlKeys.space = true;
            break;
    }

    EventListeners.keyDown.forEach(cb => cb(event));

});

window.addEventListener("keyup", function (event: KeyboardEvent) {

    switch (event.keyCode) {

        case 87:
            QWERTYControlKeys.w = false;
            break;
        case 65:
            QWERTYControlKeys.a = false;
            break;
        case 83:
            QWERTYControlKeys.s = false;
            break;
        case 68:
            QWERTYControlKeys.d = false;
            break;
        case 32:
            QWERTYControlKeys.space = false;
            break;
    }

    EventListeners.keyUp.forEach(cb => cb(event));
});

window.addEventListener("blur", function (event: FocusEvent) {
    QWERTYControlKeys.setState(false);
});