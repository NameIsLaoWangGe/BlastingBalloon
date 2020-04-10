import { Clicks } from "../Template/Clicks";
import { Animation } from "../Template/Animation";

export default class Props extends Laya.Script {
    /** @prop {name:propNum, tips:"道具数量", type:Node}*/
    public propNum: Laya.FontClip;

    /** @prop {name:bullet, tips:"道具发射的光圈", type:Prefab}*/
    public bullet: Laya.Prefab;

    /**骨骼动画模板*/
    private templet: Laya.Templet
    /**骨骼动画*/
    private prop_skeleton: Laya.Skeleton

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;

    /**小甲虫父节点*/
    private beetleParent;


    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['Props'] = this;
        this.gameControl = this.self.scene['GameControl'];
        this.prop_skeleton = this.self.getChildByName('prop_skeleton') as Laya.Skeleton;
        this.beetleParent = this.gameControl.beetleParent as Laya.Sprite;
        // this.clicksOnBtn();
        this.createBoneAni();
    }

    /**创建骨骼动画皮肤*/
    createBoneAni(): void {
        //创建动画模板
        this.templet = new Laya.Templet();
        this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.templet.on(Laya.Event.ERROR, this, this.onError);
        this.templet.loadAni("Skeleton/trumpet.sk");
    }

    onError(): void {
        console.log('小喇叭骨骼动画加载错误！');
    }

    parseComplete(): void {
        console.log('小喇叭骨骼动画加载成功！');
        this.playSkeletonAni(1, 'static');
    }
    /**播放骨骼动画
   * @param speed 播放速度
   * @param type 播放动画类型
   */
    playSkeletonAni(speed: number, type: string): void {
        this.prop_skeleton.play(type, true);
        this.prop_skeleton.rotation = 0;
        this.prop_skeleton.playbackRate(speed);
    }

    /**点一次喇叭之消灭一只小甲虫*/
    eliminateBeetle(): void {
        let len = this.beetleParent._children.length;
        if (len === 0) {
            console.log('没有小甲虫');
        } else {
            let beetle = this.beetleParent._children[0];
            beetle['Beetle'].playSkeletonAni(1, 'death');
            beetle['Beetle'].clicksOffBtn()//点击事件关闭
            Animation.drop(beetle, beetle.y + 1600, 0, 1000, 0, f => {
                beetle.removeSelf();
            });
        }
    }

    /**
     * 喇叭射击特效
     * */
    prorAttack(): void {
        let delay = 0;
        for (let l = 0; l < 6; l++) {
            delay += 75;
            Laya.timer.once(delay, this, function () {
                let bullet = Laya.Pool.getItemByCreateFun('bullet', this.bullet.create, this.bullet) as Laya.Sprite;
                this.self.addChild(bullet);
                bullet.x = 25;
                bullet.y = 60;
                bullet['Bullet'].line = l;
                bullet['Bullet'].moveSwitch = true;
            })
        }
    }

    /**按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.self, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        // 如果小喇叭没有了，才能看广告
        // 如果还有小喇叭，那么发动攻击后，小喇叭减一
        let number = Number(this.propNum.value.substring(1, 3));
        console.log(number);
        if (number > 0) {
            // 播放攻击动画
            this.prop_skeleton.play('attack', false);
            this.prop_skeleton.playbackRate(3);
            // 数量减一
            this.propNum.value = 'x' + (number - 1).toString();
            // 消灭一个小甲虫
            this.eliminateBeetle();
            //整个气球位置抖动配合喇叭,抖动时关闭点击事件
            this.clicksOffBtn();
            Animation.leftRight_Shake(this.gameControl.BalloonVessel, 20, 50, 100, f => {
                this.clicksOnBtn();
            });

            // 发射特效
            this.prorAttack();
        } else {
            this.gameControl.createHint();
        }
    }


    onDisable(): void {
    }
}