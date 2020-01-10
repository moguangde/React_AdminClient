/**
 * 商品管理
 */
import React, { Component } from 'react'
import { Card, Button, Icon,Select,Input ,Table} from 'antd';
const { Option } = Select;
export default class Product extends Component {
  componentWillMount(){
    this.initColumns()
  }
  initColumns=()=>{
   this.columns=[
      {
        title: '商品名称',
        dataIndex: 'date',
        width: 300,
      },
      {
        title: '价格',
        dataIndex: 'amount',
        width: 300,
      },
      {
        title: '商品描述',
        dataIndex: 'type',
        width: 300,
      },
      {
        title: '状态',
        dataIndex: 'note',
        width: 300,
        render:()=><span>在售&nbsp;&nbsp;&nbsp;<Button type="primary" size="small" >下架</Button></span>
      },
      {
        title: '操作',
        key: 'action',
        render: () => <a>Delete</a>,
      },
    ]
  }
   data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
    },
  ];
   handleChange=(value)=>{
    console.log(`selected ${value}`);
  }
  render() {
    const extra=(
      <Button type="primary" ><Icon type="plus" />添加商品</Button>
    )
    const title=(
      <span>
        <Select
          showSearch
          defaultValue="按名称搜索"
          style={{ width: 120 }}
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="按名称搜索">按名称搜索</Option>
          <Option value="按描述搜索">按描述搜索</Option>
  
        </Select>
        <Input placeholder="请输入描述" style={{width:'200px',margin:'10px'}} />
        <Button type="primary">搜索</Button>
      </span>
    )
    return (
      <Card title={title} extra={extra} >
        <Table bordered  columns={this.columns} dataSource={this.data} />
    </Card>
    )
  }
}
