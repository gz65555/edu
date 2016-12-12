/**
 * Created by Saco on 16/5/21.
 */
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        _super.call(this);
        this._currentFrame = 0;
        this._pastTime = 0;
        this.frameRate = 30;
        this.touchEnabled = false;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=MovieClip,p=c.prototype;
    d(p, "frameRate"
        ,function () {
            return this._frameRate;
        }
        ,function (value) {
            this._frameRate = value;
            this._frameTime = Math.abs(1000 / value);
        }
    );
    p.setFrameData = function (frames) {
        this._frameKeys = frames;
        this._totalFrame = this._frameKeys.length;
        this._frameTexture = [];
        var checkResource = true;
        for (var i = 0; i < this._totalFrame; i++) {
            if (RES.getRes(this._frameKeys[i]) == null) {
                checkResource = false;
                break;
            }
        }
        if (!checkResource) {
            this._loadGroupName = "group" + Math.random();
            RES.createGroup(this._loadGroupName, frames);
            RES.loadGroup(this._loadGroupName);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResLoaded, this);
        }
        else {
            this.initResource();
        }
    };
    p.initResource = function () {
        for (var i = 0, len = this._totalFrame; i < len; i++) {
            this._frameTexture.push(RES.getRes(this._frameKeys[i]));
        }
        this.texture = this._frameTexture[0];
        this._pastTime = 0;
    };
    p.onResLoaded = function (e) {
        if (e.groupName == this._loadGroupName) {
            this.initResource();
        }
    };
    p.play = function (count) {
        if (count === void 0) { count = -1; }
        if (this._ticker != -1) {
            this.stop();
        }
        this._playCount = count;
        this._currentFrame = 0;
        this._ticker = Api.TimerManager.startTicker(this.enterFrame, this);
    };
    p.resume = function () {
        this._ticker = Api.TimerManager.startTicker(this.enterFrame, this);
    };
    p.stop = function () {
        Api.TimerManager.remove(this._ticker);
        this._ticker = -1;
    };
    p.removeFromStage = function () {
        this._autoStop = true;
        this.stop();
    };
    p.addToStage = function () {
        if (this._autoStop) {
            this.play(this._playCount);
        }
    };
    p.enterFrame = function (frameTime) {
        if (!this._frameTexture || !this._frameTexture.length) {
            return;
        }
        this._pastTime += frameTime;
        if (this._pastTime < this._frameTime)
            return;
        this._currentFrame++;
        this._pastTime = 0;
        if (this._currentFrame >= this._totalFrame) {
            this._currentFrame = 0;
            if (this._playCount != -1) {
                this._playCount--;
                if (this._playCount == 0) {
                    this.over();
                }
            }
        }
        this.texture = this._frameTexture[this._currentFrame];
    };
    p.over = function () {
        this.stop();
        this._currentFrame = 0;
        // var evt = new GameEvent(Events.MOVIE_OVER);
        // evt.eventBody = this;
        // this.dispatchEvent(evt);
    };
    p.reset = function () {
        this.stop();
        this._frameTexture = [];
        this._frameKeys = [];
        this._totalFrame = 0;
        this._pastTime = 0;
        this._autoStop = false;
    };
    return MovieClip;
}(egret.Bitmap));
egret.registerClass(MovieClip,'MovieClip');
