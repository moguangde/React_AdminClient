import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal , message } from 'antd'

import LinkButton from '../../components/link-button'
import {reqWeather , reqAddress } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.less'

class Header extends Component {


  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', // 图片url
    weather: '', // 天气文本
    address: ''//获取地址
  }

  /* 
    退出登陆
  */
  logout = () => {
    // 显示确认提示
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        console.log('OK');
        message.success('退出成功!')
        // 确定后, 删除存储的用户信息
        // local中的
        storageUtils.removeUser()
        // 内存中的
        memoryUtils.user = {}
        // 跳转到登陆界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    })
    
  }

  /* 
  根据当前请求的path得到对应的title
  */
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
      
    })

    return title
  }

  /* 
  获取天气信息显示
  */
  getWeather = async () => {

    const {address_detail}= await reqAddress()
    let {city}=address_detail
    // console.log(address,city)
    // 发请求
    const { dayPictureUrl, weather } = await reqWeather(city)
    // 更新状态
    this.setState({
      dayPictureUrl, 
      weather
    })
  }
  async getAddress(){
    try {
      const {address,address_detail}= await reqAddress()
      // 坐标取值不准确
      // let {x,y}=point
      // x=(x/100000).toFixed(4)-13
      // y=(y/100000).toFixed(4)-13
      let {city}=address_detail
      if(!city){city='贵阳'}
      this.getWeather(city)
      this.setState({
        address
      })
    } catch (error) {
      this.getWeather()
    }
  }

  componentDidMount () {
    // 启动循环定时器
    this.intervalId = setInterval(() => {
      // 将currentTime更新为当前时间值
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000);
    // 发jsonp请求获取天气信息显示
    this.getWeather()
    this.getAddress()
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }


  render() {

    const { currentTime, dayPictureUrl, weather , address} = this.state 

    const user = memoryUtils.user
    // 得到当前需要显示的title
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          欢迎, {user.username} &nbsp;&nbsp;

          {/* 组件的标签体作为标签的children属性传入 */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>&nbsp;&nbsp;&nbsp;
            <span>{address}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
