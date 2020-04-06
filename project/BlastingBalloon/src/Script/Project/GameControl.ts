import { WXDataManager } from "../Template/WXDataManager";
import { Enum } from "../Template/Enum";
import { Clicks } from "../Template/Clicks";

export default class GameControl extends Laya.Script {

    /** @prop {name:Background, tips:"背景图", type:Node}*/
    public Background: Laya.Image;

    /** @prop {name:Grass , tips:"前景草", type:Node}*/
    public Grass: Laya.Sprite;

    /** @prop {name: Tip , tips:"上面提示综合", type:Node}*/
    public Tip: Laya.Sprite;

    /** @prop {name:TimeNode, tips:"时间节点", type:Node}*/
    public TimeNode: Laya.Sprite;

    /** @prop {name:TaskPrompt , tips:"任务节点", type:Node}*/
    public TaskPrompt: Laya.Sprite;

    /** @prop {name:BalloonVessel , tips:"气球的父节点的父节点", type:Node}*/
    public BalloonVessel: Laya.Sprite;

    /** @prop {name:BalloonParent , tips:"气球的父节点", type:Node}*/
    public BalloonParent: Laya.Sprite;

    /** @prop {name:balloon, tips:"气球预制体", type:Prefab}*/
    public balloon: Laya.Prefab;

    /** @prop {name:balloon_icon, tips:"提示气球信息图标", type:Prefab}*/
    public balloon_icon: Laya.Prefab;

    /** @prop {name:LevelsNode, tips:"等级节点", type:Node}*/
    public LevelsNode: Laya.Sprite;

    /** @prop {name:Levels, tips:"当前等级", type:Node}*/
    public Levels: Laya.FontClip;

    /**
     * 指代挂载当前脚本的节点
     */
    private slef: Laya.Scene

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
     * 当前关卡的气球颜色种类数量,根据关卡手动操作
     */
    private colorCategory: number

    /**
     * 气球点击顺序集合
     */
    private clickOrderArr: Array<string>

    constructor() {
        super();
    }

    onEnable(): void {
        this.slef = this.owner as Laya.Scene;
        this.slef['GameControl'] = this;
        this.levelsParameter();
        this.adaptive();
        this.createBalloonCollection();
    }

    /**自适应*/
    adaptive(): void {
        let stageH = Laya.stage.height;
        // 场景
        this.slef.height = stageH;
        // 背景图
        this.Background.height = stageH;
        // 上方提示栏
        this.Tip.y = stageH * 0.171;
        // 中间容器
        this.BalloonVessel.y = stageH * 0.266;
        this.BalloonVessel.height = stageH * 0.697;
        let parentBoard = this.BalloonVessel.getChildByName('parentBoard') as Laya.Image;
        parentBoard.height = stageH * 0.697;
        this.BalloonParent.height = parentBoard.height - 100;
        // 前面草
        this.Grass.y = stageH;
    }

    /**分数节点的自适应自适应*/
    levelsNodeAdaptive(): void {
        let len = this.Levels.value.length;
        let guan = this.LevelsNode.getChildByName('guan') as Laya.Sprite;
        switch (len) {
            case 1:
                guan.x = 64;
                break;
            case 2:
                guan.x = 72;
                break;
            default:
                guan.x = 72;
                break;
        }
    }

    /**
     * 关卡参数
     * 每个关卡会执行一次，参数每关不一样
     */
    levelsParameter(): void {
        this.Levels.value = '88';
        this.levelsNodeAdaptive();
        this.row = 4;
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
                Clicks.balloonScale = scale;
                balloon['Balloon'].cardClicksOn();
            }
        }
        this.taskPromptSet();
    }

    /**·
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
        // 排列在任务栏上
        let len = arr2.length;
        let widthP = len * 75;
        this.TaskPrompt.width = widthP;//根据数量缩短提示界面
        let heightP = this.TaskPrompt.height;
        for (let j = 0; j < len; j++) {
            let name = arr2[j];
            let x = widthP / len * (j + 1) - widthP / (len * 2);
            let y = heightP / 2;
            // 通过Enum.ColorName[name]名称索引对应Enum.IconSkin_01图片地址
            let colorSkin = Enum.IconSkin_01[Enum.ColorName[name]];
            this.createBallon_Icon(x, y, colorSkin);
        }
        // 然后把TaskPrompt位置移到中间位置
        this.TaskPrompt.pivotX = this.TaskPrompt.width / 2;
        this.TaskPrompt.x = 375;
        this.balloonCount();
        this.balloonClickOrder();
    }

    /**
     * 气球上的数量，体现在任务气球上
     */
    balloonCount(): void {
        this.clickOrderArr = [];
        for (let j = 0; j < this.TaskPrompt._children.length; j++) {
            let taskBallon = this.TaskPrompt._children[j];
            let taskName = taskBallon.name;
            for (let i = 0; i < this.BalloonParent._children.length; i++) {
                let balloon = this.BalloonParent._children[i];
                let name = balloon.name;
                if (taskName === name) {
                    let num = taskBallon['Balloon_Icon'].num as Laya.FontClip;
                    num.value = (Number(num.value) + 1).toString();
                    this.clickOrderArr.push(name);//按顺序依次添加气球名称集合，既是点击顺序
                }
            }
        }
    }

    /**
     * 点击指引提示现在应该点击哪个气球
     * this.clickOrderArr[]是顺序数组，如果点击正确了，那么删除这个数组的第一个元素
     * 所以每次都只需要匹配 this.clickOrderArr[0]就可以判断是否点击正确
     * 并且通过this.clickOrderArr[0]放大当前需要点击的那个任务气球
     */
    balloonClickOrder(): void {
        for (let i = 0; i < this.TaskPrompt._children.length; i++) {
            const taskBallon = this.TaskPrompt._children[i];
            const name = taskBallon.name;
            let img = taskBallon['Balloon_Icon'].img as Laya.Image;
            if (name === this.clickOrderArr[0]) {
                taskBallon.scale(1.1, 1.1)
                img.skin = Enum.IconSkin_02[Enum.ColorName[name]];
            } else {
                taskBallon.scale(1, 1);
                img.skin = Enum.IconSkin_01[Enum.ColorName[name]];
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
        balloon_icon.name = Enum.ColorName[Enum.IconSkin_01[colorSkin]];
        return balloon_icon;
    }


    onDisable(): void {
    }
}