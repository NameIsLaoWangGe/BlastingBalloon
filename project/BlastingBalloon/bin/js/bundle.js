(function () {
    'use strict';

    class Levels extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['LevelsNode'] = this;
            this.gameControl = this.self.scene['GameControl'];
        }
        adaptive() {
            let len = this.Levels.value.length;
            switch (len) {
                case 1:
                    this.guan.x = 64;
                    break;
                case 2:
                    this.guan.x = 72;
                    break;
                default:
                    this.guan.x = 72;
                    break;
            }
        }
        onDisable() {
        }
    }

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
        let IconSkin_01;
        (function (IconSkin_01) {
            IconSkin_01[IconSkin_01["UI/icon_\u6DE1\u9EC4.png"] = 0] = "UI/icon_\u6DE1\u9EC4.png";
            IconSkin_01[IconSkin_01["UI/icon_\u7C89\u8272.png"] = 1] = "UI/icon_\u7C89\u8272.png";
            IconSkin_01[IconSkin_01["UI/icon_\u9EC4\u8272.png"] = 2] = "UI/icon_\u9EC4\u8272.png";
            IconSkin_01[IconSkin_01["UI/icon_\u9752\u8272.png"] = 3] = "UI/icon_\u9752\u8272.png";
            IconSkin_01[IconSkin_01["UI/icon_\u7D2B\u8272.png"] = 4] = "UI/icon_\u7D2B\u8272.png";
        })(IconSkin_01 = Enum.IconSkin_01 || (Enum.IconSkin_01 = {}));
        let IconSkin_02;
        (function (IconSkin_02) {
            IconSkin_02[IconSkin_02["UI/icon_\u6DE1\u9EC4_pitch.png"] = 0] = "UI/icon_\u6DE1\u9EC4_pitch.png";
            IconSkin_02[IconSkin_02["UI/icon_\u7C89\u8272_pitch.png"] = 1] = "UI/icon_\u7C89\u8272_pitch.png";
            IconSkin_02[IconSkin_02["UI/icon_\u9EC4\u8272_pitch.png"] = 2] = "UI/icon_\u9EC4\u8272_pitch.png";
            IconSkin_02[IconSkin_02["UI/icon_\u9752\u8272_pitch.png"] = 3] = "UI/icon_\u9752\u8272_pitch.png";
            IconSkin_02[IconSkin_02["UI/icon_\u7D2B\u8272_pitch.png"] = 4] = "UI/icon_\u7D2B\u8272_pitch.png";
        })(IconSkin_02 = Enum.IconSkin_02 || (Enum.IconSkin_02 = {}));
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
            event.currentTarget.scale(1, 1);
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

    var Animation;
    (function (Animation) {
        function upDown_Rotate(node, time, func) {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), 0);
        }
        Animation.upDown_Rotate = upDown_Rotate;
        function leftRight_Rotate(node, time, func) {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        }), 0);
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), 0);
            }), 0);
        }
        Animation.leftRight_Rotate = leftRight_Rotate;
        function leftRight_Shake(node, time, range, delayed, func) {
            Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }));
                }));
            }), delayed);
        }
        Animation.leftRight_Shake = leftRight_Shake;
        function upDwon_Shake(node, time, range, func) {
            Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }));
                }));
            }));
        }
        Animation.upDwon_Shake = upDwon_Shake;
        function fade_out(node, alhpa1, alhpa2, time, delayed, func) {
            node.alpha = alhpa1;
            Laya.Tween.to(node, { alpha: alhpa2 }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.fade_out = fade_out;
        function fade_out_Move(node, time, range, x, y, delayed, func) {
            Laya.Tween.to(node, { alpha: range, x: x, y: y }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.fade_out_Move = fade_out_Move;
        function drop(node, targetY, rotation, time, delayed, func) {
            Laya.Tween.to(node, { y: targetY, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.drop = drop;
        function go_up(node, initialY, initialR, targetY, time, delayed, func) {
            node.y = initialY;
            node.rotation = initialR;
            Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.go_up = go_up;
        function cardRotateX_TowFace(node, arr, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                for (let i = 0; i < arr.length; i++) {
                    let child = node.getChildByName(arr[i]);
                    if (child !== null) {
                        child['alpha'] = 0;
                    }
                }
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                            for (let i = 0; i < arr.length; i++) {
                                let child = node.getChildByName(arr[i]);
                                if (child !== null) {
                                    child['alpha'] = 1;
                                }
                            }
                            if (func2 !== null) {
                                func2();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }
        Animation.cardRotateX_TowFace = cardRotateX_TowFace;
        function cardRotateX_OneFace(node, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func2 !== null) {
                        func2();
                    }
                }), 0);
            }), delayed);
        }
        Animation.cardRotateX_OneFace = cardRotateX_OneFace;
        function cardRotateY_TowFace(node, arr, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                for (let i = 0; i < arr.length; i++) {
                    let child = node.getChildByName(arr[i]);
                    if (child !== null) {
                        child['alpha'] = 0;
                    }
                }
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                            for (let i = 0; i < arr.length; i++) {
                                let child = node.getChildByName(arr[i]);
                                if (child !== null) {
                                    child['alpha'] = 1;
                                }
                            }
                            if (func2 !== null) {
                                func2();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }
        Animation.cardRotateY_TowFace = cardRotateY_TowFace;
        function cardRotateY_OneFace(node, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func2 !== null) {
                        func2();
                    }
                }), 0);
            }), delayed);
        }
        Animation.cardRotateY_OneFace = cardRotateY_OneFace;
        function move_changeRotate(node, targetX, targetY, per, rotation_pe, time, func) {
            let targetPerX = targetX * per + node.x * (1 - per);
            let targetPerY = targetY * per + node.y * (1 - per);
            Laya.Tween.to(node, { x: targetPerX, y: targetPerY, rotation: 45 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }), 0);
        }
        Animation.move_changeRotate = move_changeRotate;
        function bombs_Appear(node, firstAlpha, firstScale, scale1, rotation, time1, time2, delayed, func) {
            node.scale(0, 0);
            node.alhpa = firstAlpha;
            Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alhpa: 1, rotation: rotation }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.2, scaleY: firstScale + (scale1 - firstScale) * 0.2, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }
        Animation.bombs_Appear = bombs_Appear;
        function bombs_Vanish(node, scale, alpha, rotation, time, delayed, func) {
            Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alhpa: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.bombs_Vanish = bombs_Vanish;
        function swell_shrink(node, firstScale, scale1, time, delayed, func) {
            Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alhpa: 1, }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.5, scaleY: firstScale + (scale1 - firstScale) * 0.5, rotation: 0 }, time * 0.5, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }
        Animation.swell_shrink = swell_shrink;
        function simple_Move(node, firstX, firstY, targetX, targetY, time, delayed, func) {
            node.x = firstX;
            node.y = firstY;
            Laya.Tween.to(node, { x: targetX, y: targetY }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.simple_Move = simple_Move;
        function deform_Move(node, firstX, targetX, scaleX, scaleY, time, delayed, func) {
            node.x = firstX;
            Laya.Tween.to(node, { x: targetX, scaleX: scaleX, scaleY: scaleY }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }), delayed);
        }
        Animation.deform_Move = deform_Move;
    })(Animation || (Animation = {}));

    class GameControl extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.self = this.owner;
            this.self['GameControl'] = this;
            this.noStart();
            this.createStartGame();
            this.adaptive();
        }
        adaptive() {
            let stageH = Laya.stage.height;
            this.self.height = stageH;
            this.Background.height = stageH;
            this.Tip.y = stageH * 0.171;
            this.BalloonVessel.y = stageH * 0.266;
            this.BalloonVessel.height = stageH * 0.697;
            let parentBoard = this.BalloonVessel.getChildByName('parentBoard');
            parentBoard.height = stageH * 0.697;
            this.BalloonParent.height = parentBoard.height - 100;
            this.Grass.y = stageH;
        }
        levelsNodeAdaptive() {
            let guan = this.LevelsNode.getChildByName('guan');
            console.log(Number(this.Levels.value));
            if (Number(this.Levels.value) >= 10) {
                console.log(Number(this.Levels.value));
                guan.x = 72;
            }
            else {
                guan.x = 64;
            }
        }
        noStart() {
            this.Tip.alpha = 0;
            this.BalloonVessel.alpha = 0;
        }
        start() {
            this.Tip.alpha = 1;
            this.BalloonVessel.alpha = 1;
            this.time.value = 1;
            this.Levels.value = (Number(this.Levels.value) + 1).toString();
            this.levelsNodeAdaptive();
            this.row = 3;
            this.line = 4;
            this.spacing = 5;
            this.colorCategory = 3;
            this.openingAnimation();
        }
        createStartGame() {
            let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame);
            this.self.addChild(startGame);
        }
        openingAnimation() {
            let scale1 = 1.05;
            let time1 = 300;
            let time2 = 100;
            let delayed = 250;
            let parentBoard = this.BalloonVessel.getChildByName('parentBoard');
            Animation.bombs_Appear(parentBoard, 0, 1, scale1, 0, time1, time2, delayed * 1, f => {
                this.createBalloonCollection();
            });
            let scale2 = 1.2;
            let tipboard = this.Tip.getChildByName('tipboard');
            Animation.bombs_Appear(tipboard, 0, 1, scale2, 0, time1, time2, delayed * 2, null);
            Animation.bombs_Appear(this.TimeNode, 0, 1, scale2, 0, time1, time2, delayed * 3, null);
            Animation.bombs_Appear(this.PropsNode, 0, 1, scale2, 0, time1, time2, delayed * 4, null);
            Animation.bombs_Appear(this.LevelsNode, 0, 1, scale2, 0, time1, time2, delayed * 5, null);
            this.taskTipShake(delayed * 6);
        }
        taskTipShake(delayed) {
            let time = 200;
            let scaleX3 = 0.85;
            let scaleY3 = 1.15;
            let plug_01 = this.Tip.getChildByName('plug_01');
            Animation.deform_Move(plug_01, 1550, 555, scaleX3, scaleY3, time, delayed, null);
            let plug_02 = this.Tip.getChildByName('plug_02');
            Animation.deform_Move(plug_02, -800, 171, scaleX3, scaleY3, time, delayed, fun => {
                Animation.leftRight_Shake(this.Tip, 60, 15, 100, null);
                Animation.leftRight_Shake(this.PropsNode, 60, 15, 160, null);
                Animation.leftRight_Shake(this.LevelsNode, 60, 15, 160, null);
            });
        }
        leaveAnimation() {
            let time1 = 300;
            let delayed = 250;
            let parentBoard = this.BalloonVessel.getChildByName('parentBoard');
            Animation.bombs_Vanish(parentBoard, 0, 0, 0, time1, delayed * 1, f => {
            });
            let tipboard = this.Tip.getChildByName('tipboard');
            Animation.bombs_Vanish(tipboard, 0, 0, 0, time1, delayed * 2, null);
            Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, null);
            Animation.bombs_Vanish(this.PropsNode, 0, 0, 0, time1, delayed * 2, null);
            Animation.bombs_Vanish(this.LevelsNode, 0, 0, 0, time1, delayed * 2, null);
            let time2 = 800;
            let scaleX3 = 0.85;
            let scaleY3 = 1.15;
            let plug_01 = this.Tip.getChildByName('plug_01');
            let firstX_01 = plug_01.x;
            Animation.deform_Move(plug_01, firstX_01, 1550, scaleX3, scaleY3, time2, delayed * 3, null);
            let plug_02 = this.Tip.getChildByName('plug_02');
            let firstX_02 = plug_02.x;
            Animation.deform_Move(plug_02, firstX_02, -800, scaleX3, scaleY3, time2, delayed * 3, null);
            this.createStartGame();
            this.clearAllBallon('startGame');
        }
        createBalloonCollection() {
            let widthP = this.BalloonParent.width;
            let heightP = this.BalloonParent.height;
            let delayed = 0;
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.line; j++) {
                    delayed += 100;
                    let x = widthP / this.row * (i + 1) - widthP / (this.row * 2);
                    let y = heightP / this.line * (j + 1) - heightP / (this.line * 2);
                    let balloon = this.createBallon(x, y);
                    let scale = (widthP / this.row - this.spacing * 2) / balloon.width;
                    balloon.scale(scale, scale);
                    Clicks.balloonScale = scale;
                    Animation.bombs_Appear(balloon, 0, scale, scale + 0.1, 0, 200, 100, delayed, f => {
                        if (i === this.row - 1 && j === this.line - 1) {
                            this.TaskBalloonParentSet();
                        }
                    });
                }
            }
        }
        moveToNextLevel() {
            let time1 = 300;
            let time2 = 100;
            let delayed = 250;
            Animation.bombs_Vanish(this.LevelsNode, 0, 0, 0, 100, delayed, f => {
                this.Levels.value = (Number(this.Levels.value) + 1).toString();
                Animation.bombs_Appear(this.LevelsNode, 0, 1, 1.1, 0, time1, time2, delayed, f => {
                });
            });
            Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
                this.time.value = 1;
                Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed, f => {
                    this.taskTipShake(0);
                });
            });
            this.clearAllBallon('restartAndNextLevel');
        }
        againCurrentlevel() {
            let time1 = 200;
            let time2 = 100;
            let delayed = 250;
            Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
                Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
                });
            });
            Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
                this.time.value = 1;
                Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed * 5, f => {
                    this.taskTipShake(0);
                });
            });
            this.clearAllBallon('restartAndNextLevel');
        }
        clearAllBallon(type) {
            let delayed = 0;
            let len = this.BalloonParent._children.length;
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
                });
                delayed += 80;
            }
        }
        clearAllTaskBallon(type) {
            let delayed = 0;
            let len = this.TaskBalloonParent._children.length;
            for (let index = 0; index < len; index++) {
                const element = this.TaskBalloonParent._children[index];
                Animation.bombs_Vanish(element, 0, 0, 0, 150, delayed, f => {
                    element.removeSelf();
                    if (index === len - 1) {
                        if (type === 'restartAndNextLevel') {
                            this.createBalloonCollection();
                        }
                        else if (type === 'startGame') {
                            console.log('类型是返回主界面的清除');
                        }
                    }
                });
                delayed += 100;
            }
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
        TaskBalloonParentSet() {
            let arr1 = [];
            for (let i = 0; i < this.BalloonParent._children.length; i++) {
                const balloon = this.BalloonParent._children[i];
                arr1.push(balloon.name);
            }
            let arr2 = Array.from(new Set(arr1));
            let len = arr2.length;
            let widthP = len * 75;
            this.TaskBalloonParent.width = widthP;
            let heightP = this.TaskBalloonParent.height;
            let delayed;
            for (let j = 0; j < len; j++) {
                delayed = 50 * j;
                let name = arr2[j];
                let x = widthP / len * (j + 1) - widthP / (len * 2);
                let y = heightP / 2;
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
            this.TaskBalloonParent.pivotX = this.TaskBalloonParent.width / 2;
            this.TaskBalloonParent.x = 375;
        }
        balloonClickOrder() {
            for (let i = 0; i < this.TaskBalloonParent._children.length; i++) {
                const taskBallon = this.TaskBalloonParent._children[i];
                const name = taskBallon.name;
                let img = taskBallon['Balloon_Icon'].img;
                if (name === this.clickOrderArr[0]) {
                    Animation.swell_shrink(taskBallon, 1.1, 1.3, 25, 0, f => {
                    });
                    img.skin = Enum.IconSkin_02[Enum.ColorName[name]];
                }
                else {
                    taskBallon.scale(1, 1);
                    img.skin = Enum.IconSkin_01[Enum.ColorName[name]];
                }
            }
        }
        balloonCount() {
            this.clickOrderArr = [];
            for (let j = 0; j < this.TaskBalloonParent._children.length; j++) {
                let taskBallon = this.TaskBalloonParent._children[j];
                let taskName = taskBallon.name;
                for (let i = 0; i < this.BalloonParent._children.length; i++) {
                    let balloon = this.BalloonParent._children[i];
                    let name = balloon.name;
                    if (taskName === name) {
                        let num = taskBallon['Balloon_Icon'].num;
                        this.start();
                        this.clickOrderArr.push(name);
                    }
                }
            }
        }
        createBallon_Icon(x, y, colorSkin) {
            let balloon_icon = Laya.Pool.getItemByCreateFun('balloon_icon', this.balloon_icon.create, this.balloon_icon);
            this.TaskBalloonParent.addChild(balloon_icon);
            balloon_icon.pos(x, y);
            let img = balloon_icon['Balloon_Icon'].img;
            img.skin = colorSkin;
            balloon_icon.name = Enum.ColorName[Enum.IconSkin_01[colorSkin]];
            return balloon_icon;
        }
        clicksAllOn() {
            for (let index = 0; index < this.BalloonParent._children.length; index++) {
                const element = this.BalloonParent._children[index];
                element['Balloon'].balloonClicksOn();
                console.log('开启所有气球的点击事件');
            }
        }
        clicksAllOff() {
            for (let index = 0; index < this.BalloonParent._children.length; index++) {
                const element = this.BalloonParent._children[index];
                element['Balloon'].balloonClicksOff();
            }
        }
        createGameOver(type) {
            let gameOver = Laya.Pool.getItemByCreateFun('gameOver', this.gameOver.create, this.gameOver);
            this.self.addChild(gameOver);
            gameOver['GameOver'].gameOverType(type);
            this.clicksAllOff();
            this.startSwicth = false;
        }
        onUpdate() {
            if (this.startSwicth) {
                if (this.time.value > 0) {
                    this.time.value -= 0.0001;
                }
                else if (this.time.value <= 0) {
                    this.createGameOver('defeated');
                    this.startSwicth = false;
                }
            }
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
        clickRight() {
            this.self.removeSelf();
            if (this.gameControl.clickOrderArr.length > 0) {
                this.gameControl.clickOrderArr.shift();
            }
            this.gameControl.balloonClickOrder();
            if (this.gameControl.clickOrderArr.length === 0) {
                this.gameControl.createGameOver('victory');
            }
        }
        clickError() {
            this.gameControl.createGameOver('defeated');
        }
        balloonClicksOn() {
            Clicks.clicksOn('balloon', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
        }
        balloonClicksOff() {
            Clicks.clicksOff('balloon', this.self, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(Clicks.balloonScale, Clicks.balloonScale);
            if (this.self.name === this.gameControl.clickOrderArr[0]) {
                console.log('点击正确1');
                this.clickRight();
            }
            else {
                this.clickError();
                console.log('点击错误！');
            }
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

    var PalyAudio;
    (function (PalyAudio) {
        function aAingleCard(number) {
            Laya.SoundManager.playSound('音效/单张发牌.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.aAingleCard = aAingleCard;
        function groupUp(number) {
            Laya.SoundManager.playSound('音效/连续发牌.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.groupUp = groupUp;
        function groupDrop(number) {
            Laya.SoundManager.playSound('音效/全体下落.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.groupDrop = groupDrop;
        function cardRotate(number) {
            Laya.SoundManager.playSound('音效/单张牌旋转.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.cardRotate = cardRotate;
        function gameOver(number) {
            Laya.SoundManager.playSound('音效/结束.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.gameOver = gameOver;
        function clickRight(number) {
            Laya.SoundManager.playSound('音效/点击正确.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.clickRight = clickRight;
        function clickError(number) {
            Laya.SoundManager.playSound('音效/点击错误.mp3', number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.clickError = clickError;
    })(PalyAudio || (PalyAudio = {}));

    var Adaptive;
    (function (Adaptive) {
        function interface_Center(self) {
            self.width = 750;
            self.pivotX = self.width / 2;
            self.pivotY = self.height / 2;
            self.pos(375, Laya.stage.height / 2);
        }
        Adaptive.interface_Center = interface_Center;
        function child_Center(child, parent, location) {
            child.y = location - (Laya.stage.height / 2 - parent.height / 2);
        }
        Adaptive.child_Center = child_Center;
        function background_Center(background, parent) {
            background.y = background.y - (Laya.stage.height / 2 - parent.height / 2);
            background.width = Laya.stage.width;
            background.height = Laya.stage.height;
        }
        Adaptive.background_Center = background_Center;
    })(Adaptive || (Adaptive = {}));

    class GameOver extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOver'] = this;
            this.gameControl = this.self.scene['GameControl'];
            this.Levels = this.gameControl.Levels;
            this.line = this.gameControl.line;
            this.logoSwitch = false;
            this.logoChange = 'appear';
            Adaptive.interface_Center(this.self);
            Adaptive.background_Center(this.background, this.self);
        }
        gameOverType(type) {
            if (type === 'victory') {
                this.btn_again.loadImage('UI/下一关按钮.png');
                this.settlementType = 'victory';
                this.logo.loadImage('UI/闯关成功logo.png');
                PalyAudio.gameOver(1);
            }
            else if (type === 'defeated') {
                this.btn_again.loadImage('UI/重来按钮.png');
                this.settlementType = 'defeated';
                this.logo.loadImage('UI/闯关失败logo.png');
                PalyAudio.gameOver(1);
            }
            let score = this.scoreNode.getChildByName('score');
            score.value = this.Levels.value;
            this.appaer();
        }
        appaer() {
            let scale = 1.3;
            let time1 = 250;
            let time2 = 60;
            let delayed = 200;
            PalyAudio.aAingleCard(3);
            Animation.fade_out(this.background, 0, 0.8, 200, 0, null);
            Animation.bombs_Appear(this.scoreNode, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 0, null);
            Animation.bombs_Appear(this.logo, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 1, null);
            Animation.bombs_Appear(this.btn_again, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, null);
            Animation.bombs_Appear(this.btn_return, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 3, func => this.clicksOnBtn());
        }
        vanish(type) {
            let time = 250;
            let delayed = 100;
            Animation.fade_out(this.background, 0.8, 0, time, delayed * 4, null);
            Animation.bombs_Vanish(this.scoreNode, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 0, null);
            Animation.bombs_Vanish(this.logo, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 1, null);
            Animation.bombs_Vanish(this.btn_again, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 2, null);
            Animation.bombs_Vanish(this.btn_return, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 3, f => {
                this.vanishFunc(type);
            });
        }
        vanishFunc(type) {
            if (type === 'return') {
                this.gameControl.leaveAnimation();
            }
            else {
                if (this.settlementType === 'victory') {
                    this.gameControl.moveToNextLevel();
                }
                else if (this.settlementType === 'defeated') {
                    this.gameControl.againCurrentlevel();
                }
            }
            this.self.removeSelf();
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_again, this, null, null, this.up, null);
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_return, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.btn_again, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_return, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            this.clicksOffBtn();
            if (event.currentTarget.name === 'btn_again') {
                this.vanish('again');
            }
            else if (event.currentTarget.name === 'btn_return') {
                this.vanish('return');
            }
        }
        onUpdate() {
            if (this.logoSwitch) {
                if (this.logoChange === 'appear') {
                    this.logo.alpha -= 0.01;
                    if (this.logo.alpha < 0.3) {
                        this.logoChange = 'vanish';
                    }
                }
                else if (this.logoChange === 'vanish') {
                    this.logo.alpha += 0.01;
                    if (this.logo.alpha >= 1) {
                        this.logoChange = 'appear';
                    }
                }
            }
        }
        onDisable() {
        }
    }

    class Ranking extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOVer'] = this;
            this.gameControl = this.self.scene['Gamecontrol'];
            this.background.width = Laya.stage.width;
            this.background.height = Laya.stage.height;
            this.gameControl.childAdaptive(this.background, this.self, this.background.y);
            this.gameControl.adaptiveOther(this.self);
            this.appear();
        }
        onAwake() {
            console.log('排行榜');
            if (Laya.Browser.onMiniGame) {
                let wx = Laya.Browser.window.wx;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage({ action: 'ranking' });
            }
        }
        appear() {
            let time = 300;
            Animation.fade_out(this.background, 0, 0.3, time, 0, null);
            Animation.fade_out(this.baseboard, 0, 1, time, 0, func => this.clicksOnBtn());
        }
        vanish() {
            let time = 300;
            Animation.fade_out(this.background, 0.3, 0, time, 0, func => this.vanishFunc());
            Animation.fade_out(this.baseboard, 1, 0, time, 0, null);
        }
        vanishFunc() {
            this.self.removeSelf();
            if (Laya.Browser.onMiniGame) {
                let wx = Laya.Browser.window.wx;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage({ action: 'close' });
            }
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.show()
                    .then(() => console.log('banner 广告显示'));
            }
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.background, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.background, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            this.vanish();
            console.log('我点击了背景！');
        }
        onDisable() {
        }
    }

    var WXDataManager;
    (function (WXDataManager) {
        WXDataManager._thislevels = 0;
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
                                getUserinfo(null);
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
        function normalWXLogin() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.checkSession({
                    success() {
                        console.log('已经登录过了！');
                        getUserinfo('haveLogin');
                    },
                    fail() {
                        console.log('重新登录');
                        WXDataManager.wx.login({
                            success(res) {
                                getUserinfo('loginAgain');
                            },
                            fail() {
                                console.log('登录失败');
                            }
                        });
                    }
                });
            }
        }
        WXDataManager.normalWXLogin = normalWXLogin;
        function getUserinfo(type) {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                WXDataManager.wx.cloud.callFunction({
                    name: "login",
                }).then(res => {
                    console.log("登录成功回调：", res);
                    WXDataManager.WXopenid = res.result.openid;
                    console.log("WXopenid为：", WXDataManager.WXopenid);
                    WXDataManager.user_id = WXDataManager.WXopenid;
                    if (type === 'loginAgain') {
                        try {
                            add_Levels();
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    else if (type === 'haveLogin') {
                        try {
                            get_Levels();
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                });
            }
        }
        WXDataManager.getUserinfo = getUserinfo;
        function add_Levels() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                let db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.add({
                    data: {
                        _id: WXDataManager.user_id,
                        _levels: WXDataManager._thislevels,
                        due: new Date("2018-09-01"),
                        location: new db.Geo.Point(113, 23),
                        done: false
                    },
                }).then(res => {
                    console.log('没有登录过重新上传：' + res);
                });
            }
        }
        WXDataManager.add_Levels = add_Levels;
        function get_Levels() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                let db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.doc(WXDataManager.user_id).get().then(res => {
                    console.log(res.data);
                    WXDataManager._lastlevels = res.data._levels;
                    console.log('上次的关卡数为：' + WXDataManager._lastlevels);
                    WXDataManager._thislevels = WXDataManager._lastlevels;
                });
            }
        }
        WXDataManager.get_Levels = get_Levels;
        function update_Levels() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                let db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.doc(WXDataManager.user_id).update({
                    data: {
                        _levels: WXDataManager._thislevels,
                    },
                }).then(res => {
                    console.log(res);
                });
            }
        }
        WXDataManager.update_Levels = update_Levels;
        function wxPostInit() {
            if (Laya.Browser.onMiniGame) {
                Laya.loader.load(["res/atlas/rank.atlas"], Laya.Handler.create(null, function () {
                    Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/rank.atlas");
                    let wx = Laya.Browser.window.wx;
                    let openDataContext = wx.getOpenDataContext();
                    openDataContext.postMessage({ action: 'init' });
                }));
            }
        }
        WXDataManager.wxPostInit = wxPostInit;
        function wxPostData(score) {
            if (Laya.Browser.onMiniGame) {
                let args = {
                    type: 'scores', data: { scores: score }
                };
                let wx = Laya.Browser.window.wx;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage(args);
                console.log('上传了');
            }
            else {
                console.log('没有上传');
            }
        }
        WXDataManager.wxPostData = wxPostData;
        function wxShare() {
            if (Laya.Browser.onMiniGame) {
                let wx = Laya.Browser.window.wx;
                wx.shareAppMessage({
                    title: '你的手速够快吗？',
                    imageUrlId: 'CRYATpcgSFGkeB4Hs75jOQ',
                    imageUrl: 'https://mmocgame.qpic.cn/wechatgame/9zdKibmXJ3RsmFpXn6UAV4ScT8ulA4wzqUUNicKWDIaODZbuv38lkBBOBQv8XbxOI0/0'
                });
                console.log("主动进行了转发");
            }
            else {
                console.log("仅支持微信客户端");
            }
        }
        WXDataManager.wxShare = wxShare;
    })(WXDataManager || (WXDataManager = {}));

    class StartGame extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOVer'] = this;
            this.gameControl = this.self.scene['GameControl'];
            this.LevelsNode = this.gameControl.LevelsNode;
            this.gameControl.startNode = this.self;
            this.startSwitch = false;
            this.watchAds = false;
            Adaptive.interface_Center(this.self);
            Adaptive.child_Center(this.anti_addiction, this.self, Laya.stage.height * 9 / 10);
            this.timer = 0;
            this.appaer();
        }
        appaer() {
            let scale = 1.3;
            let time1 = 250;
            let time2 = 60;
            let delayed = 300;
            for (let index = 0; index < this.logo._children.length; index++) {
                const element = this.logo._children[index];
                Animation.bombs_Appear(element, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * index, null);
            }
            Animation.bombs_Appear(this.btn_start, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, null);
            Animation.bombs_Appear(this.btn_ranking, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 3, null);
            Animation.bombs_Appear(this.btn_share, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 4, f => {
                this.appaerFunc();
            });
            Animation.fade_out(this.anti_addiction, 0, 1, 1000, 0, null);
        }
        appaerFunc() {
            this.startSwitch = true;
            this.clicksOnBtn();
        }
        vanish() {
            let time = 250;
            let delayed = 100;
            for (let index = 0; index < this.logo._children.length; index++) {
                const element = this.logo._children[index];
                Animation.bombs_Vanish(element, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * index, null);
            }
            Animation.bombs_Vanish(this.btn_start, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 1, f => {
                Laya.Tween.clearAll(this.btn_start);
                this.startSwitch = false;
            });
            Animation.bombs_Vanish(this.btn_ranking, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 2, null);
            Animation.bombs_Vanish(this.btn_share, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 3, f => {
                this.vanishFunc();
            });
            Animation.fade_out(this.anti_addiction, 1, 0, 1000, 0, null);
        }
        vanishFunc() {
            this.self.removeSelf();
            this.gameControl.start();
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_start, this, null, null, this.up, null);
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_ranking, this, null, null, this.up, null);
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_share, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.btn_start, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_ranking, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_share, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            if (event.currentTarget.name === 'btn_start') {
                this.vanish();
            }
            else if (event.currentTarget.name === 'btn_ranking') ;
            else if (event.currentTarget.name === 'btn_share') {
                WXDataManager.wxShare();
            }
            this.clicksOffBtn();
        }
        onUpdate() {
            if (this.startSwitch) {
                this.timer++;
                if (this.timer % 100 === 0) {
                    Animation.swell_shrink(this.btn_start, 1, 1.15, 120, 0, null);
                }
            }
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Script/Project/LevelsNode.ts", Levels);
            reg("Script/Project/GameControl.ts", GameControl);
            reg("Script/Project/Balloon.ts", Balloon);
            reg("Script/Project/Balloon_Icon.ts", Balloon_Icon);
            reg("Script/Project/GameOver.ts", GameOver);
            reg("Script/Project/Ranking.ts", Ranking);
            reg("Script/Project/StartGame.ts", StartGame);
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
