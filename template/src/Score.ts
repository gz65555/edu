/**
 * Created by Saco at 2016/12/10
 **/
class Score extends BaseView {
    private tf_score: eui.Label;
    public constructor() {
        super();
        this.skinName = new ScoreSkin();
        this.width = 195;
        this.height = 95;
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    protected setSize(): void { }

    public initView(): void {

    }

    public open(txt): void {
        super.open();
        this.tf_score.text = txt;
        egret.callLater(() => {
            var tarY = this.y - 100;
            egret.Tween.get(this).to({ y: tarY }, 1000).call(this.close, this);
        }, this);
    }
}
