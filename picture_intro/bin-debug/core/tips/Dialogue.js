/**
 * Created by Saco at 2016/11/24
 **/
var Dialogue = (function () {
    function Dialogue() {
    }
    var d = __define,c=Dialogue,p=c.prototype;
    p.regConfirm = function (view) {
        this._confirm = view;
    };
    p.regDialogue = function (view) {
        this._dialogue = view;
    };
    p.confirm = function (title, txt) {
        this._confirm["openView"](arguments);
    };
    p.dialogue = function (title, txt, confirmCall, cancelCall, callObj) {
        this._dialogue["openView"](arguments);
    };
    return Dialogue;
}());
egret.registerClass(Dialogue,'Dialogue');
