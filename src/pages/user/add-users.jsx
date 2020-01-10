import React, { Component } from 'react'
import {Input,Icon,Form,Select} from 'antd';
import PropTypes from 'prop-types'
const Item=Form.Item
const Option=Select.Option
 class AddUser extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object
      }
    componentWillMount () {
        this.props.setForm(this.props.form)
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {roles, user} = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('username',
                        {
                            rules:[{required:true,message:'请输入用户名！'}]
                        }
                        )( <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)
                    }
                  </Item>  
                  <Item>
                      {
                          getFieldDecorator('password',{
                              rules:[{required:true,message:'请输入密码！'}]
                          })(<Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />)
                      }
                  </Item>
                  <Item>
                      {
                        getFieldDecorator('phone',{
                            rules:[{required:true,message:'请输入手机号！'}]
                        })(<Input  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />)
                      }
                  </Item>
                  <Item>
                     {
                        getFieldDecorator('email',{
                            rules:[{required:true,message:'请输入邮箱！'}]
                        })(<Input  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入邮箱" />)
                      }
                  </Item>
                  <Item>
                    {
                        getFieldDecorator('role_id', {
                        rules: [
                            { required: true, message: '必须指定角色' }
                        ]
                        })(
                        <Select placeholder='请输入角色' >
                            {
                            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                            }
                        </Select>
                        )
                    }
                    </Item>
            </Form>
        )
    }
}

export default Form.create()(AddUser)