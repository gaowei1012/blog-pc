import React from 'react';
import { Col, Row, Icon, message } from 'antd';
import service from './../../service/user';
import history from './../../history';
import './index.less';

class Header extends React.Component {

    state = {
        username: ''
    }

    componentWillMount () {
        let username = sessionStorage.getItem('username');
        this.setState({username})
    }

    loginClean = () => {
        service.signout().then(res => {
            if (res.code === 0) {
                sessionStorage.removeItem('username')
                message.success('退出成功')
                setTimeout(() => {
                    history.push('/')
                }, 100);
            } else {
                message.error('退出失败')
            }
        })
    }

    render() {
        return(
            <div className='page-header'>
                <Row>
                    <Col span={6}>
                        <h2>我的博客</h2>
                    </Col>
                    <Col span={18}>
                        <div style={{float: 'right', fontSize: 16}}>
                            <Icon type='smile' /> 欢迎,{this.state.username}
                            <span onClick={this.loginClean}>
                                <Icon type='logout'/> 退出
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Header;