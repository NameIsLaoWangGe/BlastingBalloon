(function () {
    'use strict';

    var WXDataManager;
    (function (WXDataManager) {
        WXDataManager.wx = Laya.Browser.window.wx;
        function WXcheckSession() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.checkSession({
                    success() {
                        console.log('已经登录过了！');
                    },
                    fail() {
                        WXLogin();
                        console.log('重新登录');
                    }
                });
            }
        }
        WXDataManager.WXcheckSession = WXcheckSession;
        function WXLogin() {
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
        WXDataManager.WXLogin = WXLogin;
        function onRegisterUser(_userinfo) {
            WXDataManager.wx.cloud.init({
                env: 'release-lwg'
            });
            WXDataManager.wx.cloud.callFunction({
                name: "login",
                data: {
                    userinfo: _userinfo,
                },
                success(res) {
                    console.log("登录成功回调", res);
                },
                fail: console.error()
            });
        }
        WXDataManager.onRegisterUser = onRegisterUser;
    })(WXDataManager || (WXDataManager = {}));

    class Login extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            console.log('开始登陆');
            this.loderBackground();
            WXDataManager.WXcheckSession();
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

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Script/Login.ts", Login);
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
