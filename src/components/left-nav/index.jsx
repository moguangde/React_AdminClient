import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'
/* 
左侧导航组件
*/
class LeftNav extends Component {

  render() {
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
      </div>
    )
  }
}

export default withRouter(LeftNav)
