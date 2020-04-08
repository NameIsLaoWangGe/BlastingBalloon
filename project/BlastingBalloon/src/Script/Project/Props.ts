import { Clicks } from "../Template/Clicks";

export default class Props extends Laya.Script {
    /** @prop {name:prop_icon, tips:"道具图标", type:Node}*/
    public prop_icon: Laya.Sprite;

    /** @prop {name:propNum, tips:"道具数量", type:Node}*/
    public propNum: Laya.FontClip;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Porps'] = this;
        this.gameControl = this.self.scene['GameControl'];
        this.clicksOnBtn();
    }

    /**按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.self, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        this.gameControl.createHint();
    }



    onDisable(): void {
    }
}