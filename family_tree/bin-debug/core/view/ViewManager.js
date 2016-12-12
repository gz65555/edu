/**
 * Created by Saco on 16/3/14.
 */
var ViewManager = (function () {
    function ViewManager() {
        this._views = Object.create(null);
    }
    var d = __define,c=ViewManager,p=c.prototype;
    p.initMask = function () {
        this.backBlack = new eui.Rect(Api.StageUtil.stageWidth, Api.StageUtil.stageHeight, 0x000000);
        this.backBlack.alpha = 0.6;
        this.backBlack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    p.regView = function (viewConst, view, layer) {
        this._views[viewConst] = new view();
        this._views[viewConst].viewID = viewConst;
        this._views[viewConst].viewParent = Api.Layers.getLayer(layer);
    };
    p.openView = function (viewConst, param) {
        if (param === void 0) { param = null; }
        if (this._views[viewConst]) {
            var view = this._views[viewConst];
            view.openView(param);
        }
    };
    p.openViewAndClose = function (viewConst, closeView, param) {
        if (this._views[viewConst]) {
            var view = this._views[viewConst];
            view.closeHookView = closeView;
            view.openView(param);
        }
    };
    p.getView = function (viewConst) {
        return this._views[viewConst];
    };
    p.closeView = function (viewConst) {
        if (this._views[viewConst]) {
            this._views[viewConst].close();
        }
    };
    p.closeViewsByLayer = function (layer) {
        var thisLayer = Api.Layers.getLayer(layer);
        while (thisLayer.numChildren > 0) {
            var child = thisLayer.getChildAt(0);
            child.close();
        }
    };
    p.close = function (view) {
        view.close();
    };
    p.closeAll = function (view) {
        var layers = Api.Layers.getLayers();
        for (var key in layers) {
            var numChild = layers[key].numChildren - 1;
            while (numChild >= 0) {
                var child = layers[key].getChildAt(numChild);
                numChild--;
                if (child == view)
                    continue;
                if (child instanceof BaseView) {
                    child.close();
                }
                else {
                    child.parent.removeChild(child);
                }
            }
        }
    };
    return ViewManager;
}());
egret.registerClass(ViewManager,'ViewManager');
