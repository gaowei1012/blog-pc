import React from 'react';
import { Form, Button, Icon, Input, message } from 'antd';
import service from './../../service/user';
// import history from './../../history';
import { Link } from 'react-router-dom';
import './index.less';


export default class Login extends React.Component {
    
    handleSubmit = (value) => {
        service.signin(value).then(res => {
            if (res.code == 0) {
                // 登录成功, 跳转到
                message.success('登录成功',1);
                // 将用户名存在sessionStore里面
                sessionStorage.setItem('username', res.data.result.username)
                // console.log(res.data.result.username)
                setTimeout(() => {
                    this.props.history.push('/admin')
                }, 1000);
            } else if(res.code == 1){
                // 登录失败
                message.error('用户名或密码错误');
            }
        })
    }

    render() {
        return(
            <div className='home-page'>
                <div className='page-login'>
                    <h1>欢迎登录</h1>
                    <LoginForm loginSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

class LoginForm extends React.Component {

    loginSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        this.props.loginSubmit(data);   
    }

    checkUserName = (rule, value, callback) => {
        let reg = /\w[0-9a-zA-Z_]/;
        if (!value) {
            callback('请输入用户名!');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.loginSubmit} >
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    没有账号?<Link to='/register'>立即注册</Link>
                </Form.Item>
            </Form>
        )
    }
}

LoginForm = Form.create()(LoginForm)