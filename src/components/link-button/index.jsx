import React from 'react'
import './index.less'
/* 
    自定义的看似链接实是button组件
*/
export default function LinkButton(props){
    return <button className="link-button" {...props} />
}