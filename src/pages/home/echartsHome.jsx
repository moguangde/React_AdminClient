import React, { Component } from 'react'
import 'echarts/lib/chart/line' // 折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import ReactEcharts from 'echarts-for-react'
export default class EchartsHome extends Component {
    getOption=()=>{
        let option = {
            title : {
                text: '当周交易记录',
                subtext: '每周7天的交易记录'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['所有订单','已完成','未完成']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value}单'
                    }
                }
            ],
            series : [
                {
                    name:'所有订单',
                    type:'line',
                    data:[110, 210, 150, 130, 125, 133, 106],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'已完成',
                    type:'line',
                    data:[110, 105, 140, 130, 110, 121, 100],
                    markPoint : {
                        data : [
                            {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                },
                   {
                    name:'未完成',
                    type:'line',
                    data:[0, 25, 10, 10, 15, 12, 6],
                    markPoint : {
                        data : [
                            {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };
          
          return option
      }
      render() {
          return (
              <ReactEcharts
              ref={e => { this.echarts_react = e }}
              option={this.getOption()}
              style={{ height: '35vh', margin: '10px 0' }}
            />
          )
      }
}
