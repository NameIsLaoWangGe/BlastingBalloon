import { Clicks } from "../Template/Clicks";

export default class Guidance extends Laya.Script {

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**场景控制脚本*/
    private gameControl

    /**第一关新手引导气球颜色名称在枚举的索引值*/
    private guideBalloonColor: Array<Array<number>>

    onEnable(): void {
        console.log('我是新手引导脚本')
        this.self = this.owner as Laya.Scene;
        this.self['Guidance'] = this;
        this.gameControl = this.self['GameControl'];
        // 初始化气球节点的个数和颜色
        this.guideBalloonColor = [[1, 0, 1], [1, 0, 0], [1, 1, 0]];
    }

    private red: Laya.Sprite;
    private guideContainer: Laya.Sprite;
    private tipContainer: Laya.Sprite;
    private guideSteps: Array<any> =
        [
            { x: 375, y: 575, radius: 150, tip: "UI/重来按钮.png", tipx: 375, tipy: 250 },
            { x: 375, y: 620, radius: 100, tip: "UI/重来按钮.png", tipx: 375, tipy: 500 },
            { x: 375, y: 583, radius: 110, tip: "UI/重来按钮.png", tipx: 375, tipy: 800 }
        ];
    private guideStep: number = 0;
    private hitArea: Laya.HitArea;
    private interactionArea: Laya.Sprite;

    constructor() {
        super();
        // Laya.init(1285, 727);
        // Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        // Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

        // //通过抠出的反向遮罩，点击的图片，响应事件
        // var gameContainer: Laya.Sprite = new Laya.Sprite();
        // gameContainer.loadImage("UI/背景图.png");
        // Laya.stage.addChild(gameContainer);
        // gameContainer.zOrder = 100;

        // // 引导所在容器
        // this.guideContainer = new Laya.Sprite();
        // // 设置容器为画布缓存
        // this.guideContainer.cacheAs = "bitmap";
        // Laya.stage.addChild(this.guideContainer);
        // this.guideContainer.zOrder = 100;
        // gameContainer.on("click", this, this.nextStep);

        // //绘制遮罩区，含透明度，可见游戏背景
        // // 黑色透明底
        // var maskArea: Laya.Sprite = new Laya.Sprite();
        // maskArea.alpha = 0.5;
        // maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        // this.guideContainer.addChild(maskArea);

        // //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        // // 可见圆形区域，并且反向遮罩，仅仅是为了可见，可见后依然不会抠出点击区域
        // this.interactionArea = new Laya.Sprite();
        // //设置叠加模式
        // this.interactionArea.blendMode = "destination-out";
        // this.guideContainer.addChild(this.interactionArea);

        // // 和圆形区域一样，抠出圆形区域的点击区域，所以设置的额时候他和interactionArea一样大，并且位置一样
        // this.hitArea = new Laya.HitArea();
        // this.hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");

        // this.guideContainer.hitArea = this.hitArea;//将这个圆圈设置为可点击区域
        // this.guideContainer.mouseEnabled = true;//其他就可以设置为不可点击

        // this.tipContainer = new Laya.Sprite();
        // Laya.stage.addChild(this.tipContainer);
        // this.tipContainer.zOrder = 100;

        // this.nextStep();
    }


    // private nextStep(): void {
    //     if (this.guideStep == this.guideSteps.length) {
    //         Laya.stage.removeChild(this.guideContainer);
    //         Laya.stage.removeChild(this.tipContainer);
    //     }
    //     else {
    //         var step: any = this.guideSteps[this.guideStep++];

    //         this.hitArea.unHit.clear();
    //         this.hitArea.unHit.drawCircle(step.x, step.y, step.radius, "#000000");

    //         this.interactionArea.graphics.clear();
    //         this.interactionArea.graphics.drawCircle(step.x, step.y, step.radius, "#000000");

    //         this.tipContainer.graphics.clear();
    //         this.tipContainer.loadImage(step.tip);
    //         this.tipContainer.pos(step.tipx, step.tipy);
    //     }
    // }

    /**初始化引导*/
    guidanceInit(): void {
        // 引导所在父节点容器
        this.guideContainer = new Laya.Sprite();
        // 设置父节点容器为画布缓存
        this.guideContainer.cacheAs = "bitmap";
        // 把他放在气球父节点里面
        Laya.stage.addChild(this.guideContainer);

        // 绘制遮罩区，含透明度，可见游戏背景
        // 全屏黑色透明底
        var maskArea: Laya.Sprite = new Laya.Sprite();
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.guideContainer.addChild(maskArea);

    }

    /**
     * 创建引导的反向遮罩
     * @param type 传入的气球颜色
     */
    createGuidanceMask(type) {
        // 先清除所有子节点，包括圆形反向遮罩和圆形点击区域
        let BalloonParent = this.gameControl.BalloonParent as Laya.Sprite;
        let BalloonVessel = this.gameControl.BalloonVessel as Laya.Sprite;
        let TaskBalloonParent = this.gameControl.TaskBalloonParent as Laya.Sprite;

        for (let index = 0; index < BalloonParent._children.length; index++) {
            const balloon = BalloonParent._children[index];
            // 如果名字相同则画出反向遮罩和点击区域
            console.log(balloon.name, type)
            if (balloon.name === type) {
                // 可见圆形区域，反向遮罩，仅仅是为了可见，可见后依然不会抠出点击区域
                this.interactionArea = new Laya.Sprite();
                this.interactionArea.name = 'reverseMask';
                //设置叠加模式
                this.interactionArea.blendMode = "destination-out";//利用叠加模式创建反向遮罩
                this.guideContainer.addChild(this.interactionArea);
                // 位置需要根据大小进行位置偏移的计算
                // 计算气球的世界坐标

                let x = balloon.x + (BalloonParent.x - BalloonParent.width / 2) + (BalloonVessel.x - BalloonVessel.width / 2);
                let y = balloon.y + BalloonParent.y + BalloonVessel.y;

                this.interactionArea.graphics.drawCircle(x, y - balloon.height * 0.05, balloon.height / 2 - 30, "#000000");
            } else {
                // 关闭其他的气球点击事件
                balloon['Balloon'].balloonClicksOff();
            }
        }
    }




    onDisable(): void {
    }
}