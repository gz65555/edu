/**
 * Created by HuSong on 2016/12/10.
 */
class GameDragAcceptItem extends eui.Component implements DragAccept {
    public static DRAG_IN = 'drag_in';
    constructor() {
        super();
    }

    txtAnswer:eui.Label;
    correct:string = '';
    init(index) {
        this.correct = GameData.pic_mapping[index].text;
    }

    childrenCreated() {
        super.childrenCreated();
        Api.DragManager.regAcceptDrag(this);
    }

    onDragIn(item:GameDragItem) {
        if(this.txtAnswer.text != "") {
            return;
        }
        this.txtAnswer.text = item.proto.text;
        item.visible = false;
        this.dispatchEventWith(GameDragAcceptItem.DRAG_IN);
    }

    check():boolean {
        if(this.correct == this.txtAnswer.text) {
            return true;
        }
        this.txtAnswer.textColor = 0xff0000;
        return false;
    }

    reset() {
        this.txtAnswer.text = "";
        this.txtAnswer.textColor = 0xffffff;
    }
}