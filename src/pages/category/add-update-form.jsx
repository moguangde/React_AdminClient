import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
const Item=Form.Item
 class AddUpdateForm extends Component {
    static propTypes={
        setForm:PropTypes.func.isRequired,
      }
      componentWillMount () {
        this.props.setForm(this.props.form)
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {categoryName}=this.props
        return (
            <div>
                <Form>
                    <Item> 
                        {getFieldDecorator('categoryName', {
                          initialValue: categoryName || '', // 初始值
                        rules: [{ required: true, message: '请输入你要添加的分类!' }],
                        })(
                        <Input
                        placeholder="请输入你要添加的分类"
                        />,
                        )}
                    </Item>
                </Form>
            </div>
        )
    }
}
export default Form.create()(AddUpdateForm)
