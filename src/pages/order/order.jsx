import React, { Component } from 'react'
import './order.less'
import 'antd/dist/antd.css';
import Echarts from './echarts'
import { Table, Card } from 'antd';
import { Select, Button,Row,Col,Icon,DatePicker,Statistic } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const columns = [
  {
    title: '日期',
    dataIndex: 'data',
  },
  {
    title: '订货单',
    dataIndex: 'dhd',
  },
  {
    title: '退货单',
    dataIndex: 'thd',
  },
  {
    title: '订货客户数',
    dataIndex: 'dhkhs',
  },
  {
    title: '退货客户数',
    dataIndex: 'thkhs',
  },
  {
    title: '订货金额',
    dataIndex: 'dhje',
  },
  {
    title: '退货金额',
    dataIndex: 'thje',
  },
  {
    title: '金额小计',
    dataIndex: 'jexj',
  },
];
const data = [
  {
    key: '1',
    data:'2020-1-19',
    dhd: 32,
    thd: 3,
    dhkhs: 1,
    thkhs: 0,
    dhje: 32,
    thje: 23,
    jexj: 23
  },
  {
    key: '2',
    data:'2020-1-19',
    dhd: 32,
    thd: 3,
    dhkhs: 1,
    thkhs: 0,
    dhje: 32,
    thje: 23,
    jexj: 23
  },
  {
    key: '3',
    data:'2020-1-19',
    dhd: 32,
    thd: 3,
    dhkhs: 1,
    thkhs: 0,
    dhje: 32,
    thje: 23,
    jexj: 23
  },
];

/* 
首页路由组件
*/
export default class Test extends Component {
  
   onChange=(date, dateString)=>{
    console.log(date, dateString);
  }
  onOk=(value) =>{
    console.log('onOk: ', value);
  }
  render() {
    const title=(
      <span className='button'>
        <Button type="primary">本周</Button>
        <Button>上周</Button>
        <Button>本月</Button>
        <Button>上月</Button>
        <RangePicker
          onChange={this.onChange}
          onOk={this.onOk}
          placeholder={['开始时间', '结束时间']}
          style={{margin:'0 20px'}}
        />
        <Button type="primary">检索</Button>
      </span>
    )
    const extra=(
      <Button>导入</Button>
    )
    return (
      <Card title={title} extra={extra}>
         <div className="order">
          <Row gutter={[80,0]} style={{textAlign:'center',padding:40}}>
              <Col span={3}>
                <Statistic title="订货单" value={37} />
              </Col>
              <Col span={3}>
                <Statistic title="退货单" value={199} />
              </Col>
              <Col span={3}>
                <Statistic title="订货客户数" value={1} />
              </Col>
              <Col span={3}>
                <Statistic title="退货客户数" value={112893} />
              </Col>
              <Col span={4}>
                <Statistic title="订货金额" value={112893} />
              </Col>
              <Col span={4}>
                <Statistic title="退货金额" value={112893} />
              </Col>
              <Col span={4}>
                <Statistic title="金额合计" value={112893} />
              </Col>
            </Row>
         </div>
         <div className="search">
            <Row>
                <Col span={22}>
                  <Select defaultValue='1' >
                    <Option value='1' >订单数量</Option>
                    <Option value='2' >退货单数</Option>
                    <Option value='3' >订货金额</Option>
                    <Option value='4' >退货金额</Option>
                    <Option value='5' >金额合计</Option>
                  </Select>
                  <Button type="primary" shape="round" size={'small'}>
                    按天
                  </Button>
                  <Button type="link"   shape="round" size={'small'}>
                    按周
                  </Button>
                  <Button type="link" shape="round" size={'small'}>
                    按月
                  </Button>
                </Col>
                <Col span={2}>
                    <Statistic
                      title="相比上周期"
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<Icon type="arrow-up" />}
                      suffix="%"
                   />
                </Col>
            </Row>
         </div>
         <div>
            <Echarts/>
         </div>
         <div className="table">
           <Table columns={columns} dataSource={data} size="middle" />
         </div>
      </Card>
    )
  }
}
