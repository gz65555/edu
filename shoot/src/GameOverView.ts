/**
 * Created by Saco at 2016/12/ 5
 **/
class GameOverView extends BaseView {
    private tf_score: eui.Label;
    private tf_total: eui.Label;
    private tf_evalue: eui.Label;
    private btn_restart: eui.Label;
    public constructor() {
        super();
        this.skinName = new GameOverSkin();
    }

    public initView(): void {
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    }

    public open(para): void {
        super.open();
        this.tf_total.text = para;
        if (para <= 2) {
            this.tf_evalue.text = "Try Again";
        } else if (para <= 4) {
            this.tf_evalue.text = "Very Good!";
            egret.setTimeout(() => {
                RES.getRes("good_mp3").play(0, 1);
            }, this, 500);
        } else {
            this.tf_evalue.text = "Excellent!";
            egret.setTimeout(() => {
                RES.getRes("excellent_mp3").play(0, 1);
            }, this, 500);
        }

        this.tf_score.text = "总分数：" + para + "分";
    }

    private onRestart(): void {
        this.close();
    }

    public close(): void {
        super.close();
        Api.ViewManager.regView(2, GameView, LayerType.GAME);
        Api.ViewManager.openView(2);
    }
}
