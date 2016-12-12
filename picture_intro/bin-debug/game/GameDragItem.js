/**
 * Created by HuSong on 2016/12/10.
 */
var GameDragItem = (function (_super) {
    __extends(GameDragItem, _super);
    function GameDragItem() {
        _super.call(this);
    }
    var d = __define,c=GameDragItem,p=c.prototype;
    p.init = function (index) {
        this.proto = GameData.config[index];
        this.img.source = this.proto.drag_img;
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        Api.DragManager.regDragItem(this);
    };
    p.onDragBegin = function (e) {
        this.dispatchEventWith(GameDragItem.DRAG_BEGIN);
    };
    p.onDragEnd = function (e) {
        this.dispatchEventWith(GameDragItem.DRAG_END);
    };
    p.onDragMove = function (e) {
    };
    p.reset = function () {
        this.visible = true;
    };
    GameDragItem.DRAG_BEGIN = 'drag_begin';
    GameDragItem.DRAG_END = 'drag_end';
    GameDragItem.DRAG_MOVE = 'drag_move';
    return GameDragItem;
}(eui.Component));
egret.registerClass(GameDragItem,'GameDragItem',["DragItem"]);
