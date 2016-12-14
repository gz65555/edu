/**
 * Created by HuSong on 2016/12/13.
 */
class Balloon extends eui.Component {
    label:eui.Label;
    ball:eui.Image;
    word:string;
    proto:any;
    boom:eui.Image;
    constructor() {
        super();
    }

    init(index:number) {
        this.proto = GameData.BALL_CONFIG[index];
        this.ball.source = this.proto.ballImg;
    }

    setWord(config:any) {
        this.boom.visible = false;
        this.word = config.text;
        this.label.text = config.show;
    }

    onClick() {
        this.boom.visible = true;
    }
}