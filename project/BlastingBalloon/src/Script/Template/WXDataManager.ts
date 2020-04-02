/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.微信通信模块
 */
export module WXDataManager {
    export let userinfo;//用户信息的全变量
    export let openId;//用户的openId
    export let Levels = 0;//关卡数
    /**Laya中的微信引用，在当前模块可以直接使用，在其他模块需要加上模块名*/
    export let wx = Laya.Browser.window.wx;

    /**
     * 检测登录
     */
    export function WXcheckSession() {
        if (Laya.Browser.onMiniGame) {
            wx.checkSession({
                success() {
                    //session_key 未过期，并且在本生命周期一直有效
                    console.log('已经登录过了！')
                },
                fail() {
                    // session_key 已经失效，需要重新执行登录流程
                    authorizedWXLogin() //重新登录
                    console.log('重新登录')
                }
            })
        }
    }

    /**
     * 授权登录
     */
    export function authorizedWXLogin() {
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
     * data是我们传入云函数的信息，在云函数event中找到
     * @param _userinfo 传入玩家信息
     */
    export function onRegisterUser(_userinfo) {
        if (Laya.Browser.onMiniGame) {
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
            }).then(res => {
                console.log("登录成功回调", res);
            })
        }
    }

    /**
     * 普通登录不授权，只拿玩家的openid
     * */
    export function normalWXLogin() {
        if (Laya.Browser.onMiniGame) {
            wx.login({
                success(res) {
                    console.log('成功登录')
                    // 成功登录后使用云函数里面login返回openId
                    wx.cloud.init({
                        env: 'release-lwg'
                    })
                    wx.cloud.callFunction({
                        // 云函数的名字
                        name: "login",
                        // 传入的参数
                        data: {
                            code: res.code,
                        },
                    }).then(res => {
                        console.log("登录成功回调", res);
                    })
                },
                fail() {
                    console.log('登录失败')
                }
            })
        }
    }

    /**
     * 创建一个玩家的信息集合，我们可以创建很多集合，但是目前没有必要创建那么
     * 只创建一个名称为user_info集合，里面装入玩家的openid和关卡等数据
     * 如果有了这个集合就不用创建了
     */
    export function createUserInfoCollection() {
        // 云环境初始化
        wx.cloud.init({
            env: 'release-lwg'
        })
        const db = wx.cloud.database();//数据库引用
      db.cr
    }

    /**
     * 增加或获取当前的关卡数
     * 如果已经有了这个关卡数，那么就记录当前的关卡数
     * 需在开始的时候检测这条记录
    */
    export function uploadLevels() {
        if (Laya.Browser.onMiniGame) {
            // 云环境初始化
            wx.cloud.init({
                env: 'release-lwg'
            })
            const db = wx.cloud.database();//数据库引用
            let user_info = db.collection('user_info');//数据库集合引用
            // 获取集合中的某条记录
            user_info.doc('userLevels').get().then(res => {
                // res.data 包含该记录的数据
                console.log(res)
                if (res) {
                    console.log('已经有了这个记录');
                    console.log(res.data.levels);
                    Levels = res.data.levels;
                } else {
                    console.log('目前没有这个记录，需进行第一次添加')
                    user_info.add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                            _id: 'userLevels',
                            levels: Levels,
                        },
                    }).then(res => {
                        console.log(res)
                    })
                }
            })
        }

    }

    /**
     * 更新当前关卡数
     */
    export function updateLevels() {
        if (Laya.Browser.onMiniGame) {
            // 云环境初始化
            wx.cloud.init({
                env: 'release-lwg'
            })
            const db = wx.cloud.database();//数据库引用
            let user_info = db.collection('user_info');//数据库集合引用
            user_info.doc('userLevels').update({
                // data 传入需要局部更新的数据
                data: {
                    // 表示将 done 字段置为 true
                    levels: Levels,
                },
            }).then(res => {
                console.log(res)
            })
        }
    }
}
export default WXDataManager;
