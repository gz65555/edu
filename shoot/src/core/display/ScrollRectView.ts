/**
 * Created by Saco on 16/3/21.
 */
class ScrollRectView extends egret.DisplayObjectContainer {
    public static EVENT_PROGRESS_UPDATE: string = "event_progress_update";
    public static EVENT_PROGRESS_MOVE: string = "event_progress_move";

    private _viewSavePoint: egret.Point;
    private _showContent: egret.DisplayObject;
    private _rollSpeedX: number;
    private _rollSpeedY: number;
    private _totalWidth: number;
    private _totalHeight: number;
    private _lastPositionX: number;
    private _lastPositionY: number;
    private _scrollEnabled: boolean;
    private _isTweening: boolean;
    private _isMoving: boolean;

    public viewRect: egret.Rectangle;
    public progressX: number;
    public progressY: number;
    public positionX: number;
    public positionY: number;

    public constructor(showWidth: number, showHeight: number, totalWidth: number, totalHeight: number) {
        super();
        this.viewRect = new egret.Rectangle(0, 0, showWidth, showHeight);
        this._totalHeight = totalHeight;
        this._totalWidth = totalWidth;
        this._viewSavePoint = new egret.Point();
        this.progressX = 0;
        this.progressY = 0;
        this.positionX = 0;
        this.positionY = 0;
        this._lastPositionX = 0;
        this._lastPositionY = 0;
        this._scrollEnabled = true;
    }

    public set content(content: egret.DisplayObject) {
        this._showContent = content;
        this._showContent.touchEnabled = true;
        this.updateView();
    }

    private updateView(): void {
        // this._showContent.mask = this.viewRect;
        this.addChild(this._showContent);
        this.setEvent();
    }

    private setEvent(): void {
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this._showContent.addEventListener(egret.Event.RESIZE, this.onContentResize, this);
    }

    private onContentResize(): void {
        this.validate();
    }

    private onTouchBegin(e: egret.TouchEvent): void {
        if (!this._scrollEnabled) return;
        egret.Tween.removeTweens(this);
        if (!this._viewSavePoint) {
            this._viewSavePoint = new egret.Point(e.stageX, e.stageY);
        } else {
            this._viewSavePoint.x = e.stageX;
            this._viewSavePoint.y = e.stageY;
        }
        this._rollSpeedX = 0;
        this._rollSpeedY = 0;
        egret.startTick(this.checkSpeed, this);
    }

    private checkSpeed(frame: number): boolean {
        return true;
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        if (!this._scrollEnabled) return;
        this._viewSavePoint = null;
        this.slide();
        this._isMoving = false;
    }

    private onTouchMove(e: egret.TouchEvent): void {
        if (!this._scrollEnabled) return;
        if (!this._viewSavePoint) {
            this._viewSavePoint = new egret.Point(e.stageX, e.stageY);
        }
        this._rollSpeedX = e.stageX - this._viewSavePoint.x;
        this._rollSpeedY = e.stageY - this._viewSavePoint.y;
        this._viewSavePoint.x = e.stageX;
        this._viewSavePoint.y = e.stageY;
        if (this._rollSpeedX > 3 || this._rollSpeedX < -3 || this._rollSpeedY > 3 || this._rollSpeedY < -3) {
            this._showContent.x += this._rollSpeedX;
            this._showContent.y += this._rollSpeedY;
            this.validate();
            this.setPosition();
            if (!this._isMoving) {
                // this.dispatchEvent(new GameEvent(Events.MOVE_MAP_BEGIN));
                this._isMoving = true;
            }
        }
    }

    private setPosition(para?): void {
        if (para != "y") {
            this.positionX = Math.abs(this._showContent.x / this._showContent.scaleX);
            this.progressX = -this._showContent.x / (this._totalWidth - this.viewRect.width) / this._showContent.scaleX;
        }
        if (para != "x") {
            this.positionY = Math.abs(-this._showContent.y / this._showContent.scaleY);
            this.progressY = -this._showContent.y / (this._totalHeight - this.viewRect.height) / this._showContent.scaleY;
        }
        this.onMove();
    }

    private validate(para?: string): void {
        var tarX: number = this._showContent.x;
        var tarY: number = this._showContent.y;
        if (para != "y") {
            if (tarX < (this.viewRect.width - this._totalWidth * this._showContent.scaleX)) {
                tarX = (this.viewRect.width - this._totalWidth * this._showContent.scaleX);
            }
            if (tarX > 0) {
                tarX = 0;
            }
            this._showContent.x = tarX;
        }

        if (para == "x") return;
        if (tarY < (this.viewRect.height - this._totalHeight * this._showContent.scaleY)) {
            tarY = (this.viewRect.height - this._totalHeight * this._showContent.scaleY);
        }
        if (tarY > 0) {
            tarY = 0;
        }
        this._showContent.y = tarY;
        // this.updateMask(); //TODO update size
    }

    private updateMask(): void {
        this.viewRect.x = -this._showContent.x / this._showContent.scaleX;
        this.viewRect.y = -this._showContent.y / this._showContent.scaleY;
        this._showContent.mask = this.viewRect;
    }

    private validateAndTween(): void {
        var tarX: number = this._showContent.x;
        var tarY: number = this._showContent.y;
        if (tarX < (this.viewRect.width - this._totalWidth * this._showContent.scaleX)) {
            tarX = (this.viewRect.width - this._totalWidth * this._showContent.scaleX);
        }
        if (tarX > 0) {
            tarX = 0;
        }

        if (tarY < (this.viewRect.height - this._totalHeight * this._showContent.scaleY)) {
            tarY = (this.viewRect.height - this._totalHeight * this._showContent.scaleY);
        }
        if (tarY > 0) {
            tarY = 0;
        }
        this._isTweening = true;
        egret.Tween.get(this, { onChange: this.setPosition, onChangeObj: this }).to({ slideXNoValidate: tarX, slideYNoValidate: tarY }, 300, egret.Ease.quadOut).call(() => {
            this._isTweening = false;
        }, this);
    }

    private slide(): void {
        if (this._isTweening) return;
        var maxSpeed = Math.max(Math.abs(this._rollSpeedX), Math.abs(this._rollSpeedY));
        var tarX = this._showContent.x + this._rollSpeedX * maxSpeed / 5;
        var tarY = this._showContent.y + this._rollSpeedY * maxSpeed / 5;
        var slideTime = 400 + maxSpeed / 12;
        egret.Tween.get(this, { onChange: this.setPosition, onChangeObj: this }).to({ slideX: tarX, slideY: tarY }, slideTime, egret.Ease.quadOut);
    }

    private onMove(): void {
        if (Math.abs(this._lastPositionX - this.positionX) > 10) {
            this.dispatchMove();
            if (Math.abs(this._lastPositionX - this.positionX) > 50) {
                this.dispatchUpdate();
                return;
            }
        }
        if (Math.abs(this._lastPositionY - this.positionY) > 10) {
            this.dispatchMove();
            if (Math.abs(this._lastPositionY - this.positionY) > 50) {
                this.dispatchUpdate();
            }
        }
    }

    private dispatchMove(): void {
        this.dispatchEvent(new egret.Event(ScrollRectView.EVENT_PROGRESS_MOVE));
    }

    private dispatchUpdate(): void {
        this._lastPositionX = this.positionX;
        this._lastPositionY = this.positionY;
        this.dispatchEvent(new egret.Event(ScrollRectView.EVENT_PROGRESS_UPDATE));
    }

    public set slideXNoValidate(value: number) {
        this._showContent.x = value;
        this.setPosition("x");
    }

    public get slideXNoValidate(): number {
        return this._showContent.x;
    }

    public set slideYNoValidate(value: number) {
        this._showContent.y = value;
        this.setPosition("y");
    }

    public get slideYNoValidate(): number {
        return this._showContent.y;
    }


    public set slideX(value: number) {
        this._showContent.x = value;
        this.validate("x");
        this.setPosition("x");
    }

    public get slideX(): number {
        return this._showContent.x;
    }

    public set slideY(value: number) {
        this._showContent.y = value;
        this.validate("y");
        this.setPosition("y");
    }

    public get slideY(): number {
        return this._showContent.y;
    }

    public get showContent(): egret.DisplayObject {
        return this._showContent;
    }

    public setViewPosition(offsetX: number, offsetY: number): void {
        this._showContent.x = -offsetX * this._showContent.scaleX;
        this._showContent.y = -offsetY * this._showContent.scaleY;
        this.validate();
        this.setPosition();
    }

    public set scrollEnabled(value: boolean) {
        this._scrollEnabled = value;
        egret.Tween.removeTweens(this);
        if (value) {
            this.validateAndTween();
        }
    }
}
