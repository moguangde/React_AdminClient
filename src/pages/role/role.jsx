import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import {formateData} from "../../utils/dataUtils"
import {Button,Table,Card,Radio} from 'antd';
/**
 * 角色管理
 */
export default class Role extends Component {
  state={
    users:[],//获取用户列表
    roles: [], // 所有角色列表
    visible: false,
    loading:false
  }
  componentWillMount(){
    this.initColuns()
  }
  initColuns=()=>{
    this.columns=[
      {
        title:'管理',
        width:80,
        render:(user)=><Radio value={user._id} />
      },
      {
        title:'角色名称',
        dataIndex:'name'
      },
      {
        title:'授权人',
        dataIndex:'auth_name'
      },
      {
        title:'授权时间',
        dataIndex:'auth_time',
        render:formateData
      },
      {
        title:'创建时间',
        dataIndex:'create_time',
        width:400,
        render:formateData
      },
      {
        title:'操作',
        render:(user)=>(
            <span>
              <LinkButton onClick={()=>this.deleteUser(user)} >删除</LinkButton>
            </span>
       )     
      }
    ]
  }

   dataSource = [
    {
      key: '1',
      "name": "moguangde",
      "create_time": 1575684201414,
      "auth_name": "moguangde",
      "auth_time": 1575711356129
    },
    {
      key: '2',
      "name": "moguangde",
      "create_time": 1575684201414,
      "auth_name": "moguangde",
      "auth_time": 1575711356129
    },
  ];
  render() {
    const {loading}=this.state
    const title=(
      <span>
        <Button type="primary" >创建角色</Button>
        <Button type="primary" style={{marginLeft:20}} >设置权限</Button>
      </span>
    )
    return (
      <Card title={title} >
         <Table rowKey="_id" bordered columns={this.columns} loading={loading} dataSource={this.dataSource} />
      </Card>
    )
  }
}
