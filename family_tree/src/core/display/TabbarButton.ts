/**
 * Created by HuSong on 2016/5/6.
 */
class TabbarButton extends eui.Group {
    private up:eui.Image;
    private down:eui.Image;
    private _labelDis:egret.DisplayObject;
    public label:eui.Label;
    public data:TabbarButtonData;

    constructor() {
        super();
        this.init();
    }

    public setBtnSkin(upState:string, downState:string):void {
        this.up.source = upState;
        this.down.source = downState;
    }

    public setLabelDisplay(dis:any):void {
        if (typeof dis == "string") {
            this.label.text = dis;
        } else {
            this._labelDis = dis;
            this.addChild(this._labelDis);
            this.label.visible = false;
        }
    }
    
    private init() {
        this.up = new eui.Image();
        this.down = new eui.Image();
        this.down.visible = false;
        this.addChild(this.up);
        this.addChild(this.down);
        this.label = new eui.Label();
        this.label.verticalCenter = 0;
        this.label.horizontalCenter = 0;
        this.label.size = 26;
        this.label.bold = true;
        this.label.fontFamily = "黑体";
        this.label.textColor = 0xffffff;
        this.label.fontFamily = "SimHei";
        this.fill(this.up);
        this.fill(this.down);
        this.addChild(this.label);
    }
    
    private fill(com):void {
        com.scale9Grid = new egret.Rectangle(23, 24, 60, 26);
        com.top = 0;
        com.bottom = 0;
        com.left = 0;
        com.right = 0;
    }
    
    public active() {
        this.up.visible = false;
        this.down.visible = true;
		this.label.textColor = 0xfff100;
    }
    public deactive() {
        this.up.visible = true;
        this.down.visible = false;
		this.label.textColor = 0xffffff;
    }
    public setButtonWidth(value:number) {
        this.width = value;
    }
}

class TabbarButtonData {
    public label:string;
    public data:any;
    public content:egret.DisplayObject;
    public adaption:string;
}
