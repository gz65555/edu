/**
 * Created by HuSong on 2016/5/6.
 */
var TabbarButton = (function (_super) {
    __extends(TabbarButton, _super);
    function TabbarButton() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=TabbarButton,p=c.prototype;
    p.setBtnSkin = function (upState, downState) {
        this.up.source = upState;
        this.down.source = downState;
    };
    p.setLabelDisplay = function (dis) {
        if (typeof dis == "string") {
            this.label.text = dis;
        }
        else {
            this._labelDis = dis;
            this.addChild(this._labelDis);
            this.label.visible = false;
        }
    };
    p.init = function () {
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
    };
    p.fill = function (com) {
        com.scale9Grid = new egret.Rectangle(23, 24, 60, 26);
        com.top = 0;
        com.bottom = 0;
        com.left = 0;
        com.right = 0;
    };
    p.active = function () {
        this.up.visible = false;
        this.down.visible = true;
        this.label.textColor = 0xfff100;
    };
    p.deactive = function () {
        this.up.visible = true;
        this.down.visible = false;
        this.label.textColor = 0xffffff;
    };
    p.setButtonWidth = function (value) {
        this.width = value;
    };
    return TabbarButton;
}(eui.Group));
egret.registerClass(TabbarButton,'TabbarButton');
var TabbarButtonData = (function () {
    function TabbarButtonData() {
    }
    var d = __define,c=TabbarButtonData,p=c.prototype;
    return TabbarButtonData;
}());
egret.registerClass(TabbarButtonData,'TabbarButtonData');
