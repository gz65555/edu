/**
 * Created by HuSong on 2016/12/12.
 */
class GameView extends BaseView {
    dragAccept:GameDragAcceptItem;
    txtMark:eui.Label;
    tf_total:eui.Label;
    MAX_QUESTION = 6;
    btn:eui.Image;
    gameGroup:eui.Group;
    constructor() {
        super();
        this.skinName = new GameSkin();
    }

    public initView() {
        super.initView();
        this.forEachDragItem((item:GameDragItem, index)=>{
            item.init(index);
        });
        this.dragAccept.addEventListener(GameDragAcceptItem.DRAG_IN, this.onDragIn, this);
        this.gameGroup.touchChildren = false;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
    }

    private onBtnTouch() {
        if(this.index == 0) {
            this.start();
        } else {
            Api.ViewManager.close(this);
            Api.ViewManager.openView(3, GameData.score);
        }
    }

    public open() {
        super.open();
        this.index = 0;
    }

    index = 0;
    private start() {
        this.gameGroup.touchChildren = true;
        this.btn.visible = false;
        let config = GameData.pic_mapping;
        config.forEach((item)=>{
            item.randomKey = Math.random();
        });
        config.sort((t1, t2)=> t1.randomKey - t2.randomKey);
        config.forEach((item, index)=>{
            this.resetImage(index);
        });
        this.forEachDragItem(item=>{
            item.visible = true;
        });
        this.index = 0;
        GameData.score = 0;
        this.tf_total.text = '0';
        this.next();
    }

    private next() {
        if(this.index > 0) {
            this.resetImage(this.index - 1);
        }
        if(this.index >= this.MAX_QUESTION) {
            this.end();
            return;
        }
        this.markImage(this.index);
        this.dragAccept.reset();
        this.dragAccept.init(this.index);
        this.txtMark.text = (this.index + 1) + '/' + this.MAX_QUESTION;
        this.index++;
    }

    private end() {
        this.btn.source = 'submit_png';
        this.btn.visible = true;
    }

    private resetImage(index) {
        let config = GameData.pic_mapping[index];
        this[config.text].source = config.normal;
    }

    private markImage(index) {
        let config = GameData.pic_mapping[index];
        this[config.text].source = config.select;
    }

    private forEachDragItem(func:Function) {
        this.forEachItem('drag', func);
    }

    private forEachItem(name, func) {
        for (let i = 0; i < 6; i++) {
            func(this[name + '_' + i], i);
        }
    }
    
    private onDragIn() {
        if(this.dragAccept.check()) {
            Api.ViewManager.openView(4, 1);
            GameData.score++;
            this.tf_total.text = GameData.score.toString();
            RES.getRes('welldone_mp3').play(0, 1);
        } else {
            RES.getRes('oops_mp3').play(0, 1);
        }
        
        egret.setTimeout(this.next, this, 2000);
    }
}