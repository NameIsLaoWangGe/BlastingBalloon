/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.微信通信模块
 */
export module WXDataManager {
    export let userinfo;//用户信息的全变量
    /**Laya中的微信引用，在当前模块可以直接使用，在其他模块需要加上模块名*/
    export let wx = Laya.Browser.window.wx;
    export function WXcheckSession() {
        if (Laya.Browser.onMiniGame) {
            wx.checkSession({
                success() {
                    //session_key 未过期，并且在本生命周期一直有效
                    console.log('已经登录过了！')
                },
                fail() {
                    // session_key 已经失效，需要重新执行登录流程
                    WXLogin() //重新登录
                    console.log('重新登录')
                }
            })
        }

    }
    export function WXLogin() {
        if (Laya.Browser.onMiniGame) {
            wx.login({
                success: function (res) {
                    // 此时的登录成功只是拿到了一段字符串凭证res里面只有一个凭证，并不是openid。
                    // 此时的登录是必然可以登录，不需要授权
                    if (res.code) {
                        console.log("登录成功，获取到code", res.code);
                    }
                    // 下面是弹出登录按钮，点击登录后弹出授权框，此时才可以拿到玩家的所有信息
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
                            onRegisterUser(res.userInfo);
                        }
                        else {
                            console.log("没有授权");
                        }
                    })
                }
            })
        }
    }

    /**
     * 玩家注册，这里把玩家的信息录入我们的云数据库，需要调用云函数
     * @param _userinfo 传入玩家信息
     */
    export function onRegisterUser(_userinfo) {
        wx.cloud.init({
            env: 'release-lwg'
        })
        // 调用云函数处理注册
        wx.cloud.callFunction({
            // 云函数的名字
            name: "login",
            // 传入的参数
            data: {
                userinfo: _userinfo,
            },
            // 这里的res是我们在云函数里面返回的数据
            success(res) {
                console.log("登录成功回调", res);
                userinfo = res.result.event.userinfo;
                console.log(userinfo);
            },
            fail: console.error()
        })
    }
}
export default WXDataManager;
