export module Enum {
    /**
     * 气球图片地址
     */
    export enum ColorSkin {
        'UI/balloon_淡黄.png',
        'UI/balloon_粉色.png',
        'UI/balloon_黄色.png',
        'UI/balloon_青色.png',
        'UI/balloon_紫色.png',
    }

    /**
     * 气球名字
     */
    export enum BalloonName {
        'yellowish',
        'pink',
        'yellow',
        'cyan',
        'purple',
    }

    /**
     * 提示气球普通状态的图片地址
     */
    export enum IconSkin_01 {
        'UI/icon_淡黄.png',
        'UI/icon_粉色.png',
        'UI/icon_黄色.png',
        'UI/icon_青色.png',
        'UI/icon_紫色.png',
    }
    /**
     * 提示气球提示状态的图片地址
     */
    export enum IconSkin_02 {
        'UI/icon_淡黄_pitch.png',
        'UI/icon_粉色_pitch.png',
        'UI/icon_黄色_pitch.png',
        'UI/icon_青色_pitch.png',
        'UI/icon_紫色_pitch.png',
    }

    /**
     * 淡黄色气球特效元素地址
     */
    export enum Explode_Yellowish {
        '特效/effect_淡黄1.png',
        '特效/effect_淡黄2.png',
        '特效/effect_淡黄3.png',
        '特效/effect_淡黄4.png',
    }

    /**
     * 粉色气球特效元素地址
     */
    export enum Explode_Pink {
        '特效/effect_粉色1.png',
        '特效/effect_粉色2.png',
        '特效/effect_粉色3.png',
        '特效/effect_粉色4.png',
    }

    /**
     * 黄色气球特效元素地址
     */
    export enum Explode_Yellow {
        '特效/effect_黄色1.png',
        '特效/effect_黄色2.png',
        '特效/effect_黄色3.png',
        '特效/effect_黄色4.png',
    }


    /**
     * 青色气球特效元素地址
     */
    export enum Explode_Cyan {
        '特效/effect_青色1.png',
        '特效/effect_青色2.png',
        '特效/effect_青色3.png',
        '特效/effect_青色4.png',
    }
    /**
      * 紫色气球特效元素地址
      */
    export enum Explode_Purple {
        '特效/effect_紫色1.png',
        '特效/effect_紫色2.png',
        '特效/effect_紫色3.png',
        '特效/effect_紫色4.png',
    }

    /**
      * 气球的动画名称
      */
    export enum Sk_Ballon_Type {
        death = 'death',
        error = 'error',
        disdain = 'disdain',
        static = 'static',
        scale = 'scale',
    }

    export enum AudioName {
        button = '音效/按钮点击.mp3',
        bgm = '音效/背景音乐.mp3',
        victory = '音效/胜利.mp3',
        defeated = '音效/失败.mp3',
        balloonRight = '音效/气球点击正确.mp3',
        balloonError = '音效/气球点击错误.mp3',
        balloonPopup = '音效/气球弹出.mp3',
        beetle = '音效/点击甲虫.mp3',
        beetleMove = '音效/甲虫溜走.mp3',
        commonPopup = '音效/通用弹出.mp3',
        commonShake = '音效/抖动.mp3',
    }


    export enum GuidanceTiptype {
        colorOrder = '引导/引导_颜色顺序.png',
        color_01 = '引导/引导_颜色1.png',
        color_02 = '引导/引导_颜色2.png',
        time = '引导/引导_时间.png',
        expelBeetle = '引导/引导_驱虫.png',
    }


}

export default Enum;