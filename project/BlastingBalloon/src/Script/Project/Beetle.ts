import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";

export default class Beetle extends Laya.Script {

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;

    /**气球综合节点*/
    private BalloonVessel: Laya.Sprite

    /**骨骼动画模板*/
    private templet: Laya.Templet
    /**骨骼动画*/
    private skeleton: Laya.Skeleton

    /**移动开关*/
    private moveSwitch: boolean

    /**移动开关*/
    private posSwitch: boolean

    /**随机地点*/
    private moveX: number
    private moveY: number

    /**停留时间计时*/
    private remainTime: number = 0

    /**移动速度*/
    private speed: number

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Beetle'] = this;
        this.gameControl = this.self.scene['GameControl'];
        this.BalloonVessel = this.gameControl.BalloonVessel as Laya.Sprite;
        this.skeleton = this.self.getChildByName('skeleton') as Laya.Skeleton;
        this.createBoneAni();
        this.birthLocation();
        this.speed = 8;
        this.clicksOnBtn();
    }

    /**
     * 甲虫随机出生位置
     * */
    birthLocation(): void {
        // 先随机从两边哪个方向出生,然后确定x的位置
        let direction = Math.floor(Math.random() * 2);
        if (direction === 1) {
            this.self.x = this.BalloonVessel.x + this.BalloonVessel.width / 2 + 800;
        } else {
            this.self.x = this.BalloonVessel.x + this.BalloonVessel.width / 2 - 800;
        }
        // 随机y轴位置,即是BalloonVessel的高度和位置范围
        this.self.y = this.BalloonVessel.y + (Math.random() * 1) * this.BalloonVessel.height;
    }

    /**
     * 随机位置计算
     * */
    movePos(): void {
        let shrink = 80;//向内部缩放
        this.moveX = this.BalloonVessel.x - this.BalloonVessel.width / 2 + 50 + (this.BalloonVessel.width - shrink * 2) * (Math.random() * 1);
        this.moveY = this.BalloonVessel.y + shrink + (this.BalloonVessel.height - shrink * 2) * (Math.random() * 1);
    }

    /**创建骨骼动画皮肤*/
    createBoneAni(): void {
        //创建动画模板
        this.templet = new Laya.Templet();
        this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.templet.on(Laya.Event.ERROR, this, this.onError);
        this.templet.loadAni("Skeleton/beetle_01.sk");
    }

    onError(): void {
        console.log('骨骼动画加载错误！');
    }

    parseComplete(): void {
        this.moveSwitch = true;
        this.posSwitch = true;
        this.playSkeletonAni(1, 'move');
    }

    /**播放骨骼动画
   * @param speed 播放速度
   * @param type 播放动画类型
   */
    playSkeletonAni(speed: number, type: string): void {
        this.skeleton.play(type, true);
        this.skeleton.rotation = 0;
        this.skeleton.playbackRate(speed);
    }

    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.beetleScale = this.self.scaleX;
        Clicks.clicksOn('beetle', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
    }
    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('beetle', this.self, this, null, null, this.up, null);
    }
    /**抬起*/
    up(event): void {
        this.clicksOffBtn();
        event.currentTarget.scale(Clicks.beetleScale, Clicks.beetleScale);
        this.gameControl.createGameOver('defeated');
    }

    /**
     * 移动规则
     * 朝着随机好的地点移动
     * 移动目标位置后，停止移动
    */
    moveRule(): void {
        // 向量计算并且归一化，向量长度为1。
        let point = new Laya.Point(this.moveX - this.self.x, this.moveY - this.self.y);
        point.normalize();
        //向量相加移动
        this.self.x += point.x * this.speed;
        this.self.y += point.y * this.speed;

        let differenceX = Math.abs(this.self.x - this.moveX);
        let differenceY = Math.abs(this.self.y - this.moveY);
        if (differenceX < 10 && differenceY < 10) {
            this.playSkeletonAni(1, 'stand');
            this.moveSwitch = false;
            this.remainTime = 0;
        }
    }

    onUpdate(): void {
        // 移动开关打开
        if (this.moveSwitch) {
            // 随机地点设置打开后，立马关闭，只执行一次
            if (this.posSwitch) {
                this.movePos();
                this.playSkeletonAni(1, 'move');
                this.posSwitch = false;
            } else {
                // 随机一次地点后，开始进行移动
                // 先转向在移动
                this.moveRule();
            }
        } else {
            // 停止移动后，计时开始，到一定时间后，继续移动
            this.remainTime++;
            if (this.remainTime > 200) {
                this.moveSwitch = true;
                this.posSwitch = true;
            }
        }
    }
    onDisable(): void {
    }
}