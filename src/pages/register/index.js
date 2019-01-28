import React from 'react';
import { Form, Button, Icon, Input, message } from 'antd';
import server from './../../service/user';
import './index.less';

export default class Register extends React.Component {

    handleSubmit = (value) => {
        // console.log(value)
        server.signup(value).then(res => {
            // console.log(res)
            if (res.code ==0) {
                message.success('注册成功!')
                setTimeout(() => {
                    this.props.history.push('/')
                }, 3000)
            } else {
                message.error('注册失败')
            }
        })
    }

    render() {
        return(
            <div className='page-register'>
                <div className='register-form'>
                    <h3>欢迎注册！</h3>
                    <RegisterForm registerSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

class RegisterForm extends React.Component {

    checkUserName = (rule, value, callback) => {
        if (!value) {
            callback('请输入用户名!');
        } else {
            callback();
        }
    }

    registerSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        this.props.registerSubmit(data)
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.registerSubmit} >
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{validator: this.checkUserName}]
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{required: true, message: '请输入密码!'}]
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{required: true, message: '请输入邮箱!'}]
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="邮箱" />
                )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

RegisterForm = Form.create()(RegisterForm);