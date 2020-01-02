import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './image/logo.png'
import './login.less'
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, {username,password}) => {
            if (!err) {
              console.log('Received values of form: ', username,password);
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
