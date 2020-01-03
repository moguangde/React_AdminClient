import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
    render() {
        //读取保存的user，如果存在直接跳转登录页面
    //   const user= JSON.parse(localStorage.getItem('user_key') ||'{}')
      const user=memoryUtils.user
      if(!user._id){
        // this.props.history.replace('/login')//事件回调函数中进行路由跳转
        return <Redirect to="/login" />
      }
        return (
            <div>
                Admin,{user.username}
            </div>
        )
    }
}
