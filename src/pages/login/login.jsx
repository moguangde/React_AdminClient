import React, { Component } from 'react'
import { Form, Icon, Input, Button ,message} from 'antd';
import {reqLogin} from '../../api'
import {Redirect} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import logo from './image/logo.png'
import './login.less'
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, {username,password}) => {
            if (!err) {
                    //   console.log('Received values of form: ', username,password);
                const result= await reqLogin(username,password)
                if(result.status===0){
                    //将user信息保存到local
                    const user = result.data
                    // localStorage.setItem('user_key',JSON.stringify(user))
                    storageUtils.saveUser(user)
                    //保存到内存中
                    memoryUtils.user=user
                    this.props.history.replace('/')
                    message.success('登录成功!')
                }else{
                    message.error(result.msg)
                }
            }else{
                console.log('验证失败')
            }
          });
      };   
    //   密码自定义验证
      validatepwd =(rule, value, callback)=>{
        value=value.trim()
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，数字或下划线组成')
        }else{
            callback()
        }  
      } 
    render() {
     //读取保存的user，如果存在直接跳转登录页面
    //   const user= JSON.parse(localStorage.getItem('user_key') ||'{}')
      const  user=memoryUtils.user
      if(user._id){
        // this.props.history.replace('/login')//事件回调函数中进行路由跳转
        return <Redirect to="/" />
      }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>react后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {
                        getFieldDecorator("username",{
                            initialValue: '',//初始值
                            rules: [
                                { required: true,whitespace:true, message: '请输入用户名' },
                                { min:4, message: '用户名不能小于4位'},
                                { max:12, message:'用户名不能大于12位'},
                                { pattern:/^[a-zA-Z0-9_]+$/, message:'用户名必须是英文，数字或下划线组成'}
                            ]
                            })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                        {
                        getFieldDecorator("password",{
                            initialValue: '',//初始值
                            rules:[
                                {validator:this.validatepwd}
                            ]
                            })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        </Form.Item>
                </Form>
                </div>
            </div>
        )
    }
}
const WrapperForm=Form.create()(Login)
export default WrapperForm
