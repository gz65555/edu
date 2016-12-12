/**
 * Created by Saco on 16/5/6.
 */
var Gesture = (function () {
    function Gesture() {
        this._longTouchTimer = new Dict();
        this._longTouchCallback = new Dict();
        this._doubleTouchCallback = new Dict();
        this._doubleTouchTimer = new Dict();
    }
    var d = __define,c=Gesture,p=c.prototype;
    p.addDoubleTouchCallback = function (com, callback, callObj) {
        com.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (!this._doubleTouchCallback[com.hashCode]) {
            this._doubleTouchCallback[com.hashCode] = [];
        }
        this._doubleTouchCallback[com.hashCode].push({ callback: callback, callobj: callObj });
    };
    p.addLongTouchCallback = function (com, callback, callObj) {
        com.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        com.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        com.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        com.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);
        if (!this._longTouchCallback[com.hashCode]) {
            this._longTouchCallback[com.hashCode] = [];
        }
        this._longTouchCallback[com.hashCode].push({ callback: callback, callobj: callObj });
    };
    p.removeLongTouchCallback = function (com, callback, callObj) {
        if (this._longTouchCallback[com.hashCode]) {
            for (var i = this._longTouchCallback[com.hashCode].length - 1; i >= 0; i--) {
                if (this._longTouchCallback[com.hashCode][i].callback == callback && this._longTouchCallback[com.hashCode][i].callobj == callObj) {
                    this._longTouchCallback[com.hashCode].splice(i, 1);
                }
            }
        }
    };
    p.onTouchBegin = function (e) {
        if (this._longTouchTimer[e.currentTarget.hashCode]) {
            this._touchBeginX = e.stageX;
            this._touchBeginY = e.stageY;
            Api.TimerManager.remove(this._longTouchTimer[e.currentTarget.hashCode]);
        }
        this._longTouchTimer[e.currentTarget.hashCode] = Api.TimerManager.setTimeout(this.onTimeOut, this, 300, e.currentTarget);
    };
    p.onTouchMove = function (e) {
        if (Math.abs(this._touchBeginX - e.stageX) > 6 || Math.abs(this._touchBeginY - e.stageY) > 6) {
            this.removeTimer(e.currentTarget);
        }
    };
    p.onTimeOut = function (target) {
        this.removeTimer(target);
        this.callTarget(target);
    };
    p.callTarget = function (target) {
        if (this._longTouchCallback[target.hashCode]) {
            this._longTouchCallback[target.hashCode].map(function (callback) {
                callback.callback.call(callback.callobj, target);
            });
        }
    };
    p.onTouchOut = function (e) {
        this.removeTimer(e.currentTarget);
    };
    p.onTouchEnd = function (e) {
        this.removeTimer(e.currentTarget);
    };
    p.removeTimer = function (target) {
        if (this._longTouchTimer[target.hashCode]) {
            Api.TimerManager.remove(this._longTouchTimer[target.hashCode]);
        }
    };
    p.onTouchTap = function (e) {
        var timer = egret.getTimer();
        if (this._doubleTouchTimer[e.currentTarget.hashCode]) {
            if (timer - this._doubleTouchTimer[e.currentTarget.hashCode] < 400) {
                this.callDoubleTouch(e.currentTarget);
            }
        }
        this._doubleTouchTimer[e.currentTarget.hashCode] = timer;
    };
    p.callDoubleTouch = function (target) {
        if (this._doubleTouchCallback[target.hashCode]) {
            this._doubleTouchCallback[target.hashCode].map(function (callback) {
                callback.callback.call(callback.callobj, target);
            });
        }
    };
    return Gesture;
}());
egret.registerClass(Gesture,'Gesture');
