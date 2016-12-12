/**
 * Created by Saco on 16/5/13.
 */
var DropDownList = (function (_super) {
    __extends(DropDownList, _super);
    function DropDownList() {
        _super.call(this);
        this.skinName = "resource/skins/component/DropDownListSkin.exml";
    }
    var d = __define,c=DropDownList,p=c.prototype;
    p.childrenCreated = function () {
        this.dropList.visible = false;
        this.dropDown.touchEnabled = true;
        this.dropScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dropDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropDown, this);
        this.itemList.itemRenderer = DropDownListItem;
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelectItem, this);
    };
    p.onSelectItem = function () {
        this.dropList.visible = false;
        if (this.itemList.selectedIndex == this._lastSelectIndex) {
            return;
        }
        this.updateDisplay();
    };
    p.showDropDown = function () {
        this.dropList.visible = !this.dropList.visible;
    };
    p.setSelectdIndex = function (value) {
        this.itemList.selectedIndex = value;
        this.onSelectItem();
    };
    p.getSelectedIndex = function () {
        return this.itemList.selectedIndex;
    };
    p.updateDisplay = function () {
        this._lastSelectIndex = this.itemList.selectedIndex;
        this.selectedItem = this.itemList.selectedItem;
        if (this.itemList.selectedItem) {
            this.selected.text = this.itemList.selectedItem.label;
        }
        else {
            this.selected.text = "";
        }
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    d(p, "dataProvider"
        ,function () {
            return this._dataProvider;
        }
        ,function (data) {
            this._dataProvider = data;
            this.itemList.dataProvider = this._dataProvider;
            if (data.length > 0) {
                this.itemList.selectedIndex = 0;
            }
            this.updateDisplay();
        }
    );
    return DropDownList;
}(eui.Component));
egret.registerClass(DropDownList,'DropDownList');
