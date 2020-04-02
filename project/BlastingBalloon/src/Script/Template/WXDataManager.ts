/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.微信通信模块
 */
export module WXDataManager {


    /**用户的微信里面的openid*/
    export let WXopenid;

    /**用户在某个数据库集合下的记录上的_id，在数据库任何集合下都是个id*/
    export let user_id;

    /**玩家在游戏中的关卡数,关卡数暂时不会降低，所以上传最高的关卡*/
    export let _lastlevels;

    /**这次的关卡*/
    export let _thislevels = 0;


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
                            getUserinfo(null);
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
     * 普通登录不授权，不注册，只拿玩家的openid
     * */
    export function normalWXLogin() {
        if (Laya.Browser.onMiniGame) {
            wx.checkSession({
                success() {
                    //session_key 未过期，并且在本生命周期一直有效
                    console.log('已经登录过了！');
                    // 若果登录过了那么我们需要拿到上次的关卡数
                    getUserinfo('haveLogin');
                },
                fail() {
                    // session_key 已经失效，需要重新执行登录流程
                    console.log('重新登录')
                    // 如果没有登录，那么我们要上传起始关卡数0
                    wx.login({
                        success(res) {
                            getUserinfo('loginAgain');
                        },
                        fail() {
                            console.log('登录失败')
                        }
                    })
                }
            })
        }
    }

    /**
    * 分为两种情况，一种是未登录或者过期，需要执行第一次上传关卡数0，
    * 另一种则是已经登录或者登录未过期，那么拿到上次的分数，此时需要回调func下载分数
    * @param type 这个是拿到openid后的回调
    */
    export function getUserinfo(type) {
        if (Laya.Browser.onMiniGame) {
            wx.cloud.init({
                env: 'release-lwg'
            })
            // 调用云函数处理注册
            wx.cloud.callFunction({
                // 云函数的名字
                name: "login",
                // 传入的参数
            }).then(res => {
                console.log("登录成功回调：", res);
                WXopenid = res.result.openid;

                console.log("WXopenid为：", WXopenid);
                user_id = WXopenid;

                if (type === 'loginAgain') {
                    // 这里有个问题，就是虽然你的登录失效了，但是可能原来的记录依然保留
                    // 那么我们也要找到原来的关卡，并且不报错
                    try {
                        add_Levels();
                    } catch (error) {
                        console.log('虽然登录过期了，但是记录还在，我们还会获取原来的记录')
                        get_Levels();
                    }
                } else if (type === 'haveLogin') {
                    get_Levels();
                }
            })
        }
    }

    /**
     * 增加一条记录
     * 这里增加一条记录说明是登录过期或者第一次登录，增加关卡分数为0
     * */
    export function add_Levels() {
        if (Laya.Browser.onMiniGame) {
            // 云环境初始化
            wx.cloud.init({
                env: 'release-lwg'
            })
            /** 数据库引用*/
            let db = wx.cloud.database();
            /** 数据库集合名称，暂时只建立一个，就是玩家的基本信息*/
            let user_info = db.collection('user_info');

            user_info.add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                    _id: user_id,
                    _levels: _thislevels,
                    due: new Date("2018-09-01"),
                    // 为待办事项添加一个地理位置（113°E，23°N）
                    location: new db.Geo.Point(113, 23),
                    done: false
                },
            }).then(res => {
                console.log('没有登录过重新上传：' + res)
            })
        }
    }

    /**
     * 查找玩家记录
     * 此时应用在玩家登录过了或者登录没有过期，那么直接查找到玩家的记录
    */
    export function get_Levels() {
        if (Laya.Browser.onMiniGame) {
            // 云环境初始化
            wx.cloud.init({
                env: 'release-lwg'
            })

            /** 数据库引用*/
            let db = wx.cloud.database();
            /** 数据库集合名称，暂时只建立一个，就是玩家的基本信息*/
            let user_info = db.collection('user_info');
            user_info.doc(user_id).get().then(res => {
                console.log(res.data)
                _thislevels = res.data._levels
                console.log('目前的关卡数为：' + _thislevels)
            })
        }

    }

    /**
     * 更新当前关卡数
     */
    export function update_Levels() {
        // 可以尝试在上传一次，防止玩家数据被毁后，因为登录后不会继续添加了
        try {
          
        } catch (error) {

        }

        if (Laya.Browser.onMiniGame) {
            // 云环境初始化
            wx.cloud.init({
                env: 'release-lwg'
            })

            /** 数据库引用*/
            let db = wx.cloud.database();
            /** 数据库集合名称，暂时只建立一个，就是玩家的基本信息*/
            let user_info = db.collection('user_info');

            user_info.doc(user_id).update({
                // data 传入需要局部更新的数据
                data: {
                    // 表示将 done 字段置为 true
                    _levels: _thislevels,
                },
            }).then(res => {
                console.log(res)
            })
        }
    }
}
export default WXDataManager;
