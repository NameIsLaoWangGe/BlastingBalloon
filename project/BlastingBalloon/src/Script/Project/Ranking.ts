import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";
import { Adaptive } from "../Template/Adaptive";
import { Advertising } from "../Template/Advertising";

export default class Ranking extends Laya.Script {
    /** @prop {name:background, tips:"黑色背景图", type:Node}*/
    public background: Laya.Image;

    /** @prop {name:baseboard, tips:"排行内容", type:Node}*/
    public baseboard: Laya.Sprite;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Ranking'] = this;
        this.gameControl = this.self.scene['GameControl'];
        Adaptive.background_Center(this.background, this.self);
        Adaptive.interface_Center(this.self);
        this.appear();
    }

    onAwake() {
        console.log('排行榜');
        if (Laya.Browser.onMiniGame) {
            let wx: any = Laya.Browser.window.wx;
            let openDataContext: any = wx.getOpenDataContext();
            openDataContext.postMessage({ action: 'ranking' });
        }
    }

    /**出现*/
    appear(): void {
        let time = 300;
        //背景出现
        Animation.fade_out(this.background, 0, 0.3, time, 0, null);
        //底板出现
        Animation.fade_out(this.baseboard, 0, 1, time, 0, func => this.clicksOnBtn());
    }

    /**消失*/
    vanish(): void {
        let time = 300;
        //背景出现
        Animation.fade_out(this.background, 0.3, 0, time, 0, func => this.vanishFunc());
        //底板出现
        Animation.fade_out(this.baseboard, 1, 0, time, 0, null);
    }

    /**消失动画回调*/
    vanishFunc(): void {
        this.self.removeSelf();
        // 发送排行榜关闭的消息
        if (Laya.Browser.onMiniGame) {
            let wx: any = Laya.Browser.window.wx;
            let openDataContext: any = wx.getOpenDataContext();
            openDataContext.postMessage({ action: 'close' });
        }
      
    }

    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.background, this, null, null, this.up, null);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.background, this, null, null, this.up, null);
    }
    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        this.vanish();
        console.log('我点击了背景！');
    }

    onDisable(): void {

    }
}