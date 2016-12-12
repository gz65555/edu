/**
 * Created by Saco on 16/3/26.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.call(this);
        this._enabled = true;
        this.initEvent();
        this.skinName = "resource/skins/component/SimpleButtonSkin.exml";
    }
    var d = __define,c=Button,p=c.prototype;
    p.initEvent = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._isInited = true;
        if (this._dis) {
            this.setLabelDisplay(this._dis);
        }
    };
    d(p, "buttonWidth"
        ,function () {
            return this._btnWidth;
        }
        ,function (value) {
            this._btnWidth = value;
            this.width = value;
        }
    );
    p.onTouchEnd = function () {
        if (!this._enabled)
            return;
        if (this._touchBegin) {
            this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        }
        this._touchBegin = false;
        this.currentState = ButtonState.UP;
    };
    p.onTouchBegin = function () {
        if (!this._enabled)
            return;
        this._touchBegin = true;
        this.currentState = ButtonState.DOWN;
    };
    d(p, "enabled"
        ,function () {
            return this._enabled;
        }
        ,function (value) {
            this._enabled = value;
            if (value) {
                this.currentState = ButtonState.UP;
            }
            else {
                this.currentState = ButtonState.DISABLE;
            }
        }
    );
    p.setBtnSkin = function (upState, downState, disableState) {
        this.up.source = upState;
        if (downState) {
            this.down.source = downState;
        }
        else {
            this.down.source = upState;
        }
        if (disableState) {
            this.disable.source = disableState;
        }
        else {
            this.disable.source = upState;
        }
    };
    p.setLabelDisplay = function (dis) {
        if (!this._isInited) {
            this._dis = dis;
            return;
        }
        if (typeof dis == "string") {
            this.labelDisplay.text = dis;
        }
        else {
            this._labelDis = dis;
            this.addChild(this._labelDis);
            this.labelDisplay.visible = false;
        }
    };
    return Button;
}(eui.Component));
egret.registerClass(Button,'Button');
