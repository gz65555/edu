/**
 * Created by Saco at 2016/12/ 5
 **/
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        _super.call(this);
        this.skinName = new GameStartSkin();
    }
    var d = __define,c=GameStartView,p=c.prototype;
    p.initView = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    };
    p.onStart = function () {
        this.close();
    };
    p.close = function () {
        _super.prototype.close.call(this);
        Api.ViewManager.openView(2);
    };
    return GameStartView;
}(BaseView));
egret.registerClass(GameStartView,'GameStartView');
