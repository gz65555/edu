/**
 * Created by Saco at 2016/12/ 5
 **/
class GameStartView extends BaseView {
    private btn_start: eui.Button;
    public constructor() {
        super();
        this.skinName = new GameStartSkin();
    }

    public initView(): void {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    }

    private onStart(): void {
        this.close();
    }

    public close(): void {
        super.close();
        Api.ViewManager.openView(2);
    }
}
