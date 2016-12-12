/**
 * Created by Saco on 16/5/15.
 */
var UnderLineLabel = (function (_super) {
    __extends(UnderLineLabel, _super);
    function UnderLineLabel() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=UnderLineLabel,p=c.prototype;
    p.init = function () {
        this._label = new egret.TextField();
        this._underLine = new egret.Shape();
        this.addChild(this._label);
        this.addChild(this._underLine);
    };
    d(p, "text"
        ,function () {
            return this._label.text;
        }
        ,function (value) {
            this._label.text = value;
            this.updateUnderLine();
        }
    );
    p.updateUnderLine = function () {
        var _this = this;
        egret.callLater(function () {
            var bounds = _this.getLabelBounds();
            _this._underLine.graphics.clear();
            _this._underLine.graphics.lineStyle(2, _this._label.textColor);
            _this._underLine.graphics.moveTo(bounds.x, bounds.y + bounds.height);
            _this._underLine.graphics.lineTo(bounds.x + bounds.width, bounds.y + bounds.height);
        }, this);
    };
    p.getLabelBounds = function () {
        var bounds = new egret.Rectangle();
        bounds.width = this._label.textWidth;
        bounds.height = this._label.textHeight;
        if (this._label.textAlign == egret.HorizontalAlign.LEFT) {
            bounds.x = 0;
        }
        else if (this._label.textAlign == egret.HorizontalAlign.CENTER) {
            bounds.x = (this._label.width - this._label.textWidth) / 2;
        }
        else if (this._label.textAlign == egret.HorizontalAlign.RIGHT) {
            bounds.x = this._label.width - this._label.textWidth;
        }
        if (this._label.verticalAlign == egret.VerticalAlign.TOP) {
            bounds.y = 0;
        }
        else if (this._label.verticalAlign == egret.VerticalAlign.MIDDLE) {
            bounds.y = (this._label.height - this._label.textHeight) / 2;
        }
        else if (this._label.verticalAlign == egret.VerticalAlign.BOTTOM) {
            bounds.y = this._label.height - this._label.textHeight;
        }
        return bounds;
    };
    d(p, "label"
        ,function () {
            return this._label;
        }
    );
    return UnderLineLabel;
}(egret.DisplayObjectContainer));
egret.registerClass(UnderLineLabel,'UnderLineLabel');
