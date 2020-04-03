import GameControl from "./GameControl";
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

    onDisable(): void {

    }
    onUpdate() {
    }
}