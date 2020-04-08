/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.广告模块
 */
export module Advertising {
    export let videoAd_01;//视频广告
    export let bannarAd_01;//视频广告

    /**Laya中的微信引用，在当前模块可以直接使用，在其他模块需要加上模块名*/
    export let wx = Laya.Browser.window.wx;
    /**
     * 初始化视频广告
     * @param func_yes 看完广告
     * @param func_no 没有看完广告
     */
    export function videoAd_01_Lode(func_yes, func_no): void {
        // 创建激励视频广告实例，提前初始化
        if (Laya.Browser.onMiniGame) {
            console.log('广告开始加载');
            videoAd_01 = wx.createRewardedVideoAd({
                adUnitId: 'adunit-6de18c6de7b6d9ab'
            })
            videoAd_01.onLoad(() => {
                console.log('激励视频 广告加载成功')
            })
            videoAd_01.onError(err => {
                console.log(err)
            })
            videoAd_01.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    func_yes();
                } else {
                    console.log('视频没有看望不会开始游戏');
                    func_no();
                }
            })
        }
    }

    /**
     * 初始化bannar广告
     */
    export function bannerAd_01_Lode(): void {
        // 创建 Banner 广告实例，提前初始化
        if (Laya.Browser.onMiniGame) {
            console.log('广告开始加载');
            bannarAd_01 = wx.createBannerAd({
                adUnitId: 'adunit-5329937f4349b0ea',
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: 750
                }
            })
            bannarAd_01.onLoad(() => {
                console.log('banner 广告加载成功');
            })
            bannarAd_01.onError(err => {
                console.log(err)
            })
            // bannarAd_01.show();
        }
    }

}
export default Advertising;
