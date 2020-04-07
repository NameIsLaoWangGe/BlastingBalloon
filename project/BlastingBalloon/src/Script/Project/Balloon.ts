import GameControl from "./GameControl";
import { Clicks } from "../Template/Clicks";
export default class Balloon extends Laya.Script {
    /** @prop {name:img, tips:"气球的皮肤", type:Node}*/
    public img: Laya.Image;
    /**
     * 场景脚本组件
     */
    private gameControl
    /**
     * 指代当前挂载脚本的节点
     */
    private self: Laya.Sprite

    constructor() {
        super();
    }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.gameControl = this.self.scene['GameControl'];
        this.self['Balloon'] = this;
    }

    /**
     * 点击正确
     * 点击正确后，删除顺序数组的第一个和当前的气球，确保顺序和气球数量依然一一对应
     */
    clickRight(): void {
        this.self.removeSelf();
        if (this.gameControl.clickOrderArr.length > 0) {
            this.gameControl.clickOrderArr.shift();
        }
        this.gameControl.balloonClickOrder();

        if (this.gameControl.clickOrderArr.length === 0) {
            this.gameControl.createGameOver('victory');
        }
    }

    /**
     * 点击错误
     */
    clickError(): void {

    }

    /**开启点击事件*/
    balloonClicksOn(): void {
        Clicks.clicksOn('balloon', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
    }
    /**关闭点击事件*/
    balloonClicksOff(): void {
        Clicks.clicksOff('balloon', this.self, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        // 无论点错点对时间都停止
        event.currentTarget.scale(Clicks.balloonScale, Clicks.balloonScale);
        if (this.self.name === this.gameControl.clickOrderArr[0]) {
            console.log('点击正确1');
            this.clickRight();
        } else {
            console.log('点击错误！');
        }
    }

    onDisable(): void {

    }
    onUpdate() {
    }
}