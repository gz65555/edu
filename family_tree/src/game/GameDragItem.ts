/**
 * Created by HuSong on 2016/12/10.
 */
class GameDragItem extends eui.Component implements DragItem {
    public static DRAG_BEGIN = 'drag_begin';
    public static DRAG_END = 'drag_end';
    public static DRAG_MOVE = 'drag_move';
    constructor() {
        super();
    }

    proto:any;
    img:eui.Image;
    init(index:number) {
        this.proto = GameData.config[index];
        this.img.source = this.proto.drag_img;
    }

    childrenCreated() {
        super.childrenCreated();
        Api.DragManager.regDragItem(this);
    }

    onDragBegin(e: egret.TouchEvent): void {
        this.dispatchEventWith(GameDragItem.DRAG_BEGIN);
    }
    onDragEnd(e: egret.TouchEvent): void {
        this.dispatchEventWith(GameDragItem.DRAG_END);
    }
    onDragMove(e: egret.TouchEvent): void {
    }

    reset() {
        this.visible = true;
    }
}