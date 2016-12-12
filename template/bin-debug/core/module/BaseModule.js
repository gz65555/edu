/**
 * Created by Saco on 16/3/14.
 */
var BaseModule = (function () {
    function BaseModule() {
    }
    var d = __define,c=BaseModule,p=c.prototype;
    p.regMsgListener = function (msg, listener) {
        Api["MessageCenter"].regMsgListener(msg, listener, this);
    };
    p.sendMsg = function (msg) {
        Api["GameSocket"].sendMsg(msg);
    };
    return BaseModule;
}());
egret.registerClass(BaseModule,'BaseModule');
