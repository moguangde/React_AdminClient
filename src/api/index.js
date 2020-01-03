// 包含所有请求接口函数：接口函数
import ajax from './ajax'
// const BASE='http://localhost:5000'
const BASE=''
//请求登录
export const reqLogin=(username,password)=> ajax.post(BASE+'/login',{username,password})




// export const reqLogin=(username,password)=> (
    // ajax({
    //     method:'post',
    //     url:BASE+'/login',
    //      data:{
    //         username,
    //         password
    //     }
    // })
// )

// export function reqLogin(username,password){
//    return ajax({
//         method:'post',
//         url:BASE+'/login',
//         // data:{
//         //     username,
//         //     password
//         // }
//         data:qs.stringify({username,password})
//     })
// }

// const name='admin'
// const pwd='admin'
// reqLogin(name,pwd).then(result=>{
//     // const result=response.data
//     console.log('请求成功',result)
// },error=>{
//     console.log('请求失败',error)
// })