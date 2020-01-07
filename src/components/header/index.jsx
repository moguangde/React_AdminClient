import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import { Modal, message } from 'antd';
import LinkButton from '../../components/link-button';
import menuConfig from '../../config/menuConfig';
import { formateData } from '../../utils/dataUtils';
import {reqWeather} from '../../api';
import './index.less'
const { confirm } = Modal;
class Header extends Component {
  state = {
    currentTiem: formateData(Date.now()),
    dayPictureUrl:'', 
    weather: ''
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        currentTiem: formateData(Date.now())
      })
    }, 1000);
  //获取天气信息
    this.getWeather()
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getWeather=async()=>{
      const {dayPictureUrl, weather}=await reqWeather('贵阳')
      this.setState({
        dayPictureUrl:dayPictureUrl, 
        weather: weather
      })
  }

  logout = () => {
    // 显示确认提升
    confirm({
      title: '你确定要退出登录吗?',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        message.success('退出成功!')
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('取消');
      },
    });
    // 确定后，删除存储的用户信息
  }

  // 获取当前请求的path得到对应的title
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuConfig.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  render() {
    const { currentTiem ,dayPictureUrl,weather} = this.state
    const user = memoryUtils.user
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          欢迎 ,{user.username} &nbsp;&nbsp;
         <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {title}
          </div>
          <div className="header-bottom-right">
            <span>{currentTiem}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)