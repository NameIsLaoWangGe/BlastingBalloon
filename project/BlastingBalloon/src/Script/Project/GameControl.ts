import { WXDataManager } from "../Template/WXDataManager";
import { Enum } from "../Template/Enum";

export default class GameControl extends Laya.Script {


    /** @prop {name:TimeNode, tips:"时间节点", type:Node}*/
    public TimeNode: Laya.Sprite;

    /** @prop {name:TaskPrompt , tips:"任务节点", type:Node}*/
    public TaskPrompt: Laya.Sprite;

    /** @prop {name:BalloonParent , tips:"气球的父节点", type:Node}*/
    public BalloonParent: Laya.Sprite;

    /** @prop {name:balloon, tips:"气球预制体", type:Prefab}*/
    public balloon: Laya.Prefab;

    /** @prop {name:balloon_icon, tips:"提示气球信息图标", type:Prefab}*/
    public balloon_icon: Laya.Prefab;

    /**
     * 指代挂载当前脚本的节点
     */
    private slef: Laya.Scene
    /**
     * 当前等级
     */
    private levels: number
    /**
     *横向气球个数
     */
    private row: number
    /**
     * 纵向气球个数
     */
    private line: number
    /**
     * 气球之间的间隔
     */
    private spacing: number

    /**
     * 气球的颜色集合
     */
    private colorArr: Array<string>
    /**
     * 气球icon的颜色集合
     */
    private colorArr_icon: Array<string>
    /**
     * 当前关卡的气球颜色种类,根据关卡手动操作
     */
    private colorCategory: number

    constructor() {
        super();
    }

    onEnable(): void {
        this.slef = this.owner as Laya.Scene;
        this.slef['GameControl'] = this;
        this.levelsParameter();
        this.createBalloonCollection();
    }

    /**
     * 关卡参数
     * 每个关卡会执行一次，参数每关不一样
     */
    levelsParameter(): void {
        this.row = 5;
        this.line = 5;
        this.spacing = 5;
        this.colorCategory = 5;
    }

    /**
     * 创建气球集合
     */
    createBalloonCollection(): void {
        // 父节点的宽和高
        let widthP = this.BalloonParent.width;
        let heightP = this.BalloonParent.height;
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.line; j++) {
                // 缩放大小和位置用切宫格的方法，放入气球，分为row*line块，让移动缩放到宫格内
                let x = widthP / this.row * (i + 1) - widthP / (this.row * 2);
                let y = heightP / this.line * (j + 1) - heightP / (this.line * 2);
                let balloon = this.createBallon(x, y);
                // 缩放大小,目前取决spacing
                let scale = (widthP / this.row - this.spacing * 2) / balloon.width;
                balloon.scale(scale, scale);
            }
        }
        this.taskPromptSet();
    }

    /**
     * 构建单个气球
     * @param x 
     * @param y 
     */
    createBallon(x, y): Laya.Sprite {
        let balloon = Laya.Pool.getItemByCreateFun('balloon', this.balloon.create, this.balloon) as Laya.Sprite;
        this.BalloonParent.addChild(balloon);
        balloon.pos(x, y);

        // 根据关卡数随机给与颜色和名字
        let img = balloon['Balloon'].img as Laya.Image;
        let random = Math.floor(Math.random() * this.colorCategory);
        img.skin = Enum.ColorSkin[random];
        balloon.name = Enum.ColorName[random];

        return balloon;
    }

    /**
     * 任务位置的气球提示
     */
    taskPromptSet(): void {
        // 气球的名称集合
        let arr1 = [];
        for (let i = 0; i < this.BalloonParent._children.length; i++) {
            const balloon = this.BalloonParent._children[i];
            arr1.push(balloon.name);
        }
        // 名称去重
        let arr2 = Array.from(new Set(arr1));
        // 排列
        let len = arr2.length;
        let widthP = len * 120;
        this.TaskPrompt.width = widthP;//根据数量缩短提示界面
        let heightP = this.TaskPrompt.height;
        for (let j = 0; j < len; j++) {
            const element = arr2[j];
            let x = widthP / len * (j + 1) - widthP / (len * 2);
            let y = heightP / 2;
            let name = arr2[j];
            // 通过Enum.ColorName[name]名称索引对应Enum.Color_iconSkin图片地址
            let colorSkin = Enum.Color_iconSkin[Enum.ColorName[name]];
            this.createBallon_Icon(x, y, colorSkin);
        }
        // 然后把TaskPrompt位置移到中间位置
        this.TaskPrompt.pivotX = this.TaskPrompt.width / 2;
        this.TaskPrompt.x = 375;
        this.numer();

    }

    numer(): void {
        for (let j = 0; j < this.TaskPrompt._children.length; j++) {
            let taskBallon = this.TaskPrompt._children[j];
            let taskName = taskBallon.name;
            for (let i = 0; i < this.BalloonParent._children.length; i++) {
                let balloon = this.BalloonParent._children[i];
                let name = balloon.name;
                if (taskName === name) {
                    let num = taskBallon['Balloon_Icon'].num as Laya.FontClip;
                    num.value = (Number(num.value) + 1).toString();
                }
            }
        }
    }

    /**
     * 创建任务位置的气球图标
     * @param x 
     * @param y 
     * @param colorSkin 颜色
     */
    createBallon_Icon(x, y, colorSkin): Laya.Sprite {
        let balloon_icon = Laya.Pool.getItemByCreateFun('balloon_icon', this.balloon_icon.create, this.balloon_icon) as Laya.Sprite;
        this.TaskPrompt.addChild(balloon_icon);
        balloon_icon.pos(x, y);
        // 根据关卡数随机给与颜色
        let img = balloon_icon['Balloon_Icon'].img as Laya.Image;
        img.skin = colorSkin;
        balloon_icon.name = Enum.ColorName[Enum.Color_iconSkin[colorSkin]];
        return balloon_icon;
    }


    onDisable(): void {
    }
}