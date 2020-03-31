/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.微信通信模块
 */
export module WXDataManager {
    export let userinfo;//用户信息的全变量

    export function WXLogin() {
        if (Laya.Browser.onMiniGame) {
            let wx: any = Laya.Browser.window.wx;
            wx.login({
                success: function (res) {
                    if (res.code) {
                        console.log("登录成功，获取到code", res.code);
                    }

                    var button = wx.createUserInfoButton({
                        type: 'text',
                        text: '开始游戏',
                        style: {
                            left: wx.getSystemInfoSync().screenWidth / 2 - 60,
                            bottom: wx.getSystemInfoSync().screenHeight / 2 - 60,
                            width: 120,
                            height: 40,
                            lineHeight: 40,
                            backgroundColor: '#fb94a9',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 16,
                            borderRadius: 20
                        }
                    })
                    button.show();
                    // 这个按钮是微信自动调出的，我们通过接口创建，然后给与样式
                    // 下面则是给与微信弹出的授权框的两个按钮的点击回调
                    button.onTap((res) => {
                        console.log(res)

                        if (res.errMsg === "getUserInfo:ok") {
                            console.log("已经授权");
                            //TODO 注册用户信息

                            button.destroy();
                        }
                        else {
                            console.log("没有授权");
                        }
                    })
                }
            })
        }
    }

}
export default WXDataManager;
