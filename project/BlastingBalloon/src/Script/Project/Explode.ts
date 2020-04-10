import { Tools } from "../Template/Tools";
import { Enum } from "../Template/Enum";
export default class Explode extends Laya.Script {
    /**自己*/
    private self: Laya.Sprite;
    /**时间线*/
    private timer: number;

    /**在列中的位置*/
    private line: number;

    /**角度*/
    private initialAngle: number;
    /**加速度*/
    private accelerated: number;
    /**基础速度*/
    private randomSpeed: number;
    /**移动开关*/
    private moveSwitch: boolean;
    /**随机大小*/
    private scale: number;
    /**随机消失时间*/
    private vinshTime: number;
    /**随机起始透明度*/
    private startAlpha: number;
    /**随机旋转方向和值*/
    private rotationD: number;
    /**爆炸类型，是什么颜色、形态的糖果或者敌人或者是烟雾等*/
    private effectsType: string;
    /**子节点图片*/
    private img: Laya.Image;

    constructor() { super(); }

    onEnable(): void {
        this.timer = 0;
        this.accelerated = 0.1;
        this.self = this.owner as Laya.Sprite;
        this.img = this.self.getChildByName('img') as Laya.Image;
        this.self['Explode'] = this;
        this.self.pivotX = this.self.width / 2;
        this.self.pivotY = this.self.height / 2;
    }

    /**初始化设置*/
    initProperty(type): void {
        this.effectsType = type;
        if (this.effectsType === Enum.BalloonName[0] || this.effectsType === Enum.BalloonName[1] || this.effectsType === Enum.BalloonName[2] || this.effectsType === Enum.BalloonName[3]) {
            this.explosionBalloon_P();
        } else if (type === 'vanish') {
            this.vanish_P();
        }
        this.img.pivotX = this.img.width / 2;
        this.img.pivotY = this.img.height / 2;
    }

    /**气球爆炸属性*/
    explosionBalloon_P(): void {
        this.moveSwitch = true;
        this.randomSpeed = Math.floor(Math.random() * 15) + 4;
        this.initialAngle = Math.floor(Math.random() * 360);
        this.scale = Math.floor(Math.random() * 8) + 4;
        this.self.scaleX = this.scale / 10;
        this.self.scaleY = this.scale / 10;
        this.vinshTime = Math.floor(Math.random() * 5) + 2;
        this.startAlpha = 1;
        this.self.alpha = this.startAlpha;
        this.rotationD = Math.floor(Math.random() * 2) === 1 ? -10 : 10;
        // 图片
        let number = Math.floor(Math.random() * 4);
        switch (this.effectsType) {
            case Enum.BalloonName[0]:
                this.img.skin = Enum.Explode_Yellowish[number];
                break;
            case Enum.BalloonName[1]:
                this.img.skin = Enum.Explode_Pink[number];
                break;
            case Enum.BalloonName[2]:
                this.img.skin = Enum.Explode_Yellow[number];
                break;
            case Enum.BalloonName[3]:
                this.img.skin = Enum.Explode_Cyan[number];
                break;
            case Enum.BalloonName[4]:
                this.img.skin = Enum.Explode_Purple[number];
                break;
            default:
                break;
        }
    }

    /**
     * 气球爆炸移动规则
    * 爆炸
    * 减速
    * 消失
   */
    explosionBalloon_Move(): void {
        this.img.rotation += this.rotationD;
        this.accelerated += 0.1;
        if (this.timer > 0 && this.timer <= 15) {
            this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed + 5);
        } else if (this.timer > 15 && this.timer < 18) {
            this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed - 5);
        } else if (this.timer >= 18) {
            this.self.removeSelf();
        }
    }

    /**消失特效属性*/
    vanish_P(): void {
        this.moveSwitch = true;
        this.randomSpeed = Math.random() * 2 + 2;
        this.initialAngle = Math.floor(Math.random() * 360);
        this.scale = 7;
        this.self.scale(this.scale / 10, this.scale / 10);
        this.vinshTime = Math.floor(Math.random() * 5) + 2;
        this.startAlpha = (Math.floor(Math.random() * 6) + 4) / 10;
        this.self.alpha = this.startAlpha;
        this.rotationD = Math.floor(Math.random() * 2) === 1 ? -5 : 5;
        // 图片
        this.img.skin = '特效/白色单元.png';
        this.img.rotation = this.initialAngle - 90;
    }

    /**消失特效移动*/
    vanish_Move(): void {
        this.accelerated += 0.01;
        if (this.timer > 0 && this.timer <= 20) {
            this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed);
        } else if (this.timer > 20 && this.timer < 30) {
            this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed - 3);
        } else if (this.timer >= 30) {
            this.self.alpha -= 0.02;
            if (this.self.alpha <= 0) {
                this.self.removeSelf();
            }
        }
    }

    /**移动规则*/
    move(): void {
        if (this.effectsType === Enum.BalloonName[0] || this.effectsType === Enum.BalloonName[1] || this.effectsType === Enum.BalloonName[2] || this.effectsType === Enum.BalloonName[3]) {
            this.explosionBalloon_Move();
        } else if (this.effectsType === 'vanish') {
            this.vanish_Move();
        }
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

    onUpdate(): void {
        if (this.moveSwitch) {
            this.timer += 1;
            this.move();
        }
    }

    onDisable(): void {
        Laya.Pool.recover('explode', this.self);
    }
}