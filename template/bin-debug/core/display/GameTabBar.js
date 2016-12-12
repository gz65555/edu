var superSetter = egret.superSetter;
/**
 * Created by husong on 16/4/7.
 */
var GameTabBar = (function (_super) {
    __extends(GameTabBar, _super);
    function GameTabBar() {
        _super.call(this);
        this.setButtonSkin("tabNormal", "tabOver");
    }
    var d = __define,c=GameTabBar,p=c.prototype;
    d(p, "selectedIndex",undefined
        ,function (value) {
            if (this._selectIndex == value)
                return;
            if (this._selectIndex != null) {
                this._tabButton[this._selectIndex].setState(ButtonState.UP);
            }
            this._selectIndex = value;
            if (this._tabButton[this._selectIndex]) {
                this._tabButton[this._selectIndex].setState(ButtonState.DOWN);
            }
            this._contentContainer.removeChildren();
            this._contentContainer.addChild(this._content[this._selectIndex]);
            this.swapChildrenAt(this._selectIndex, Object.keys(this._tabButton).length - 1);
        }
    );
    p.setContent = function (index, content, btnLabel) {
        this._content[index] = content;
        var btn = new Button();
        btn.buttonWidth = this._tabButtonWidth;
        btn.setBtnSkin(this._buttonSkins[0], this._buttonSkins[1], this._buttonSkins[2]);
        btn.setLabelDisplay(btnLabel);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateSelectIndex, this);
        this._tabButton[index] = btn;
        this._validateProp = true;
        egret.callLater(this.updateButtonDisplay, this);
    };
    return GameTabBar;
}(Tabbar));
egret.registerClass(GameTabBar,'GameTabBar');
