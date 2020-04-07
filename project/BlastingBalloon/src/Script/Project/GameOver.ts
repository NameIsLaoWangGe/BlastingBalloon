import { Animation } from "../Template/Animation";
import { Clicks } from "../Template/Clicks";
import { PalyAudio } from "../Template/PlayAudio";
import { Adaptive } from "../Template/Adaptive";

export default class GameOver extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

    /** @prop {name:btn_again, tips:"再来按钮", type:Node}*/
    public btn_again: Laya.Sprite;

    /** @prop {name:btn_return, tips:"返回", type:Node}*/
    public btn_return: Laya.Sprite;

    /** @prop {name:scoreNode, tips:"分数节点", type:Node}*/
    public scoreNode: Laya.Sprite;

    /** @prop {name:background, tips:"背景", type:Node}*/
    public background: Laya.Image;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**当前等级*/
    private Levels: Laya.FontClip;
    /**时间卡牌节点*/
    private line: Laya.Sprite

    /**logo的渐隐动画开关*/
    private logoSwitch: boolean
    private logoChange: string

    /**结算类型是胜利还是失败*/
    private settlementType: string

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOver'] = this;
        this.gameControl = this.self.scene['GameControl'];
        this.Levels = this.gameControl.Levels as Laya.FontClip;
        this.line = this.gameControl.line as Laya.Sprite;

        this.logoSwitch = false;
        this.logoChange = 'appear';

        Adaptive.interface_Center(this.self);
        Adaptive.background_Center(this.background, this.self);
    }

    /**
     * 胜利或者失败的设置
     * @param type 类型包括胜利和失败
     */
    gameOverType(type): void {
        if (type === 'victory') {
            this.btn_again.loadImage('UI/下一关按钮.png');
            this.settlementType = 'victory';
            this.logo.loadImage('UI/闯关成功logo.png');
            PalyAudio.gameOver(1);
        } else if (type === 'defeated') {
            this.btn_again.loadImage('UI/重来按钮.png');
            this.settlementType = 'defeated';
            this.logo.loadImage('UI/闯关失败logo.png');
            PalyAudio.gameOver(1);
        }
        let score = this.scoreNode.getChildByName('score') as Laya.FontClip;
        score.value = this.Levels.value;

        this.appaer();
    }

    /**出现动画*/
    appaer(): void {
        let scale = 1.3;
        let time1 = 250;
        let time2 = 60;
        let delayed = 200;
        PalyAudio.aAingleCard(3);
        Animation.fade_out(this.background, 0, 0.8, 200, 0, null);

        Animation.bombs_Appear(this.scoreNode, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 0, null);

        Animation.bombs_Appear(this.logo, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 1, null);

        Animation.bombs_Appear(this.btn_again, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, null);

        Animation.bombs_Appear(this.btn_return, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 3, func => this.clicksOnBtn());
    }

    /** 
     * 界面元素下落消失动画
     * 一种是重来消失
     * 一种是返回主界面消失
     * 他们回调函数不一样
     * @param type
    */
    vanish(type): void {
        // 三个元素的下落动画
        let time = 250;
        let delayed = 100;
        Animation.fade_out(this.background, 0.8, 0, time, delayed * 4, null);

        Animation.bombs_Vanish(this.scoreNode, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 0, null);

        Animation.bombs_Vanish(this.logo, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 1, null);

        Animation.bombs_Vanish(this.btn_again, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 2, null);

        Animation.bombs_Vanish(this.btn_return, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 3, f => {
            if (type === 'return') {
                this.gameControl.leaveAnimation();
            } else {
                if (this.settlementType === 'victory') {
                    // 下一关
                    this.gameControl.moveToNextLevel();
                } else if (this.settlementType === 'defeated') {
                    // 重来
                    this.gameControl.againCurrentlevel();
                }
            }
            this.self.removeSelf();

        });
    }
    /**
     * 下落消失回调
     * 一种是重来消失
     * 一种是返回主界面消失
     * @param type 
     */
    vanishFunc(type): void {
        // 关闭bannar广告
        if (Laya.Browser.onMiniGame) {
            this.gameControl.bannerAd.hide();
        }
        this.self.removeSelf();
    }

    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_again, this, null, null, this.up, null);
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_return, this, null, null, this.up, null);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.btn_again, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_return, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        this.clicksOffBtn();
        if (event.currentTarget.name === 'btn_again') {
            this.vanish('again');
        } else if (event.currentTarget.name === 'btn_return') {
            this.vanish('return');
        }
    }

    onUpdate(): void {
        if (this.logoSwitch) {
            if (this.logoChange === 'appear') {
                this.logo.alpha -= 0.01;
                if (this.logo.alpha < 0.3) {
                    this.logoChange = 'vanish';
                }
            } else if (this.logoChange === 'vanish') {
                this.logo.alpha += 0.01;
                if (this.logo.alpha >= 1) {
                    this.logoChange = 'appear';
                }
            }
        }
    }

    onDisable(): void {
    }
}