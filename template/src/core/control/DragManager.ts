/**
 * Created by Saco at 2016/11/29
 **/
class DragManager {
    private _dragItems: Dict;
    private _dragAccept: any;
    private _needCheck: boolean;
    private _isDragMove: boolean;
    private _currDragItem: DragItem;
    private _startPos: egret.Point;
    private _savedItemProp: any;
    public constructor() {
        this._dragItems = new Dict();
        this._dragAccept = {};
        this._savedItemProp = {};
        this.initStageEvent();
    }

    private initStageEvent(): void {
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    private initDragItemEvent(obj: DragItem): void {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    private removeDragItemEvent(obj: DragItem): void {
        obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    private initAcceptDragEvent(obj: DragAccept): void {
        obj.addEventListener(egret.TouchEvent.TOUCH_END, this.onAcceptDrag, this);
    }

    private removeAcceptDragEvent(obj: DragAccept): void {
        obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.onAcceptDrag, this);
    }

    public regAcceptDrag(obj: DragAccept, type?): void {
        this._dragAccept[obj.hashCode] = type;
        this.initAcceptDragEvent(obj);
    }

    public removeAcceptDrag(obj: DragAccept): void {
        delete this._dragAccept[obj.hashCode];
        this.removeAcceptDragEvent(obj);
    }

    public regDragItem(obj: DragItem): void {
        this._dragItems[obj.hashCode] = obj;
        this.initDragItemEvent(obj);
    }

    public removeDragItem(obj: DragItem): void {
        this.removeDragItemEvent(obj);
        delete this._dragItems[obj.hashCode];
    }

    private onAcceptDrag(e: egret.TouchEvent): void {
        if (!this._currDragItem) return;
        if (this._dragAccept.hasOwnProperty(e.currentTarget.hashCode)) {
            if (!this._dragAccept[e.currentTarget.hashCode] || this._currDragItem instanceof this._dragAccept[e.currentTarget.hashCode]) {
                e.currentTarget.onDragIn(this._currDragItem);
            }
        }
    }

    private onTouchBegin(e: egret.TouchEvent): void {
        if (this._dragItems[e.currentTarget.hashCode]) {
            this._needCheck = true;
            this._startPos = new egret.Point(e.stageX, e.stageY);
            this._currDragItem = this._dragItems[e.currentTarget.hashCode];
        }
    }

    private onTouchMove(e: egret.TouchEvent): void {
        if (!this._needCheck) return;
        if (!this._isDragMove) {
            if (Math.abs(e.stageX - this._startPos.x) > 10 || Math.abs(e.stageY - this._startPos.y) > 10) {
                this._isDragMove = true;
                this._currDragItem.onDragBegin(e);
                this._currDragItem.touchEnabled = false;
                this._currDragItem["touchChildren"] = false;
                this.saveItemProp();
            }
        } else {
            this._currDragItem.onDragMove(e);
            this._currDragItem.x = this._savedItemProp.globalX + e.stageX - this._startPos.x;
            this._currDragItem.y = this._savedItemProp.globalY + e.stageY - this._startPos.y;
        }
    }

    private resumeProp(): void {
        this._currDragItem.x = this._savedItemProp.x;
        this._currDragItem.y = this._savedItemProp.y;
        this._savedItemProp.parent.addChildAt(this._currDragItem, this._savedItemProp.childIndex);
    }

    private saveItemProp(): void {
        this._savedItemProp.x = this._currDragItem.x;
        this._savedItemProp.y = this._currDragItem.y;
        var point = this._currDragItem.localToGlobal(0, 0);
        this._savedItemProp.globalX = point.x;
        this._savedItemProp.globalY = point.y;
        this._savedItemProp.childIndex = this._currDragItem.parent.getChildIndex(this._currDragItem);
        this._savedItemProp.parent = this._currDragItem.parent;
        this._currDragItem.x = point.x;
        this._currDragItem.y = point.y;
        Api.StageUtil.stage.addChild(this._currDragItem);
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        if (!this._needCheck) return;
        if (this._isDragMove) {
            this._currDragItem.onDragEnd(e);
            this.resumeProp();
        }
        this._needCheck = false;
        this._isDragMove = false;
        this._currDragItem.touchEnabled = true;
        this._currDragItem = null;
    }
}

interface DragItem extends egret.DisplayObject {
    onDragBegin(e: egret.TouchEvent): void
    onDragEnd(e: egret.TouchEvent): void
    onDragMove(e: egret.TouchEvent): void
}

interface DragAccept extends egret.DisplayObject {
    onDragIn(item: DragItem): void
}
