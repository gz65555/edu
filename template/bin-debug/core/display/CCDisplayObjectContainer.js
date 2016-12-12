/**
 * Created by Saco on 2015/6/2.
 */
var CCDisplayObjectContainer = (function (_super) {
    __extends(CCDisplayObjectContainer, _super);
    function CCDisplayObjectContainer() {
        _super.call(this);
        this._childIndex = {};
    }
    var d = __define,c=CCDisplayObjectContainer,p=c.prototype;
    p.addChild = function (item) {
        this._childIndex[this.getNewMaxIndex()] = item;
        return _super.prototype.addChild.call(this, item);
    };
    p.addChildAt = function (item, index) {
        this.validateChildrenIndex(index);
        this._childIndex[index] = item;
        this.addChild(item);
        this.sortChildren(index);
        return item;
    };
    p.removeChild = function (item) {
        this.deleteChild(item);
        return _super.prototype.removeChild.call(this, item);
    };
    p.getNewMaxIndex = function () {
        var childKeys = Object.keys(this._childIndex);
        childKeys.sort();
        return parseFloat(childKeys[childKeys.length - 1]) + 1;
    };
    p.deleteChild = function (item) {
        var keys = Object.keys(this._childIndex);
        for (var i = 0, len = keys.length; i < len; i++) {
            if (this._childIndex[keys[i]] == item) {
                delete this._childIndex[keys[i]];
                break;
            }
        }
    };
    p.validateChildrenIndex = function (index) {
        var tempIndex = index;
        while (this._childIndex[tempIndex]) {
            tempIndex -= 0.01;
            if (this._childIndex[tempIndex] == undefined) {
                for (var i = tempIndex; i < index; i += 0.01) {
                    this._childIndex[i] = this._childIndex[i + 0.01];
                }
                break;
            }
        }
    };
    p.sortChildren = function (index) {
        var childKeys = Object.keys(this._childIndex);
        childKeys.sort();
        for (var i = 0, len = childKeys.length; i < len; i++) {
            if (i < index)
                continue;
            this.addChild(this._childIndex[childKeys[i]]);
        }
    };
    p.setChildZIndex = function (item, zindex) {
        this.validateChildrenIndex(zindex);
        this.addChild(item);
        this.sortChildren(zindex);
    };
    return CCDisplayObjectContainer;
}(egret.DisplayObjectContainer));
egret.registerClass(CCDisplayObjectContainer,'CCDisplayObjectContainer');
