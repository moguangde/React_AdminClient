import React, { Component } from 'react'
import EchartsHome from './echartsHome'
import {Card, Button,Icon} from 'antd'
import "./home.less";
import img from './images/一寸照蓝底.jpg'

/* 
首页路由组件
*/
export default class Home extends Component {
  render() {
    const title=(
      <span>
        <Button type="default" >添加产品</Button>
        <Button type="default" style={{margin:'0px 15px'}} >添加广告</Button>
        <Button type="default" >添加文章</Button>
        <Button type="default" style={{margin:'0px 15px'}} >新增单页面</Button>
        <Button type="default" ><Icon type="user" />个人信息</Button>
        <Button type="default" style={{margin:'0px 15px'}} ><Icon type="setting" />系统设置</Button>
      </span>
    )
    return (
      <div className="home">
        <div className="home-status">
           <div className="status-left">
              <Card title='状态栏'>
                  <div className="left">
                     <span>
                       <img src={img} alt="img" />
                     </span>
                     <p>个人中心</p>
                  </div>
                  <div className="midle">
                    <p>商城名称:三台山购物网</p>
                    <ul>
                      <li>店铺等级：三级</li>
                      <li>商城类型：电子商务</li>
                      <li>销售类型：综合</li>
                      <li>店铺ID：234565</li>
                      <li>商家ID：34656565</li>
                      <li>开通时间：2016-08-21</li>
                    </ul>
                  </div>
                  <div className="right">
                    <p>店铺动态评分：</p>
                    <ul>
                      <li>宝贝描述  <span>4.8分 高</span></li>
                      <li>卖家服务  <span>4.8分 高</span></li>
                      <li>物流服务  <span>4.8分 高</span></li>
                    </ul>
                  </div>
              </Card>
              <Card title={title}></Card>
           </div>
           <div className="status-right">
             <Card title='代办事项'>
                  <ul>
                    <li><p>待结算</p><span>999</span></li>
                    <li><p>待审核</p><span>132</span></li>
                    <li><p>消息</p><span>143</span></li>
                    <li><p>提示</p><span>45</span></li>
                    <li><p>审核</p><span>13</span></li>
                    <li><p>评论</p><span>564</span></li>
                  </ul>
             </Card>
           </div>
        </div>
        <div>
          <Card title='销售统计' >
            <EchartsHome/>
          </Card>
        </div>
      </div>
    )
  }
}
