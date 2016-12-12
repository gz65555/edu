/**
 * Created by HuSong on 2016/12/10.
 */
var GameDragAcceptItem = (function (_super) {
    __extends(GameDragAcceptItem, _super);
    function GameDragAcceptItem() {
        _super.call(this);
    }
    var d = __define,c=GameDragAcceptItem,p=c.prototype;
    p.init = function (index) {
        this.proto = GameData.config[index];
        this.img.source = this.proto.accept_img;
        this.txtName.text = '';
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        Api.DragManager.regAcceptDrag(this);
    };
    p.onDragIn = function (item) {
        this.txtName.text = item.proto.text;
        item.visible = false;
    };
    p.check = function () {
        if (this.txtName.text == this.proto.text) {
            return true;
        }
        this.txtName.textColor = 0xff0000;
        return false;
    };
    p.reset = function () {
        this.txtName.text = "";
        this.txtName.textColor = 0x333333;
    };
    return GameDragAcceptItem;
}(eui.Component));
egret.registerClass(GameDragAcceptItem,'GameDragAcceptItem',["DragAccept"]);
