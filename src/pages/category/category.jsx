
/**
 * 分类管理
 */
import React, { Component } from 'react'
import {Button,Icon,Table ,Card, message,Modal} from 'antd'
import LinkButton from '../../components/link-button';
import AddUpdateForm from './add-update-form';
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'

export default class Category extends Component {
  state = {
    cateorys:[],
    Loading:false,
    isShow:0//0:不显示，1:显示添加分类，2:修改分类
  };
  componentDidMount(){
    this.getcateorys()
  }
  componentWillMount(){
    this.initColumns()
  }
  // 初始化
  initColumns=()=>{
    this.columns=[
       {
         title: '分类名称',
         dataIndex: 'name',
       },
       {
         title: '操作',
         key: 'action',
         width: 400,
         render: (category) => {
           return (
             <div>
               <LinkButton onClick={()=>{  
                 this.category=category
                 this.setState({isShow:2})
               }} >修改</LinkButton>
               <LinkButton>删除</LinkButton>
               <LinkButton>查看子分类</LinkButton>
             </div>
           )
         
         },
       },
     ]
   }
  //  发请求
  getcateorys=async()=>{
    this.setState({Loading:true})
   const result=await reqCategorys()
   if(result&&result.status===0){
     this.setState({
      cateorys:result.data,
      Loading:false
     })
   }else{
     message.error('获取数据失败')
   }
  }
  // 添加分类
  handleOk = () => {
    this.form.validateFields(async(err, values) => {
      if (!err) {
        const {categoryName}=values
        const {isShow}=this.state
        let result
        if(isShow===1){
          result=await reqAddCategory(categoryName)
        }else{
          const categoryId=this.category._id
          result=await reqUpdateCategory({categoryId,categoryName})
        }
        this.form.resetFields()
        this.setState({isShow: 0});
        const action=isShow===1?'添加':'修改'
        if(result.status===0){
          this.getcateorys()
          message.success(action +'分类成功')
        }else{
          message.error(action+'分类失败')
        }
      }
    });
  };

  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      isShow: 0,
    });
  };
  render() {
    const {cateorys,Loading,isShow}=this.state
      return (
        <div>
           <Card title="品类管理" extra={<Button type="primary"  onClick={()=>this.setState({isShow:1})} ><Icon type="plus" />添加</Button>} style={{ width: '100%'}}>
                <Table 
                bordered 
                rowKey="_id"
                loading={Loading}
                columns={this.columns} 
                dataSource={cateorys}
                pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
                 <Modal
                  title={isShow===1?'添加分类':'修改分类'}
                  visible={isShow!==0}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <AddUpdateForm setForm={(form)=>{this.form=form}} />
                </Modal>
           </Card>
        </div>
      )
  }
}
