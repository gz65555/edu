/**
 * Created by Saco on 2014/12/1.
 */
class HotspotBitmap extends egret.Bitmap
{
    private _hotspot:any[];
    public constructor()
    {
        super();
        this._hotspot = [];
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    }

    public addHotspotArea(rect:egret.Rectangle, callback:Function, thisObj:any, para?:any):void
    {
        this._hotspot.push({"rect":rect, "callback":callback, "thisObj":thisObj, "para":para});
    }

    private onTouch(e:egret.TouchEvent):void
    {
        var x:number = e.localX;
        var y:number = e.localY;
        var tempObj:any;
        for(var i:number = 0;i < this._hotspot.length;i ++)
        {
            tempObj = this._hotspot[i];
            if(tempObj.rect.contains(x, y))
            {
                if(tempObj.para)
                    tempObj.callback.call(tempObj.thisObj, tempObj.para);
                else
                    tempObj.callback.call(tempObj.thisObj);
            }

        }
    }
}