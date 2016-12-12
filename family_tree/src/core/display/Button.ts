/**
 * Created by Saco on 16/3/26.
 */
class Button extends eui.Component {
    private labelDisplay:eui.Label;
    private up:eui.Image;
    private down:eui.Image;
    private disable:eui.Image;
    private _labelDis:egret.DisplayObject;
    private _enabled:boolean;
    private _isInited;
    private _dis:any;
    private _touchBegin;

    public _btnWidth:number;
    public _btnHeight:number;

    public constructor() {
        super();
        this._enabled = true;
        this.initEvent();
        this.skinName = "resource/skins/component/SimpleButtonSkin.exml";
    }

    private initEvent():void {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    public createChildren():void {
        super.createChildren();
        this._isInited = true;
        if (this._dis) {
            this.setLabelDisplay(this._dis);
        }
    }

    public set buttonWidth(value:number) {
        this._btnWidth = value;
        this.width = value;
    }

    public get buttonWidth():number {
        return this._btnWidth
    }

    private onTouchEnd():void {
        if (!this._enabled) return;
        if (this._touchBegin) {
            this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        }
        this._touchBegin = false;
        this.currentState = ButtonState.UP;
    }

    private onTouchBegin():void {
        if (!this._enabled) return;
        this._touchBegin = true;
        this.currentState = ButtonState.DOWN;
    }

    public set enabled(value) {
        this._enabled = value;
        if (value) {
            this.currentState = ButtonState.UP;
        } else {
            this.currentState = ButtonState.DISABLE;
        }
    }

    public get enabled():boolean {
        return this._enabled;
    }

    public setBtnSkin(upState:string, downState?:string, disableState?:string):void {
        this.up.source = upState;
        if (downState) {
            this.down.source = downState;
        } else {
            this.down.source = upState;
        }
        if (disableState) {
            this.disable.source = disableState;
        } else {
            this.disable.source = upState;
        }
    }

    public setLabelDisplay(dis:any):void {
        if (!this._isInited) {
            this._dis = dis;
            return;
        }
        if (typeof dis == "string") {
            this.labelDisplay.text = dis;
        } else {
            this._labelDis = dis;
            this.addChild(this._labelDis);
            this.labelDisplay.visible = false;
        }
    }
}