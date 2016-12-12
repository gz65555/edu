/**
 * Created by Saco on 16/5/15.
 */
class UnderLineLabel extends egret.DisplayObjectContainer {
    private _label:egret.TextField;
    private _underLine:egret.Shape;
    public constructor() {
        super();
        this.init();
    }
    
    private init():void {
        this._label = new egret.TextField();
        this._underLine = new egret.Shape();
        this.addChild(this._label);
        this.addChild(this._underLine);
    }

    public set text(value:string) {
        this._label.text = value;
        this.updateUnderLine();
    }

    public updateUnderLine():void {
        egret.callLater(()=>{
            var bounds:egret.Rectangle = this.getLabelBounds();
            this._underLine.graphics.clear();
            this._underLine.graphics.lineStyle(2, this._label.textColor);
            this._underLine.graphics.moveTo(bounds.x, bounds.y + bounds.height);
            this._underLine.graphics.lineTo(bounds.x + bounds.width, bounds.y + bounds.height);
        }, this);
    }

    private getLabelBounds():egret.Rectangle {
        var bounds = new egret.Rectangle();
        bounds.width = this._label.textWidth;
        bounds.height = this._label.textHeight;
        if (this._label.textAlign == egret.HorizontalAlign.LEFT) {
            bounds.x = 0;
        } else if (this._label.textAlign == egret.HorizontalAlign.CENTER) {
            bounds.x = (this._label.width - this._label.textWidth)/2;
        } else if (this._label.textAlign == egret.HorizontalAlign.RIGHT) {
            bounds.x = this._label.width - this._label.textWidth;
        }

        if (this._label.verticalAlign == egret.VerticalAlign.TOP) {
            bounds.y = 0;
        } else if (this._label.verticalAlign == egret.VerticalAlign.MIDDLE) {
            bounds.y = (this._label.height - this._label.textHeight)/2;
        } else if (this._label.verticalAlign == egret.VerticalAlign.BOTTOM) {
            bounds.y = this._label.height - this._label.textHeight;
        }
        return bounds;
    }
    
    public get text():string {
        return this._label.text;
    }
    
    public get label():egret.TextField {
        return this._label;
    }
}