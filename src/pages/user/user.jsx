/**
 * 用户管理
 */
import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import {Button,Table,Card,Icon, message,Modal} from 'antd';
import {formateData} from "../../utils/dataUtils"
import AddUser from './add-users';
import  { reqDeleteUser, reqUsers, reqAddOrUpdateUser} from '../../api'
const { confirm } = Modal;

export default class User extends Component {
  state={
    users:[],//获取用户列表
    roles: [], // 所有角色列表
    visible: false,
    loading:false
  }
  componentDidMount(){
    this.getUsers()
  }
  componentWillMount(){
    this.initColuns()
  }
  initColuns=()=>{
    this.columns=[
      {
        title:'姓名',
        dataIndex:'username'
      },
      {
        title:'手机',
        dataIndex:'phone'
      },
      {
        title:'邮箱',
        dataIndex:'email'
      },
      {
        title:'角色',
        dataIndex:'role_id',
        render: role_id => this.roleNames[role_id]
      },
      {
        title:'创建时间',
        dataIndex:'create_time',
        render:formateData
      },
      {
        title:'操作',
        render:(user)=>(
            <span>
              <LinkButton onClick={()=>this.deleteUser(user)} >删除</LinkButton>
              <LinkButton onClick={()=>this.showUpdate(user)}>更新</LinkButton>
            </span>
       )     
      }
    ]
  }

   deleteUser=(user)=> {
    confirm({
      title: `确认删除${user.username}用户吗?`,
      content: '删除后不可恢复，请谨慎操作',
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功!')
          this.getUsers()
        } else {
          message.error(result.msg)
        }
      },
      onCancel() {},
    });
  }

  /*
  显示修改界面
   */
  showUpdate = (user) => {
    this.user = user // 保存user
    this.setState({
      visible: true
    })
  }

  getUsers=async()=>{

    const result = await reqUsers()
    if (result.status===0) {
      const {users, roles} = result.data

      // 生成一个对象容器(属性名: 角色的ID值, 属性值是角色的名称)
      this.roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})

      this.setState({
        users,
        roles
      })
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
    /*
  添加/更新用户
   */
  handleOk = async() => {
    
    this.setState({visible: false})
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 如果this有user
        if (this.user) {
          values._id = this.user._id
        }
 
        const result = await reqAddOrUpdateUser(values)
        if (result.status===0) {
          message.success('添加新用户成功!')
          this.getUsers()
        } else {
          message.error(result.msg)
        }
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const {users,loading,roles,user}=this.state
    const title=(
      <Button type="primary" onClick={this.showModal} ><Icon type="plus"/>创建用户</Button>
    )
    return (
      <Card  title={title}>
          <Table rowKey="_id" bordered columns={this.columns} loading={loading} dataSource={users} />
          <Modal
          title="创建用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUser 
          setForm={form => this.form = form}
          roles={roles}
          user={user} />
        </Modal>
      </Card>
    )
  }
}
