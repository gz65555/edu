/**
 * Created by Saco on 16/5/13.
 */
class DropDownList extends eui.Component {
    private dropList:eui.Group;
    protected itemList:eui.List;
    private dropDown:eui.Image;
    public selected:eui.Label;
    private dropScroller:eui.Scroller;
    private _dataProvider:eui.ArrayCollection;
    private _lastSelectIndex:number;
    public selectedItem:any;
    public constructor() {
        super();
        this.skinName = "resource/skins/component/DropDownListSkin.exml";
    }

    public childrenCreated():void {
        this.dropList.visible = false;
        this.dropDown.touchEnabled = true;
        this.dropScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dropDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropDown, this);
        this.itemList.itemRenderer = DropDownListItem;
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelectItem, this);
    }
    
    private onSelectItem():void {
        this.dropList.visible = false;
        if (this.itemList.selectedIndex == this._lastSelectIndex) {
            return;
        }
        this.updateDisplay();
    }
    
    private showDropDown():void {
        this.dropList.visible = !this.dropList.visible;
    }

	public setSelectdIndex(value:number) {
		this.itemList.selectedIndex = value;
		this.onSelectItem();
	}

	public getSelectedIndex():number {
		return this.itemList.selectedIndex;
	}

    protected updateDisplay():void {
        this._lastSelectIndex = this.itemList.selectedIndex;
        this.selectedItem = this.itemList.selectedItem;
        if (this.itemList.selectedItem) {
            this.selected.text = this.itemList.selectedItem.label;
        } else {
            this.selected.text = "";
        }
        this.dispatchEventWith(egret.Event.CHANGE);
    }

    public set dataProvider(data:eui.ArrayCollection) {
        this._dataProvider = data;
        this.itemList.dataProvider = this._dataProvider;
        if (data.length > 0) {
            this.itemList.selectedIndex = 0;
        }
        this.updateDisplay();
    }

    public get dataProvider():eui.ArrayCollection {
        return this._dataProvider;
    }
}
