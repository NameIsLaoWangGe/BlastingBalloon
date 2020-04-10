import { Clicks } from "../Template/Clicks";
import { PalyAudio } from "../Template/PlayAudio";
import { Animation } from "../Template/Animation";
import { Advertising } from "../Template/Advertising";
import { Adaptive } from "../Template/Adaptive";

export default class Hint extends Laya.Script {
    /** @prop {name:background, tips:"背景图", type:Node}*/
    public background: Laya.Image;

    /** @prop {name:btn_watch, tips:"看广告按钮", type:Node}*/
    public btn_watch: Laya.Sprite;

    /** @prop {name:btn_not, tips:"不看广告按钮", type:Node}*/
    public btn_not: Laya.Sprite;

    /** @prop {name:hintBox, tips:"提示节点", type:Node}*/
    public hintBox: Laya.Sprite;


    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Hint'] = this;
        this.gameControl = this.self.scene['GameControl'];
        Adaptive.interface_Center(this.self);
        Adaptive.background_Center(this.background, this.self);
        this.appaer();
    }

    /**出现动画*/
    appaer(): void {
        let scale = 1.3;
        let time1 = 250;
        let time2 = 80;
        let delayed = 200;
        Animation.fade_out(this.background, 0, 0.8, 200, 0, null);

        Animation.bombs_Appear(this.hintBox, 0, 1, scale - 0.2, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 0, null);

        Animation.bombs_Appear(this.btn_not, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 1, null);

        Animation.bombs_Appear(this.btn_watch, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, f => {
            this.appaerFunc();
        });
    }
    /**
     * 消失回调
     */
    appaerFunc(): void {
        this.clicksOnBtn();
    }

    /** 
     * 消失
    */
    vanish(): void {
        // 三个元素的下落动画
        let time = 250;
        let delayed = 150;
        Animation.fade_out(this.background, 0.8, 0, time, delayed * 4, null);

        Animation.bombs_Vanish(this.btn_watch, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 1, null);

        Animation.bombs_Vanish(this.btn_not, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 2, null);

        Animation.bombs_Vanish(this.hintBox, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 3, f => {
            this.vanishFunc();
        });
    }

    /**
     * 消失回调
     */
    vanishFunc(): void {
        this.gameControl.timeSwicth = true;
        this.self.removeSelf();
    }
    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_not, this, null, null, this.up, null);
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_watch, this, null, null, this.up, null);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.btn_not, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_watch, this, null, null, this.up, null);
    }
    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        if (event.currentTarget.name === 'btn_watch') {
            // 加载广告
            if (Laya.Browser.onMiniGame) {
                Advertising.videoAd_01.show().then(() => console.log('banner 广告显示'));
            }
        } else {
            // 直接关闭
        }
        this.clicksOffBtn();
        this.vanish();
    }

    onDisable(): void {
    }
}