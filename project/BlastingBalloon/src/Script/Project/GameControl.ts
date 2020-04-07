import { WXDataManager } from "../Template/WXDataManager";
import { Enum } from "../Template/Enum";
import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";

export default class GameControl extends Laya.Script {

    /** @prop {name:Background, tips:"背景图", type:Node}*/
    public Background: Laya.Image;

    /** @prop {name:Grass , tips:"前景草", type:Node}*/
    public Grass: Laya.Sprite;

    /** @prop {name: Tip , tips:"上面提示综合", type:Node}*/
    public Tip: Laya.Sprite;

    /** @prop {name:TimeNode, tips:"时间节点", type:Node}*/
    public TimeNode: Laya.Sprite;

    /** @prop {name:time, tips:"时间", type:Node}*/
    public time: Laya.ProgressBar;

    /** @prop {name:TaskBalloonParent , tips:"任务节点", type:Node}*/
    public TaskBalloonParent: Laya.Sprite;

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

    /** @prop {name:PropsNode, tips:"道具父节点", type:Node}*/
    public PropsNode: Laya.Sprite;

    /** @prop {name:startGame, tips:"游戏开始预制体", type:Prefab}*/
    public startGame: Laya.Prefab;

    /** @prop {name:gameOver, tips:"游戏结束预制体", type:Prefab}*/
    public gameOver: Laya.Prefab;

    /** @prop {name:ranking, tips:"排行榜", type:Prefab}*/
    public ranking: Laya.Prefab;


    /**
     * 指代挂载当前脚本的节点
     */
    private self: Laya.Scene

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

    /**开始开关*/
    private startSwicth

    /**开始游戏界面的复赋值*/
    private startNode

    constructor() {
        super();
    }

    onEnable(): void {
        this.self = this.owner as Laya.Scene;
        this.self['GameControl'] = this;
        this.noStart();
        this.createStartGame();
        this.adaptive();
    }

    /**自适应*/
    adaptive(): void {
        let stageH = Laya.stage.height;
        // 场景
        this.self.height = stageH;
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
        let guan = this.LevelsNode.getChildByName('guan') as Laya.Sprite;
          console.log(Number(this.Levels.value));
        if (Number(this.Levels.value) >= 10) {
            console.log(Number(this.Levels.value));
            guan.x = 72;
        } else {
            guan.x = 64;
        }
    }

    /**
     * 为开场时候的设置
     * 游戏内节点消失
     * */
    noStart(): void {
        this.Tip.alpha = 0;
        this.BalloonVessel.alpha = 0;
    }

    /**
     * 关卡参数
     * 每个关卡会执行一次，参数每关不一样
     */
    start(): void {
        // 游戏内节点出现
        this.Tip.alpha = 1;
        this.BalloonVessel.alpha = 1;
        // 其他参数设置
        this.time.value = 1;
        this.Levels.value = (Number(this.Levels.value) + 1).toString();
        this.levelsNodeAdaptive();
        this.row = 3;
        this.line = 4;
        this.spacing = 5;
        this.colorCategory = 3;
        this.openingAnimation();
    }

    /**创建开始游戏界面*/
    createStartGame(): void {
        let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame) as Laya.Sprite;
        this.self.addChild(startGame);
    }

    /**开始游戏时的开场动画*/
    openingAnimation(): void {
        let scale1 = 1.05;
        let time1 = 300;
        let time2 = 100;
        let delayed = 250;
        // 底板动画，以BalloonVessel为动画目标，否则影响适配
        let parentBoard = this.BalloonVessel.getChildByName('parentBoard') as Laya.Image;
        Animation.bombs_Appear(parentBoard, 0, 1, scale1, 0, time1, time2, delayed * 1, f => {
            this.createBalloonCollection();
        });
        // 任务栏的动画
        let scale2 = 1.2;
        let tipboard = this.Tip.getChildByName('tipboard') as Laya.Sprite;
        Animation.bombs_Appear(tipboard, 0, 1, scale2, 0, time1, time2, delayed * 2, null);
        Animation.bombs_Appear(this.TimeNode, 0, 1, scale2, 0, time1, time2, delayed * 3, null);
        Animation.bombs_Appear(this.PropsNode, 0, 1, scale2, 0, time1, time2, delayed * 4, null);
        Animation.bombs_Appear(this.LevelsNode, 0, 1, scale2, 0, time1, time2, delayed * 5, null);
        this.taskTipShake(delayed * 6);
    }

    /**开场任务提示抖动动画*/
    taskTipShake(delayed): void {
        // 插座插入后整体抖动
        let time = 200;
        let scaleX3 = 0.85;
        let scaleY3 = 1.15;
        let plug_01 = this.Tip.getChildByName('plug_01') as Laya.Image;
        Animation.deform_Move(plug_01, 1550, 555, scaleX3, scaleY3, time, delayed, null);

        let plug_02 = this.Tip.getChildByName('plug_02') as Laya.Image;
        Animation.deform_Move(plug_02, -800, 171, scaleX3, scaleY3, time, delayed, fun => {
            Animation.leftRight_Shake(this.Tip, 60, 15, 100, null);
            Animation.leftRight_Shake(this.PropsNode, 60, 15, 160, null);
            Animation.leftRight_Shake(this.LevelsNode, 60, 15, 160, null);
        });
    }

    /**
     * 离场动画
     * 离场动画用在返回主界面
    */
    leaveAnimation(): void {
        let scale1 = 1.05;
        let time1 = 300;
        let delayed = 250;
        // 底板动画，以BalloonVessel为动画目标，否则影响适配
        let parentBoard = this.BalloonVessel.getChildByName('parentBoard') as Laya.Image;
        Animation.bombs_Vanish(parentBoard, 0, 0, 0, time1, delayed * 1, f => {
        });
        // 任务栏的动画
        let scale2 = 1.2;
        let tipboard = this.Tip.getChildByName('tipboard') as Laya.Sprite;
        Animation.bombs_Vanish(tipboard, 0, 0, 0, time1, delayed * 2, null);
        Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, null);
        Animation.bombs_Vanish(this.PropsNode, 0, 0, 0, time1, delayed * 2, null);
        Animation.bombs_Vanish(this.LevelsNode, 0, 0, 0, time1, delayed * 2, null);

        // 拔掉插座
        let time2 = 800;
        let scaleX3 = 0.85;
        let scaleY3 = 1.15;
        let plug_01 = this.Tip.getChildByName('plug_01') as Laya.Image;
        let firstX_01 = plug_01.x;
        Animation.deform_Move(plug_01, firstX_01, 1550, scaleX3, scaleY3, time2, delayed * 3, null);

        let plug_02 = this.Tip.getChildByName('plug_02') as Laya.Image;
        let firstX_02 = plug_02.x;
        Animation.deform_Move(plug_02, firstX_02, -800, scaleX3, scaleY3, time2, delayed * 3, null);
        this.createStartGame();
        this.clearAllBallon('startGame');

    }

    /**
     * 创建气球集合
     */
    createBalloonCollection(): void {
        // 父节点的宽和高
        let widthP = this.BalloonParent.width;
        let heightP = this.BalloonParent.height;
        let delayed = 0;
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.line; j++) {
                delayed += 100;
                // 缩放大小和位置用切宫格的方法，放入气球，分为row*line块，让移动缩放到宫格中间位置
                let x = widthP / this.row * (i + 1) - widthP / (this.row * 2);
                let y = heightP / this.line * (j + 1) - heightP / (this.line * 2);
                let balloon = this.createBallon(x, y);
                // 缩放大小,目前取决spacing
                let scale = (widthP / this.row - this.spacing * 2) / balloon.width;
                balloon.scale(scale, scale);
                Clicks.balloonScale = scale;

                Animation.bombs_Appear(balloon, 0, scale, scale + 0.1, 0, 200, 100, delayed, f => {
                    if (i === this.row - 1 && j === this.line - 1) {
                        this.TaskBalloonParentSet();
                    }
                })
            }
        }
    }

    /**前往下一关*/
    moveToNextLevel(): void {
        let scale1 = 1.05;
        let time1 = 300;
        let time2 = 100;
        let delayed = 250;
        Animation.bombs_Vanish(this.LevelsNode, 0, 0, 0, 100, delayed, f => {
            this.Levels.value = (Number(this.Levels.value) + 1).toString();
            Animation.bombs_Appear(this.LevelsNode, 0, 1, 1.1, 0, time1, time2, delayed, f => {
            });
        })
        // 抖动后开始游戏
        Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
            this.time.value = 1;
            Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed, f => {
                this.taskTipShake(0);
            });
        })
        this.clearAllBallon('restartAndNextLevel');
    }

    /**重玩当前关卡*/
    againCurrentlevel(): void {
        let scale1 = 1.05;
        let time1 = 200;
        let time2 = 100;
        let delayed = 250;
        Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
            Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
            })
        })

        Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
            this.time.value = 1;
            Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed * 5, f => {
                this.taskTipShake(0);
            });
        })
        this.clearAllBallon('restartAndNextLevel');
    }

    /**第一步
     * 清除所有气球后重新排布气球
     * @param type 一种类型是重来或者重来，另一种是返回主界面
    */
    clearAllBallon(type): void {
        let delayed = 0;
        let len = this.BalloonParent._children.length;
        // 如果是胜利了，说明气球没有了，那么直接进行下一步
        if (len === 0) {
            this.clearAllTaskBallon(type);
            return;
        }
        for (let index = 0; index < len; index++) {
            const element = this.BalloonParent._children[index];
            Animation.bombs_Vanish(element, 0, 0, 0, 100, delayed, f => {
                if (index === len - 1) {
                    this.clearAllTaskBallon(type);
                    this.BalloonParent.removeChildren(0, len - 1);
                }
            })
            delayed += 80;
        }
    }

    /**第二步
     * 清除所有任务气球
     * @param type
    */
    clearAllTaskBallon(type): void {
        let delayed = 0;
        let len = this.TaskBalloonParent._children.length;
        for (let index = 0; index < len; index++) {
            const element = this.TaskBalloonParent._children[index];
            Animation.bombs_Vanish(element, 0, 0, 0, 150, delayed, f => {
                element.removeSelf();
                if (index === len - 1) {
                    if (type === 'restartAndNextLevel') {
                        this.createBalloonCollection();
                    } else if (type === 'startGame') {
                        console.log('类型是返回主界面的清除')
                    }
                }
            });
            delayed += 100;
        }
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
    TaskBalloonParentSet(): void {
        // 气球的名称集合
        let arr1 = [];
        for (let i = 0; i < this.BalloonParent._children.length; i++) {
            const balloon = this.BalloonParent._children[i];
            arr1.push(balloon.name);
        }
        // 名称去重
        let arr2 = Array.from(new Set(arr1));

        // 按时间依次排列在任务栏上
        let len = arr2.length;
        let widthP = len * 75;
        this.TaskBalloonParent.width = widthP;//根据数量缩短提示界面
        let heightP = this.TaskBalloonParent.height;

        let delayed;//延时时间
        for (let j = 0; j < len; j++) {
            delayed = 50 * j;
            let name = arr2[j];
            let x = widthP / len * (j + 1) - widthP / (len * 2);
            let y = heightP / 2;
            // 通过Enum.ColorName[name]名称索引对应Enum.IconSkin_01图片地址
            let colorSkin = Enum.IconSkin_01[Enum.ColorName[name]];
            let ballon_Icon = this.createBallon_Icon(x, y, colorSkin);
            Animation.bombs_Appear(ballon_Icon, 0, 1, 1.1, 0, 200, 200, delayed, f => {
                if (j === len - 1) {
                    this.balloonCount();
                    this.balloonClickOrder();
                    this.clicksAllOn();
                    this.startSwicth = true;
                }
            });
        }

        // 然后把TaskBalloonParent位置移到中间位置
        this.TaskBalloonParent.pivotX = this.TaskBalloonParent.width / 2;
        this.TaskBalloonParent.x = 375;
    }

    /**
     * 点击指引提示现在应该点击哪个气球
     * this.clickOrderArr[]是顺序数组，如果点击正确了，那么删除这个数组的第一个元素
     * 所以每次都只需要匹配 this.clickOrderArr[0]就可以判断是否点击正确
     * 并且通过this.clickOrderArr[0]放大当前需要点击的那个任务气球
     */
    balloonClickOrder(): void {
        for (let i = 0; i < this.TaskBalloonParent._children.length; i++) {
            const taskBallon = this.TaskBalloonParent._children[i];
            const name = taskBallon.name;
            let img = taskBallon['Balloon_Icon'].img as Laya.Image;
            if (name === this.clickOrderArr[0]) {
                Animation.swell_shrink(taskBallon, 1.1, 1.3, 25, 0, f => {
                });
                img.skin = Enum.IconSkin_02[Enum.ColorName[name]];
            } else {
                taskBallon.scale(1, 1);
                img.skin = Enum.IconSkin_01[Enum.ColorName[name]];
            }
        }
    }

    /**
     * 排列气球顺序数组
     */
    balloonCount(): void {
        this.clickOrderArr = [];
        for (let j = 0; j < this.TaskBalloonParent._children.length; j++) {
            let taskBallon = this.TaskBalloonParent._children[j];
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
     * 创建任务位置的气球图标
     * @param x 
     * @param y 
     * @param colorSkin 颜色
     */
    createBallon_Icon(x, y, colorSkin): Laya.Sprite {
        let balloon_icon = Laya.Pool.getItemByCreateFun('balloon_icon', this.balloon_icon.create, this.balloon_icon) as Laya.Sprite;
        this.TaskBalloonParent.addChild(balloon_icon);
        balloon_icon.pos(x, y);
        // 根据关卡数随机给与颜色
        let img = balloon_icon['Balloon_Icon'].img as Laya.Image;
        img.skin = colorSkin;
        balloon_icon.name = Enum.ColorName[Enum.IconSkin_01[colorSkin]];
        return balloon_icon;
    }

    /**开启所有气球点击事件*/
    clicksAllOn(): void {
        for (let index = 0; index < this.BalloonParent._children.length; index++) {
            const element = this.BalloonParent._children[index];
            element['Balloon'].balloonClicksOn();
            console.log('开启所有气球的点击事件');
        }
    }

    /**关闭所有气球点击事件*/
    clicksAllOff(): void {
        for (let index = 0; index < this.BalloonParent._children.length; index++) {
            const element = this.BalloonParent._children[index];
            element['Balloon'].balloonClicksOff();
        }
    }

    /**
     * 创建结算界面
     * @param type 胜利或失败
     * */
    createGameOver(type): void {
        let gameOver = Laya.Pool.getItemByCreateFun('gameOver', this.gameOver.create, this.gameOver) as Laya.Sprite;
        this.self.addChild(gameOver);
        gameOver['GameOver'].gameOverType(type);

        this.clicksAllOff();
        this.startSwicth = false;
    }


    onUpdate(): void {
        if (this.startSwicth) {
            if (this.time.value > 0) {
                this.time.value -= 0.0001;
            } else if (this.time.value <= 0) {
                this.createGameOver('defeated');
                this.startSwicth = false;
            }
        }
    }


    onDisable(): void {


    }
}