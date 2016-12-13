/**
 * Created by Saco on 16/5/6.
 */
class Gesture {
    private _longTouchTimer: Dict;
    private _longTouchCallback: Dict;
    private _doubleTouchTimer: Dict;
    private _doubleTouchCallback: Dict;

    public constructor() {
        this._longTouchTimer = new Dict();
        this._longTouchCallback = new Dict();
        this._doubleTouchCallback = new Dict();
        this._doubleTouchTimer = new Dict();
    }

    public addDoubleTouchCallback(com: egret.DisplayObject, callback: Function, callObj: any): void {
        com.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (!this._doubleTouchCallback[com.hashCode]) {
            this._doubleTouchCallback[com.hashCode] = [];
        }
        this._doubleTouchCallback[com.hashCode].push({ callback: callback, callobj: callObj });
    }

    public addLongTouchCallback(com: egret.DisplayObject, callback: Function, callObj: any): void {
        com.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        com.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        com.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        com.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);
        if (!this._longTouchCallback[com.hashCode]) {
            this._longTouchCallback[com.hashCode] = [];
        }
        this._longTouchCallback[com.hashCode].push({ callback: callback, callobj: callObj });
    }

    public removeLongTouchCallback(com: egret.DisplayObject, callback: Function, callObj: any): void {
        if (this._longTouchCallback[com.hashCode]) {
            for (var i = this._longTouchCallback[com.hashCode].length - 1; i >= 0; i--) {
                if (this._longTouchCallback[com.hashCode][i].callback == callback && this._longTouchCallback[com.hashCode][i].callobj == callObj) {
                    this._longTouchCallback[com.hashCode].splice(i, 1);
                }
            }
        }
    }

    private _touchBeginX;
    private _touchBeginY;
    private onTouchBegin(e: egret.TouchEvent): void {
        if (this._longTouchTimer[e.currentTarget.hashCode]) {
            this._touchBeginX = e.stageX;
            this._touchBeginY = e.stageY;
            Api.TimerManager.remove(this._longTouchTimer[e.currentTarget.hashCode]);
        }
        this._longTouchTimer[e.currentTarget.hashCode] = Api.TimerManager.setTimeout(this.onTimeOut, this, 300, e.currentTarget);
    }

    private onTouchMove(e: egret.TouchEvent): void {
        if (Math.abs(this._touchBeginX - e.stageX) > 6 || Math.abs(this._touchBeginY - e.stageY) > 6) {
            this.removeTimer(e.currentTarget);
        }
    }

    private onTimeOut(target: egret.DisplayObject): void {
        this.removeTimer(target);
        this.callTarget(target);
    }

    private callTarget(target: egret.DisplayObject): void {
        if (this._longTouchCallback[target.hashCode]) {
            this._longTouchCallback[target.hashCode].map((callback) => {
                callback.callback.call(callback.callobj, target);
            });
        }
    }

    private onTouchOut(e: egret.TouchEvent): void {
        this.removeTimer(e.currentTarget);
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        this.removeTimer(e.currentTarget);
    }

    private removeTimer(target): void {
        if (this._longTouchTimer[target.hashCode]) {
            Api.TimerManager.remove(this._longTouchTimer[target.hashCode]);
        }
    }

    private onTouchTap(e: egret.TouchEvent): void {
        var timer = egret.getTimer();
        if (this._doubleTouchTimer[e.currentTarget.hashCode]) {
            if (timer - this._doubleTouchTimer[e.currentTarget.hashCode] < 400) {
                this.callDoubleTouch(e.currentTarget);
            }
        }
        this._doubleTouchTimer[e.currentTarget.hashCode] = timer;
    }

    private callDoubleTouch(target: egret.DisplayObject): void {
        if (this._doubleTouchCallback[target.hashCode]) {
            this._doubleTouchCallback[target.hashCode].map((callback) => {
                callback.callback.call(callback.callobj, target);
            });
        }
    }
}
