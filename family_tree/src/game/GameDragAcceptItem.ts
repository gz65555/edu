/**
 * Created by HuSong on 2016/12/10.
 */
class GameDragAcceptItem extends eui.Component implements DragAccept {
    constructor() {
        super();
    }

    proto:any;
    img:eui.Image;
    txtName:eui.Label;
    init(index) {
        this.proto = GameData.config[index];
        this.img.source = this.proto.accept_img;
        this.txtName.text = '';
    }

    childrenCreated() {
        super.childrenCreated();
        Api.DragManager.regAcceptDrag(this);
    }

    onDragIn(item:GameDragItem) {
        this.txtName.text = item.proto.text;
        item.visible = false;
    }

    check() {
        if(this.txtName.text == this.proto.text) {
            return true;
        }
        this.txtName.textColor = 0xff0000;
        return false;
    }

    reset() {
        this.txtName.text = "";
        this.txtName.textColor = 0x333333;
    }
}