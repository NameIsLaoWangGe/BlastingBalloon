(function () {
    'use strict';

    var WXDataManager;
    (function (WXDataManager) {
        WXDataManager.Levels = 0;
        WXDataManager.wx = Laya.Browser.window.wx;
        function WXcheckSession() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.checkSession({
                    success() {
                        console.log('已经登录过了！');
                    },
                    fail() {
                        authorizedWXLogin();
                        console.log('重新登录');
                    }
                });
            }
        }
        WXDataManager.WXcheckSession = WXcheckSession;
        function authorizedWXLogin() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.login({
                    success: function (res) {
                        if (res.code) {
                            console.log("登录成功，获取到code", res.code);
                        }
                        var button = WXDataManager.wx.createUserInfoButton({
                            type: 'text',
                            text: '开始游戏',
                            style: {
                                left: WXDataManager.wx.getSystemInfoSync().screenWidth / 2 - 60,
                                bottom: WXDataManager.wx.getSystemInfoSync().screenHeight / 2 - 60,
                                width: 120,
                                height: 40,
                                lineHeight: 40,
                                backgroundColor: '#fb94a9',
                                color: '#ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 20
                            }
                        });
                        button.show();
                        button.onTap((res) => {
                            console.log(res);
                            if (res.errMsg === "getUserInfo:ok") {
                                console.log("已经授权");
                                button.destroy();
                                onRegisterUser(res.userInfo);
                            }
                            else {
                                console.log("没有授权");
                            }
                        });
                    }
                });
            }
        }
        WXDataManager.authorizedWXLogin = authorizedWXLogin;
        function onRegisterUser(_userinfo) {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                WXDataManager.wx.cloud.callFunction({
                    name: "login",
                    data: {
                        userinfo: _userinfo,
                    },
                }).then(res => {
                    console.log("登录成功回调", res);
                });
            }
        }
        WXDataManager.onRegisterUser = onRegisterUser;
        function normalWXLogin() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.login({
                    success(res) {
                        console.log('成功登录');
                        WXDataManager.wx.cloud.init({
                            env: 'release-lwg'
                        });
                        WXDataManager.wx.cloud.callFunction({
                            name: "login",
                            data: {
                                code: res.code,
                            },
                        }).then(res => {
                            console.log("登录成功回调", res);
                        });
                    },
                    fail() {
                        console.log('登录失败');
                    }
                });
            }
        }
        WXDataManager.normalWXLogin = normalWXLogin;
        function createUserInfoCollection() {
            WXDataManager.wx.cloud.init({
                env: 'release-lwg'
            });
            const db = WXDataManager.wx.cloud.database();
            db.cr;
        }
        WXDataManager.createUserInfoCollection = createUserInfoCollection;
        function uploadLevels() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                const db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.doc('userLevels').get().then(res => {
                    console.log(res.data);
                    if (res) {
                        console.log('已经有了这个记录');
                        console.log(res.data.levels);
                        WXDataManager.Levels = res.data.levels;
                    }
                    else {
                        console.log('目前没有这个记录，需进行第一次添加');
                        user_info.add({
                            data: {
                                _id: 'userLevels',
                                levels: WXDataManager.Levels,
                                due: new Date("2018-09-01"),
                                location: new db.Geo.Point(113, 23),
                                done: false
                            },
                        }).then(res => {
                            console.log(res);
                        });
                    }
                });
            }
        }
        WXDataManager.uploadLevels = uploadLevels;
        function updateLevels() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                const db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.doc('userLevels').update({
                    data: {
                        levels: WXDataManager.Levels,
                    },
                }).then(res => {
                    console.log(res);
                });
            }
        }
        WXDataManager.updateLevels = updateLevels;
    })(WXDataManager || (WXDataManager = {}));

    class Login extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.loderBackground();
            WXDataManager.normalWXLogin();
        }
        loderBackground() {
            let self = this;
            let url = 'https://7265-release-lwg-1301725130.tcb.qcloud.la/background/%E8%83%8C%E6%99%AF%E5%9B%BE.png?sign=df6e8c6c287f2a1bdf1dbab26fa1d884&t=1585665019';
            Laya.loader.load(url, Laya.Handler.create(this, function () {
                self.background.loadImage(url);
            }));
        }
        onDisable() {
        }
    }

    var Clicks;
    (function (Clicks) {
        function clicksOn(effect, audioUrl, target, caller, down, move, up, out) {
            let btnEffect;
            Clicks.audioUrl = audioUrl;
            switch (effect) {
                case 'largen':
                    btnEffect = new Btn_LargenEffect();
                    break;
                default:
                    btnEffect = new Btn_LargenEffect();
                    break;
            }
            target.on(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
            target.on(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
            target.on(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
            target.on(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
        }
        Clicks.clicksOn = clicksOn;
        function clicksOff(effect, target, caller, down, move, up, out) {
            let btnEffect;
            switch (effect) {
                case 'largen':
                    btnEffect = new Btn_LargenEffect();
                    break;
                default:
                    break;
            }
            target.off(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
            target.off(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
            target.off(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
            target.off(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
        }
        Clicks.clicksOff = clicksOff;
    })(Clicks || (Clicks = {}));
    class Btn_LargenEffect {
        constructor() {
        }
        down(event) {
            event.currentTarget.scale(1.1, 1.1);
            Laya.SoundManager.playSound(Clicks.audioUrl, 1, Laya.Handler.create(this, function () { }));
        }
        up(event) {
            event.currentTarget.scale(1, 1);
        }
        move(event) {
            event.currentTarget.scale(1.1, 1.1);
        }
        out(event) {
            event.currentTarget.scale(1, 1);
        }
    }

    class AddLevels extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onEnable() {
            console.log('新测试');
            WXDataManager.uploadLevels();
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.owner, this, this.down, null, null, null);
        }
        down(event) {
            this.owner.scale(1.1, 1.1);
            WXDataManager.Levels++;
            console.log(WXDataManager.Levels);
            WXDataManager.updateLevels();
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Script/Login.ts", Login);
            reg("Script/AddLevels.ts", AddLevels);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Scenes/MainScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
