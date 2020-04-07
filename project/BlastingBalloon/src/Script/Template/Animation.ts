/**
 * 1.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.动画模块
 */
export module Animation {
    /**
     * 上下旋转动画
     * @param node 节点
     * @param time 花费时间
     */
    export function upDown_Rotate(node, time, func): void {
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

    /**
     * 上下旋转动画
     * @param node 节点
     * @param time 花费时间
     * @param func 回调函数
     */
    export function leftRight_Rotate(node, time, func): void {
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

    /**
     * 左右抖动
     * @param node 节点
     * @param time 花费时间
     * @param range 幅度
     * @param delayed 延时
     * @param func 回调函数
     */
    export function leftRight_Shake(node, time, range, delayed, func): void {
        Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }))
            }))
        }), delayed);
    }

    /**
     * 上下抖动
     * @param node 节点
     * @param time 花费时间
     * @param range 幅度
     * @param func 回调函数
     */
    export function upDwon_Shake(node, time, range, func): void {
        Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }))
            }))
        }))
    }

    /**
     * 渐隐渐出
     * @param node 节点
     * @param alhpa1 最初的透明度
     * @param alhpa2 渐隐到的透明度
     * @param time 花费时间
     * @param delayed 延时
     * @param func 回调函数
     */
    export function fade_out(node, alhpa1, alhpa2, time, delayed, func): void {
        node.alpha = alhpa1;
        Laya.Tween.to(node, { alpha: alhpa2 }, time, null, Laya.Handler.create(this, function () {
            if (func !== null) {
                func();
            }
        }), delayed)
    }

    /**
    * 渐隐渐出+移动
    * @param node 节点
    * @param time 花费时间
    * @param delayed 延时
    * @param range 渐隐程度
    * @param x x轴移动距离
    * @param y y轴移动距离
    * @param func 回调函数
    */
    export function fade_out_Move(node, time, range, x, y, delayed, func): void {
        Laya.Tween.to(node, { alpha: range, x: x, y: y }, time, null, Laya.Handler.create(this, function () {
            if (func !== null) {
                func();
            }
        }), delayed)
    }

    /**
     * 下落
     * @param node 节点
     * @param targetY 目标位置
     * @param rotation 落地角度
     * @param time 花费时间
     * @param delayed 延时时间
     * @param func 回调函数
     */
    export function drop(node, targetY, rotation, time, delayed, func): void {
        Laya.Tween.to(node, { y: targetY, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
            if (func !== null) {
                func();
            }
        }), delayed);
    }

    /**
     * 上升
     * @param node 节点
     * @param initialY 初始y位置
     * @param initialR 初始角度
     * @param targetY 目标y位置
     * @param time 花费时间
     * @param delayed 延时时间
     * @param func 回调函数
     */
    export function go_up(node, initialY, initialR, targetY, time, delayed, func): void {
        node.y = initialY;
        node.rotation = initialR;
        Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
            if (func !== null) {
                func();
            }
        }), delayed);
    }

    /**
     * 用于卡牌X轴方向的横向旋转
     * 两个面不一样的卡牌旋转动画，卡牌正面有内容，卡牌背面没有内容，这个内容是一个子节点
     * @param node 节点
     * @param arr 子节点名称数组
     * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
     * @param time 每次旋转1/2次花费时间
     * @param delayed 延时时间
     * @param func2 结束时回调函数
     */
    export function cardRotateX_TowFace(node: Laya.Sprite, arr: string[], func1: Function, time: number, delayed: number, func2: Function): void {
        Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
            // 所有子节点消失
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

    /**
    * 用于卡牌X轴方向的横向旋转
    * 两个面一样的卡牌旋转动画，正反面内容是一样的
    * @param node 节点
    * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
    * @param time 每次旋转1/2次花费时间
    * @param delayed 延时时间
    * @param func2 结束时回调函数
    */
    export function cardRotateX_OneFace(node: Laya.Sprite, func1: Function, time: number, delayed: number, func2: Function): void {
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

    /**
    * 用于卡牌Y轴方向的纵向旋转
    * 两个面不一样的卡牌旋转动画，卡牌正面有内容，卡牌背面没有内容，这个内容是一个子节点
    * @param node 节点
    * @param arr 子节点名称数组
    * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
    * @param time 每次旋转1/2次花费时间
    * @param delayed 延时时间
    * @param func2 结束时回调函数
    */
    export function cardRotateY_TowFace(node: Laya.Sprite, arr: string[], func1: Function, time: number, delayed: number, func2: Function): void {
        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
            // 所有子节点消失
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

    /**
    * 用于卡牌Y轴方向的纵向旋转
    * 两个面一样的卡牌旋转动画，正反面内容是一样的
    * @param node 节点
    * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
    * @param time 每次旋转1/2次花费时间
    * @param delayed 延时时间
    * @param func2 结束时回调函数
    */
    export function cardRotateY_OneFace(node: Laya.Sprite, func1: Function, time: number, delayed: number, func2: Function): void {
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

    /**
     * 移动中变化一次角度属性，分为两个阶段，第一个阶段是移动并且变化角度，第二个阶段是到达目标位置，并且角度回归为0
     * @param node 节点
     * @param targetX 目标x位置
     * @param targetY 目标y位置
     * @param per 中间位置的百分比
     * @param rotation_per 第一阶段变化到多少角度
     * @param time 花费时间
     * @param func
     */
    export function move_changeRotate(node, targetX, targetY, per, rotation_pe, time, func): void {

        let targetPerX = targetX * per + node.x * (1 - per);
        let targetPerY = targetY * per + node.y * (1 - per);

        Laya.Tween.to(node, { x: targetPerX, y: targetPerY, rotation: 45 }, time, null, Laya.Handler.create(this, function () {

            Laya.Tween.to(node, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func()
                }
            }), 0);
        }), 0);
    }

    /**
     * 类似气球弹出并且回弹，第一个阶段弹到空中，这个阶段可以给个角度，第二阶段落下变为原始状态，第三阶段再次放大一次，这次放大小一点，第四阶段回到原始状态，三、四个阶段是回弹一次，根据第一个阶段参数进行调整
     * @param node 节点
     * @param firstAlpha 初始透明度
    * @param  firstScale 初始大小，因为有些节点可能初始Scale并不是1
     * @param scale1 第一阶段放大比例
     * @param rotation 第一阶段角度 
     * @param time1 第一阶段花费时间
     * @param time2 第二阶段花费时间
     * @param delayed 延时时间
     * @param func 完成后的回调
     */
    export function bombs_Appear(node, firstAlpha, firstScale, scale1, rotation, time1, time2, delayed, func): void {
        node.scale(0, 0);
        node.alhpa = firstAlpha;
        Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alhpa: 1, rotation: rotation }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {

            Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {

                Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.2, scaleY: firstScale + (scale1 - firstScale) * 0.2, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {

                    Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func()
                        }
                    }), 0);
                }), 0);
            }), 0);
        }), delayed);
    }



    /**
     * 类似气球收缩消失
     * @param node 节点
     * @param scale 收缩后的大小
     * @param alpha 收缩后的透明度
     * @param rotation 收缩后的角度 
     * @param time 花费时间
     * @param delayed 延时时间
     * @param func 完成后的回调
     */
    export function bombs_Vanish(node, scale, alpha, rotation, time, delayed, func): void {
        Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alhpa: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
            if (func !== null) {
                func()
            }
        }), delayed);
    }

    /**
     * 类似于心脏跳动的回弹效果
     * @param node 节点
     * @param firstScale 初始大小
     * @param scale1 需要放大的大小
     * @param time 花费时间
     * @param delayed 延时时间
     * @param func 完成后的回调
     */
    export function swell_shrink(node, firstScale, scale1, time, delayed, func): void {
        Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alhpa: 1, }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {

            Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {

                Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.2, scaleY: firstScale + (scale1 - firstScale) * 0.2, rotation: 0 }, time, null, Laya.Handler.create(this, function () {

                    Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func()
                        }
                    }), 0);
                }), 0);
            }), 0);
        }), delayed);
    }

    /**
     * 简单移动
     * @param node 节点
     * @param firstX 初始x位置
     * @param firstY 初始y位置
     * @param targetX 目标y位置
     * @param targetY 目标y位置
     * @param time 花费时间
     * @param func 完成后的回调
     */
    export function simple_Move(node, firstX, firstY, targetX, targetY, time, delayed, func): void {
        node.x = firstX;
        node.y = firstY;
        Laya.Tween.to(node, { x: targetX, y: targetY }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
            if (func !== null) {
                func()
            }
        }), delayed);
    }


    /**
    * 形变移动伴随回弹效果，移动的过程中X轴或Y轴方向会被挤压，然后回到原始状态
    * @param node 节点
    * @param firstX 初始x位置
    * @param scaleX x轴方向的挤压
    * @param scaleY y轴方向的挤压
    * @param targetX 目标y位置
    * @param time 花费时间
    * @param func 完成后的回调
    */
    export function deform_Move(node, firstX, targetX, scaleX, scaleY, time, delayed, func): void {
        node.x = firstX;
        Laya.Tween.to(node, { x: targetX, scaleX: scaleX, scaleY: scaleY }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
            // 原始状态
            Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func()
                }
            }), 0);
        }), delayed);
    }

}
export default Animation;

