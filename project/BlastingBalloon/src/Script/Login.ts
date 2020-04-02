import { WXDataManager } from "./Template/WXDataManager";
export default class Login extends Laya.Script {
    /** @prop {name:background, tips:"背景图节点", type:Node}*/
    public background: Laya.Sprite;

    /** @prop {name:name, tips:"玩家名称", type:Node}*/
    public name: Laya.Label;

    /** @prop {name:head, tips:"玩家头像", type:Node}*/
    public head: Laya.Image;

    constructor() { super(); }

    onEnable(): void {
        this.loderBackground();
        WXDataManager.normalWXLogin();
    }

    /**加载背景图*/
    loderBackground(): void {
        let self = this;2
        let url = 'https://7265-release-lwg-1301725130.tcb.qcloud.la/background/%E8%83%8C%E6%99%AF%E5%9B%BE.png?sign=df6e8c6c287f2a1bdf1dbab26fa1d884&t=1585665019'
        Laya.loader.load(url, Laya.Handler.create(this, function () {
            self.background.loadImage(url);
        }));
    }

    onDisable(): void {
    }
}