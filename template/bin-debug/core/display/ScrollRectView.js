/**
 * Created by Saco on 16/3/21.
 */
var ScrollRectView = (function (_super) {
    __extends(ScrollRectView, _super);
    function ScrollRectView(showWidth, showHeight, totalWidth, totalHeight) {
        _super.call(this);
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
    var d = __define,c=ScrollRectView,p=c.prototype;
    d(p, "content",undefined
        ,function (content) {
            this._showContent = content;
            this._showContent.touchEnabled = true;
            this.updateView();
        }
    );
    p.updateView = function () {
        // this._showContent.mask = this.viewRect;
        this.addChild(this._showContent);
        this.setEvent();
    };
    p.setEvent = function () {
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._showContent.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this._showContent.addEventListener(egret.Event.RESIZE, this.onContentResize, this);
    };
    p.onContentResize = function () {
        this.validate();
    };
    p.onTouchBegin = function (e) {
        if (!this._scrollEnabled)
            return;
        egret.Tween.removeTweens(this);
        if (!this._viewSavePoint) {
            this._viewSavePoint = new egret.Point(e.stageX, e.stageY);
        }
        else {
            this._viewSavePoint.x = e.stageX;
            this._viewSavePoint.y = e.stageY;
        }
        this._rollSpeedX = 0;
        this._rollSpeedY = 0;
        egret.startTick(this.checkSpeed, this);
    };
    p.checkSpeed = function (frame) {
        return true;
    };
    p.onTouchEnd = function (e) {
        if (!this._scrollEnabled)
            return;
        this._viewSavePoint = null;
        this.slide();
        this._isMoving = false;
    };
    p.onTouchMove = function (e) {
        if (!this._scrollEnabled)
            return;
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
    };
    p.setPosition = function (para) {
        if (para != "y") {
            this.positionX = Math.abs(this._showContent.x / this._showContent.scaleX);
            this.progressX = -this._showContent.x / (this._totalWidth - this.viewRect.width) / this._showContent.scaleX;
        }
        if (para != "x") {
            this.positionY = Math.abs(-this._showContent.y / this._showContent.scaleY);
            this.progressY = -this._showContent.y / (this._totalHeight - this.viewRect.height) / this._showContent.scaleY;
        }
        this.onMove();
    };
    p.validate = function (para) {
        var tarX = this._showContent.x;
        var tarY = this._showContent.y;
        if (para != "y") {
            if (tarX < (this.viewRect.width - this._totalWidth * this._showContent.scaleX)) {
                tarX = (this.viewRect.width - this._totalWidth * this._showContent.scaleX);
            }
            if (tarX > 0) {
                tarX = 0;
            }
            this._showContent.x = tarX;
        }
        if (para == "x")
            return;
        if (tarY < (this.viewRect.height - this._totalHeight * this._showContent.scaleY)) {
            tarY = (this.viewRect.height - this._totalHeight * this._showContent.scaleY);
        }
        if (tarY > 0) {
            tarY = 0;
        }
        this._showContent.y = tarY;
        // this.updateMask(); //TODO update size
    };
    p.updateMask = function () {
        this.viewRect.x = -this._showContent.x / this._showContent.scaleX;
        this.viewRect.y = -this._showContent.y / this._showContent.scaleY;
        this._showContent.mask = this.viewRect;
    };
    p.validateAndTween = function () {
        var _this = this;
        var tarX = this._showContent.x;
        var tarY = this._showContent.y;
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
        egret.Tween.get(this, { onChange: this.setPosition, onChangeObj: this }).to({ slideXNoValidate: tarX, slideYNoValidate: tarY }, 300, egret.Ease.quadOut).call(function () {
            _this._isTweening = false;
        }, this);
    };
    p.slide = function () {
        if (this._isTweening)
            return;
        var maxSpeed = Math.max(Math.abs(this._rollSpeedX), Math.abs(this._rollSpeedY));
        var tarX = this._showContent.x + this._rollSpeedX * maxSpeed / 5;
        var tarY = this._showContent.y + this._rollSpeedY * maxSpeed / 5;
        var slideTime = 400 + maxSpeed / 12;
        egret.Tween.get(this, { onChange: this.setPosition, onChangeObj: this }).to({ slideX: tarX, slideY: tarY }, slideTime, egret.Ease.quadOut);
    };
    p.onMove = function () {
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
    };
    p.dispatchMove = function () {
        this.dispatchEvent(new egret.Event(ScrollRectView.EVENT_PROGRESS_MOVE));
    };
    p.dispatchUpdate = function () {
        this._lastPositionX = this.positionX;
        this._lastPositionY = this.positionY;
        this.dispatchEvent(new egret.Event(ScrollRectView.EVENT_PROGRESS_UPDATE));
    };
    d(p, "slideXNoValidate"
        ,function () {
            return this._showContent.x;
        }
        ,function (value) {
            this._showContent.x = value;
            this.setPosition("x");
        }
    );
    d(p, "slideYNoValidate"
        ,function () {
            return this._showContent.y;
        }
        ,function (value) {
            this._showContent.y = value;
            this.setPosition("y");
        }
    );
    d(p, "slideX"
        ,function () {
            return this._showContent.x;
        }
        ,function (value) {
            this._showContent.x = value;
            this.validate("x");
            this.setPosition("x");
        }
    );
    d(p, "slideY"
        ,function () {
            return this._showContent.y;
        }
        ,function (value) {
            this._showContent.y = value;
            this.validate("y");
            this.setPosition("y");
        }
    );
    d(p, "showContent"
        ,function () {
            return this._showContent;
        }
    );
    p.setViewPosition = function (offsetX, offsetY) {
        this._showContent.x = -offsetX * this._showContent.scaleX;
        this._showContent.y = -offsetY * this._showContent.scaleY;
        this.validate();
        this.setPosition();
    };
    d(p, "scrollEnabled",undefined
        ,function (value) {
            this._scrollEnabled = value;
            egret.Tween.removeTweens(this);
            if (value) {
                this.validateAndTween();
            }
        }
    );
    ScrollRectView.EVENT_PROGRESS_UPDATE = "event_progress_update";
    ScrollRectView.EVENT_PROGRESS_MOVE = "event_progress_move";
    return ScrollRectView;
}(egret.DisplayObjectContainer));
egret.registerClass(ScrollRectView,'ScrollRectView');
