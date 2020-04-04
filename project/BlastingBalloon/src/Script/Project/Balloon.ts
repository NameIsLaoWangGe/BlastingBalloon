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
    /**开启点击事件*/
    cardClicksOn(): void {
        Clicks.clicksOn('balloon', '音效/按钮点击.mp3', this.self, this, null, null, null, null);
    }
    /**关闭点击事件*/
    cardClicksOff(): void {
        Clicks.clicksOff('balloon', this.self, this, null, null, null, null);
    }
    /**按下*/
    down(event): void {
        event.currentTarget.scale(1.1, 1.1);
        // let indicateNum = this.gameControl.indicateNum;
        // if (this.number.value === indicateNum.value) {
        //     PalyAudio.clickRight(1);
        //     this.board.skin = 'UI/正确底板.png';
        // } else {
        //     PalyAudio.clickError(1);
        //     this.board.skin = 'UI/错误底板.png';
        // }
    }
    /**抬起*/
    up(event): void {
        // 无论点错点对时间都停止
        event.currentTarget.scale(1, 1);
        // if (this.number.value === indicateNum.value) {
        //     this.cardVanish('right');
        // } else {
        //     this.cardVanish('error');
        // }
    }

    onDisable(): void {

    }
    onUpdate() {
    }
}