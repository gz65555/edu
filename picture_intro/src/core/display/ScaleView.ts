/**
 * Created by husong on 16/4/2.
 */
class ScaleView extends egret.DisplayObjectContainer {
    private _content: egret.DisplayObject;
    private maxScale = 2;
    private minScale = 0.5;
    private static pointMap = {};

    constructor(content: egret.DisplayObject) {
        super();
        this._content = content;
        this.touchEnabled = true;
        this.addChild(content);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
    }
    private onAdd() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    public setScaleRange(min, max) {
        this.maxScale = max;
        this.minScale = min;
    }

    private beginVector = [];
    private beginScale = 1;
    private beginX = 0;
    private beginY = 0;
    private onTouchBegin(e: egret.TouchEvent) {
        ScaleView.pointMap[e.touchPointID] = [e.stageX, e.stageY];
        var keys = Object.keys(ScaleView.pointMap);
        var pointMapLen = keys.length;
        //若有两个手指放在屏幕上
        if (pointMapLen >= 2) {
            var p0 = ScaleView.pointMap[keys[0]];
            var p1 = ScaleView.pointMap[keys[1]];

            // this.dispatchEventWith(Events.SCALE_BEGIN);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.beginVector = [p1[0] - p0[0], p1[1] - p0[1]];
            this.beginScale = this._content.scaleX;
            this.beginX = this._content.x;
            this.beginY = this._content.y;
        }
    }

    private onTouchMove(e: egret.TouchEvent) {
        ScaleView.pointMap[e.touchPointID] = [e.stageX, e.stageY];
        var keys = Object.keys(ScaleView.pointMap);
        var pointMapLen = keys.length;
        if (pointMapLen >= 2) {
            //计算缩放
            var p0 = ScaleView.pointMap[keys[0]];
            var p1 = ScaleView.pointMap[keys[1]];
            var moveVector = [p1[0] - p0[0], p1[1] - p0[1]];
            var thisScale = this.getScale(moveVector);
            var scale = thisScale * this.beginScale;
            //计算坐标
            this.scaleWithPoint(scale, this.getScalePoint());
        }
    }

    private onTouchEnd(e: egret.TouchEvent) {
        delete ScaleView.pointMap[e.touchPointID];
        var len = Object.keys(ScaleView.pointMap).length;
        if (len < 2) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }
        if (len == 1) {
            // this.dispatchEventWith(Events.SCALE_END);
        }
    }

    private getScalePoint() {
        var point = [0, 0];
        var keys = Object.keys(ScaleView.pointMap);
        for (var i = 0; i < 2; i++) {
            point[0] += ScaleView.pointMap[keys[i]][0];
            point[1] += ScaleView.pointMap[keys[i]][1];
        }
        point[0] = Math.round(point[0] / 2);
        point[1] = Math.round(point[1] / 2);
        return point;
    }

    private getVectorLength(vector): number {
        return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    }

    private getScale(moveVector): number {
        var moveVectorLength = this.getVectorLength(moveVector);
        var beginVectorLength = this.getVectorLength(this.beginVector);
        return moveVectorLength / beginVectorLength;
    }

    private scaleWithPoint(scale, globalPoint) {
        if (scale < this.minScale || scale > this.maxScale) {
            return;
        }

        //计算坐标
        var localPoint = this._content.globalToLocal(globalPoint[0], globalPoint[1]);
        //var localPointX =localPoint.x * this._content.scaleX;
        var localPoint = new egret.Point(localPoint.x, localPoint.y);
        var toX = this.beginX - localPoint.x * (scale - this.beginScale);
        var toY = this.beginY - localPoint.y * (scale - this.beginScale);
        this._content.x = toX;
        this._content.y = toY;
        this._content.scaleX = scale;
        this._content.scaleY = scale;
    }
}
