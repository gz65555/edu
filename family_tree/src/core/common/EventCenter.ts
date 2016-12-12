/**
 * Created by Saco on 2014/8/2.
 */
class EventCenter {
    private static _eventDic: Object = {};

    public constructor() {
    }

    public static addEventListener(eventType: string, callback: Function, thisObj: any): void {
        if (!this._eventDic[eventType])
            this._eventDic[eventType] = [];
        if (!this.hasEventListener(eventType, callback, thisObj))
            this._eventDic[eventType].push({ "this": thisObj, "fun": callback });
    }

    private static hasEventListener(eventType: string, call: Function, thisObj: any): Boolean {
        if (!this._eventDic[eventType])
            return false;
        for (var i: number; i < this._eventDic[eventType].length; i++) {
            if (this._eventDic[eventType][i].fun == call && this._eventDic[eventType][i].this == thisObj)
                return true;
        }
        return false;
    }

    public static removeEventListener(eventType: string, callback: Function, thisObj: any): void {
        if (this._eventDic[eventType]) {
            this._eventDic[eventType].forEach((obj, index) => {
                if (obj.fun == callback && obj.this == thisObj) {
                    this._eventDic[eventType].splice(index, 1);
                    return;
                }
            });
        }
    }

    private static getEventIndex(eventType: string, call: Function, thisObj: any): number {
        if (!this._eventDic[eventType])
            return -1;
        for (var i: number; i < this._eventDic[eventType].length; i++) {
            if (this._eventDic[eventType][i].fun == call && this._eventDic[eventType][i].this == thisObj)
                return i;
        }
        return -1;
    }

    public static dispatchEvent(gameEvent: egret.Event): void {
        if (this._eventDic[gameEvent.type]) {
            var eventObj: any;
            for (var fun in this._eventDic[gameEvent.type]) {
                eventObj = this._eventDic[gameEvent.type][fun];
                eventObj.fun.call(eventObj.this, gameEvent);
            }
        }
    }

    public static dispatchWith(type: string, data?): void {
        EventCenter.dispatchEvent(new GameEvent(type, data));
    }

}
