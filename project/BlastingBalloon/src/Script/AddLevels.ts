import { Clicks } from "./Template/Clicks";
import { WXDataManager } from "./Template/WXDataManager";

export default class AddLevels extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    constructor() { super(); }

    onEnable(): void {
        console.log('新测试');
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.owner, this, this.down, null, null, null);
    }
    down(event) {
        (this.owner as Laya.Sprite).scale(1.1, 1.1);
        console.log('上次的分数为' + WXDataManager._lastlevels);
        WXDataManager._thislevels++;
        console.log('这次新的的分数为：' + WXDataManager._lastlevels);
        WXDataManager.update_Levels();
    }
    onDisable(): void {
    }
}