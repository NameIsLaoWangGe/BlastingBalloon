import { Tools } from "../Template/Tools";

export default class Bullet extends Laya.Script {

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**属于那一列*/
    private line;

    /**角度*/
    private initialAngle: number;
    /**加速度*/
    private accelerated: number;
    /**基础速度速度*/
    private baseSpeed: number;

    /**时间线*/
    private timer: number;

    /**移动开关*/
    private moveSwitch: boolean;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Bullet'] = this;
        this.gameControl = this.self.scene['GameControl'];
        this.timer = 0;
        this.self.alpha = 1;
        this.initialAngle = 145;
        this.accelerated = 0.1;
        this.baseSpeed = 10;
        this.self.scale(0.2, 0.2);
    }

    /**
     * 通用子弹移动，按单一角度移动
     * @param angle 角度
     *  @param basedSpeed 基础速度
    */
    commonSpeedXYByAngle(angle, speed) {
        this.self.x += Tools.speedXYByAngle(angle, speed + this.accelerated).x;
        this.self.y += Tools.speedXYByAngle(angle, speed + this.accelerated).y;
    }

    /**移动规则*/
    move(): void {
        this.accelerated += 0.01;
        if (this.timer > 0 && this.timer <= 8) {
            this.commonSpeedXYByAngle(this.initialAngle, this.baseSpeed);
        } else if (this.timer > 8) {
            this.commonSpeedXYByAngle(this.initialAngle, this.baseSpeed - 0.2);
            this.self.alpha -= 0.1;
            if (this.self.alpha <= 0) {
                console.log('移除自身');
                this.self.removeSelf();
            }
        }
        this.self.scaleX += 0.1;
        this.self.scaleY += 0.1;
    }

    onUpdate() {
        if (this.moveSwitch) {
            this.timer += 1;
            this.move();
        }
    }

    onDisable(): void {
    }
}