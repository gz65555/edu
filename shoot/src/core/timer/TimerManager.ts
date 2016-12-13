/**
 * Created by Saco on 16/4/7.
 */
class TimerManager {
    private _serverTime: number;
    private _handlers: Dict;
    private _lastTimestamp: number;
    private _timeCall: Dict;
    private _id: number;

    public constructor() {
        this._handlers = new Dict();
        this._timeCall = new Dict();
        this._id = 0;
        egret.startTick(this.onFrame, this);
        this._lastTimestamp = egret.getTimer();
        this._serverTime = new Date().getTime();
    }

    public setServerTime(serverTime: number): void {
        this._serverTime = serverTime * 1000;
    }

    public getTime(): number {
        return parseInt(this._serverTime + "");
    }

    public regTimeCall(hour: number, minute: number, callback: Function, callObj: any, para?: any): number {
        var nowTimestamp = new Date(this._serverTime).getTime();
        var regDate = new Date();
        var timescale;
        regDate.setHours(hour);
        regDate.setMinutes(minute);
        regDate.setSeconds(0);
        regDate.setMilliseconds(0);
        var regTimestamp = regDate.getTime();
        if (nowTimestamp > regTimestamp) {
            var date = new Date();
            date.setHours(24);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            timescale = date.getTime() - nowTimestamp;
            timescale += hour * 3600000 + minute * 60000;
        } else {
            timescale = regTimestamp - nowTimestamp;
        }
        var handler: TimerHandler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.repeatCount = 1;
        handler.callPara = para;
        handler.timeScale = timescale;
        return this.addHandler(handler);
    }

    public regCountdown(second: number, updateCallBack: Function, completeCallBack: Function, callObj: any, para?: any): number {
        var handler = new TimerHandler();
        handler.callback = updateCallBack;
        handler.callObj = callObj;
        handler.completeCallBack = completeCallBack;
        handler.repeatCount = second;
        handler.timeScale = 1000;
        handler.callPara = para;
        return this.addHandler(handler);
    }

    public startTicker(callback: Function, callObj: any, para?: any): number {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.timeScale = 0;
        handler.callPara = para;
        return this.addHandler(handler);
    }

    public setTimeout(callback: Function, callObj: any, time: number, para?: any): number {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.timeScale = time;
        handler.repeatCount = 1;
        handler.callPara = para;
        return this.addHandler(handler);
    }

    public setInterval(callback: Function, callObj: any, time: number, para?: any): number {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.timeScale = time;
        handler.callPara = para;
        return this.addHandler(handler);
    }

    private onFrame(timestamp: number): boolean {
        var timeDiff = timestamp - this._lastTimestamp;
        this._lastTimestamp = timestamp;
        this._serverTime += timeDiff;
        var handler: TimerHandler;
        var keys = Object.keys(this._handlers);
        for (var i = keys.length - 1; i >= 0; i--) {
            handler = this._handlers[keys[i]];
            if (!handler) continue;
            if (!handler.isPause) {
                handler.timePast += timeDiff;
            }
            if (!handler.isPause && handler.timePast >= handler.timeScale) {
                if (handler.repeatCount > 0) {
                    handler.repeatCount--;
                }
                if (handler.callback) {
                    if (handler.callPara) {
                        handler.callback.call(handler.callObj, handler.callPara);
                    } else if (handler.repeatCount != null) {
                        handler.callback.call(handler.callObj, handler.repeatCount);
                    } else {
                        handler.callback.call(handler.callObj, timeDiff);
                    }
                }
                if (handler.repeatCount == 0) {
                    if (handler.completeCallBack) {
                        handler.completeCallBack.call(handler.callObj);
                    }
                    delete this._handlers[keys[i]];
                }
                handler.timePast -= handler.timeScale;
            }
        }
        return true;
    }

    public pauseHandler(handlerID: number, pause: boolean = true): void {
        this._handlers[handlerID].isPause = pause;
    }

    public remove(handlerID: number): void {
        delete this._handlers[handlerID];
    }

    private addHandler(handler: TimerHandler): number {
        this._handlers[++this._id] = handler;
        return this._id;
    }
}

class TimerHandler {
    //回调函数
    public callback: Function;
    //完成回调函数
    public completeCallBack: Function;
    //回调对象
    public callObj: any;
    //回调参数
    public callPara: any;
    //是否暂停状态
    public isPause: boolean;
    //时间差
    public timeScale: number;
    //循环次数
    public repeatCount: number;
    //经过时间
    public timePast: number = 0;
}
