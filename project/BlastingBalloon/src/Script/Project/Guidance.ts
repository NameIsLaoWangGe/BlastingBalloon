import { Clicks } from "../Template/Clicks";
import backGround from "./Background";
import { Enum } from "../Template/Enum";
import { Animation } from "../Template/Animation";
export default class Guidance extends Laya.Script {

    /** @prop {name: Tip , tips:"上面提示综合", type:Node}*/
    public Tip: Laya.Sprite;

    /** @prop {name:TimeNode, tips:"时间节点", type:Node}*/
    public TimeNode: Laya.Sprite;

    /** @prop {name:TaskBalloonParent , tips:"任务节点", type:Node}*/
    public TaskBalloonParent: Laya.Sprite;

    /** @prop {name:BalloonVessel , tips:"气球的父节点的父节点", type:Node}*/
    public BalloonVessel: Laya.Sprite;

    /** @prop {name:BalloonParent , tips:"气球的父节点", type:Node}*/
    public BalloonParent: Laya.Sprite;
    /** @prop {name:LevelsNode, tips:"等级节点", type:Node}*/
    public LevelsNode: Laya.Sprite;

    /** @prop {name:Levels, tips:"当前等级", type:Node}*/
    public Levels: Laya.FontClip;

    /** @prop {name:PropsNode, tips:"道具父节点", type:Node}*/
    public PropsNode: Laya.Sprite;

    /** @prop {name:BeetleParent, tips:"小甲虫父节点", type:Node}*/
    public BeetleParent: Laya.Sprite;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**场景控制脚本*/
    private gameControl

    /**第一关新手引导气球颜色名称在枚举的索引值*/
    private guideColor_Lv_01: Array<Array<number>>

    /**第一关新手引导气球颜色名称在枚举的索引值*/
    private guideColor_Lv_02: Array<Array<number>>

    /**记录点击次数*/
    private cilksNum: number

    /**指引内容节点*/
    private guideContainer: Laya.Sprite;
    /**指引内容的父节点*/
    private tipParent: Laya.Sprite;

    /**绘制反响遮罩的节点*/
    private interactionArea: Laya.Sprite;


    constructor() {
        super();
    }

    onEnable(): void {
        console.log('我是新手引导脚本')
        this.self = this.owner as Laya.Scene;
        this.self['Guidance'] = this;
        this.gameControl = this.self['GameControl'];
        // 初始化第一关气球节点的个数和颜色
        this.guideColor_Lv_01 = [[1, 0, 1], [1, 0, 0], [1, 1, 0]];
        // 初始化第二关气球节点的个数和颜色
        this.guideColor_Lv_02 = [[0, 1, 1, 1], [1, 0, 0, 1], [1, 1, 0, 0]];
        this.cilksNum = 0;
    }

    /**初始化引导*/
    guidanceInit(): void {
        // 引导所在父节点容器
        this.guideContainer = new Laya.Sprite();
        // 设置父节点容器为画布缓存
        this.guideContainer.cacheAs = "bitmap";
        // 把他放在气球父节点里面
        Laya.stage.addChild(this.guideContainer);
    }

    /**新的引导开始前的设置*/
    newGuidanceSet(): void {
        // 先清除所有遮罩，重新绘制遮罩
        this.guideContainer.removeChildren(0, this.guideContainer._children.length - 1);
        // 全屏黑色透明底
        var maskArea: Laya.Sprite = new Laya.Sprite();
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        maskArea.name = 'bg';
        this.guideContainer.addChild(maskArea);
        Animation.fade_out(maskArea, 0, 0.5, 100, 0, null);
        // 提示框付父节点初始化
        this.tipParent = new Laya.Sprite();
        this.guideContainer.addChild(this.tipParent);
        this.tipParent.pos(0, 0);
        this.tipParent.zOrder = 100;
    }

    /**
     * 创建气球引导
     * @param type 传入的气球颜色
     */
    createBalloonGuidance(type) {
        this.newGuidanceSet();
        // 气球上的反向遮罩
        this.ballonAndTaskMask(type);
        this.createTipSet(type);
    }
    /**创建气球和提示气球的反向遮罩*/
    ballonAndTaskMask(type): void {
        for (let index = 0; index < this.BalloonParent._children.length; index++) {
            const balloon = this.BalloonParent._children[index];
            // 如果名字相同则画出反向遮罩和点击区域
            if (balloon.name === type) {
                // 计算气球的世界坐标
                let x = balloon.x + (this.BalloonParent.x - this.BalloonParent.width / 2) + (this.BalloonVessel.x - this.BalloonVessel.width / 2);
                let y = (balloon.y + this.BalloonParent.y + this.BalloonVessel.y) - balloon.height * 0.05;
                let radius = balloon.height / 2 - 30;
                this.createCircleMask(x, y, radius);
                balloon['Balloon'].balloonClicksOn();
            } else {
                // 关闭其他的气球点击事件
                balloon['Balloon'].balloonClicksOff();
            }

            // 提示气球上的反向遮罩
            for (let index = 0; index < this.TaskBalloonParent._children.length; index++) {
                const taskBalloon = this.TaskBalloonParent._children[index] as Laya.Sprite;
                if (taskBalloon.name === type) {
                    let x = taskBalloon.x + (this.TaskBalloonParent.x - this.TaskBalloonParent.width / 2) + (this.Tip.x - this.Tip.width / 2);
                    let y = taskBalloon.y + (this.TaskBalloonParent.y - this.TaskBalloonParent.height / 2) + (this.Tip.y - this.Tip.height / 2);
                    let radius = taskBalloon.height / 2 + 10;
                    this.createCircleMask(x, y, radius);
                }
            }
        }
    }

    /**创建甲虫引导*/
    createBeetleGuidance(): void {
        this.newGuidanceSet();
        // 绘制遮罩
        for (let index = 0; index < this.BeetleParent._children.length; index++) {
            const beetle = this.BeetleParent._children[index];
            let x = beetle.x + this.BeetleParent.x;
            let y = beetle.y + this.BeetleParent.x;
            let radius = beetle.height / 2 + 50;
            this.createCircleMask(x, y, radius);
            // 甲虫此时不可点击了
            beetle['Beetle'].clicksOffBtn();
        }
        //创建道具反向遮罩
        let x = this.PropsNode.x + (this.Tip.x - this.Tip.width / 2);
        let y = this.PropsNode.y + (this.Tip.y - this.Tip.height / 2);
        let radius = 80;
        this.createCircleMask(x, y, radius);

        /**道具执行动画提示*/
       
        // 道具可点击
        this.PropsNode['Props'].clicksOnBtn();
        this.createTipSet('beetle');
    }

    /**创建时间引导*/
    createTimeGuidance(): void {
        this.newGuidanceSet();
        // 创建时间引导
        let width = 450;
        let height = 80;
        let x = this.TimeNode.x - width / 2;
        let y = this.TimeNode.y + (this.Tip.y - this.Tip.height / 2) - height / 2;
        this.createRectleMask(x, y, width, height);
        this.createTipSet('time');

        // 同时进行一次颜色引导，防止引导结束后，本关不会通关会点错
        let currentColor = this.gameControl.clickOrderArr[0];
        this.ballonAndTaskMask(currentColor);
    }

    /**
     * 创建提示框
     * @param type 当前气球的类型或者是小虫子的引导或者是进度条的引导类型
    */
    createTipSet(type): void {
        if (type === Enum.BalloonName[1]) {
            for (let index = 0; index < 2; index++) {
                let skin;
                let x;
                let y;
                let delay;
                if (index === 0) {
                    skin = Enum.GuidanceTiptype.colorOrder;
                    x = 110;
                    y = Laya.stage.height * 0.028;
                    delay = 100;
                } else {
                    skin = Enum.GuidanceTiptype.color_01;
                    x = 387;
                    y = Laya.stage.height * 0.142;
                    delay = 200;
                }
                this.tip(skin, x, y, delay);
            }
        } else if (type === Enum.BalloonName[0]) {
            this.tip(Enum.GuidanceTiptype.color_02, 550, Laya.stage.height * 0.45, 100);

        } else if (type === 'beetle') {
            //创建道具反向遮罩
            let x = this.PropsNode.x + (this.Tip.x - this.Tip.width / 2);
            let y = this.PropsNode.y + (this.Tip.y - this.Tip.height / 2);
            this.tip(Enum.GuidanceTiptype.expelBeetle, x - 200, y - 100, 100);
        } else if (type === 'time') {
            this.tip(Enum.GuidanceTiptype.time, 509, 118, 100);
        }
    }

    /**
     * 创建单个tip
     * @param skin tip皮肤地址
     * @param x x位置
     * @param y y位置
     * @param delay 延时创建时间
     */
    tip(skin, x, y, delay) {
        let tip = new Laya.Image();
        tip.skin = skin;
        this.tipParent.addChild(tip);
        tip.x = x;
        tip.y = y;
        tip.pivotX = tip.width / 2;
        tip.pivotY = tip.height / 2;
        Animation.bombs_Appear(tip, 0, 1, 1.1, 0, 150, 50, delay, null, null);
    }

    /**
     * 创建单个圆形反向遮罩
     * @param x x位置
     * @param y y位置
     * @param radius 半径
     */
    createCircleMask(x, y, radius): void {
        //反向遮罩，这个Sprite暂时没有大小，通过画出圆形才有大小和位置的意义
        this.interactionArea = new Laya.Sprite();
        this.interactionArea.name = 'reverseMask';
        //设置叠加模式
        this.interactionArea.blendMode = "destination-out";//利用叠加模式创建反向遮罩
        this.guideContainer.addChild(this.interactionArea);
        // 画出圆形，可以画很多个圆形
        this.interactionArea.graphics.drawCircle(x, y, radius, "#000000");
    }

    /**创建单个矩形反向遮罩*/
    createRectleMask(x, y, width, height): void {
        //反向遮罩，这个Sprite暂时没有大小，通过画出圆形才有大小和位置的意义
        this.interactionArea = new Laya.Sprite();
        this.interactionArea.name = 'reverseMask';
        //设置叠加模式
        this.interactionArea.blendMode = "destination-out";//利用叠加模式创建反向遮罩
        this.guideContainer.addChild(this.interactionArea);
        // 画出圆形，可以画很多个圆形
        this.interactionArea.graphics.drawRect(x, y, width, height, "#000000");
    }


    onDisable(): void {
    }
}