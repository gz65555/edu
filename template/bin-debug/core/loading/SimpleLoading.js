/**
 * Created by Saco at 2016/9/1
 **/
var SimpleLoading = (function () {
    function SimpleLoading() {
    }
    var d = __define,c=SimpleLoading,p=c.prototype;
    SimpleLoading.i = function () {
        if (!this._instance) {
            this._instance = new SimpleLoading();
        }
        return this._instance;
    };
    p.showLoading = function () {
    };
    p.hideLoading = function () {
    };
    p.setProgress = function (value) {
    };
    return SimpleLoading;
}());
egret.registerClass(SimpleLoading,'SimpleLoading');
