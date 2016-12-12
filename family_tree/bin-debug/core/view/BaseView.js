/**
 * Created by Saco on 16/3/17.
 */
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        _super.call(this);
        this.setSize();
    }
    var d = __define,c=BaseView,p=c.prototype;
    p.initBlackBg = function () {
        this._blackBg = new egret.Shape();
        this._blackBg.graphics.beginFill(0, 0.6);
        this._blackBg.graphics.drawRect(0, 0, Api.StageUtil.stageWidth, Api.StageUtil.stageHeight);
        this._blackBg.graphics.endFill();
        this._blackBg.touchEnabled = true;
        this._blackBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    p.onGuide = function (e) {
        this.checkGuide(e.eventBody);
    };
    p.checkGuide = function (guideID) {
        if (!this.isInited || !this.parent) {
            this.currentGuideID = guideID;
            return;
        }
        if (this.interestGuide && this.interestGuide.indexOf(guideID) > -1) {
            this.showGuide(guideID);
            this.currentGuideID = null;
        }
    };
    p.showGuide = function (guideID) {
    };
    p.setScaleEffect = function (b) {
        this._scaleEffect = b;
    };
    p.setSize = function () {
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
    };
    p.childrenCreated = function () {
        var _this = this;
        if (this["btnClose"]) {
            this["btnClose"].touchEnabled = true;
            this["btnClose"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        }
        egret.callLater(function () {
            _this.initView();
            _this.isInited = true;
        }, this);
    };
    p.initView = function () {
    };
    p.setSkinName = function (name) {
        this.skinName = "resource/skins/" + name + ".exml";
    };
    p.openView = function (para) {
        var _this = this;
        if (para === void 0) { para = null; }
        if (this.isInited || !this.resources) {
            this.viewParent.addChild(this);
            egret.callLater(function () {
                _this.open(para);
            }, this);
        }
        else {
            SimpleLoading.i().showLoading();
            Api.ResourceUtil.loadResource(this.resources, function () {
                SimpleLoading.i().hideLoading();
                _this.viewParent.addChild(_this);
                egret.callLater(function () {
                    _this.open(para);
                }, _this);
            }, this.onResLoadProgress, this);
        }
    };
    p.onResLoadProgress = function (load, total) {
        SimpleLoading.i().setProgress(load / total);
    };
    p.open = function (para) {
        if (para === void 0) { para = null; }
        if (!this._scaleEffect) {
            if (this.currentGuideID) {
                this.checkGuide(this.currentGuideID);
            }
        }
        if (this.closeHookView) {
            if (this.closeHookView == "all") {
                Api.ViewManager.closeAll();
            }
            else if (this.closeHookView instanceof BaseView) {
                this.closeHookView.close();
            }
            else {
                for (var i = 0; i = this.closeHookView.length; i++) {
                    Api.ViewManager.closeView(this.closeHookView[i]);
                }
            }
            this.closeHookView = null;
        }
        if (this._needBg) {
            this.viewParent.addChild(this._blackBg);
        }
        this.viewParent.addChild(this);
        egret.Tween.removeTweens(this);
        this.measure();
        this.visible = false;
        egret.callLater(this.calculatePos, this);
    };
    p.calculatePos = function () {
        var _this = this;
        if (this.width > Api.StageUtil.stageWidth || this.height > Api.StageUtil.stageHeight) {
            var scale = Api.StageUtil.stageHeight / this.height;
            this.scaleX = this.scaleY = scale;
        }
        else {
            this.scaleX = this.scaleY = 1;
        }
        var tempX = (Api.StageUtil.stageWidth - this.width * this.scaleX) / 2;
        var tempY = (Api.StageUtil.stageHeight - this.height * this.scaleY) / 2 + 3;
        if (this._scaleEffect) {
            this.touchEnabled = false;
            this.touchChildren = false;
            this.alpha = 0.3;
            var tempScale = this.scaleX;
            var startScale = tempScale * 0.8;
            this.scaleX = this.scaleY = startScale;
            this.x = tempX + this.width * (1 - startScale) / 2;
            this.y = tempY + this.height * (1 - startScale) / 2;
            egret.Tween.get(this).to({
                x: tempX,
                y: tempY,
                alpha: 1,
                scaleX: tempScale,
                scaleY: tempScale
            }, 300, egret.Ease.backOut).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                if (_this.currentGuideID) {
                    _this.checkGuide(_this.currentGuideID);
                }
            }, this);
        }
        else {
            this.x = tempX;
            this.y = tempY;
        }
        this.visible = true;
    };
    p.close = function () {
        var _this = this;
        if (this._scaleEffect) {
            var tempX = this.x;
            var tempY = this.y;
            this.touchEnabled = false;
            this.touchChildren = false;
            var tempScale = this.scaleX;
            var endScale = tempScale * 0.8;
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({
                x: tempX + this.width * (1 - endScale) / 2,
                y: tempY + this.height * (1 - endScale) / 2,
                alpha: 0.3,
                scaleX: endScale,
                scaleY: endScale
            }, 300, egret.Ease.backIn).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                _this.scaleX = tempScale;
                _this.scaleY = tempScale;
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this);
        }
        else {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        if (this._blackBg && this._blackBg.parent) {
            this._blackBg.parent.removeChild(this._blackBg);
        }
    };
    p.setRes = function (res) {
        this.resources = res;
    };
    p.regMsgListener = function (msg, listener) {
        Api["MessageCenter"].regMsgListener(msg, listener, this);
    };
    p.removeMsgListener = function (msg, listener) {
        Api["MessageCenter"].removeMsgListener(msg, listener, this);
    };
    p.sendMsg = function (msg) {
        Api["GameSocket"].sendMsg(msg);
    };
    p.getGlobalText = function (key) {
        return Api.GlobalRes.getText(key);
    };
    p.setGlobalText = function (com, key) {
        com.text = this.getGlobalText(key);
    };
    return BaseView;
}(eui.Component));
egret.registerClass(BaseView,'BaseView');
