/**
 * Created by Saco on 16/5/13.
 */
var DropDownListItem = (function (_super) {
    __extends(DropDownListItem, _super);
    function DropDownListItem() {
        _super.call(this);
        this.initDisplay();
    }
    var d = __define,c=DropDownListItem,p=c.prototype;
    p.initDisplay = function () {
        this.left = 0;
        this.right = 0;
        this.height = 30;
        this.stroke = 1;
        this.size = 20;
        this.verticalAlign = "middle";
        this.textAlign = "center";
    };
    d(p, "data"
        ,function () {
            return this._data;
        }
        ,function (data) {
            this._data = data;
            this.dataChanged();
        }
    );
    p.dataChanged = function () {
        this.text = this._data.label;
    };
    return DropDownListItem;
}(eui.Label));
egret.registerClass(DropDownListItem,'DropDownListItem',["eui.IItemRenderer","eui.UIComponent"]);
