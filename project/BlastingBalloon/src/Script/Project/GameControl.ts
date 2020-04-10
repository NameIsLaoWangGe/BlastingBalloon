import { WXDataManager } from "../Template/WXDataManager";
import { Enum } from "../Template/Enum";
import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";
import { Advertising } from "../Template/Advertising";
import Balloon from "./Balloon";
import { SkTemplete } from "../Template/SkTemplete";
import { Data } from "../Template/Data";
import { PalyAudio } from "../Template/PlayAudio";


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

    /** @prop {name:propNum, tips:"道具的数量", type:Node}*/
    public propNum: Laya.FontClip;


    /** @prop {name:startGame, tips:"游戏开始预制体", type:Prefab}*/
    public startGame: Laya.Prefab;

    /** @prop {name:gameOver, tips:"游戏结束预制体", type:Prefab}*/
    public gameOver: Laya.Prefab;

    /** @prop {name:ranking, tips:"排行榜", type:Prefab}*/
    public ranking: Laya.Prefab;

    /** @prop {name:hint, tips:"提示", type:Prefab}*/
    public hint: Laya.Prefab;

    /** @prop {name:beetleParent, tips:"小甲虫父节点", type:Node}*/
    public beetleParent: Laya.Sprite;

    /** @prop {name:beetle, tips:"小甲虫", type:Prefab}*/
    public beetle: Laya.Prefab;

    /** @prop {name:explode, tips:"特效元素", type:Prefab}*/
    public explode: Laya.Prefab;

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
     * 当前关卡小甲虫的移动速度
     * */
    private beetleSpeed: number;
    /**
     * 时间减少的速度
     * */
    private timeVelocity: number;

    /**
     * 气球点击顺序集合
     */
    private clickOrderArr: Array<string>

    /**时间开关*/
    private timeSwicth

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

        //发送微信排行榜接受信息
        WXDataManager.wxPostInit();

        // 加载01视频广告
        Advertising.videoAd_01_Lode(f => this.watchAdsFunc('yes'), f => this.watchAdsFunc('no'));
        // 加载01bannar广告
        Advertising.bannerAd_01_Lode();

        // 骨骼动画加载
        SkTemplete.createBaoolonTemplet();
        // 加载数据表
        Data.dataLoading_Levels();
        // 微信登陆
        WXDataManager.normalWXLogin();

        // 播放背景音乐
        PalyAudio.playMusic(Enum.AudioName.bgm, 0, 1000);
    }

    /**
   * 看完广告后的回调
   * 没看完不给奖励
   * 打开时间开关，游戏继续进行
   * @param type 是否看完广告
  */
    watchAdsFunc(type): void {
        if (type === 'yes') {
            this.propNum.value = (Number(this.propNum.value) + 1).toString();
        } else {
            console.log('广告没有看完不给与奖励');
        }
        this.timeSwicth = true;
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
        if (Number(this.Levels.value) >= 10) {
            guan.x = 72;
            this.Levels.x = 68;
        } else {
            guan.x = 64;
            this.Levels.x = 70;
        }
    }

    /**
     * 为开场时候的设置
     * 游戏内节点消失
     * */
    noStart(): void {
        this.Tip.alpha = 0;
        this.BalloonVessel.alpha = 0;
        this.Levels.value = '1';
    }

    /**
     * 准备开始前的参数设置
     * 每个关卡会执行一次，参数每关不一样
     * @param type 一类型是从开始界面进入游戏，一种是下一关
     */
    readyStart(type): void {
        if (type === 'nextLevel') {
            this.Levels.value = (Number(this.Levels.value) + 1).toString();
        } else if (type === 'startGame') {
            // 从服务器拿到上次的关卡数
            this.Levels.value = WXDataManager._gameData._levels.toString();
            // 从服务器拿到上次的剩余道具数量
            this.propNum.value = 'x' + WXDataManager._gameData._propNum;
            this.openingAnimation();
        }
        // 其他参数设置
        this.time.value = 1;
        let level = Number(this.Levels.value);
        // 最高40关
        if (level >= 40) {
            level = 40;
        }

        // 通过关卡从数据表中取其他数据
        this.row = Data.levelsData[level - 1].row;
        this.line = Data.levelsData[level - 1].line;
        this.colorCategory = Data.levelsData[level - 1].colorCategory;
        this.beetleSpeed = Data.levelsData[level - 1].beetleSpeed;
        this.timeVelocity = Data.levelsData[level - 1].timeVelocity;

        // 优化间距
        let sub = this.line - this.row;
        switch (sub) {
            case 0:
                this.spacing = 5 - (this.line * 0.2);
                break;
            case 1:
                if (this.line === 4 && this.row == 3) {
                    this.spacing = 27;
                } else {
                    this.spacing = 26 - (this.line - 2) * 3.1;
                }
                break;
            default:
                break;
        }

        this.levelsNodeAdaptive();
    }

    /**创建开始游戏界面*/
    createStartGame(): void {
        let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame) as Laya.Sprite;
        this.self.addChild(startGame);
    }

    /**开始游戏时的开场动画*/
    openingAnimation(): void {
        this.Tip.alpha = 1;
        this.BalloonVessel.alpha = 1;

        let scale1 = 1.05;
        let time1 = 300;
        let time2 = 100;
        let delayed = 250;

        // 插座位置移动到两边
        let plug_01 = this.Tip.getChildByName('plug_01') as Laya.Image;
        plug_01.x = -1550;
        let plug_02 = this.Tip.getChildByName('plug_02') as Laya.Image;
        plug_02.x = -800;
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
    }

    /**
     * 开场任务提示抖动动画
     * @param delayed 延时时间
    */
    taskTipShake(delayed): void {
        // 插座插入后整体抖动
        let time = 150;
        let scaleX3 = 0.85;
        let scaleY3 = 1.15;
        let plug_01 = this.Tip.getChildByName('plug_01') as Laya.Image;
        Animation.deform_Move(plug_01, 1550, 555, scaleX3, scaleY3, time, delayed, null);

        let plug_02 = this.Tip.getChildByName('plug_02') as Laya.Image;
        Animation.deform_Move(plug_02, -800, 171, scaleX3, scaleY3, time, delayed, fun => {
            Animation.leftRight_Shake(this.Tip, 15, 60, 0, null);
            Animation.leftRight_Shake(this.PropsNode, 15, 60, 100, null);
            Animation.leftRight_Shake(this.LevelsNode, 15, 60, 100, null);
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

        this.pligAni(delayed * 3);
        this.createStartGame();
        this.clearAllBallon('startGame');
    }

    /**拔掉插座动画*/
    pligAni(delayed): void {
        // 拔掉插座
        let time2 = 800;
        let scaleX3 = 0.85;
        let scaleY3 = 1.15;

        let plug_01 = this.Tip.getChildByName('plug_01') as Laya.Image;
        let firstX_01 = plug_01.x;
        Animation.deform_Move(plug_01, firstX_01, 1550, scaleX3, scaleY3, time2, delayed, null);

        let plug_02 = this.Tip.getChildByName('plug_02') as Laya.Image;
        let firstX_02 = plug_02.x;

        Animation.deform_Move(plug_02, firstX_02, -800, scaleX3, scaleY3, time2, delayed, null);
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
                delayed += 50;
                // 缩放大小和位置用切宫格的方法，放入气球，分为row*line块，让移动缩放到宫格中间位置
                let x = widthP / this.row * (i + 1) - widthP / (this.row * 2);
                let y = heightP / this.line * (j + 1) - heightP / (this.line * 2);
                let balloon = this.createBallon(x, y);
                // 缩放大小,目前取决spacing
                let scale = (widthP / this.row - this.spacing * 2) / balloon.width;
                balloon.scale(scale, scale);
                Clicks.balloonScale = scale;
                balloon.pivotX = balloon.width / 2;
                balloon.pivotY = balloon.height / 2;

                Animation.bombs_Appear(balloon, 0, scale, scale + 0.1, 0, 200, 100, delayed, f => {
                    this.explodeAni(this.BalloonVessel, balloon.x + (1 - scale) * balloon.pivotX / 2, balloon.y + (1 - scale) * balloon.pivotY / 2, 'vanish', 6, 10)
                    if (i === this.row - 1 && j === this.line - 1) {
                        this.createBeetle();
                        this.TaskBalloonParentSet();
                        this.taskTipShake(0);
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

        this.pligAni(delayed);

        Animation.bombs_Vanish(this.LevelsNode, 0, 0, 0, 100, delayed, f => {
            this.readyStart('nextLevel');
            this.clearAllBallon('restartAndNextLevel');
            Animation.bombs_Appear(this.LevelsNode, 0, 1, 1.1, 0, time1, time2, delayed, f => {
            });
        })
        // 抖动后开始游戏
        Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
            this.time.value = 1;
            Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed, f => {
            });
        })

    }

    /**重玩当前关卡*/
    againCurrentlevel(): void {
        let scale1 = 1.05;
        let time1 = 200;
        let time2 = 100;
        let delayed = 250;
        this.pligAni(delayed);
        Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
            Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
            })
        })

        Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
            this.time.value = 1;
            Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed * 5, f => {
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
                this.explodeAni(this.BalloonVessel, element.x + (1 - Clicks.balloonScale) * element.pivotX / 2, element.y + (1 - Clicks.balloonScale) * element.pivotY / 2, 'vanish', 6, 10)
            })
            delayed += 60;
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
        let random = Math.floor(Math.random() * this.colorCategory);
        balloon.name = Enum.BalloonName[random];
        balloon['Balloon'].skeletoninit();

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
            // 第一个直接改变成提示样式的skin
            let colorSkin;
            if (j === 0) {
                colorSkin = Enum.IconSkin_02[Enum.BalloonName[name]];
            } else {
                colorSkin = Enum.IconSkin_01[Enum.BalloonName[name]];
            }
            let ballon_Icon = this.createBallon_Icon(x, y, colorSkin, name);
            Animation.bombs_Appear(ballon_Icon, 0, 1, 1.1, 0, 200, 200, delayed, f => {
                if (j === len - 1) {
                    // 喇叭只有动画完成之后才能点击
                    this.PropsNode['Props'].clicksOnBtn();
                    this.balloonCount();
                    this.balloonClickOrder();
                    this.clicksAllOn();
                    this.timeSwicth = true;
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
                Animation.swell_shrink(taskBallon, 1.1, 1.3, 50, 0, f => {
                });
                img.skin = Enum.IconSkin_02[Enum.BalloonName[name]];//当前点击的用另一个图片
            } else {
                taskBallon.scale(1, 1);
                img.skin = Enum.IconSkin_01[Enum.BalloonName[name]];
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
     * @param name 命名
     */
    createBallon_Icon(x, y, colorSkin, name): Laya.Sprite {
        let balloon_icon = Laya.Pool.getItemByCreateFun('balloon_icon', this.balloon_icon.create, this.balloon_icon) as Laya.Sprite;
        this.TaskBalloonParent.addChild(balloon_icon);
        balloon_icon.pos(x, y);
        // 根据关卡数随机给与颜色
        let img = balloon_icon['Balloon_Icon'].img as Laya.Image;
        img.skin = colorSkin;
        balloon_icon.name = name;
        return balloon_icon;
    }

    /**开启所有气球点击事件*/
    clicksAllOn(): void {
        for (let index = 0; index < this.BalloonParent._children.length; index++) {
            const element = this.BalloonParent._children[index];
            element['Balloon'].balloonClicksOn();
            // console.log('开启所有气球的点击事件');
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
     * 需要关闭时间开关
     * @param type 胜利或失败
     * */
    createGameOver(type): void {

        let gameOver = Laya.Pool.getItemByCreateFun('gameOver', this.gameOver.create, this.gameOver) as Laya.Sprite;

        // 微信上传关卡
        WXDataManager.wxPostData(this.Levels.value);
        // 更新数据,胜利了会更新+1，失败则不加+1
        if (type === 'defeated') {
            WXDataManager._gameData._levels = Number(this.Levels.value);
        } else if (type === 'victory') {
            WXDataManager._gameData._levels = Number(this.Levels.value) + 1;
        }
        WXDataManager._gameData._propNum = Number(this.propNum.value.substring(1, 3));
        WXDataManager.update_GameData();

        // 关掉时间和点击
        this.clicksAllOff();
        // 喇叭只有动画完成之后才能点击
        this.PropsNode['Props'].clicksOffBtn();
        // 停止计时
        this.timeSwicth = false;
        // 小甲虫离开游戏
        let len = this.beetleParent._children.length;
        if (len === 0) {
            this.self.addChild(gameOver);
            gameOver['GameOver'].gameOverType(type);
            return;
        }
        for (let index = 0; index < len; index++) {
            const beetle = this.beetleParent._children[index];
            // 通过类型判断是闯关成功还是失败，，失败小甲虫往上走，成功小甲虫往下掉
            beetle['Beetle'].moveSwitch = false;//移动关闭
            beetle['Beetle'].remainTime = -20000;//停止时间无限大
            beetle['Beetle'].clicksOffBtn()//点击事件关闭
            if (type === 'defeated') {
                beetle['Beetle'].playSkeletonAni(1, 'move');
                Animation.simple_Move(beetle, beetle.x, beetle.y, beetle.x, beetle.y - 1400, 2000, 0, f => {
                    beetle.removeSelf();
                    this.self.addChild(gameOver);
                    gameOver['GameOver'].gameOverType(type);

                });
            } else if (type === 'victory') {
                beetle['Beetle'].playSkeletonAni(1, 'death');
                Animation.drop(beetle, beetle.y + 1600, 0, 1000, 0, f => {
                    beetle.removeSelf();
                    this.self.addChild(gameOver);
                    gameOver['GameOver'].gameOverType(type);

                });
            }
        }
    }

    /**
    * 创建排行榜界面
    * */
    createRanking(): void {
        let ranking = Laya.Pool.getItemByCreateFun('ranking', this.ranking.create, this.ranking) as Laya.Sprite;
        this.self.addChild(ranking);
    }

    /**
      * 创建提示界面
      * 需要停止进度条和关闭点击事件
      * */
    createHint(): void {
        let hint = Laya.Pool.getItemByCreateFun('hint', this.hint.create, this.hint) as Laya.Sprite;
        this.self.addChild(hint);

        this.timeSwicth = false;
    }


    /**
      * 创建小甲虫
      * */
    createBeetle(): void {
        let beetle = Laya.Pool.getItemByCreateFun('beetle', this.beetle.create, this.beetle) as Laya.Sprite;
        this.beetleParent.addChild(beetle);
    }

    /**爆炸动画
    * @param parent 父节点
    * @param x x位置
    * @param y y位置
    * @param type 类型 
    * @param number 数量 
    * @param zOrder 层级
   */
    explodeAni(parent, x, y, type, number, zOrder): void {
        for (let i = 0; i < number; i++) {
            let explode = Laya.Pool.getItemByCreateFun('explode', this.explode.create, this.explode) as Laya.Sprite;
            parent.addChild(explode);
            explode.zOrder = zOrder;
            explode.pos(x, y);
            // 类型
            explode['Explode'].type = type;
            explode['Explode'].line = i;
            explode['Explode'].initProperty(type);
        }
    }

    onUpdate(): void {
        if (this.timeSwicth) {
            if (this.time.value > 0) {
                this.time.value -= this.timeVelocity;
            } else if (this.time.value <= 0) {
                Animation.leftRight_Shake(this.TimeNode, 20, 60, 50, f => {
                    this.createGameOver('defeated');
                })
                this.timeSwicth = false;
            }
        }
    }


    onDisable(): void {


    }
}