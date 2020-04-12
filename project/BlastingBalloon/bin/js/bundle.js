(function () {
    'use strict';

    var PalyAudio;
    (function (PalyAudio) {
        function playSound(url, number) {
            Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () { }));
        }
        PalyAudio.playSound = playSound;
        function playMusic(url, number, deley) {
            Laya.SoundManager.playMusic(url, number, Laya.Handler.create(this, function () { }), deley);
        }
        PalyAudio.playMusic = playMusic;
    })(PalyAudio || (PalyAudio = {}));

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
        let BalloonName;
        (function (BalloonName) {
            BalloonName[BalloonName["yellowish"] = 0] = "yellowish";
            BalloonName[BalloonName["pink"] = 1] = "pink";
            BalloonName[BalloonName["yellow"] = 2] = "yellow";
            BalloonName[BalloonName["cyan"] = 3] = "cyan";
            BalloonName[BalloonName["purple"] = 4] = "purple";
        })(BalloonName = Enum.BalloonName || (Enum.BalloonName = {}));
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
        let Explode_Yellowish;
        (function (Explode_Yellowish) {
            Explode_Yellowish[Explode_Yellowish["\u7279\u6548/effect_\u6DE1\u9EC41.png"] = 0] = "\u7279\u6548/effect_\u6DE1\u9EC41.png";
            Explode_Yellowish[Explode_Yellowish["\u7279\u6548/effect_\u6DE1\u9EC42.png"] = 1] = "\u7279\u6548/effect_\u6DE1\u9EC42.png";
            Explode_Yellowish[Explode_Yellowish["\u7279\u6548/effect_\u6DE1\u9EC43.png"] = 2] = "\u7279\u6548/effect_\u6DE1\u9EC43.png";
            Explode_Yellowish[Explode_Yellowish["\u7279\u6548/effect_\u6DE1\u9EC44.png"] = 3] = "\u7279\u6548/effect_\u6DE1\u9EC44.png";
        })(Explode_Yellowish = Enum.Explode_Yellowish || (Enum.Explode_Yellowish = {}));
        let Explode_Pink;
        (function (Explode_Pink) {
            Explode_Pink[Explode_Pink["\u7279\u6548/effect_\u7C89\u82721.png"] = 0] = "\u7279\u6548/effect_\u7C89\u82721.png";
            Explode_Pink[Explode_Pink["\u7279\u6548/effect_\u7C89\u82722.png"] = 1] = "\u7279\u6548/effect_\u7C89\u82722.png";
            Explode_Pink[Explode_Pink["\u7279\u6548/effect_\u7C89\u82723.png"] = 2] = "\u7279\u6548/effect_\u7C89\u82723.png";
            Explode_Pink[Explode_Pink["\u7279\u6548/effect_\u7C89\u82724.png"] = 3] = "\u7279\u6548/effect_\u7C89\u82724.png";
        })(Explode_Pink = Enum.Explode_Pink || (Enum.Explode_Pink = {}));
        let Explode_Yellow;
        (function (Explode_Yellow) {
            Explode_Yellow[Explode_Yellow["\u7279\u6548/effect_\u9EC4\u82721.png"] = 0] = "\u7279\u6548/effect_\u9EC4\u82721.png";
            Explode_Yellow[Explode_Yellow["\u7279\u6548/effect_\u9EC4\u82722.png"] = 1] = "\u7279\u6548/effect_\u9EC4\u82722.png";
            Explode_Yellow[Explode_Yellow["\u7279\u6548/effect_\u9EC4\u82723.png"] = 2] = "\u7279\u6548/effect_\u9EC4\u82723.png";
            Explode_Yellow[Explode_Yellow["\u7279\u6548/effect_\u9EC4\u82724.png"] = 3] = "\u7279\u6548/effect_\u9EC4\u82724.png";
        })(Explode_Yellow = Enum.Explode_Yellow || (Enum.Explode_Yellow = {}));
        let Explode_Cyan;
        (function (Explode_Cyan) {
            Explode_Cyan[Explode_Cyan["\u7279\u6548/effect_\u9752\u82721.png"] = 0] = "\u7279\u6548/effect_\u9752\u82721.png";
            Explode_Cyan[Explode_Cyan["\u7279\u6548/effect_\u9752\u82722.png"] = 1] = "\u7279\u6548/effect_\u9752\u82722.png";
            Explode_Cyan[Explode_Cyan["\u7279\u6548/effect_\u9752\u82723.png"] = 2] = "\u7279\u6548/effect_\u9752\u82723.png";
            Explode_Cyan[Explode_Cyan["\u7279\u6548/effect_\u9752\u82724.png"] = 3] = "\u7279\u6548/effect_\u9752\u82724.png";
        })(Explode_Cyan = Enum.Explode_Cyan || (Enum.Explode_Cyan = {}));
        let Explode_Purple;
        (function (Explode_Purple) {
            Explode_Purple[Explode_Purple["\u7279\u6548/effect_\u7D2B\u82721.png"] = 0] = "\u7279\u6548/effect_\u7D2B\u82721.png";
            Explode_Purple[Explode_Purple["\u7279\u6548/effect_\u7D2B\u82722.png"] = 1] = "\u7279\u6548/effect_\u7D2B\u82722.png";
            Explode_Purple[Explode_Purple["\u7279\u6548/effect_\u7D2B\u82723.png"] = 2] = "\u7279\u6548/effect_\u7D2B\u82723.png";
            Explode_Purple[Explode_Purple["\u7279\u6548/effect_\u7D2B\u82724.png"] = 3] = "\u7279\u6548/effect_\u7D2B\u82724.png";
        })(Explode_Purple = Enum.Explode_Purple || (Enum.Explode_Purple = {}));
        let Sk_Ballon_Type;
        (function (Sk_Ballon_Type) {
            Sk_Ballon_Type["death"] = "death";
            Sk_Ballon_Type["error"] = "error";
            Sk_Ballon_Type["disdain"] = "disdain";
            Sk_Ballon_Type["static"] = "static";
            Sk_Ballon_Type["scale"] = "scale";
        })(Sk_Ballon_Type = Enum.Sk_Ballon_Type || (Enum.Sk_Ballon_Type = {}));
        let AudioName;
        (function (AudioName) {
            AudioName["button"] = "\u97F3\u6548/\u6309\u94AE\u70B9\u51FB.mp3";
            AudioName["bgm"] = "\u97F3\u6548/\u80CC\u666F\u97F3\u4E50.mp3";
            AudioName["victory"] = "\u97F3\u6548/\u80DC\u5229.mp3";
            AudioName["defeated"] = "\u97F3\u6548/\u5931\u8D25.mp3";
            AudioName["balloonRight"] = "\u97F3\u6548/\u6C14\u7403\u70B9\u51FB\u6B63\u786E.mp3";
            AudioName["balloonError"] = "\u97F3\u6548/\u6C14\u7403\u70B9\u51FB\u9519\u8BEF.mp3";
            AudioName["balloonPopup"] = "\u97F3\u6548/\u6C14\u7403\u5F39\u51FA.mp3";
            AudioName["beetle"] = "\u97F3\u6548/\u70B9\u51FB\u7532\u866B.mp3";
            AudioName["beetleMove"] = "\u97F3\u6548/\u7532\u866B\u6E9C\u8D70.mp3";
            AudioName["commonPopup"] = "\u97F3\u6548/\u901A\u7528\u5F39\u51FA.mp3";
            AudioName["commonShake"] = "\u97F3\u6548/\u6296\u52A8.mp3";
        })(AudioName = Enum.AudioName || (Enum.AudioName = {}));
        let GuidanceTiptype;
        (function (GuidanceTiptype) {
            GuidanceTiptype["colorOrder"] = "\u5F15\u5BFC/\u5F15\u5BFC_\u989C\u8272\u987A\u5E8F.png";
            GuidanceTiptype["color_01"] = "\u5F15\u5BFC/\u5F15\u5BFC_\u989C\u82721.png";
            GuidanceTiptype["color_02"] = "\u5F15\u5BFC/\u5F15\u5BFC_\u989C\u82722.png";
            GuidanceTiptype["time"] = "\u5F15\u5BFC/\u5F15\u5BFC_\u65F6\u95F4.png";
            GuidanceTiptype["expelBeetle"] = "\u5F15\u5BFC/\u5F15\u5BFC_\u9A71\u866B.png";
        })(GuidanceTiptype = Enum.GuidanceTiptype || (Enum.GuidanceTiptype = {}));
    })(Enum || (Enum = {}));

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
        function leftRight_Shake(node, range, time, delayed, func) {
            Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                PalyAudio.playSound(Enum.AudioName.commonShake, 1);
                Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                    PalyAudio.playSound(Enum.AudioName.commonShake, 1);
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
        function fade_out(node, alpha1, alpha2, time, delayed, func) {
            node.alpha = alpha1;
            Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
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
        function drop_excursion(node, targetY, targetX, rotation, time, delayed, func) {
            Laya.Tween.to(node, { x: node.x + targetX, y: node.y + targetY * 1 / 6 }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: node.x + targetX + 50, y: targetY, rotation: rotation }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }), delayed);
        }
        Animation.drop_excursion = drop_excursion;
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
        function bombs_Appear(node, firstAlpha, firstScale, scale1, rotation, time1, time2, delayed, audioType, func) {
            node.scale(0, 0);
            node.alpha = firstAlpha;
            Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, rotation: rotation }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                switch (audioType) {
                    case 'balloon':
                        PalyAudio.playSound(Enum.AudioName.commonPopup, 1);
                        break;
                    case 'common':
                        break;
                    default:
                        break;
                }
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
            Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alpha: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.bombs_Vanish = bombs_Vanish;
        function swell_shrink(node, firstScale, scale1, time, delayed, func) {
            PalyAudio.playSound(Enum.AudioName.commonPopup, 1);
            Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
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
            Laya.Tween.to(node, { x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
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
        function blink(node, minAlpha, maXalpha, time, delayed, func) {
            node.alpha = minAlpha;
            Laya.Tween.to(node, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }), delayed);
        }
        Animation.blink = blink;
    })(Animation || (Animation = {}));

    class backGround extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onEnable() {
            this.self = this.owner;
            this.timer = 0;
            this.selectSwitch = true;
            this.blinkSwicth = false;
            for (let index = 0; index < this.self._children.length; index++) {
                const element = this.self._children[index];
                element.alpha = 0;
            }
        }
        onUpdate() {
            if (this.selectSwitch) {
                this.selectSwitch = false;
                let index = Math.floor(Math.random() * 7);
                Animation.blink(this.self._children[index], 0, 1, 300, 0, f => {
                    this.selectSwitch = true;
                });
            }
        }
        onDisable() {
        }
    }

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
                case 'beetle':
                    btnEffect = new Btn_Beetle();
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
                case 'beetle':
                    btnEffect = new Btn_Beetle();
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
    class Btn_Beetle {
        constructor() {
        }
        down(event) {
            event.currentTarget.scale(Clicks.beetleScale + 0.06, Clicks.beetleScale + 0.06);
            Laya.SoundManager.playSound(Clicks.audioUrl, 1, Laya.Handler.create(this, function () { }));
        }
        up(event) {
            event.currentTarget.scale(Clicks.beetleScale, Clicks.beetleScale);
        }
        move(event) {
            event.currentTarget.scale(Clicks.beetleScale, Clicks.beetleScale);
        }
        out(event) {
            event.currentTarget.scale(Clicks.beetleScale, Clicks.beetleScale);
        }
    }

    class Props extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['Props'] = this;
            this.gameControl = this.self.scene['GameControl'];
            this.guidanceControl = this.self.scene['Guidance'];
            this.prop_skeleton = this.self.getChildByName('prop_skeleton');
            this.beetleParent = this.gameControl.beetleParent;
            this.createBoneAni();
        }
        createBoneAni() {
            this.templet = new Laya.Templet();
            this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
            this.templet.on(Laya.Event.ERROR, this, this.onError);
            this.templet.loadAni("Skeleton/trumpet.sk");
        }
        onError() {
            console.log('小喇叭骨骼动画加载错误！');
        }
        parseComplete() {
            console.log('小喇叭骨骼动画加载成功！');
            this.playSkeletonAni(1, 'static');
        }
        playSkeletonAni(speed, type) {
            this.prop_skeleton.play(type, true);
            this.prop_skeleton.rotation = 0;
            this.prop_skeleton.playbackRate(speed);
        }
        eliminateBeetle() {
            let len = this.beetleParent._children.length;
            if (len === 0) {
                console.log('没有小甲虫');
            }
            else {
                let beetle = this.beetleParent._children[0];
                beetle['Beetle'].playSkeletonAni(1, 'death');
                beetle['Beetle'].clicksOffBtn();
                Animation.drop(beetle, beetle.y + 1600, 0, 1000, 0, f => {
                    beetle.removeSelf();
                    if (Number(this.gameControl.Levels.value) === 2) {
                        this.guidanceControl.createTimeGuidance();
                    }
                });
            }
        }
        prorAttack() {
            let delay = 0;
            for (let l = 0; l < 6; l++) {
                delay += 75;
                Laya.timer.once(delay, this, function () {
                    let bullet = Laya.Pool.getItemByCreateFun('bullet', this.bullet.create, this.bullet);
                    this.self.addChild(bullet);
                    bullet.x = 25;
                    bullet.y = 60;
                    bullet['Bullet'].line = l;
                    bullet['Bullet'].moveSwitch = true;
                });
            }
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.self, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            let number = Number(this.propNum.value.substring(1, 3));
            console.log(number);
            if (number > 0) {
                this.prop_skeleton.play('attack', false);
                this.prop_skeleton.playbackRate(3);
                this.propNum.value = 'x' + (number - 1).toString();
                this.eliminateBeetle();
                this.clicksOffBtn();
                Animation.leftRight_Shake(this.gameControl.BalloonVessel, 20, 50, 100, f => {
                    this.clicksOnBtn();
                });
                this.prorAttack();
            }
            else {
                this.gameControl.createHint();
            }
        }
        onDisable() {
        }
    }

    var WXDataManager;
    (function (WXDataManager) {
        WXDataManager._gameData = {
            _levels: 1,
            _propNum: 5,
        };
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
                                getUserinfo('firstlogin');
                            },
                            fail() {
                                console.log('登录失败');
                            }
                        });
                    }
                });
            }
            else {
                console.log("登陆仅支持微信客户端");
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
                    if (type === 'firstlogin') {
                        try {
                            add_GameData();
                        }
                        catch (error) {
                            console.log(error);
                        }
                        try {
                            get_GameData();
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    else if (type === 'haveLogin') {
                        try {
                            get_GameData();
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                });
            }
            else {
                console.log("获取玩家信息仅支持微信客户端");
            }
        }
        WXDataManager.getUserinfo = getUserinfo;
        function add_GameData() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                let db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.add({
                    data: {
                        _id: WXDataManager.user_id,
                        gameData: WXDataManager._gameData,
                        due: new Date("2018-09-01"),
                        location: new db.Geo.Point(113, 23),
                        done: false
                    },
                }).then(res => {
                    console.log('没有登录过重新上传：' + res);
                });
            }
            else {
                console.log("添加信息仅支持微信客户端");
            }
        }
        WXDataManager.add_GameData = add_GameData;
        function get_GameData() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                let db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.doc(WXDataManager.user_id).get().then(res => {
                    console.log(res.data);
                    WXDataManager._gameData = res.data.gameData;
                    WXDataManager._gameData = res.data.gameData;
                    console.log('上次的关卡数为：' + WXDataManager._gameData._levels, '上次的道具数为：' + WXDataManager._gameData._propNum);
                });
            }
            else {
                console.log("获取信息仅支持微信客户端");
            }
        }
        WXDataManager.get_GameData = get_GameData;
        function update_GameData() {
            if (Laya.Browser.onMiniGame) {
                WXDataManager.wx.cloud.init({
                    env: 'release-lwg'
                });
                let db = WXDataManager.wx.cloud.database();
                let user_info = db.collection('user_info');
                user_info.doc(WXDataManager.user_id).update({
                    data: {
                        gameData: WXDataManager._gameData,
                    },
                }).then(res => {
                    console.log(res);
                });
            }
            else {
                console.log("上传信息仅支持微信客户端");
            }
        }
        WXDataManager.update_GameData = update_GameData;
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

    var Advertising;
    (function (Advertising) {
        Advertising.wx = Laya.Browser.window.wx;
        function videoAd_01_Lode(func_yes, func_no) {
            if (Laya.Browser.onMiniGame) {
                console.log('广告开始加载');
                Advertising.videoAd_01 = Advertising.wx.createRewardedVideoAd({
                    adUnitId: 'adunit-6de18c6de7b6d9ab'
                });
                Advertising.videoAd_01.onLoad(() => {
                    console.log('激励视频 广告加载成功');
                });
                Advertising.videoAd_01.onError(err => {
                    console.log(err);
                });
                Advertising.videoAd_01.onClose(res => {
                    if (res && res.isEnded || res === undefined) {
                        func_yes();
                    }
                    else {
                        console.log('视频没有看望不会开始游戏');
                        func_no();
                    }
                });
            }
        }
        Advertising.videoAd_01_Lode = videoAd_01_Lode;
        function bannerAd_01_Lode() {
            if (Laya.Browser.onMiniGame) {
                console.log('广告开始加载');
                Advertising.bannarAd_01 = Advertising.wx.createBannerAd({
                    adUnitId: 'adunit-5329937f4349b0ea',
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: 0,
                        width: 750
                    }
                });
                Advertising.bannarAd_01.onLoad(() => {
                    console.log('banner 广告加载成功');
                });
                Advertising.bannarAd_01.onError(err => {
                    console.log(err);
                });
            }
        }
        Advertising.bannerAd_01_Lode = bannerAd_01_Lode;
    })(Advertising || (Advertising = {}));

    var SkTemplete;
    (function (SkTemplete) {
        function createBaoolonTemplet() {
            Laya.loader.load([{ url: "Skeleton/balloon.png" }, { url: "Skeleton/balloon.sk" }], Laya.Handler.create(this, function () {
                SkTemplete.baoolonTemplet = new Laya.Templet();
                SkTemplete.baoolonTemplet.on(Laya.Event.COMPLETE, this, parseComplete_Balloon);
                SkTemplete.baoolonTemplet.on(Laya.Event.ERROR, this, onError_Balloon);
                SkTemplete.baoolonTemplet.loadAni("Skeleton/balloon.sk");
            }));
        }
        SkTemplete.createBaoolonTemplet = createBaoolonTemplet;
        function onError_Balloon() {
            console.log('模板气球骨骼动画加载错误！');
        }
        SkTemplete.onError_Balloon = onError_Balloon;
        function parseComplete_Balloon() {
            console.log('模板气球骨骼动画加载成功！');
        }
        SkTemplete.parseComplete_Balloon = parseComplete_Balloon;
    })(SkTemplete || (SkTemplete = {}));

    var Data;
    (function (Data) {
        function dataLoading_Levels() {
            Laya.loader.load("Data/levelsData.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        }
        Data.dataLoading_Levels = dataLoading_Levels;
        function onLoaded() {
            Data.levelsData = Laya.loader.getRes("Data/levelsData.json")["RECORDS"];
        }
        Data.onLoaded = onLoaded;
    })(Data || (Data = {}));

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
            WXDataManager.wxPostInit();
            Advertising.videoAd_01_Lode(f => this.watchAdsFunc('yes'), f => this.watchAdsFunc('no'));
            Advertising.bannerAd_01_Lode();
            SkTemplete.createBaoolonTemplet();
            Data.dataLoading_Levels();
            WXDataManager.normalWXLogin();
        }
        guideBalloonCollection() {
        }
        watchAdsFunc(type) {
            if (type === 'yes') {
                this.propNum.value = (Number(this.propNum.value) + 1).toString();
            }
            else {
                console.log('广告没有看完不给与奖励');
            }
            this.timeSwicth = true;
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
            if (Number(this.Levels.value) >= 10) {
                guan.x = 72;
                this.Levels.x = 68;
            }
            else {
                guan.x = 64;
                this.Levels.x = 70;
            }
        }
        noStart() {
            this.Tip.alpha = 0;
            this.BalloonVessel.alpha = 0;
            this.Levels.value = '1';
        }
        readyStart(type) {
            if (type === 'nextLevel') {
                this.Levels.value = (Number(this.Levels.value) + 1).toString();
            }
            else if (type === 'startGame') {
                this.Levels.value = WXDataManager._gameData._levels.toString();
                this.propNum.value = 'x' + WXDataManager._gameData._propNum;
                this.openingAnimation();
            }
            this.time.value = 1;
            let level = Number(this.Levels.value);
            if (level >= 40) {
                level = 40;
            }
            this.row = Data.levelsData[level - 1].row;
            this.line = Data.levelsData[level - 1].line;
            this.colorCategory = Data.levelsData[level - 1].colorCategory;
            this.beetleSpeed = Data.levelsData[level - 1].beetleSpeed;
            this.timeVelocity = Data.levelsData[level - 1].timeVelocity;
            let sub = this.line - this.row;
            switch (sub) {
                case 0:
                    this.spacing = 5 - (this.line * 0.2);
                    break;
                case 1:
                    if (this.line === 4 && this.row == 3) {
                        this.spacing = 27;
                    }
                    else {
                        this.spacing = 26 - (this.line - 2) * 3.1;
                    }
                    break;
                default:
                    break;
            }
            this.levelsNodeAdaptive();
        }
        createStartGame() {
            let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame);
            this.self.addChild(startGame);
            this.startNode = startGame;
        }
        openingAnimation() {
            this.Tip.alpha = 1;
            this.BalloonVessel.alpha = 1;
            let scale1 = 1.05;
            let time1 = 300;
            let time2 = 100;
            let delayed = 250;
            let plug_01 = this.Tip.getChildByName('plug_01');
            plug_01.x = -1550;
            let plug_02 = this.Tip.getChildByName('plug_02');
            plug_02.x = -800;
            let parentBoard = this.BalloonVessel.getChildByName('parentBoard');
            Animation.bombs_Appear(parentBoard, 0, 1, scale1, 0, time1, time2, delayed * 1, 'common', f => {
                this.createBalloonCollection();
            });
            let scale2 = 1.2;
            let tipboard = this.Tip.getChildByName('tipboard');
            Animation.bombs_Appear(tipboard, 0, 1, scale2, 0, time1, time2, delayed * 2, 'common', null);
            Animation.bombs_Appear(this.TimeNode, 0, 1, scale2, 0, time1, time2, delayed * 3, 'common', null);
            Animation.bombs_Appear(this.PropsNode, 0, 1, scale2, 0, time1, time2, delayed * 4, 'common', null);
            Animation.bombs_Appear(this.LevelsNode, 0, 1, scale2, 0, time1, time2, delayed * 5, 'common', null);
        }
        taskTipShake(delayed) {
            let time = 150;
            let scaleX3 = 0.85;
            let scaleY3 = 1.15;
            let plug_01 = this.Tip.getChildByName('plug_01');
            Animation.deform_Move(plug_01, 1550, 555, scaleX3, scaleY3, time, delayed, null);
            let plug_02 = this.Tip.getChildByName('plug_02');
            Animation.deform_Move(plug_02, -800, 171, scaleX3, scaleY3, time, delayed, fun => {
                Animation.leftRight_Shake(this.Tip, 15, 60, 0, null);
                Animation.leftRight_Shake(this.PropsNode, 15, 60, 100, null);
                Animation.leftRight_Shake(this.LevelsNode, 15, 60, 100, null);
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
            this.pligAni(delayed * 3);
            this.createStartGame();
            this.clearAllBallon('startGame');
        }
        pligAni(delayed) {
            let time2 = 800;
            let scaleX3 = 0.85;
            let scaleY3 = 1.15;
            let plug_01 = this.Tip.getChildByName('plug_01');
            let firstX_01 = plug_01.x;
            Animation.deform_Move(plug_01, firstX_01, 1550, scaleX3, scaleY3, time2, delayed, null);
            let plug_02 = this.Tip.getChildByName('plug_02');
            let firstX_02 = plug_02.x;
            Animation.deform_Move(plug_02, firstX_02, -800, scaleX3, scaleY3, time2, delayed, null);
        }
        createBalloonCollection() {
            let levelsData = Number(this.Levels.value);
            let guideColor;
            if (levelsData === 1) {
                guideColor = this.self['Guidance'].guideColor_Lv_01;
            }
            else if (levelsData === 2) {
                guideColor = this.self['Guidance'].guideColor_Lv_02;
            }
            let widthP = this.BalloonParent.width;
            let heightP = this.BalloonParent.height;
            let delayed = 0;
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.line; j++) {
                    delayed += 50;
                    let x = widthP / this.row * (i + 1) - widthP / (this.row * 2);
                    let y = heightP / this.line * (j + 1) - heightP / (this.line * 2);
                    let balloon;
                    if (levelsData === 1 || levelsData === 2) {
                        balloon = this.createBallon(x, y, guideColor[i][j]);
                    }
                    else {
                        balloon = this.createBallon(x, y, null);
                    }
                    let scale = (widthP / this.row - this.spacing * 2) / balloon.width;
                    balloon.scale(scale, scale);
                    Clicks.balloonScale = scale;
                    balloon.pivotX = balloon.width / 2;
                    balloon.pivotY = balloon.height / 2;
                    Animation.bombs_Appear(balloon, 0, scale, scale + 0.1, 0, 200, 100, delayed, null, f => {
                        this.explodeAni(this.BalloonVessel, balloon.x + (1 - scale) * balloon.pivotX / 2, balloon.y + (1 - scale) * balloon.pivotY / 2, 'vanish', 6, 10);
                        if (i === this.row - 1 && j === this.line - 1) {
                            this.TaskBalloonParentSet();
                            this.taskTipShake(0);
                        }
                    });
                }
            }
        }
        createBallon(x, y, colorNumber) {
            let balloon = Laya.Pool.getItemByCreateFun('balloon', this.balloon.create, this.balloon);
            this.BalloonParent.addChild(balloon);
            balloon.pos(x, y);
            let random;
            if (colorNumber === null) {
                random = Math.floor(Math.random() * this.colorCategory);
            }
            else {
                random = colorNumber;
            }
            balloon.name = Enum.BalloonName[random];
            balloon['Balloon'].skeletoninit();
            return balloon;
        }
        moveToNextLevel() {
            let time1 = 300;
            let time2 = 100;
            let delayed = 250;
            this.pligAni(0);
            Animation.bombs_Vanish(this.LevelsNode, 0, 0, 0, 100, delayed, f => {
                this.readyStart('nextLevel');
                this.clearAllBallon('restartAndNextLevel');
                Animation.bombs_Appear(this.LevelsNode, 0, 1, 1.1, 0, time1, time2, delayed, 'common', f => {
                });
            });
            Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
                this.time.value = 1;
                Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed, 'common', f => {
                });
            });
        }
        againCurrentlevel() {
            let time1 = 200;
            let time2 = 100;
            let delayed = 250;
            this.pligAni(0);
            Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
                Animation.swell_shrink(this.LevelsNode, 1, 1.3, time1 * 0.5, 0, f => {
                });
            });
            Animation.bombs_Vanish(this.TimeNode, 0, 0, 0, time1, delayed * 2, f => {
                this.time.value = 1;
                Animation.bombs_Appear(this.TimeNode, 0, 1, 1.1, 0, time1, time2, delayed * 5, 'common', f => {
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
                    this.explodeAni(this.BalloonVessel, element.x + (1 - Clicks.balloonScale) * element.pivotX / 2, element.y + (1 - Clicks.balloonScale) * element.pivotY / 2, 'vanish', 6, 10);
                });
                delayed += 60;
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
                    }
                });
                delayed += 100;
            }
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
                let colorSkin;
                if (j === 0) {
                    colorSkin = Enum.IconSkin_02[Enum.BalloonName[name]];
                }
                else {
                    colorSkin = Enum.IconSkin_01[Enum.BalloonName[name]];
                }
                let ballon_Icon = this.createBallon_Icon(x, y, colorSkin, name);
                Animation.bombs_Appear(ballon_Icon, 0, 1, 1.1, 0, 200, 200, delayed, 'common', f => {
                    if (j === len - 1) {
                        this.balloonCount();
                        this.balloonClickOrder();
                        let levels = Number(this.Levels.value);
                        if (levels === 1) {
                            this.timeSwicth = false;
                            this.self['Guidance'].guidanceInit();
                            this.self['Guidance'].createBalloonGuidance(Enum.BalloonName[1]);
                        }
                        else if (levels === 2) {
                            this.createBeetle();
                            this.timeSwicth = true;
                        }
                        else {
                            this.clicksAllOn();
                            this.timeSwicth = true;
                        }
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
                    Animation.swell_shrink(taskBallon, 1.1, 1.3, 50, 0, f => {
                    });
                    img.skin = Enum.IconSkin_02[Enum.BalloonName[name]];
                }
                else {
                    taskBallon.scale(1, 1);
                    img.skin = Enum.IconSkin_01[Enum.BalloonName[name]];
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
                        num.value = (Number(num.value) + 1).toString();
                        this.clickOrderArr.push(name);
                    }
                }
            }
        }
        createBallon_Icon(x, y, colorSkin, name) {
            let balloon_icon = Laya.Pool.getItemByCreateFun('balloon_icon', this.balloon_icon.create, this.balloon_icon);
            this.TaskBalloonParent.addChild(balloon_icon);
            balloon_icon.pos(x, y);
            let img = balloon_icon['Balloon_Icon'].img;
            img.skin = colorSkin;
            balloon_icon.name = name;
            return balloon_icon;
        }
        clicksAllOn() {
            for (let index = 0; index < this.BalloonParent._children.length; index++) {
                const element = this.BalloonParent._children[index];
                element['Balloon'].balloonClicksOn();
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
            WXDataManager.wxPostData(this.Levels.value);
            if (type === 'defeated') {
                WXDataManager._gameData._levels = Number(this.Levels.value);
            }
            else if (type === 'victory') {
                WXDataManager._gameData._levels = Number(this.Levels.value) + 1;
            }
            WXDataManager._gameData._propNum = Number(this.propNum.value.substring(1, 3));
            WXDataManager.update_GameData();
            this.clicksAllOff();
            this.PropsNode['Props'].clicksOffBtn();
            this.timeSwicth = false;
            let len = this.BeetleParent._children.length;
            if (len === 0) {
                this.self.addChild(gameOver);
                gameOver['GameOver'].gameOverType(type);
                return;
            }
            for (let index = 0; index < len; index++) {
                const beetle = this.BeetleParent._children[index];
                beetle['Beetle'].moveSwitch = false;
                beetle['Beetle'].remainTime = -20000;
                beetle['Beetle'].clicksOffBtn();
                if (type === 'defeated') {
                    beetle['Beetle'].playSkeletonAni(1, 'move');
                    Animation.simple_Move(beetle, beetle.x, beetle.y, beetle.x, beetle.y - 1400, 2000, 0, f => {
                        beetle.removeSelf();
                        this.self.addChild(gameOver);
                        gameOver['GameOver'].gameOverType(type);
                    });
                }
                else if (type === 'victory') {
                    beetle['Beetle'].playSkeletonAni(1, 'death');
                    Animation.drop(beetle, beetle.y + 1600, 0, 1000, 0, f => {
                        beetle.removeSelf();
                        this.self.addChild(gameOver);
                        gameOver['GameOver'].gameOverType(type);
                    });
                }
            }
            this.gameOverNode = gameOver;
        }
        createRanking() {
            let ranking = Laya.Pool.getItemByCreateFun('ranking', this.ranking.create, this.ranking);
            this.self.addChild(ranking);
            this.rankingNode = ranking;
        }
        createHint() {
            let hint = Laya.Pool.getItemByCreateFun('hint', this.hint.create, this.hint);
            this.self.addChild(hint);
            this.timeSwicth = false;
        }
        createBeetle() {
            let beetle = Laya.Pool.getItemByCreateFun('beetle', this.beetle.create, this.beetle);
            this.BeetleParent.addChild(beetle);
        }
        explodeAni(parent, x, y, type, number, zOrder) {
            for (let i = 0; i < number; i++) {
                let explode = Laya.Pool.getItemByCreateFun('explode', this.explode.create, this.explode);
                parent.addChild(explode);
                explode.zOrder = zOrder;
                explode.pos(x, y);
                explode['Explode'].type = type;
                explode['Explode'].line = i;
                explode['Explode'].initProperty(type);
            }
        }
        onUpdate() {
            if (this.timeSwicth) {
                if (this.time.value > 0) {
                    this.time.value -= this.timeVelocity;
                }
                else if (this.time.value <= 0) {
                    Animation.leftRight_Shake(this.TimeNode, 20, 60, 50, f => {
                        this.createGameOver('defeated');
                    });
                    this.timeSwicth = false;
                }
            }
        }
        onDisable() {
        }
    }

    class Guidance extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('我是新手引导脚本');
            this.self = this.owner;
            this.self['Guidance'] = this;
            this.gameControl = this.self['GameControl'];
            this.guideColor_Lv_01 = [[1, 0, 1], [1, 0, 0], [1, 1, 0]];
            this.guideColor_Lv_02 = [[0, 1, 1, 1], [1, 0, 0, 1], [1, 1, 0, 0]];
            this.cilksNum = 0;
        }
        guidanceInit() {
            this.guideContainer = new Laya.Sprite();
            this.guideContainer.cacheAs = "bitmap";
            Laya.stage.addChild(this.guideContainer);
        }
        newGuidanceSet() {
            this.guideContainer.removeChildren(0, this.guideContainer._children.length - 1);
            var maskArea = new Laya.Sprite();
            maskArea.alpha = 0.5;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            maskArea.name = 'bg';
            this.guideContainer.addChild(maskArea);
            Animation.fade_out(maskArea, 0, 0.5, 100, 0, null);
            this.tipParent = new Laya.Sprite();
            this.guideContainer.addChild(this.tipParent);
            this.tipParent.pos(0, 0);
            this.tipParent.zOrder = 100;
        }
        createBalloonGuidance(type) {
            this.newGuidanceSet();
            this.ballonAndTaskMask(type);
            this.createTipSet(type);
        }
        ballonAndTaskMask(type) {
            for (let index = 0; index < this.BalloonParent._children.length; index++) {
                const balloon = this.BalloonParent._children[index];
                if (balloon.name === type) {
                    let x = balloon.x + (this.BalloonParent.x - this.BalloonParent.width / 2) + (this.BalloonVessel.x - this.BalloonVessel.width / 2);
                    let y = (balloon.y + this.BalloonParent.y + this.BalloonVessel.y) - balloon.height * 0.05;
                    let radius = balloon.height / 2 - 30;
                    this.createCircleMask(x, y, radius);
                    balloon['Balloon'].balloonClicksOn();
                }
                else {
                    balloon['Balloon'].balloonClicksOff();
                }
                for (let index = 0; index < this.TaskBalloonParent._children.length; index++) {
                    const taskBalloon = this.TaskBalloonParent._children[index];
                    if (taskBalloon.name === type) {
                        let x = taskBalloon.x + (this.TaskBalloonParent.x - this.TaskBalloonParent.width / 2) + (this.Tip.x - this.Tip.width / 2);
                        let y = taskBalloon.y + (this.TaskBalloonParent.y - this.TaskBalloonParent.height / 2) + (this.Tip.y - this.Tip.height / 2);
                        let radius = taskBalloon.height / 2 + 10;
                        this.createCircleMask(x, y, radius);
                    }
                }
            }
        }
        createBeetleGuidance() {
            this.newGuidanceSet();
            for (let index = 0; index < this.BeetleParent._children.length; index++) {
                const beetle = this.BeetleParent._children[index];
                let x = beetle.x + this.BeetleParent.x;
                let y = beetle.y + this.BeetleParent.x;
                let radius = beetle.height / 2 + 50;
                this.createCircleMask(x, y, radius);
                beetle['Beetle'].clicksOffBtn();
            }
            let x = this.PropsNode.x + (this.Tip.x - this.Tip.width / 2);
            let y = this.PropsNode.y + (this.Tip.y - this.Tip.height / 2);
            let radius = 80;
            this.createCircleMask(x, y, radius);
            this.PropsNode['Props'].clicksOnBtn();
            this.createTipSet('beetle');
        }
        createTimeGuidance() {
            this.newGuidanceSet();
            let width = 450;
            let height = 80;
            let x = this.TimeNode.x - width / 2;
            let y = this.TimeNode.y + (this.Tip.y - this.Tip.height / 2) - height / 2;
            this.createRectleMask(x, y, width, height);
            this.createTipSet('time');
            let currentColor = this.gameControl.clickOrderArr[0];
            this.ballonAndTaskMask(currentColor);
        }
        createTipSet(type) {
            if (type === Enum.BalloonName[1]) {
                for (let index = 0; index < 2; index++) {
                    let skin;
                    let x;
                    let y;
                    let delay;
                    if (index === 0) {
                        skin = Enum.GuidanceTiptype.colorOrder;
                        x = 110;
                        y = Laya.stage.height * 0.028;
                        delay = 100;
                    }
                    else {
                        skin = Enum.GuidanceTiptype.color_01;
                        x = 387;
                        y = Laya.stage.height * 0.142;
                        delay = 200;
                    }
                    this.tip(skin, x, y, delay);
                }
            }
            else if (type === Enum.BalloonName[0]) {
                this.tip(Enum.GuidanceTiptype.color_02, 550, Laya.stage.height * 0.45, 100);
            }
            else if (type === 'beetle') {
                let x = this.PropsNode.x + (this.Tip.x - this.Tip.width / 2);
                let y = this.PropsNode.y + (this.Tip.y - this.Tip.height / 2);
                this.tip(Enum.GuidanceTiptype.expelBeetle, x - 200, y - 100, 100);
            }
            else if (type === 'time') {
                this.tip(Enum.GuidanceTiptype.time, 509, 118, 100);
            }
        }
        tip(skin, x, y, delay) {
            let tip = new Laya.Image();
            tip.skin = skin;
            this.tipParent.addChild(tip);
            tip.x = x;
            tip.y = y;
            tip.pivotX = tip.width / 2;
            tip.pivotY = tip.height / 2;
            Animation.bombs_Appear(tip, 0, 1, 1.1, 0, 150, 50, delay, null, null);
        }
        createCircleMask(x, y, radius) {
            this.interactionArea = new Laya.Sprite();
            this.interactionArea.name = 'reverseMask';
            this.interactionArea.blendMode = "destination-out";
            this.guideContainer.addChild(this.interactionArea);
            this.interactionArea.graphics.drawCircle(x, y, radius, "#000000");
        }
        createRectleMask(x, y, width, height) {
            this.interactionArea = new Laya.Sprite();
            this.interactionArea.name = 'reverseMask';
            this.interactionArea.blendMode = "destination-out";
            this.guideContainer.addChild(this.interactionArea);
            this.interactionArea.graphics.drawRect(x, y, width, height, "#000000");
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
            this.self['Balloon'] = this;
            this.gameControl = this.self.scene['GameControl'];
            this.guidanceControl = this.self.scene['Guidance'];
            this.Levels = this.gameControl.Levels;
        }
        skeletoninit() {
            this.skeleton = SkTemplete.baoolonTemplet.buildArmature(0);
            this.skeleton.pos(150, 160);
            this.skeleton.play(Enum.Sk_Ballon_Type.scale + '_' + this.self.name, true);
            this.self.addChild(this.skeleton);
        }
        playSkeletonAni(type, loop, speed) {
            this.skeleton.play(type + '_' + this.self.name, loop);
            this.skeleton.rotation = 0;
            this.skeleton.playbackRate(speed);
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
            Animation.leftRight_Shake(this.self, 20, 20, 50, f => {
                let parentArr = this.self.parent._children;
                for (let index = 0; index < parentArr.length; index++) {
                    const element = parentArr[index];
                    element['Balloon'].skeleton.play(Enum.Sk_Ballon_Type.error + '_' + element.name, true);
                }
                this.playSkeletonAni(Enum.Sk_Ballon_Type.disdain, true, 1);
            });
        }
        balloonClicksOn() {
            Clicks.clicksOn('balloon', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
        }
        balloonClicksOff() {
            Clicks.clicksOff('balloon', this.self, this, null, null, this.up, null);
        }
        guidedJudgment() {
            let guideContainer = this.guidanceControl.guideContainer;
            if (Number(this.Levels.value) === 1) {
                this.guidanceControl.cilksNum++;
                if (this.guidanceControl.cilksNum === 5) {
                    console.log('执行第二步引导');
                    this.guidanceControl.createBalloonGuidance(Enum.BalloonName[0]);
                }
                else if (this.guidanceControl.cilksNum === 9) {
                    guideContainer.removeSelf();
                    this.guidanceControl.cilksNum = 0;
                }
            }
            else if (Number(this.Levels.value) === 2) {
                this.guidanceControl.cilksNum++;
                if (this.guidanceControl.cilksNum === 5) {
                    guideContainer.removeSelf();
                    this.gameControl.clicksAllOn();
                }
            }
        }
        up(event) {
            event.currentTarget.scale(Clicks.balloonScale, Clicks.balloonScale);
            if (this.self.name === this.gameControl.clickOrderArr[0]) {
                this.gameControl.explodeAni(this.gameControl.BalloonVessel, this.self.x + (1 - Clicks.balloonScale) * this.self.pivotX / 2, this.self.y + (1 - Clicks.balloonScale) * this.self.pivotY / 2, this.self.name, 20, 10);
                PalyAudio.playSound(Enum.AudioName.balloonRight, 1);
                this.clickRight();
                this.guidedJudgment();
            }
            else {
                this.clickError();
                PalyAudio.playSound(Enum.AudioName.balloonError, 1);
            }
        }
        onDisable() {
            this.skeleton.removeSelf();
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

    class Beetle extends Laya.Script {
        constructor() {
            super();
            this.remainTime = 0;
        }
        onEnable() {
            this.self = this.owner;
            this.self['Beetle'] = this;
            this.gameControl = this.self.scene['GameControl'];
            this.guidanceControl = this.self.scene['Guidance'];
            this.BalloonVessel = this.gameControl.BalloonVessel;
            this.skeleton = this.self.getChildByName('skeleton');
            this.createBoneAni();
            this.birthLocation();
            this.speed = this.gameControl.beetleSpeed;
        }
        birthLocation() {
            let direction = Math.floor(Math.random() * 2);
            if (direction === 1) {
                this.self.x = this.BalloonVessel.x + this.BalloonVessel.width / 2 + 800;
            }
            else {
                this.self.x = this.BalloonVessel.x + this.BalloonVessel.width / 2 - 800;
            }
            this.self.y = this.BalloonVessel.y + (Math.random() * 1) * this.BalloonVessel.height;
        }
        movePos() {
            let shrink = 80;
            this.moveX = this.BalloonVessel.x - this.BalloonVessel.width / 2 + 50 + (this.BalloonVessel.width - shrink * 2) * (Math.random() * 1);
            this.moveY = this.BalloonVessel.y + shrink + (this.BalloonVessel.height - shrink * 2) * (Math.random() * 1);
        }
        createBoneAni() {
            this.templet = new Laya.Templet();
            this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
            this.templet.on(Laya.Event.ERROR, this, this.onError);
            this.templet.loadAni("Skeleton/beetle_01.sk");
        }
        onError() {
            console.log('骨骼动画加载错误！');
        }
        parseComplete() {
            this.moveSwitch = true;
            this.posSwitch = true;
            if (Number(this.gameControl.Levels.value) === 2) {
                this.guideMove = true;
                this.guidanceSwitch = true;
            }
            else {
                this.clicksOnBtn();
                this.guideMove = false;
                this.guidanceSwitch = false;
            }
            this.playSkeletonAni(1, 'move');
        }
        playSkeletonAni(speed, type) {
            this.skeleton.play(type, true);
            this.skeleton.rotation = 0;
            this.skeleton.playbackRate(speed);
        }
        clicksOnBtn() {
            Clicks.beetleScale = this.self.scaleX;
            Clicks.clicksOn('beetle', '音效/按钮点击.mp3', this.self, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('beetle', this.self, this, null, null, this.up, null);
        }
        up(event) {
            PalyAudio.playSound(Enum.AudioName.beetle, 1);
            this.clicksOffBtn();
            event.currentTarget.scale(Clicks.beetleScale, Clicks.beetleScale);
            let parentArr = this.gameControl.BalloonParent._children;
            for (let index = 0; index < parentArr.length; index++) {
                const element = parentArr[index];
                element['Balloon'].skeleton.play(Enum.Sk_Ballon_Type.disdain + '_' + element.name, true);
            }
            Animation.leftRight_Shake(this.self, 20, 30, 50, f => {
                Animation.leftRight_Shake(this.self, 20, 30, 50, f => {
                    this.gameControl.createGameOver('defeated');
                });
            });
        }
        moveRule() {
            let point = new Laya.Point(this.moveX - this.self.x, this.moveY - this.self.y);
            point.normalize();
            this.self.x += point.x * this.speed;
            this.self.y += point.y * this.speed;
            let differenceX = Math.abs(this.self.x - this.moveX);
            let differenceY = Math.abs(this.self.y - this.moveY);
            if (differenceX < 30 && differenceY < 30) {
                this.playSkeletonAni(1, 'stand');
                this.moveSwitch = false;
                this.remainTime = 0;
            }
        }
        onUpdate() {
            if (this.moveSwitch) {
                if (this.posSwitch) {
                    this.movePos();
                    this.playSkeletonAni(1, 'move');
                    this.posSwitch = false;
                }
                else {
                    this.moveRule();
                }
            }
            else {
                this.remainTime++;
                if (this.remainTime > 200 && !this.guideMove) {
                    this.moveSwitch = true;
                    this.posSwitch = true;
                }
                else {
                    if (this.guidanceSwitch) {
                        this.guidanceControl.guidanceInit();
                        this.guidanceControl.createBeetleGuidance();
                        this.gameControl.timeSwicth = false;
                        console.log('新手引导出现');
                        this.guidanceSwitch = false;
                    }
                }
            }
        }
        onDisable() {
        }
    }

    var Tools;
    (function (Tools) {
        function random(n, m) {
            m = m || 10;
            const c = m - n + 1;
            return Math.floor(Math.random() * c + n);
        }
        Tools.random = random;
        function getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }
        Tools.getRandomArrayElements = getRandomArrayElements;
        function getArrayDifElements(arr, count) {
            const result = [];
            let i = 0;
            for (i; i < count; i++) {
                const temp = getDiffEle(arr.slice(), result, i);
                result.push(temp);
            }
            return result;
        }
        Tools.getArrayDifElements = getArrayDifElements;
        function getDiffEle(arr, result, place) {
            let indexArr = [];
            let i = 0;
            for (i; i < arr.length - place; i++) {
                indexArr.push(i);
            }
            const ranIndex = Math.floor(Math.random() * indexArr.length);
            if (result.indexOf(arr[ranIndex]) === -1) {
                const backNum = arr[ranIndex];
                arr[ranIndex] = arr[indexArr.length - 1];
                return backNum;
            }
            else {
                arr.splice(ranIndex, 1);
                return getDiffEle(arr, result, place);
            }
        }
        Tools.getDiffEle = getDiffEle;
        Tools.roleDragCan = false;
        function copydata(obj) {
            const ret = {};
            Object.getOwnPropertyNames(obj).forEach(name => {
                ret[name] = obj[name];
            });
            return ret;
        }
        Tools.copydata = copydata;
        function fillArray(value, len) {
            var arr = [];
            for (var i = 0; i < len; i++) {
                arr.push(value);
            }
            return arr;
        }
        Tools.fillArray = fillArray;
        function speedByAngle(angle, XY) {
            if (angle % 90 === 0 || !angle) {
                console.error("计算的角度异常,需要查看：", angle);
                return;
            }
            let speedXY = { x: 0, y: 0 };
            speedXY.y = XY.y;
            speedXY.x = speedXY.y / Math.tan(angle * Math.PI / 180);
            return speedXY;
        }
        Tools.speedByAngle = speedByAngle;
        function speedXYByAngle(angle, speed) {
            const speedXY = { x: 0, y: 0 };
            speedXY.x = speed * Math.cos(angle * Math.PI / 180);
            speedXY.y = speed * Math.sin(angle * Math.PI / 180);
            return speedXY;
        }
        Tools.speedXYByAngle = speedXYByAngle;
        function speedLabelByAngle(angle, speed, speedBate) {
            const speedXY = { x: 0, y: 0 };
            const selfAngle = angle;
            const defaultSpeed = speed;
            const bate = speedBate || 1;
            if (selfAngle % 90 === 0) {
                if (selfAngle === 0 || selfAngle === 360) {
                    speedXY.x = Math.abs(defaultSpeed) * bate;
                }
                else if (selfAngle === 90) {
                    speedXY.y = Math.abs(defaultSpeed) * bate;
                }
                else if (selfAngle === 180) {
                    speedXY.x = -Math.abs(defaultSpeed) * bate;
                }
                else {
                    speedXY.y = -Math.abs(defaultSpeed) * bate;
                }
            }
            else {
                const tempXY = Tools.speedXYByAngle(selfAngle, defaultSpeed);
                speedXY.x = tempXY.x;
                speedXY.y = tempXY.y;
                if (selfAngle > 0 && selfAngle < 180) {
                    speedXY.y = Math.abs(speedXY.y) * bate;
                }
                else {
                    speedXY.y = -Math.abs(speedXY.y) * bate;
                }
                if (selfAngle > 90 && selfAngle < 270) {
                    speedXY.x = -Math.abs(speedXY.x) * bate;
                }
                else {
                    speedXY.x = Math.abs(speedXY.x) * bate;
                }
            }
            return speedXY;
        }
        Tools.speedLabelByAngle = speedLabelByAngle;
        function getRad(degree) {
            return degree / 180 * Math.PI;
        }
        Tools.getRad = getRad;
        function getRoundPos(angle, radius, centPos) {
            var center = centPos;
            var radius = radius;
            var hudu = (2 * Math.PI / 360) * angle;
            var X = center.x + Math.sin(hudu) * radius;
            var Y = center.y - Math.cos(hudu) * radius;
            return { x: X, y: Y };
        }
        Tools.getRoundPos = getRoundPos;
        function converteNum(num) {
            if (typeof (num) !== "number") {
                console.warn("要转化的数字并不为number");
                return num;
            }
            let backNum;
            if (num < 1000) {
                backNum = "" + num;
            }
            else if (num < 1000000) {
                backNum = "" + (num / 1000).toFixed(1) + "k";
            }
            else if (num < 10e8) {
                backNum = "" + (num / 1000000).toFixed(1) + "m";
            }
            else {
                backNum = "" + num;
            }
            return backNum;
        }
        Tools.converteNum = converteNum;
    })(Tools || (Tools = {}));

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['Bullet'] = this;
            this.gameControl = this.self.scene['GameControl'];
            this.timer = 0;
            this.self.alpha = 1;
            this.initialAngle = 145;
            this.accelerated = 0.1;
            this.baseSpeed = 10;
            this.self.scale(0.2, 0.2);
        }
        commonSpeedXYByAngle(angle, speed) {
            this.self.x += Tools.speedXYByAngle(angle, speed + this.accelerated).x;
            this.self.y += Tools.speedXYByAngle(angle, speed + this.accelerated).y;
        }
        move() {
            this.accelerated += 0.01;
            if (this.timer > 0 && this.timer <= 8) {
                this.commonSpeedXYByAngle(this.initialAngle, this.baseSpeed);
            }
            else if (this.timer > 8) {
                this.commonSpeedXYByAngle(this.initialAngle, this.baseSpeed - 0.2);
                this.self.alpha -= 0.1;
                if (this.self.alpha <= 0) {
                    console.log('移除自身');
                    this.self.removeSelf();
                }
            }
            this.self.scaleX += 0.1;
            this.self.scaleY += 0.1;
        }
        onUpdate() {
            if (this.moveSwitch) {
                this.timer += 1;
                this.move();
            }
        }
        onDisable() {
        }
    }

    class Explode extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.timer = 0;
            this.accelerated = 0.1;
            this.self = this.owner;
            this.img = this.self.getChildByName('img');
            this.self['Explode'] = this;
            this.self.pivotX = this.self.width / 2;
            this.self.pivotY = this.self.height / 2;
        }
        initProperty(type) {
            this.effectsType = type;
            if (this.effectsType === Enum.BalloonName[0] || this.effectsType === Enum.BalloonName[1] || this.effectsType === Enum.BalloonName[2] || this.effectsType === Enum.BalloonName[3]) {
                this.explosionBalloon_P();
            }
            else if (type === 'vanish') {
                this.vanish_P();
            }
            this.img.pivotX = this.img.width / 2;
            this.img.pivotY = this.img.height / 2;
        }
        explosionBalloon_P() {
            this.moveSwitch = true;
            this.randomSpeed = Math.floor(Math.random() * 15) + 4;
            this.initialAngle = Math.floor(Math.random() * 360);
            this.scale = Math.floor(Math.random() * 8) + 4;
            this.self.scaleX = this.scale / 10;
            this.self.scaleY = this.scale / 10;
            this.vinshTime = Math.floor(Math.random() * 5) + 2;
            this.startAlpha = 1;
            this.self.alpha = this.startAlpha;
            this.rotationD = Math.floor(Math.random() * 2) === 1 ? -10 : 10;
            let number = Math.floor(Math.random() * 4);
            switch (this.effectsType) {
                case Enum.BalloonName[0]:
                    this.img.skin = Enum.Explode_Yellowish[number];
                    break;
                case Enum.BalloonName[1]:
                    this.img.skin = Enum.Explode_Pink[number];
                    break;
                case Enum.BalloonName[2]:
                    this.img.skin = Enum.Explode_Yellow[number];
                    break;
                case Enum.BalloonName[3]:
                    this.img.skin = Enum.Explode_Cyan[number];
                    break;
                case Enum.BalloonName[4]:
                    this.img.skin = Enum.Explode_Purple[number];
                    break;
                default:
                    break;
            }
        }
        explosionBalloon_Move() {
            this.img.rotation += this.rotationD;
            this.accelerated += 0.1;
            if (this.timer > 0 && this.timer <= 15) {
                this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed + 5);
            }
            else if (this.timer > 15 && this.timer < 18) {
                this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed - 5);
            }
            else if (this.timer >= 18) {
                this.self.removeSelf();
            }
        }
        vanish_P() {
            this.moveSwitch = true;
            this.randomSpeed = Math.random() * 2 + 2;
            this.initialAngle = Math.floor(Math.random() * 360);
            this.scale = 7;
            this.self.scale(this.scale / 10, this.scale / 10);
            this.vinshTime = Math.floor(Math.random() * 5) + 2;
            this.startAlpha = (Math.floor(Math.random() * 6) + 4) / 10;
            this.self.alpha = this.startAlpha;
            this.rotationD = Math.floor(Math.random() * 2) === 1 ? -5 : 5;
            this.img.skin = '特效/白色单元.png';
            this.img.rotation = this.initialAngle - 90;
        }
        vanish_Move() {
            this.accelerated += 0.01;
            if (this.timer > 0 && this.timer <= 20) {
                this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed);
            }
            else if (this.timer > 20 && this.timer < 30) {
                this.commonSpeedXYByAngle(this.initialAngle, this.randomSpeed - 3);
            }
            else if (this.timer >= 30) {
                this.self.alpha -= 0.02;
                if (this.self.alpha <= 0) {
                    this.self.removeSelf();
                }
            }
        }
        move() {
            if (this.effectsType === Enum.BalloonName[0] || this.effectsType === Enum.BalloonName[1] || this.effectsType === Enum.BalloonName[2] || this.effectsType === Enum.BalloonName[3]) {
                this.explosionBalloon_Move();
            }
            else if (this.effectsType === 'vanish') {
                this.vanish_Move();
            }
        }
        commonSpeedXYByAngle(angle, speed) {
            this.self.x += Tools.speedXYByAngle(angle, speed + this.accelerated).x;
            this.self.y += Tools.speedXYByAngle(angle, speed + this.accelerated).y;
        }
        onUpdate() {
            if (this.moveSwitch) {
                this.timer += 1;
                this.move();
            }
        }
        onDisable() {
            Laya.Pool.recover('explode', this.self);
        }
    }

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
                PalyAudio.playSound(Enum.AudioName.victory, 1);
            }
            else if (type === 'defeated') {
                this.btn_again.loadImage('UI/重来按钮.png');
                this.settlementType = 'defeated';
                this.logo.loadImage('UI/闯关失败logo.png');
                PalyAudio.playSound(Enum.AudioName.defeated, 1);
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
            Animation.fade_out(this.background, 0, 0.8, 200, 0, null);
            Animation.bombs_Appear(this.scoreNode, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 0, 'common', null);
            Animation.bombs_Appear(this.logo, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 1, 'common', null);
            Animation.bombs_Appear(this.btn_again, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, 'common', null);
            Animation.bombs_Appear(this.btn_return, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 3, 'common', func => {
                this.appearFunc();
            });
        }
        appearFunc() {
            this.clicksOnBtn();
            if (Laya.Browser.onMiniGame) {
                Advertising.bannarAd_01.show()
                    .then(() => console.log('banner 广告显示'));
            }
        }
        vanish(type) {
            let time = 250;
            let delayed = 100;
            Animation.fade_out(this.background, 0.8, 0, time, delayed * 4, null);
            Animation.bombs_Vanish(this.scoreNode, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 1, null);
            Animation.bombs_Vanish(this.logo, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 2, null);
            Animation.bombs_Vanish(this.btn_again, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 3, null);
            Animation.bombs_Vanish(this.btn_return, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 4, f => {
                this.vanishFunc(type);
            });
        }
        vanishFunc(type) {
            if (Laya.Browser.onMiniGame) {
                Advertising.bannarAd_01.hide();
            }
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

    class Hint extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['Hint'] = this;
            this.gameControl = this.self.scene['GameControl'];
            Adaptive.interface_Center(this.self);
            Adaptive.background_Center(this.background, this.self);
            this.appaer();
        }
        appaer() {
            let scale = 1.3;
            let time1 = 250;
            let time2 = 80;
            let delayed = 200;
            Animation.fade_out(this.background, 0, 0.8, 200, 0, null);
            Animation.bombs_Appear(this.hintBox, 0, 1, scale - 0.2, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 0, null);
            Animation.bombs_Appear(this.btn_not, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 1, null);
            Animation.bombs_Appear(this.btn_watch, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 2, f => {
                this.appaerFunc();
            });
        }
        appaerFunc() {
            this.clicksOnBtn();
        }
        vanish() {
            let time = 250;
            let delayed = 150;
            Animation.fade_out(this.background, 0.8, 0, time, delayed * 4, null);
            Animation.bombs_Vanish(this.btn_watch, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 1, null);
            Animation.bombs_Vanish(this.btn_not, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 2, null);
            Animation.bombs_Vanish(this.hintBox, 0, 0, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time, delayed * 3, f => {
                this.vanishFunc();
            });
        }
        vanishFunc() {
            this.gameControl.timeSwicth = true;
            this.self.removeSelf();
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_not, this, null, null, this.up, null);
            Clicks.clicksOn('largen', '音效/按钮点击.mp3', this.btn_watch, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.btn_not, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_watch, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            if (event.currentTarget.name === 'btn_watch') {
                if (Laya.Browser.onMiniGame) {
                    Advertising.videoAd_01.show().then(() => console.log('banner 广告显示'));
                }
            }
            this.clicksOffBtn();
            this.vanish();
        }
        onDisable() {
        }
    }

    class Ranking extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['Ranking'] = this;
            this.gameControl = this.self.scene['GameControl'];
            Adaptive.background_Center(this.background, this.self);
            Adaptive.interface_Center(this.self);
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

    var OnUpdateAni;
    (function (OnUpdateAni) {
        function magnify_shrink(aniSwitch, node, shrinkScale, magnifyScale, minScale, maxScale) {
            if (aniSwitch) {
                if (OnUpdateAni.magnify_shrink_change === 'magnify') {
                    node.scaleX += magnifyScale;
                    node.scaleY += magnifyScale;
                    if (node.scaleX > maxScale) {
                        OnUpdateAni.magnify_shrink_change = 'shrink';
                    }
                }
                else if (OnUpdateAni.magnify_shrink_change === 'shrink') {
                    node.scaleX -= shrinkScale;
                    node.scaleY -= shrinkScale;
                    if (node.scaleX < minScale) {
                        OnUpdateAni.magnify_shrink_change = 'magnify';
                    }
                }
            }
        }
        OnUpdateAni.magnify_shrink = magnify_shrink;
    })(OnUpdateAni || (OnUpdateAni = {}));

    class StartGame extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOver'] = this;
            this.balloon_skeleton = this.balloon.getChildByName('balloon_skeleton');
            this.gameControl = this.self.scene['GameControl'];
            this.LevelsNode = this.gameControl.LevelsNode;
            this.startSwitch = false;
            OnUpdateAni.magnify_shrink_change = 'magnify';
            Adaptive.interface_Center(this.self);
            Adaptive.child_Center(this.anti_addiction, this.self, Laya.stage.height * 9 / 10);
            this.timer = 0;
            this.appaer();
            this.createBoneAni();
            PalyAudio.playMusic(Enum.AudioName.bgm, 0, 0);
        }
        createBoneAni() {
            this.templet = new Laya.Templet();
            this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
            this.templet.on(Laya.Event.ERROR, this, this.onError);
            this.templet.loadAni("Skeleton/logoBallon.sk");
        }
        onError() {
            console.log('装饰气球加载错误！');
        }
        parseComplete() {
            this.balloon_skeleton.play('rock', true);
            console.log('装饰气球加载成功！');
        }
        appaer() {
            let scale = 1.3;
            let time1 = 250;
            let time2 = 100;
            let delayed = 300;
            for (let index = 0; index < this.logo._children.length; index++) {
                const element = this.logo._children[index];
                let type = 'common';
                if (index === 4) {
                    type = 'balloon';
                }
                Animation.bombs_Appear(element, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * index, type, null);
            }
            Animation.bombs_Appear(this.btn_start, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 5, 'common', null);
            Animation.bombs_Appear(this.btn_ranking, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 6, 'common', null);
            Animation.bombs_Appear(this.btn_share, 0, 1, scale, Math.floor(Math.random() * 2) === 1 ? 5 : -5, time1, time2, delayed * 7, 'common', f => {
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
            this.gameControl.readyStart('startGame');
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
                this.clicksOffBtn();
            }
            else if (event.currentTarget.name === 'btn_ranking') {
                this.gameControl.createRanking();
            }
            else if (event.currentTarget.name === 'btn_share') {
                WXDataManager.wxShare();
            }
        }
        onUpdate() {
            OnUpdateAni.magnify_shrink(this.startSwitch, this.btn_start, 0.003, 0.003, 1, 1.05);
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Script/Project/Background.ts", backGround);
            reg("Script/Project/LevelsNode.ts", Levels);
            reg("Script/Project/Props.ts", Props);
            reg("Script/Project/GameControl.ts", GameControl);
            reg("Script/Project/Guidance.ts", Guidance);
            reg("Script/Project/Balloon.ts", Balloon);
            reg("Script/Project/Balloon_Icon.ts", Balloon_Icon);
            reg("Script/Project/Beetle.ts", Beetle);
            reg("Script/Project/Bullet.ts", Bullet);
            reg("Script/Project/Explode.ts", Explode);
            reg("Script/Project/GameOver.ts", GameOver);
            reg("Script/Project/Hint.ts", Hint);
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
