// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk') //云端引用
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

//数据库引用
const db = cloud.database()

//获取数据库中的'user_info'集合，集合必须先写在数据库中，否则第一次获取不到，会产生一些问题
const userinfo = db.collection('user_info');
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  const wxContext = cloud.getWXContext()
  //直接上传用户信息字段，如果有了就不会再上传了
  // 特殊情况特殊对待
  let addData = {
    _id: 'userData',
    _openid: wxContext.OPENID,
    _userinfo: event,
    due: new Date('2010-04-01'),
  }
  userinfo.add({
    data: addData
  })
  return {
    event,
  };

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  //   env: wxContext.ENV,
  // }

  // 增删该查最好加上 wxContext.OPENID
  // 增 ,批量增加正在修复，暂时只能一个一个增加
  // 如果重复，那么不会添加，也不会覆盖
  // userinfo.add({
  //   data: {
  //     _id: 'wf_111',
  //     _openid: wxContext.OPENID,
  //     name: "1老哥"
  //   }
  // });

  // userinfo.add({
  //   data: {
  //     _id: 'wf_222',
  //     _openid: wxContext.OPENID,
  //     name: "2老哥"
  //   }
  // });

  // userinfo.add({
  //   data: {
  //     _id: 'wf_555',
  //     _openid: wxContext.OPENID,
  //     name: "5老哥"
  //   }
  // });

  // userinfo.add({
  //   data: {
  //     _id: 'wf_444',
  //     _openid: wxContext.OPENID,
  //     name: "4老哥"
  //   }
  // });

  // userinfo.add({
  //   data: {
  //     _id: 'wf_666',
  //     _openid: wxContext.OPENID,
  //     name: "6老哥"
  //   }
  // });


  // userinfo.add({
  //   data: {
  //     _id: 'wf_333',
  //     _openid: wxContext.OPENID,
  //     name: "3老哥"
  //   }
  // });

  // userinfo.add({
  //   data: {
  //     _id: 'wf_777',
  //     _openid: wxContext.OPENID,
  //     name: "7老哥"
  //   }
  // });

  // 查
  // 一起查询
  // return userinfo.where({
  //   _openid: wxContext.OPENID // 填入当前用户 openid
  // }).get()

  // 按规则查询，以下连个规则是： 按照其中一个字段进行降序和升序排列  跳过前0列，查询数量也为1        条，那么就只显示第二条
  // 按照'name'字段的值进行升序
  // return userinfo.where({
  //     _openid: wxContext.OPENID // 填入当前用户 openid
  //   })
  //   .orderBy('name', 'asc')
  //   .skip(0)
  //   .limit(5)
  //   .get()

  //按照'name'字段的值进行降序
  // return userinfo.where({
  //   _openid: wxContext.OPENID // 填入当前用户 openid
  // })
  //   .orderBy('name', 'desc')
  //   .skip(0)
  //   .limit(5)
  //   .get()

  // 删
  // 通过id来删除某条记录
  // try {
  //   return userinfo.doc('wf_7777').remove()
  // } catch (e) {
  //   console.error(e)
  // }

  // 删除多条记录
  // try {
  //   return userinfo.where({
  //     'wf_333': true,
  //     'wf_222': true,
  //     'wf_555': true,
  //   }).remove()
  // } catch (e) {
  //   console.error(e)
  // }

  // 改
  // 改一个
  // try {
  //   return userinfo.doc('wf_444').update({
  //     // data 传入需要局部更新的数据
  //     data: {
  //       // 表示将 name 字段置为 '重新更新的3老哥'
  //       name: '重新更新的3老哥'
  //     }
  //   })
  // } catch (e) {
  //   console.error(e)
  // }

  // 修改多条记录
  // try {
  //   return userinfo.where({
  //     done: false
  //   })
  //     .update({
  //       data: {
  //         progress: _.inc(10)
  //       },
  //     })
  // } catch (e) {
  //   console.error(e)
  // }






  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息

}