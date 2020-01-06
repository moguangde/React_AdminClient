import React, { Component } from 'react'
import './test.less'
import 'antd/dist/antd.css';
import { Table, Divider, Tag } from 'antd';
import { Form, Input, Select, Button,Row,Col,Icon} from 'antd';
const { Option } = Select;
const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '商品描述',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '价格',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

/* 
首页路由组件
*/
export default class Test extends Component {
  render() {
    return (
      <div className="testHeader">
         <Row className="header-top">
           <Col span={21}>
                <span className="header-des">
                  <Select
                    style={{ width: '20%' , marginRight: '3%'}}
                    value="RMB"
                  >
                    <Option value="rmb">RMB</Option>
                    <Option value="dollar">Dollar</Option>
                  </Select>
                  <Input
                    type="text"
                    onChange={this.handleNumberChange}
                    style={{ width: '20%', marginRight: '3%' }}
                  />
                  <Button type="primary">搜索</Button>
                </span>
           </Col>
           <Col span={3}>
               <Button type="primary"><Icon type="plus" />添加商品</Button>
           </Col>
         </Row>
         <Row className="table-bottom">
           <Col>
              <Table columns={columns} dataSource={data} />
           </Col>
         </Row>
      </div>
    )
  }
}
