import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

export default class NavLeft extends React.Component {

    render() {
        return (
            <div className='page-navleft'>
                <Menu
                    mode='inline'
                    theme='light'
                    defaultSelectedKeys={['/admin/']}

                >
                    <Menu.Item key='/admin'>
                        <Link to='/admin/welcome' />首页
                    </Menu.Item>
                    <Menu.Item key='/admin/category'>
                        <Link to='/admin/category' />分类管理
                    </Menu.Item>
                    <Menu.Item key='/admin/article'>
                        <Link to="/admin/article" />文章管理
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
} 