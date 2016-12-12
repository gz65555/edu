/**
 * Created by Saco at 2016/12/ 1
 **/
var Keyboard = (function () {
    function Keyboard() {
        this._keyDownEvents = new Dict();
        this._keyUpEvents = new Dict();
        this.initEvent();
    }
    var d = __define,c=Keyboard,p=c.prototype;
    p.initEvent = function () {
        if (egret.Capabilities.runtimeType != egret.MainContext.RUNTIME_HTML5)
            return;
        document.addEventListener("keyup", function (e) {
            EventCenter.dispatchEvent(new GameEvent(Keyboard.KeyUpEvent + "_" + e.keyCode));
        });
        document.addEventListener("keydown", function (e) {
            EventCenter.dispatchEvent(new GameEvent(Keyboard.KeyDownEvent + "_" + e.keyCode));
        });
    };
    p.addKeyUpListener = function (key, callBack, callObj) {
        EventCenter.addEventListener(Keyboard.KeyUpEvent + "_" + key, callBack, callObj);
    };
    p.removeKeyUpListener = function (key, callBack, callObj) {
    };
    p.addKeyDownListener = function (key, callBack, callObj) {
        EventCenter.addEventListener(Keyboard.KeyDownEvent + "_" + key, callBack, callObj);
    };
    p.removeKeyDownListener = function (key, callBack, callObj) {
    };
    p.onKeyUp = function (e) {
    };
    Keyboard.KeyUpEvent = "keyupevent";
    Keyboard.KeyDownEvent = "keydownevent";
    Keyboard.KEY_BACKSPACE = 8;
    Keyboard.KEY_TAB = 9;
    Keyboard.KEY_CLEAR = 12;
    Keyboard.KEY_ENTER = 13;
    Keyboard.KEY_SHIFT_LEFT = 16;
    Keyboard.KEY_CONTROL_LEFT = 17;
    Keyboard.KEY_ALT_LEFT = 18;
    Keyboard.KEY_ESC = 27;
    Keyboard.KEY_SPACE = 32;
    Keyboard.KEY_LEFT = 37;
    Keyboard.KEY_UP = 38;
    Keyboard.KEY_RIGHT = 39;
    Keyboard.KEY_DOWN = 40;
    Keyboard.KEY_DELETE = 46;
    Keyboard.KEY_0 = 48;
    Keyboard.KEY_1 = 49;
    Keyboard.KEY_2 = 50;
    Keyboard.KEY_3 = 51;
    Keyboard.KEY_4 = 52;
    Keyboard.KEY_5 = 53;
    Keyboard.KEY_6 = 54;
    Keyboard.KEY_7 = 55;
    Keyboard.KEY_8 = 56;
    Keyboard.KEY_9 = 57;
    Keyboard.KEY_A = 65;
    Keyboard.KEY_B = 66;
    Keyboard.KEY_C = 67;
    Keyboard.KEY_D = 68;
    Keyboard.KEY_E = 69;
    Keyboard.KEY_F = 70;
    Keyboard.KEY_G = 71;
    Keyboard.KEY_H = 72;
    Keyboard.KEY_I = 73;
    Keyboard.KEY_J = 74;
    Keyboard.KEY_K = 75;
    Keyboard.KEY_L = 76;
    Keyboard.KEY_M = 77;
    Keyboard.KEY_N = 78;
    Keyboard.KEY_O = 79;
    Keyboard.KEY_P = 80;
    Keyboard.KEY_Q = 81;
    Keyboard.KEY_R = 82;
    Keyboard.KEY_S = 83;
    Keyboard.KEY_T = 84;
    Keyboard.KEY_U = 85;
    Keyboard.KEY_V = 86;
    Keyboard.KEY_W = 87;
    Keyboard.KEY_X = 88;
    Keyboard.KEY_Y = 89;
    Keyboard.KEY_Z = 90;
    return Keyboard;
}());
egret.registerClass(Keyboard,'Keyboard');
