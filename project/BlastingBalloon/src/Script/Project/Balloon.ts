import GameControl from "./GameControl";
import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";
import { SkTemplete } from "../Template/SkTemplete";
import { Enum } from "../Template/Enum";
import { PalyAudio } from "../Template/PlayAudio";

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

    /**骨骼动画模板*/
    private templet: Laya.Templet
    /**骨骼动画*/
    private skeleton: Laya.Skeleton

    /**加载完成开关*/
    private loadOnOff;

    constructor() {
        super();
    }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Balloon'] = this;
        this.gameControl = this.self.scene['GameControl'];
    }

    /**骨骼动画设置*/
    skeletoninit() {
        this.skeleton = SkTemplete.baoolonTemplet.buildArmature(0);
        this.skeleton.pos(150, 160);
        this.skeleton.play(Enum.Sk_Ballon_Type.scale + '_' + this.self.name, true);
        this.self.addChild(this.skeleton);
    }

    /**播放骨骼动画
     * @param type 播放动画类型
     * @param loop 是否循环
     * @param speed 播放速度
    */
    playSkeletonAni(type: string, loop: boolean, speed: number): void {
        this.skeleton.play(type + '_' + this.self.name, loop);
        this.skeleton.rotation = 0;
        this.skeleton.playbackRate(speed);
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
     * 气球全部播放摇头动画，自己播放鄙视动画
     */
    clickError(): void {
        this.gameControl.createGameOver('defeated');
        Animation.leftRight_Shake(this.self, 20, 20, 50, f => {
            let parentArr = this.self.parent._children;
            for (let index = 0; index < parentArr.length; index++) {
                const element = parentArr[index];
                element['Balloon'].skeleton.play(Enum.Sk_Ballon_Type.error + '_' + element.name, true);
            }
            this.playSkeletonAni(Enum.Sk_Ballon_Type.disdain, true, 1);//自己鄙视动画
        })
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
            // 特效表现
            this.gameControl.explodeAni(this.gameControl.BalloonVessel, this.self.x + (1 - Clicks.balloonScale) * this.self.pivotX / 2, this.self.y + (1 - Clicks.balloonScale) * this.self.pivotY / 2, this.self.name, 20, 10)
            PalyAudio.playSound(Enum.AudioName.balloonRight, 1);
            this.clickRight();
        } else {
            this.clickError();
            PalyAudio.playSound(Enum.AudioName.balloonError, 1);
        }
    }

    onDisable(): void {
        this.skeleton.removeSelf();
    }
    onUpdate() {

    }
}