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
            { x: 151, y: 575, radius: 150, tip: "UI/重来按钮.png", tipx: 200, tipy: 250 },
            { x: 883, y: 620, radius: 100, tip: "UI/重来按钮.png", tipx: 730, tipy: 380 },
            { x: 1128, y: 583, radius: 110, tip: "UI/重来按钮.png", tipx: 900, tipy: 300 }
        ];
    private guideStep: number = 0;
    private hitArea: Laya.HitArea;
    private interactionArea: Laya.Sprite;

    constructor() {
        super();
        Laya.init(1285, 727);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

        //绘制一个蓝色方块，不被抠图
        var gameContainer: Laya.Sprite = new Laya.Sprite();
        gameContainer.loadImage("UI/重来按钮.png");
        Laya.stage.addChild(gameContainer);

        // 引导所在容器
        this.guideContainer = new Laya.Sprite();
        // 设置容器为画布缓存
        this.guideContainer.cacheAs = "bitmap";
        Laya.stage.addChild(this.guideContainer);
        this.guideContainer.zOrder = 100;
        gameContainer.on("click", this, this.nextStep);

        //绘制遮罩区，含透明度，可见游戏背景
        // 黑色透明底
        var maskArea: Laya.Sprite = new Laya.Sprite();
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.guideContainer.addChild(maskArea);

        //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        // 可见圆形区域，并且反向遮罩
        this.interactionArea = new Laya.Sprite();
        //设置叠加模式
        this.interactionArea.blendMode = "destination-out";
        this.guideContainer.addChild(this.interactionArea);

        this.hitArea = new Laya.HitArea();
        this.hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");

        this.guideContainer.hitArea = this.hitArea;
        this.guideContainer.mouseEnabled = true;

        this.tipContainer = new Laya.Sprite();
        Laya.stage.addChild(this.tipContainer);

        this.nextStep();
    }

    private nextStep(): void {
        if (this.guideStep == this.guideSteps.length) {
            Laya.stage.removeChild(this.guideContainer);
            Laya.stage.removeChild(this.tipContainer);
        }
        else {
            var step: any = this.guideSteps[this.guideStep++];

            this.hitArea.unHit.clear();
            this.hitArea.unHit.drawCircle(step.x, step.y, step.radius, "#000000");

            // this.interactionArea.graphics.clear();
            // this.interactionArea.graphics.drawCircle(step.x, step.y, step.radius, "#000000");

            this.tipContainer.graphics.clear();
            this.tipContainer.loadImage(step.tip);
            this.tipContainer.pos(step.tipx, step.tipy);
        }
    }
    onDisable(): void {
    }
}