/**
 * Created by Saco on 16/5/21.
 */
class MovieClip extends egret.Bitmap {
    protected _playCount: number;
    protected _autoStop;
    protected _ticker: number;
    protected _frameTexture: egret.Texture[];
    protected _frameKeys: string[];
    protected _frameTime: number;
    protected _pastTime: number;
    protected _frameRate: number;
    protected _currentFrame: number;
    protected _totalFrame: number;
    protected _loadGroupName: string;
    public constructor() {
        super();
        this._currentFrame = 0;
        this._pastTime = 0;
        this.frameRate = 30;
        this.touchEnabled = false;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    public set frameRate(value: number) {
        this._frameRate = value;
        this._frameTime = Math.abs(1000 / value);
    }

    public get frameRate(): number {
        return this._frameRate;
    }

    public setFrameData(frames: string[]): void {
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
        } else {
            this.initResource();
        }
    }

    private initResource(): void {
        for (var i = 0, len = this._totalFrame; i < len; i++) {
            this._frameTexture.push(RES.getRes(this._frameKeys[i]));
        }
        this.texture = this._frameTexture[0];
        this._pastTime = 0;
    }

    private onResLoaded(e: RES.ResourceEvent): void {
        if (e.groupName == this._loadGroupName) {
            this.initResource();
        }
    }

    public play(count: number = -1): void {
        if (this._ticker != -1) {
            this.stop();
        }
        this._playCount = count;
        this._currentFrame = 0;
        this._ticker = Api.TimerManager.startTicker(this.enterFrame, this);
    }

    public resume(): void {
        this._ticker = Api.TimerManager.startTicker(this.enterFrame, this);
    }

    public stop(): void {
        Api.TimerManager.remove(this._ticker);
        this._ticker = -1;
    }

    private removeFromStage(): void {
        this._autoStop = true;
        this.stop();
    }

    private addToStage(): void {
        if (this._autoStop) {
            this.play(this._playCount);
        }
    }

    private enterFrame(frameTime: number): void {
        if (!this._frameTexture || !this._frameTexture.length) {
            return;
        }
        this._pastTime += frameTime;
        if (this._pastTime < this._frameTime) return;
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
    }

    public over(): void {
        this.stop();
        this._currentFrame = 0;
        // var evt = new GameEvent(Events.MOVIE_OVER);
        // evt.eventBody = this;
        // this.dispatchEvent(evt);
    }

    public reset(): void {
        this.stop();
        this._frameTexture = [];
        this._frameKeys = [];
        this._totalFrame = 0;
        this._pastTime = 0;
        this._autoStop = false;
    }
}
