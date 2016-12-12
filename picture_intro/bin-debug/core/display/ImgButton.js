/**
 * Created by Saco on 2014/12/19.
 */
var ImgButton = (function (_super) {
    __extends(ImgButton, _super);
    function ImgButton() {
        _super.call(this);
        this.init();
        this.touchEnabled = true;
        this.touchChildren = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    var d = __define,c=ImgButton,p=c.prototype;
    p.onTouchBegin = function () {
        if (this._resArr[1])
            this._btn.texture = this._resArr[1];
    };
    p.onTouchEnd = function () {
        if (this._resArr[0])
            this._btn.texture = this._resArr[0];
    };
    p.init = function () {
        this._btn = new egret.Bitmap();
        this._label = new egret.TextField();
        this._label.size = 28;
        this._label.fontFamily = "黑体";
        this._label.textColor = 0xffffff;
        this._label.textAlign = "center";
        this._label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._label.x = 25;
        this._labelImg = new egret.Bitmap();
        this.addChild(this._btn);
        this.addChild(this._labelImg);
        this.addChild(this._label);
    };
    p.initRes = function (up, down, label, labelImg) {
        this._resArr = [RES.getRes(up), RES.getRes(down)];
        this._btn.texture = this._resArr[0];
        if (label) {
            this.setLable(label);
        }
        if (labelImg) {
            this._labelImg.x = this._btn.width / 2;
            this._labelImg.y = this._btn.height / 2;
            this._labelImg.texture = RES.getRes(labelImg);
        }
    };
    p.setLable = function (label) {
        this._label.width = this._btn.width - 50;
        this._label.height = this._btn.height;
        this._label.text = label;
    };
    p.setImgLabel = function (label) {
        this._labelImg.texture = RES.getRes(label);
        this._labelImg.x = this._btn.width / 2;
        this._labelImg.y = this._btn.height / 2;
    };
    return ImgButton;
}(egret.DisplayObjectContainer));
egret.registerClass(ImgButton,'ImgButton');
