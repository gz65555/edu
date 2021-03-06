import superSetter = egret.superSetter;
/**
 * Created by husong on 16/4/7.
 */
class GameTabBar extends Tabbar {
    constructor() {
        super();
        this.setButtonSkin("tabNormal", "tabOver");
    }

    public set selectedIndex(value:number) {
        if (this._selectIndex == value) return;
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

    public setContent(index:number, content:egret.DisplayObject, btnLabel:any):void {
        this._content[index] = content;
        var btn = new Button();
        btn.buttonWidth = this._tabButtonWidth;
        btn.setBtnSkin(this._buttonSkins[0], this._buttonSkins[1], this._buttonSkins[2]);
        btn.setLabelDisplay(btnLabel);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateSelectIndex, this);
        this._tabButton[index] = btn;
        this._validateProp = true;
        egret.callLater(this.updateButtonDisplay, this);
    }
}