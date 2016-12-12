/**
 * Created by HuSong on 2016/12/10.
 */
class GameView extends BaseView {
    btn:eui.Image;
    tf_total:eui.Label;
    constructor() {
        super();
        this.skinName = new GameSkin();
    }

    public initView() {
        super.initView();

        this.forEachDragItem((item:GameDragItem, index)=> {
            item.init(index)
        });
        this.forEachDragAccept((item:GameDragAcceptItem, index)=> {
            item.init(index);
        });
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=> {
            if (this.btn.source == 'check_png') {
                this.check();
                Api.ViewManager.openView(4, GameData.score);
                this.btn.source = 'submit_png';
            } else {
                Api.ViewManager.openView(3, GameData.score);
            }
        }, this)
    }

    public check() {
        GameData.score = 0;
        this.forEachDragAccept(item => {
            if (item.check()) {
                GameData.score += 1;
            }
        });
        this.tf_total.text = GameData.score.toString();
    }

    public reset() {
        GameData.score = 0;
        this.tf_total.text = "0";
        this.btn.source = 'check_png';
        this.forEachDragItem((item)=> {
            item.reset();
        });
        this.forEachDragAccept((item)=> {
            item.reset();
        })
    }

    private forEachDragItem(func:Function) {
        this.forEachItem('drag', func);
    }

    private forEachDragAccept(func:Function) {
        this.forEachItem('drag_ac', func);
    }

    private forEachItem(name, func) {
        for (let i = 0; i < 6; i++) {
            func(this[name + '_' + i], i);
        }
    }
}