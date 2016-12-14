/**
 * Created by HuSong on 2016/12/12.
 */
class GameView extends BaseView {
    private errorTime = 0;
    private selectBall:Balloon;
    private cooldown = 10;
    private txtTime:eui.Label;
    private questionIndex = 0;
    private txtMark:eui.Label;
    private gameGroup:eui.Group;
    private ballGroup:eui.Group;
    private questionConfig:any;
    private boomImg:eui.Image;
    private tf_total:eui.Label;
    arrow:eui.Image;
    btn:eui.Button;

    constructor() {
        super();
        this.skinName = new GameSkin();
    }

    private onRight() {
        Api.ViewManager.openView(4, 1);
        GameData.score++;
        this.tf_total.text = GameData.score.toString();
        GameView.playWinSound();
        this.boom(this.selectBall);
        this.endSpeedUp(this.next.bind(this));
    }

    private onError() {
        this.errorTime++;
        GameView.playErrorSound();
        if (this.errorTime == 2) {
            this.endSpeedUp(this.next.bind(this));
        }
        this.speedUp();
    }

    private complete() {
        this.gameGroup.touchChildren = false;
        this.ballGroup.visible = false;
        GameView.playErrorSound();
        egret.setTimeout(this.next, this, 1000);
    }

    timerId = 0;

    private next() {
        this.arrow.x = 543;
        this.arrow.y = 615;
        this.errorTime = 0;
        this.arrow.rotation = 0;
        this.selectBall = null;
        this.boomImg.visible = false;
        this.cooldown = GameData.GAME_CD;
        this.updateTime();
        if (!this.checkEnd()) {
            this.ballGroup.visible = true;
            this.gameGroup.touchChildren = true;
            this.timerId = Api.TimerManager.regCountdown(this.cooldown, this.update, this.complete, this);
            this.txtMark.text = (this.questionIndex + 1) + '/' + GameData.MAX_INDEX;
            this.releaseBall();
            this.playSound();
        } else {
            Api.ViewManager.openView(3, GameData.score)
        }
        this.questionIndex++;
    }

    private update(count:number) {
        this.cooldown = count;
        this.updateTime();
    }

    private updateTime() {
        this.txtTime.text = this.cooldown.toString();
    }

    private playSound() {
        //todo play sound
        // RES.getRes(this.questionConfig[this.questionIndex].audio).play(0, 1);
        console.log(this.questionConfig[this.questionIndex].text);
    }

    private releaseBall() {
        let questions = GameData.ALL_QUESTION.filter(item=>item.text != this.questionConfig[this.questionIndex].text);
        let ballWords = [];
        //随机三个单词
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * questions.length);
            ballWords.push(questions[randomIndex]);
            questions.splice(randomIndex, 1);
        }
        //随机插入正确
        ballWords.splice(Math.floor(Math.random() * 4), 0, this.questionConfig[this.questionIndex]);
        //设置气球单词
        for (let i = 0; i < 4; i++) {
            this['ball' + (i + 1)].setWord(ballWords[i]);
            this['ball' + (i + 1)].visible = true;
        }
        egret.Tween.removeTweens(this.ballGroup);
        this.ballGroup.y = GameData.START_Y;
        egret.Tween.get(this.ballGroup).to({y: GameData.END_Y}, GameData.GAME_CD * 1000);
    }

    private endSpeedUp(callback:Function) {
        this.gameGroup.touchChildren = false;
        if(this.cooldown > 1) {
            Api.TimerManager.remove(this.timerId);
            egret.Tween.removeTweens(this.ballGroup);
            egret.Tween.get(this.ballGroup).to({y: GameData.END_Y}, 1000).call(callback);
        }
    }

    private speedUp() {

    }

    private boom(ball:Balloon) {
        let point = {x: ball.x + this.ballGroup.x, y: this.ballGroup.y};
        this.boomImg.source = ball.proto.boomImg;
        this.boomImg.visible = true;
        this.boomImg.x = point.x;
        this.boomImg.y = point.y;
        ball.visible = false;
    }

    private checkEnd():boolean {
        return this.questionIndex == GameData.MAX_INDEX;
    }

    open() {
        super.open();

    }

    start() {
        this.cooldown = 3;
        this.updateTime();
        Api.TimerManager.regCountdown(3, (count)=> {
            this.cooldown = count;
            this.updateTime();
        }, this.next, this);

        this.questionConfig = [];
        let config = GameData.ALL_QUESTION.slice(0);
        for (let i = 0; i < GameData.MAX_INDEX; i++) {
            let randomIndex = Math.floor(Math.random() * config.length);
            this.questionConfig.push(config[randomIndex]);
            config.splice(randomIndex, 1);
        }
    }

    initView() {
        super.initView();
        for (let i = 0; i < 4; i++) {
            var ball = (<Balloon>this['ball' + (i + 1)]);
            ball.init(i);
            ball.touchChildren = false;
        }
        this.txtMark.text = 1 + '/' + GameData.MAX_INDEX;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=> {
            this.btn.visible = false;
            this.start();
        }, this);
        this.ballGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallTouch, this);
    }

    private onBallTouch(e:egret.TouchEvent) {
        var ball = <Balloon>e.target;
        this.selectBall = ball;
        if (ball.word == this.questionConfig[this.questionIndex - 1].text) {
            let point = {x: ball.x + this.ballGroup.x + 98, y: this.ballGroup.y + 111};
            let angle = Math.atan((point.x - this.arrow.x) / (point.y - this.arrow.y));
            point.x = point.x + 500 * Math.sin(-angle);
            point.y = point.y - 500 * Math.cos(angle);
            angle = -angle * 180 / Math.PI;
            this.arrow.rotation = angle;
            ball.onClick();
            egret.Tween.get(this.arrow).to({x: point.x, y: point.y}, 150);
            this.onRight();
        } else {
            this.onError();
        }
    }

    private static playWinSound():void {
        var sounds = ["verygood", "excellent", "goodjob", "welldone"];
        var index = Math.floor(Math.random() * 4);
        RES.getRes(sounds[index] + "_mp3").play(0, 1);
    }

    private static playErrorSound() {
        RES.getRes("oops_mp3").play(0, 1);
    }

}