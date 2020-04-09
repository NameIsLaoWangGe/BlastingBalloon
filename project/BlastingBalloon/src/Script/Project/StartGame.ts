import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";
import { PalyAudio } from "../Template/PlayAudio";
import { Adaptive } from "../Template/Adaptive";
import { WXDataManager } from "../Template/WXDataManager";

export default class StartGame extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

    /** @prop {name:balloon, tips:"气球装饰", type:Node}*/
    public balloon: Laya.Image;

    /** @prop {name:btn_start, tips:"开始游戏按钮", type:Node}*/
    public btn_start: Laya.Sprite;

    /** @prop {name:btn_ranking, tips:"排行榜按钮", type:Node}*/
    public btn_ranking: Laya.Sprite;

    /** @prop {name:btn_share, tips:"分享按钮", type:Node}*/
    public btn_share: Laya.Sprite;

    /** @prop {name:anti_addiction, tips:"防沉迷文字", type:Node}*/
    public anti_addiction: Laya.Sprite;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**等级节点*/
    private LevelsNode: Laya.Sprite;

    /**开始游戏按别扭的渐隐动画开关*/
    private startSwitch: boolean;
    private startChange: string;

    /**计时器*/
    private timer: number

    /**保存视频实例*/
    private videoAd;
    /**是否观看了视频*/
    private watchAds: boolean;

    /**气球骨骼动画模板*/
    private templet: Laya.Templet
    /**气球骨骼动画*/
    private balloon_skeleton: Laya.Skeleton


    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOver'] = this;
        this.balloon_skeleton = this.balloon.getChildByName('balloon_skeleton') as Laya.Skeleton;

        this.gameControl = this.self.scene['GameControl'];
        this.LevelsNode = this.gameControl.LevelsNode as Laya.Sprite;
        this.gameControl.startNode = this.self;

        this.startSwitch = false;
        this.startChange = 'appear';

        Adaptive.interface_Center(this.self);
        Adaptive.child_Center(this.anti_addiction, this.self, Laya.stage.height * 9 / 10);
        this.timer = 0;

        this.appaer();
        this.createBoneAni();
    }

    /**创建骨骼动画皮肤*/
    createBoneAni(): void {
        //创建动画模板
        this.templet = new Laya.Templet();
        this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.templet.on(Laya.Event.ERROR, this, this.onError);
        this.templet.loadAni("Skeleton/beetle_01.sk");
    }

    onError(): void {
        console.log('装饰气球加载错误！');
    }

    parseComplete(): void {
        this.balloon_skeleton.play('rock', true);
        console.log('装饰气球加载成功！');
    }


    /**出现动画*/
    appaer(): void {
        let scale = 1.3;
        let time1 = 250;
        let time2 = 60;
        let delayed = 300;

        // logo
        for (let index = 0; index < this.logo._children.length; index++) {
            const element = this.logo._children[index];
            Animation.bombs_Appear(element, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * index, null);
        }

        // 开始按钮
        Animation.bombs_Appear(this.btn_start, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, null);

        // 排行按钮
        Animation.bombs_Appear(this.btn_ranking, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 3, null);

        // 分享按钮
        Animation.bombs_Appear(this.btn_share, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 4, f => {
            this.appaerFunc();
        });

        // 防沉迷文字
        Animation.fade_out(this.anti_addiction, 0, 1, 1000, 0, null);
    }

    /**出现动画回调函数*/
    appaerFunc(): void {
        this.startSwitch = true;
        this.clicksOnBtn();
    }

    /**
     * 消失动画
     * 一种是普通开始
     * 一种是看广告开始
     * @param  type 消失后的开始游戏类型
    */
    vanish(): void {
        let time = 250;
        let delayed = 100;
        // logo
        for (let index = 0; index < this.logo._children.length; index++) {
            const element = this.logo._children[index];
            Animation.bombs_Vanish(element, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * index, null);
        }
        // 开始按钮
        Animation.bombs_Vanish(this.btn_start, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 1, f => {
            Laya.Tween.clearAll(this.btn_start);
            this.startSwitch = false;
        });
        // 排行榜按钮
        Animation.bombs_Vanish(this.btn_ranking, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 2, null);
        // 分享按钮
        Animation.bombs_Vanish(this.btn_share, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : - 5, time, delayed * 3, f => {
            this.vanishFunc();
        });
        // 防沉迷文字
        Animation.fade_out(this.anti_addiction, 1, 0, 1000, 0, null);
    }

    /**
     * 动画播放完毕后开始游戏
    */
    vanishFunc(): void {
        this.self.removeSelf();
        this.gameControl.readyStart('startGame');
    }

    /**按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_start, this, null, null, this.up, null);
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_ranking, this, null, null, this.up, null);
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_share, this, null, null, this.up, null);
    }

    /**关闭按钮点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.btn_start, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_ranking, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_share, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        if (event.currentTarget.name === 'btn_start') {
            this.vanish();
            this.clicksOffBtn();
        } else if (event.currentTarget.name === 'btn_ranking') {
            this.gameControl.createRanking();
        } else if (event.currentTarget.name === 'btn_share') {
            WXDataManager.wxShare();
        }
    }

    onUpdate(): void {
        if (this.startSwitch) {
            if (this.startChange === 'appear') {
                this.btn_start.scaleX += 0.003;
                this.btn_start.scaleY += 0.003;
                if (this.btn_start.scaleX > 1.05) {
                    this.startChange = 'vanish';
                }
            } else if (this.startChange === 'vanish') {
                this.btn_start.scaleX -= 0.003;
                this.btn_start.scaleY -= 0.003;

                if (this.btn_start.scaleX < 1) {
                    this.startChange = 'appear';
                }
            }
        }
    }

    onDisable(): void {

    }
}