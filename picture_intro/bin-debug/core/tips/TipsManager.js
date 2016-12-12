/**
 * Created by Saco at 2016/11/22
 **/
var TipsManager = (function () {
    function TipsManager() {
        this._margin = 5;
        this._maxTips = 5;
        this._fadeTime = 2000;
        this._moveDis = 150;
        this._tipsPool = [];
        this._currTips = [];
    }
    var d = __define,c=TipsManager,p=c.prototype;
    p.setItemType = function (type) {
        this._itemType = type;
    };
    /**
     * prop:margin/fadeTime/moveDis/maxTips
     */
    p.setProp = function (prop) {
        if (prop.margin) {
            this._margin = prop.margin;
        }
        if (prop.fadeTime) {
            this._fadeTime = prop.fadeTime;
        }
        if (prop.moveDis) {
            this._moveDis = prop.moveDis;
        }
        if (prop.maxTips) {
            this._maxTips = prop.maxTips;
        }
    };
    p.showTips = function (txt) {
        var tip = this.getTips();
        tip.onShow(txt);
        tip.x = (Api.StageUtil.stageWidth - tip.width) / 2;
        tip.y = Api.StageUtil.stageHeight / 2;
        if (this._currTips.length) {
            var lastTip = this._currTips[this._currTips.length - 1];
            tip.y = lastTip.y + lastTip.height + this._margin;
        }
        if (this._currTips.length > this._maxTips) {
            this.recycleTip(this._currTips[0]);
        }
        Api.Layers.getLayer(LayerType.TIPS).addChild(tip);
        this._currTips.push(tip);
        this.moveTips(tip);
    };
    p.moveTips = function (tip) {
        var tarY = tip.y - this._moveDis;
        egret.Tween.get(tip).to({ y: tarY }, this._fadeTime).call(this.onMoveEnd, this, [tip]);
    };
    p.onMoveEnd = function (tip) {
        this.recycleTip(tip);
    };
    //show tips by keys in global text
    p.showTipsByKey = function (key) {
        this.showTips(Api.GlobalRes.getText(key));
    };
    p.getTips = function () {
        if (this._tipsPool.length) {
            return this._tipsPool.pop();
        }
        var tip = new this._itemType();
        tip.touchEnabled = false;
        return tip;
    };
    p.recycleTip = function (tip) {
        this._currTips.shift();
        egret.Tween.removeTweens(tip);
        if (tip.stage) {
            Api.Layers.getLayer(LayerType.TIPS).removeChild(tip);
        }
        this._tipsPool.push(tip);
        tip.onHide();
    };
    return TipsManager;
}());
egret.registerClass(TipsManager,'TipsManager');
