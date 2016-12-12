/**
 * Created by Saco at 2016/12/ 1
 **/
class Keyboard {
    public static KeyUpEvent: string = "keyupevent";
    public static KeyDownEvent: string = "keydownevent";
    public static KEY_BACKSPACE = 8;
    public static KEY_TAB = 9;
    public static KEY_CLEAR = 12;
    public static KEY_ENTER = 13;
    public static KEY_SHIFT_LEFT = 16;
    public static KEY_CONTROL_LEFT = 17;
    public static KEY_ALT_LEFT = 18;
    public static KEY_ESC = 27;
    public static KEY_SPACE = 32;
    public static KEY_LEFT = 37;
    public static KEY_UP = 38;
    public static KEY_RIGHT = 39;
    public static KEY_DOWN = 40;
    public static KEY_DELETE = 46;
    public static KEY_0 = 48;
    public static KEY_1 = 49;
    public static KEY_2 = 50;
    public static KEY_3 = 51;
    public static KEY_4 = 52;
    public static KEY_5 = 53;
    public static KEY_6 = 54;
    public static KEY_7 = 55;
    public static KEY_8 = 56;
    public static KEY_9 = 57;
    public static KEY_A = 65;
    public static KEY_B = 66;
    public static KEY_C = 67;
    public static KEY_D = 68;
    public static KEY_E = 69;
    public static KEY_F = 70;
    public static KEY_G = 71;
    public static KEY_H = 72;
    public static KEY_I = 73;
    public static KEY_J = 74;
    public static KEY_K = 75;
    public static KEY_L = 76;
    public static KEY_M = 77;
    public static KEY_N = 78;
    public static KEY_O = 79;
    public static KEY_P = 80;
    public static KEY_Q = 81;
    public static KEY_R = 82;
    public static KEY_S = 83;
    public static KEY_T = 84;
    public static KEY_U = 85;
    public static KEY_V = 86;
    public static KEY_W = 87;
    public static KEY_X = 88;
    public static KEY_Y = 89;
    public static KEY_Z = 90;

    private _keyUpEvents: Dict;
    private _keyDownEvents: Dict;
    public constructor() {
        this._keyDownEvents = new Dict();
        this._keyUpEvents = new Dict();
        this.initEvent();
    }

    private initEvent(): void {
        if (egret.Capabilities.runtimeType != egret.MainContext.RUNTIME_HTML5) return;
        document.addEventListener("keyup", (e) => {
            EventCenter.dispatchEvent(new GameEvent(Keyboard.KeyUpEvent + "_" + e.keyCode));
        });

        document.addEventListener("keydown", (e) => {
            EventCenter.dispatchEvent(new GameEvent(Keyboard.KeyDownEvent + "_" + e.keyCode));
        });
    }

    public addKeyUpListener(key: number, callBack: Function, callObj: any): void {
        EventCenter.addEventListener(Keyboard.KeyUpEvent + "_" + key, callBack, callObj);
    }

    public removeKeyUpListener(key: number, callBack: Function, callObj: any): void {

    }

    public addKeyDownListener(key: number, callBack: Function, callObj: any): void {
        EventCenter.addEventListener(Keyboard.KeyDownEvent + "_" + key, callBack, callObj);
    }

    public removeKeyDownListener(key: number, callBack: Function, callObj: any): void {

    }

    private onKeyUp(e: GameEvent): void {

    }
}
