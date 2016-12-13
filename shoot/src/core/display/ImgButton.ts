/**
 * Created by Saco on 2014/12/19.
 */
class ImgButton extends egret.DisplayObjectContainer
{
    private _btn:egret.Bitmap;
    private _label:egret.TextField;
    private _labelImg:egret.Bitmap;
    private _resArr:egret.Texture[];
    public constructor()
    {
        super();
        this.init();
        this.touchEnabled = true;
        this.touchChildren = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchBegin():void{
        if(this._resArr[1])
            this._btn.texture = this._resArr[1];
    }

    private onTouchEnd():void{
        if(this._resArr[0])
            this._btn.texture = this._resArr[0];
    }

    private init():void{
        this._btn = new egret.Bitmap();
        this._label = new egret.TextField();
        this._label.size = 28;
        this._label.fontFamily = "黑体";
        this._label.textColor = 0xffffff;
        this._label.textAlign = "center";
        this._label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._label.x = 25;
        this._labelImg = new egret.Bitmap();
        this.addChild(this._btn);
        this.addChild(this._labelImg);
        this.addChild(this._label);
    }

    public initRes(up:string, down:string, label?:string,  labelImg?:string):void{
        this._resArr = [RES.getRes(up), RES.getRes(down)];
        this._btn.texture = this._resArr[0];
        if(label){
            this.setLable(label);
        }
        if(labelImg){
            this._labelImg.x = this._btn.width/2;
            this._labelImg.y = this._btn.height/2;
            this._labelImg.texture = RES.getRes(labelImg);
        }
    }

    public setLable(label:string):void{
        this._label.width = this._btn.width - 50;
        this._label.height = this._btn.height;
        this._label.text = label;
    }

    public setImgLabel(label:string):void{
        this._labelImg.texture = RES.getRes(label);
        this._labelImg.x = this._btn.width/2;
        this._labelImg.y = this._btn.height/2;
    }
}
