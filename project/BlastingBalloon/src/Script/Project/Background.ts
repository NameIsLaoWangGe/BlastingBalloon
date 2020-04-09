import { Animation } from "../Template/Animation";

export default class backGround extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    /**自己*/
    private self: Laya.Sprite;
    /**选择灯光开关*/
    private selectSwitch: boolean
    /**闪烁开关*/
    private blinkSwicth: boolean
    /**计时器*/
    private timer: number

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.timer = 0;
        this.selectSwitch = true;
        this.blinkSwicth = false;
        console.log('11');

        for (let index = 0; index < this.self._children.length; index++) {
            const element = this.self._children[index] as Laya.Sprite;
            element.alpha = 0;
        }
    }

    onUpdate(): void {
        if (this.selectSwitch) {
            this.selectSwitch = false;
            let index = Math.floor(Math.random() * 7);
            Animation.blink(this.self._children[index], 0, 1, 300, 0, f => {
                this.selectSwitch = true;
            })
        }

    }


    onDisable(): void {
    }
}