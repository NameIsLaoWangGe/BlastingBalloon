import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";
import { PalyAudio } from "../Template/PlayAudio";
import { Adaptive } from "../Template/Adaptive";

export default class StartGame extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

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

    /**保存视频实例*/
    private videoAd;
    /**是否观看了视频*/
    private watchAds: boolean;


    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOVer'] = this;
        this.gameControl = this.self.scene['GameControl'];
        this.LevelsNode = this.gameControl.LevelsNode as Laya.Sprite;
        this.gameControl.startNode = this.self;

        this.startSwitch = false;
        this.startChange = 'appear';
        this.watchAds = false;

        Adaptive.interface_Center(this.self);
        Adaptive.child_Center(this.anti_addiction, this.self, Laya.stage.height * 9 / 10)

        // this.videoAd = this.gameControl.videoAd;

        // // 第一次出现开始界面不播放音效，第二次开始播放
        // if (this.gameControl.startFirstAudio > 0) {
        //     PalyAudio.aAingleCard(5);
        // }
        // this.gameControl.startFirstAudio += 1;

        this.appaer();
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
        Animation.bombs_Appear(this.btn_share, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 4, null);

        // 防沉迷文字
        Animation.fade_out(this.anti_addiction, 0, 1, 1000, 0, null);
    }

    /**出现动画回调函数*/
    appaerFunc(): void {
        this.startSwitch = true;
        this.clicksOnBtn();
        // 显示bannar广告
        if (Laya.Browser.onMiniGame) {
            this.gameControl.bannerAd.show()
                .then(() => console.log('banner 广告显示'));
        }
    }

    /**
     * 消失动画
     * 一种是普通开始
     * 一种是看广告开始
     * @param  type 消失后的开始游戏类型
    */
    vanish(type): void {
        let time = 600;
        let y = 1800;
        let delayed = 50;
        // logo下落
        Animation.drop(this.logo, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 0, null);
        // 开始按钮下落
        Animation.drop(this.btn_start, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 1, null);

        // 排行榜按钮下落
        Animation.drop(this.btn_ranking, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 3, null);
        // 分享按钮下落
        Animation.drop(this.btn_share, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 5, func => this.vanishFunc(type));
        // 分割线消失
        Animation.fade_out(this.anti_addiction, 1, 0, 300, 0, null);
    }

    /**
     * 动画播放完毕后开始游戏
    */
    vanishFunc(type): void {
        this.self.removeSelf();
        this.gameControl.otherAppear();
        this.gameControl.replacementCard(type);
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
            // 关闭bannar广告
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.hide();
            }
            this.vanish('start');
            this.clicksOffBtn();
        } else if (event.currentTarget.name === 'btn_adv') {
            // 关闭bannar广告
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.hide();
            }
            // 用户触发广告后，显示激励视频广告
            this.videoAd.show().catch(() => {
                // 失败重试
                this.videoAd.load()
                    .then(() => this.videoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        } else if (event.currentTarget.name === 'btn_ranking') {
            this.gameControl.createRanking();

        } else if (event.currentTarget.name === 'btn_share') {
            this.gameControl.wxShare();
        }
    }

    onUpdate(): void {
        if (this.startSwitch) {
            if (this.startChange === 'appear') {

                this.btn_start.scaleX += 0.003;
                this.btn_start.scaleY += 0.003;

                if (this.btn_start.scaleX > 1.1) {
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