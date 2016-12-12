/**
 * Created by Saco on 16/3/21.
 */
class StageUtil {

    public stageHeight: number;
    public stageWidth: number;
    public stage: egret.Stage;

    public constructor(stage: egret.Stage) {
        this.init(stage);
    }

    private init(stage: egret.Stage): void {
        this.stage = stage;
        this.stageHeight = stage.stageHeight;
        this.stageWidth = stage.stageWidth;
        this.stage.addEventListener(egret.Event.RESIZE, this.resizeStage, this);
    }

    private resizeStage(): void {
        this.stageHeight = this.stage.stageHeight;
        this.stageWidth = this.stage.stageWidth;
        Api.Layers.resizeLayer();
    }
}
