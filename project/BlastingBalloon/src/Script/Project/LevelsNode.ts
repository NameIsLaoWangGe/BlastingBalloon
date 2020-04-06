export default class Levels extends Laya.Script {
    /** @prop {name:Levels, tips:"关卡数", type:Node}*/
    public Levels: Laya.FontClip;

    /** @prop {name:guan, tips:"关字体", type:Node}*/
    public guan: Laya.FontClip;

    /**
    * 场景脚本组件
    */
    private gameControl
    /**
     * 指代当前挂载脚本的节点
     */
    private self: Laya.Sprite

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['LevelsNode'] = this;
        this.gameControl = this.self.scene['GameControl'];
    }

    /**自适应*/
    adaptive(): void {
        let len = this.Levels.value.length;
        switch (len) {
            case 1:
                this.guan.x = 64;
                break;
            case 2:
                this.guan.x = 72;
                break;
            default:
                this.guan.x = 72;
                break;
        }
    }


    onDisable(): void {
    }
}