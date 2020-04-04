(function () {
    'use strict';

    var Enum;
    (function (Enum) {
        let ColorSkin;
        (function (ColorSkin) {
            ColorSkin[ColorSkin["UI/balloon_\u6DE1\u9EC4.png"] = 0] = "UI/balloon_\u6DE1\u9EC4.png";
            ColorSkin[ColorSkin["UI/balloon_\u7C89\u8272.png"] = 1] = "UI/balloon_\u7C89\u8272.png";
            ColorSkin[ColorSkin["UI/balloon_\u9EC4\u8272.png"] = 2] = "UI/balloon_\u9EC4\u8272.png";
            ColorSkin[ColorSkin["UI/balloon_\u9752\u8272.png"] = 3] = "UI/balloon_\u9752\u8272.png";
            ColorSkin[ColorSkin["UI/balloon_\u7D2B\u8272.png"] = 4] = "UI/balloon_\u7D2B\u8272.png";
        })(ColorSkin = Enum.ColorSkin || (Enum.ColorSkin = {}));
        let ColorName;
        (function (ColorName) {
            ColorName[ColorName["yellowish"] = 0] = "yellowish";
            ColorName[ColorName["pink"] = 1] = "pink";
            ColorName[ColorName["yellow"] = 2] = "yellow";
            ColorName[ColorName["cyan"] = 3] = "cyan";
            ColorName[ColorName["purple"] = 4] = "purple";
        })(ColorName = Enum.ColorName || (Enum.ColorName = {}));
        let Color_iconSkin;
        (function (Color_iconSkin) {
            Color_iconSkin[Color_iconSkin["UI/icon_\u6DE1\u9EC4.png"] = 0] = "UI/icon_\u6DE1\u9EC4.png";
            Color_iconSkin[Color_iconSkin["UI/icon_\u7C89\u8272.png"] = 1] = "UI/icon_\u7C89\u8272.png";
            Color_iconSkin[Color_iconSkin["UI/icon_\u9EC4\u8272.png"] = 2] = "UI/icon_\u9EC4\u8272.png";
            Color_iconSkin[Color_iconSkin["UI/icon_\u9752\u8272.png"] = 3] = "UI/icon_\u9752\u8272.png";
            Color_iconSkin[Color_iconSkin["UI/icon_\u7D2B\u8272.png"] = 4] = "UI/icon_\u7D2B\u8272.png";
        })(Color_iconSkin = Enum.Color_iconSkin || (Enum.Color_iconSkin = {}));
    })(Enum || (Enum = {}));

    var Clicks;
    (function (Clicks) {
        function clicksOn(effect, audioUrl, target, caller, down, move, up, out) {
            let btnEffect;
            Clicks.audioUrl = audioUrl;
            switch (effect) {
                case 'largen':
                    btnEffect = new Btn_LargenEffect();
                    break;
                case 'balloon':
                    btnEffect = new Btn_Balloon();
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
                case 'balloon':
                    btnEffect = new Btn_Balloon();
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
    class Btn_Balloon {
        constructor() {
        }
        down(event) {
            event.currentTarget.scale(Clicks.balloonScale + 0.06, Clicks.balloonScale + 0.06);
            Laya.SoundManager.playSound(Clicks.audioUrl, 1, Laya.Handler.create(this, function () { }));
        }
        up(event) {
            event.currentTarget.scale(Clicks.balloonScale, Clicks.balloonScale);
        }
        move(event) {
            event.currentTarget.scale(Clicks.balloonScale, Clicks.balloonScale);
        }
        out(event) {
            event.currentTarget.scale(Clicks.balloonScale, Clicks.balloonScale);
        }
    }

    class GameControl extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.slef = this.owner;
            this.slef['GameControl'] = this;
            this.levelsParameter();
            this.createBalloonCollection();
        }
        levelsParameter() {
            this.row = 4;
            this.line = 5;
            this.spacing = 5;
            this.colorCategory = 5;
        }
        createBalloonCollection() {
            let widthP = this.BalloonParent.width;
            let heightP = this.BalloonParent.height;
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.line; j++) {
                    let x = widthP / this.row * (i + 1) - widthP / (this.row * 2);
                    let y = heightP / this.line * (j + 1) - heightP / (this.line * 2);
                    let balloon = this.createBallon(x, y);
                    let scale = (widthP / this.row - this.spacing * 2) / balloon.width;
                    balloon.scale(scale, scale);
                    Clicks.balloonScale = scale;
                    balloon['Balloon'].cardClicksOn();
                }
            }
            this.taskPromptSet();
        }
        createBallon(x, y) {
            let balloon = Laya.Pool.getItemByCreateFun('balloon', this.balloon.create, this.balloon);
            this.BalloonParent.addChild(balloon);
            balloon.pos(x, y);
            let img = balloon['Balloon'].img;
            let random = Math.floor(Math.random() * this.colorCategory);
            img.skin = Enum.ColorSkin[random];
            balloon.name = Enum.ColorName[random];
            return balloon;
        }
        taskPromptSet() {
            let arr1 = [];
            for (let i = 0; i < this.BalloonParent._children.length; i++) {
                const balloon = this.BalloonParent._children[i];
                arr1.push(balloon.name);
            }
            let arr2 = Array.from(new Set(arr1));
            let len = arr2.length;
            let widthP = len * 120;
            this.TaskPrompt.width = widthP;
            let heightP = this.TaskPrompt.height;
            for (let j = 0; j < len; j++) {
                const element = arr2[j];
                let x = widthP / len * (j + 1) - widthP / (len * 2);
                let y = heightP / 2;
                let name = arr2[j];
                let colorSkin = Enum.Color_iconSkin[Enum.ColorName[name]];
                this.createBallon_Icon(x, y, colorSkin);
            }
            this.TaskPrompt.pivotX = this.TaskPrompt.width / 2;
            this.TaskPrompt.x = 375;
            this.numer();
        }
        numer() {
            for (let j = 0; j < this.TaskPrompt._children.length; j++) {
                let taskBallon = this.TaskPrompt._children[j];
                let taskName = taskBallon.name;
                for (let i = 0; i < this.BalloonParent._children.length; i++) {
                    let balloon = this.BalloonParent._children[i];
                    let name = balloon.name;
                    if (taskName === name) {
                        let num = taskBallon['Balloon_Icon'].num;
                        num.value = (Number(num.value) + 1).toString();
                    }
                }
            }
        }
        createBallon_Icon(x, y, colorSkin) {
            let balloon_icon = Laya.Pool.getItemByCreateFun('balloon_icon', this.balloon_icon.create, this.balloon_icon);
            this.TaskPrompt.addChild(balloon_icon);
            balloon_icon.pos(x, y);
            let img = balloon_icon['Balloon_Icon'].img;
            img.skin = colorSkin;
            balloon_icon.name = Enum.ColorName[Enum.Color_iconSkin[colorSkin]];
            return balloon_icon;
        }
        onDisable() {
        }
    }

    class Balloon extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.self = this.owner;
            this.gameControl = this.self.scene['GameControl'];
            this.self['Balloon'] = this;
        }
        cardClicksOn() {
            Clicks.clicksOn('balloon', '音效/按钮点击.mp3', this.self, this, null, null, null, null);
        }
        cardClicksOff() {
            Clicks.clicksOff('balloon', this.self, this, null, null, null, null);
        }
        down(event) {
            event.currentTarget.scale(1.1, 1.1);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
        }
        onDisable() {
        }
        onUpdate() {
        }
    }

    class Balloon_Icon extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.self = this.owner;
            this.gameControl = this.self.scene['GameControl'];
            this.self['Balloon_Icon'] = this;
        }
        onDisable() {
        }
        onUpdate() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Script/Project/GameControl.ts", GameControl);
            reg("Script/Project/Balloon.ts", Balloon);
            reg("Script/Project/Balloon_Icon.ts", Balloon_Icon);
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
    GameConfig.stat = true;
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
