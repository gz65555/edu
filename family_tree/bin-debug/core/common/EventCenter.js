/**
 * Created by Saco on 2014/8/2.
 */
var EventCenter = (function () {
    function EventCenter() {
    }
    var d = __define,c=EventCenter,p=c.prototype;
    EventCenter.addEventListener = function (eventType, callback, thisObj) {
        if (!this._eventDic[eventType])
            this._eventDic[eventType] = [];
        if (!this.hasEventListener(eventType, callback, thisObj))
            this._eventDic[eventType].push({ "this": thisObj, "fun": callback });
    };
    EventCenter.hasEventListener = function (eventType, call, thisObj) {
        if (!this._eventDic[eventType])
            return false;
        for (var i; i < this._eventDic[eventType].length; i++) {
            if (this._eventDic[eventType][i].fun == call && this._eventDic[eventType][i].this == thisObj)
                return true;
        }
        return false;
    };
    EventCenter.removeEventListener = function (eventType, callback, thisObj) {
        var _this = this;
        if (this._eventDic[eventType]) {
            this._eventDic[eventType].forEach(function (obj, index) {
                if (obj.fun == callback && obj.this == thisObj) {
                    _this._eventDic[eventType].splice(index, 1);
                    return;
                }
            });
        }
    };
    EventCenter.getEventIndex = function (eventType, call, thisObj) {
        if (!this._eventDic[eventType])
            return -1;
        for (var i; i < this._eventDic[eventType].length; i++) {
            if (this._eventDic[eventType][i].fun == call && this._eventDic[eventType][i].this == thisObj)
                return i;
        }
        return -1;
    };
    EventCenter.dispatchEvent = function (gameEvent) {
        if (this._eventDic[gameEvent.type]) {
            var eventObj;
            for (var fun in this._eventDic[gameEvent.type]) {
                eventObj = this._eventDic[gameEvent.type][fun];
                eventObj.fun.call(eventObj.this, gameEvent);
            }
        }
    };
    EventCenter.dispatchWith = function (type, data) {
        EventCenter.dispatchEvent(new GameEvent(type, data));
    };
    EventCenter._eventDic = {};
    return EventCenter;
}());
egret.registerClass(EventCenter,'EventCenter');
