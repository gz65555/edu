/**
 * Created by HuSong on 2016/12/10.
 */
var GameDragAcceptItem = (function (_super) {
    __extends(GameDragAcceptItem, _super);
    function GameDragAcceptItem() {
        _super.call(this);
        this.correct = '';
    }
    var d = __define,c=GameDragAcceptItem,p=c.prototype;
    p.init = function (index) {
        this.correct = GameData.pic_mapping[index].text;
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        Api.DragManager.regAcceptDrag(this);
    };
    p.onDragIn = function (item) {
        if (this.txtAnswer.text != "") {
            return;
        }
        this.txtAnswer.text = item.proto.text;
        item.visible = false;
        this.dispatchEventWith(GameDragAcceptItem.DRAG_IN);
    };
    p.check = function () {
        if (this.correct == this.txtAnswer.text) {
            return true;
        }
        this.txtAnswer.textColor = 0xff0000;
        return false;
    };
    p.reset = function () {
        this.txtAnswer.text = "";
        this.txtAnswer.textColor = 0xffffff;
    };
    GameDragAcceptItem.DRAG_IN = 'drag_in';
    return GameDragAcceptItem;
}(eui.Component));
egret.registerClass(GameDragAcceptItem,'GameDragAcceptItem',["DragAccept"]);
