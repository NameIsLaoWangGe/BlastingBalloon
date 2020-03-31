import { WXDataManager } from "./Template/WXDataManager";

export default class Login extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";

    /** @prop {name:background, tips:"背景图节点", type:Node}*/
    public background: Laya.Sprite;

    constructor() { super(); }

    onEnable(): void {
        console.log('开始登陆');
        this.loderBackground();
        WXDataManager.WXLogin();
    }

    /**加载背景图*/
    loderBackground(): void {
        let self = this;
        let url = 'https://7265-release-lwg-1301725130.tcb.qcloud.la/background/%E8%83%8C%E6%99%AF%E5%9B%BE.png?sign=df6e8c6c287f2a1bdf1dbab26fa1d884&t=1585665019'
        Laya.loader.load(url, Laya.Handler.create(this, function () {
            self.background.loadImage(url);
        }));
    }

    onDisable(): void {
    }
}